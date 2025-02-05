import api from "@/config/api"
import Cookies from "js-cookie"
import { FormEvent, useState } from "react";

export default function () {
    const idUser = Cookies.get("idUser");

    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")

    const handleEdit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await api.put(`/api/user/edit/${idUser}`, {
            name: name,
            email: email
        } , {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.status === 200) {
                window.location.reload();
            }
        })
    }

    return {
        name,
        setName,
        email,
        setEmail,
        handleEdit
    }
}