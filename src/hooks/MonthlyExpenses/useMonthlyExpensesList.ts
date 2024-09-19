import api from "@/config/api";
import { MonthlyExpenses } from "@/types/MonthlyExpenses";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function () {
    const [data, setData] = useState<Array<MonthlyExpenses>>([]);
    const idUser = Cookies.get("idUser");

    const handleMonthlyExpensesList = async () => {
        await api.get(`/gastos/mensais/${idUser}`, {
            withCredentials: true
        }).then(response => {
            if (response.status === 200) {
                setData(response.data.dados)
            }
        })
    }

    useEffect(() => {
        handleMonthlyExpensesList();
    }, [])

    return {
        data
    }
}