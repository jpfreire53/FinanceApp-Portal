import Cookies from "js-cookie";
import { FormEvent, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import api from "@/config/api";
import Utils from "@/utils/Utils";

export default function () {
    const [name, setName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleCreateCategory = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let idUser = Cookies.get("idUser");

        if (name === "") {
            setLoading(false);
            toast({
                title: "Erro ao criar a categoria!",
                description: "Informe o nome da categoria",
                duration: 5000
              })
        } else {
            setLoading(true)
            const cryptedData = Utils.encryptData({
                name: name,
                idUser: idUser
            });

            await api.post("/api/category/create", {
                data: cryptedData,
            }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => {
                if (response.status === 201) {
                    setLoading(false)
                    toast({
                        title: "Categoria criada com sucesso!",
                        duration: 5000
                    })
                }
            }).catch((error) => {
                console.log(error.response.data.mensagem, loading)
                if (error.response.status === 400) {
                    setLoading(false)
                    toast({
                        title: "Erro ao criar a categoria!",
                        description: `${error.response.data.mensagem}`,
                        duration: 5000
                    })
                }
                if (error.response.status === 409) {
                    setLoading(false)
                    toast({
                        title: "Erro ao criar a categoria!",
                        description: `${error.response.data.mensagem}`,
                        duration: 5000
                    })
                }
                if (error.response.status === 500) {
                    setLoading(false)
                    toast({
                        title: "Erro ao criar a categoria!",
                        description: `${error.response.data.mensagem}`,
                        duration: 5000
                    })
                }
            })
            
            
        }
    }

    return {
        name,
        setName,
        handleCreateCategory,
        loading
    }
}