import api from "@/config/api";
import { Category } from "@/types/Category";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";

export default function () {
    const [categories, setCategories] = useState<Array<Category>>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleList = async () => {
        let idUser = Cookies.get("idUser");
        setLoading(true)
        await api.get(`/api/category/${idUser}`, {
            withCredentials: true
        }).then((response) => {
            if (response.status === 200) {
                setLoading(false)
                setCategories(response.data.dados)
            }
        }).catch((error) => {
            if (error.response.status === 400) {
                setLoading(false)
                toast({
                    title: "Login Error!",
                    description: `${error.response.data.mensagem}`,
                })
            }
            if (error.response.status === 404) {
                setLoading(false)
                toast({
                    title: "Login Error!",
                    description: `${error.response.data.mensagem}`,
                })
            }
        })

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