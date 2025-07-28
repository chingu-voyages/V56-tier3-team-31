import { io } from "socket.io-client";

const url = process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "");
export const socket = io(url);
