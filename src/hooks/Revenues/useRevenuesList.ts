import { toast } from '@/components/ui/use-toast';
import { Revenues } from './../../types/Revenues';
import api from "@/config/api";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function () {
    const getCurrentMonth = (): string => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        return `${currentMonth}`;
      };
    
      const getCurrentYear = (): string => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        return `${currentYear}`;
      };

    const [listRevenues, setListRevenues] = useState<Array<Revenues>>([]);
    const idUser = Cookies.get("idUser")
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const handleRevenues = async () => {
            try {
                setLoading(true)
                let response = await api.get(`/api/revenues/user/${idUser}/${getCurrentYear()}/${getCurrentMonth()}`, {
                    withCredentials: true
                })

                if (response.status === 200) {
                    setLoading(false)
                    setListRevenues(response.data.dados)
                }

            } catch (error: any) {
                if (error.response.status === 404) {
                    setLoading(false)
                    toast({
                        title: "Nenhuma receita encontrada!",
                        description: error.response.data.mensagem,
                        duration: 5000
                    })
                }
                if (error.response.status === 400) {
                    setLoading(false)
                    toast({
                        title: "Erro ao buscar pelas receitas!",
                        description: error.response.data.mensagem,
                        duration: 5000
                    })
                }
                if (error.response.status === 500) {
                    setLoading(false)
                    toast({
                        title: "Erro ao buscar pelas receitas!",
                        description: error.response.data.mensagem,
                        duration: 5000
                    })
                }
            }
        }
        handleRevenues();
    }, [])

    return {
        listRevenues,
        loading
    }
}