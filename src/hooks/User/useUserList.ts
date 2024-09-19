import api from "@/config/api";
import { User } from "@/types/User";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function () {
    const [user, setUser] = useState<User>();
    const idUser = Cookies.get("idUser");

    useEffect(() => {
        const handleUser = async () => {
            await api.get(`/api/user/${idUser}`, {
                withCredentials: true
            }).then((response) => {
                if (response.status === 200) {
                    setUser(response.data.dados)
                }
            })
        }
        handleUser();
    }, [])

    return {
        user
    }
}