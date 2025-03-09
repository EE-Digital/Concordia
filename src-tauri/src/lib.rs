use base64::prelude::*;
use dirs::data_local_dir;
use rsa::{
    pkcs1::{DecodeRsaPrivateKey, EncodeRsaPrivateKey, EncodeRsaPublicKey, LineEnding},
    sha2::{Digest, Sha256},
    Pkcs1v15Sign, RsaPrivateKey, RsaPublicKey,
};
use tauri::Manager;
use tauri_plugin_deep_link::DeepLinkExt;

// In your Tauri command (Rust backend):
#[tauri::command]
async fn create_rsa_keys(_window: tauri::Window, key_id: String) -> String {
    // Genereate key pair
    let _private_key = key_id.clone() + ".pem";
    let _public_key = key_id.clone() + ".pub";
    let mut rng = rand::thread_rng();
    let bits = 2048;
    let private_key = RsaPrivateKey::new(&mut rng, bits).expect("failed to generate a private key");
    let public_key = RsaPublicKey::from(&private_key);

    let data_dir = data_local_dir().expect("failed to get data local dir");

    // Create directories
    std::fs::create_dir_all(data_dir.join("com.EE-Digital.concordia").join("identities"))
        .expect("failed to create directories");

    // Save keys
    private_key
        .write_pkcs1_pem_file(
            data_dir
                .join("com.EE-Digital.concordia")
                .join("identities")
                .join(_private_key),
            LineEnding::LF,
        )
        .expect("failed to write private key to file");
    public_key
        .write_pkcs1_pem_file(
            data_dir
                .join("com.EE-Digital.concordia")
                .join("identities")
                .join(_public_key),
            LineEnding::LF,
        )
        .expect("failed to write public key to file");

    // Return public key
    let kkt = public_key
        .to_pkcs1_pem(LineEnding::LF)
        .expect("failed to convert public key to pem");
    return kkt;
}

#[tauri::command]
async fn delete_rsa_key(_window: tauri::Window, key_id: String) {
    let _private_key = key_id.clone() + ".pem";
    let _public_key = key_id.clone() + ".pub";
    let data_dir = data_local_dir().expect("failed to get data local dir");
    std::fs::remove_file(
        data_dir
            .join("com.EE-Digital.concordia")
            .join("identities")
            .join(_private_key),
    )
    .expect("failed to delete private key");
    std::fs::remove_file(
        data_dir
            .join("com.EE-Digital.concordia")
            .join("identities")
            .join(_public_key),
    )
    .expect("failed to delete public key");
}

#[tauri::command]
async fn sign_with_rsa(_window: tauri::Window, key_id: String, payload: String) -> String {
    let data_dir: std::path::PathBuf = data_local_dir().expect("failed to get data local dir");
    let private_key_string = std::fs::read_to_string(
        data_dir
            .join("com.EE-Digital.concordia")
            .join("identities")
            .join(key_id.clone() + ".pem"),
    )
    .expect("failed to read private key");
    let private_key =
        RsaPrivateKey::from_pkcs1_pem(&private_key_string).expect("failed to parse private key");
    let padding = Pkcs1v15Sign::new::<Sha256>();
    // Hash the payload
    let mut hasher = Sha256::new();
    hasher.update(payload);
    let hash = hasher.finalize();
    // Sign the hash
    let signed = private_key
        .sign(padding.clone(), &hash)
        .expect("failed to sign payload");

    return BASE64_STANDARD.encode(&signed);
}

#[tauri::command]
async fn get_public_rsa_key(_window: tauri::Window, key_id: String) -> String {
    let data_dir = data_local_dir().expect("failed to get data local dir");
    let public_key_string = std::fs::read_to_string(
        data_dir
            .join("com.EE-Digital.concordia")
            .join("identities")
            .join(key_id.clone() + ".pub"),
    )
    .expect("failed to read public key");

    return public_key_string;
}

#[tauri::command]
async fn list_rsa_keys(_window: tauri::Window) -> Vec<String> {
    let data_dir = data_local_dir().expect("failed to get data local dir");
    let mut keys = Vec::new();
    for entry in std::fs::read_dir(data_dir.join("com.EE-Digital.concordia").join("identities"))
        .expect("failed to read directory")
    {
        let entry = entry.expect("failed to read entry");
        let path = entry.path();
        let file_name = path.file_name().expect("failed to get file name");
        let file_name = file_name
            .to_str()
            .expect("failed to convert file name to string");
        // remove extension
        let file_name = file_name.split(".").collect::<Vec<&str>>()[0];
        // remove duplicates
        if keys.contains(&file_name.to_string()) {
            continue;
        }
        keys.push(file_name.to_string());
    }
    return keys;
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_single_instance::init(
            |app, _args: Vec<String>, _cwd| {
                let _ = app
                    .get_webview_window("main")
                    .expect("no main window")
                    .set_focus();
            },
        ))
        .plugin(tauri_plugin_deep_link::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_autostart::init(
            tauri_plugin_autostart::MacosLauncher::LaunchAgent,
            Some(vec![]),
        ))
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            create_rsa_keys,
            delete_rsa_key,
            sign_with_rsa,
            get_public_rsa_key,
            list_rsa_keys,
        ])
        .setup(|app| {
            #[cfg(desktop)]
            app.deep_link().register_all()?;
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
