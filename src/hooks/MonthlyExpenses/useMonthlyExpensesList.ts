import api from "@/config/api";
import { MonthlyExpenses } from "@/types/MonthlyExpenses";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";

export default function () {
    const [data, setData] = useState<Array<MonthlyExpenses>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const idUser = Cookies.get("idUser");

    const handleMonthlyExpensesList = async () => {
        setLoading(true)
        await api.get(`/gastos/mensais/${idUser}`, {
            withCredentials: true
        }).then(response => {
            if (response.status === 200) {
                setLoading(false)
                setData(response.data.dados)
            }
        }).catch((error) => {
            if (error.response.status === 404) {
                setLoading(false)
                toast({
                    title: "Nenhuma resumo encontrado!",
                    description: error.response.data.mensagem,
                    duration: 5000
                })
            }
            if (error.response.status === 500) {
                setLoading(false)
                toast({
                    title: "Erro ao buscar o resumo!",
                    description: error.response.data.mensagem,
                    duration: 5000
                })
            }
        })
    }

    useEffect(() => {
        handleMonthlyExpensesList();
    }, [])

    return {
        data,
        loading
    }
}