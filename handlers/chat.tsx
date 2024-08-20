import { Message } from "../components/ChatWindow";
import { User } from "./storage";

const ChatCache = new Map();

const getMessages = async (channelId: number) => {
  const cached = await ChatCache.get(channelId);

  if (cached) return cached;

  try {
    const response = await fetch(
      `https://api.staryhub.net/channels/${channelId}/messages`
    );

    let json = (await response.json()) as Message[];

    ChatCache.set(channelId, json);

    if (json.length > 0) return json.reverse();
    else return [];
  } catch (error) {
    console.error(`[CHAT ERROR] ${error}`);
  } finally {
    setTimeout(() => {
      clearCache(channelId);
    }, 1000 * 10);
  }
};
const clearCache = (id?: number) => {
  if (id || id != 0) ChatCache.delete(id);
  else ChatCache.clear();
};

export { ChatCache, getMessages, clearCache, sendMessage };

const sendMessage = async (
  setText: Function,
  text: string,
  activeChannel: number
) => {
  const user = await User.getUserObject();
  console.log(user);

  try {
    setText("");

    const res = await fetch(
      `https://api.staryhub.net/channels/${activeChannel}/messages`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          user: {
            id: user.id,
            username: user.username,
          },
        }),
      }
    );
    const json = await res.json();
    console.log(json);
  } catch (error) {
    console.error(`[CHAT WINDOW ERROR] ${error}`);
  }
};