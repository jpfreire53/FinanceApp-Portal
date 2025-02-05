import api from "@/config/api";
import { User } from "@/types/User";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";

export default function () {
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState<boolean>(true);
    const idUser = Cookies.get("idUser");

    useEffect(() => {
        const handleUser = async () => {
            setLoading(true);
            await api.get(`/api/user/${idUser}`, {
                withCredentials: true
            }).then((response) => {
                if (response.status === 200) {
                    setLoading(false)
                    setUser(response.data.dados)
                }
            }).catch((error) => {
                if (error.response.status === 404) {
                    setLoading(false)
                    toast({
                        title: "Nenhum usuário encontrado!",
                        description: error.response.data.mensagem,
                        duration: 5000
                    })
                }
                if (error.response.status === 500) {
                    setLoading(false)
                    toast({
                        title: "Erro ao buscar",
                        description: error.response.data.mensagem,
                        duration: 5000
                    })
                }
            })
        }
        handleUser();
    }, [])

    return {
        user,
        loading
    }
}