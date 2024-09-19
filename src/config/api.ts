import axios from "axios";
import { Links } from "./links";

const api = axios.create({
    baseURL: Links.LOCAL_URL
})

export default api;