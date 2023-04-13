import axios from "axios";

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "791c9a5e-8560-4dfd-93a4-4dcc5b90909e",
    },
});