use tauri::Emitter;
use tauri::Manager;

// In your Tauri command (Rust backend):
#[tauri::command]
async fn request_camera_permission(window: tauri::Window) -> Result<(), String> {
    //  Tauri doesn't directly handle permissions.  This command is primarily to
    //  signal to the frontend to request permissions.  The actual permission
    //  request happens in the JavaScript.

    // You might store a permission status somewhere (e.g., in your app state)
    // after the user grants it on the frontend.  This would let you check
    // if permission was already granted previously.  Example (using a simple
    // boolean - you'd likely want something more robust):

    // let has_permission = get_permission_status(&window); // Your function

    // if !has_permission {
    window
        .emit("request_camera_permission", ())
        .map_err(|e| e.to_string())?;
    // }

    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
            let _ = app.get_webview_window("main")
                       .expect("no main window")
                       .set_focus();
        }))
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_autostart::init(
            tauri_plugin_autostart::MacosLauncher::LaunchAgent,
            Some(vec![]),
        ))
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![request_camera_permission])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
