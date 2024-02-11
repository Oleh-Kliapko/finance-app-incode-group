import { io, Socket } from "socket.io-client";
import axios from "axios";

const BACKEND_URL = "http://localhost:4000";
export const socket: Socket = io(BACKEND_URL);
axios.defaults.baseURL = BACKEND_URL;
