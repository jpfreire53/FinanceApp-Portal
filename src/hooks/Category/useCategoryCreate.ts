import Cookies from "js-cookie";
import { FormEvent, useState } from "react";
import { toast } from "../use-toast";
import api from "@/config/api";

export default function () {
    const [name, setName] = useState<string>("");

    const handleCreateCategory = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let idUser = Cookies.get("idUser");

        if (name === "") {
            toast({
                title: "Create Error!",
                description: "Inform the name of category",
              })
        } else {
            let response = await api.post("/api/category/create", {
                name: name,
                idUser: idUser
            }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            
            if (response.status === 200) {
                toast({
                    title: "Create Success!",
                })
            }
        }
    }

    return {
        name,
        setName,
        handleCreateCategory
    }
}