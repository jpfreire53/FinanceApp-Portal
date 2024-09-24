import api from "@/config/api";
import { Category } from "@/types/Category";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function () {
    const [categories, setCategories] = useState<Array<Category>>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleList = async () => {
        let idUser = Cookies.get("idUser");
        setLoading(true)
        let response = await api.get(`/api/category/${idUser}`, {
            withCredentials: true
        })

        if (response.status === 200) {
            setLoading(false)
            setCategories(response.data.dados)
        }
    }

    useEffect(() => {
        handleList();
    }, [])

    
    return {
        categories,
        setCategories,
        loading
    }
}