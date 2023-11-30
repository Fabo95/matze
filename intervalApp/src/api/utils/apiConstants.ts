import * as process from "process";

export const apiBaseUrl =
    process.env.NODE_ENV === "development" ? "https://api.wolkenassistent.de/" : "https://api.wolkenassistent.de/";

export const authBaseUrl =
    process.env.NODE_ENV === "development" ? "https://auth.wolkenassistent.de/" : "https://auth.wolkenassistent.de/";

export const webSocketBaseUrl =
    process.env.NODE_ENV === "development" ? "ws://localhost:8081" : "ws://chat.wolkenassistent.de/";
