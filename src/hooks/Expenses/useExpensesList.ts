import api from "@/config/api";
import { Category } from "@/types/Category";
import { Expenses } from "@/types/Expenses";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function () {
    const [listCategories, setListCategories] = useState<Array<Category>>([]);
    const [listExpenses, setListExpenses] = useState<Array<Expenses>>([]);
    const idUser = Cookies.get("idUser")

    useEffect(() => {
        const handleCategories = async () => {
            try {
                let response = await api.get(`/api/category/${idUser}`, {
                    withCredentials: true
                })

                if (response.status === 200) {
                    setListCategories(response.data.dados)
                }

            } catch (error) {
                console.log(error);
            }
        }
        const handleExpenses = async () => {
            try {
                let response = await api.get(`/api/expenses/user/${idUser}`, {
                    withCredentials: true
                })

                if (response.status === 200) {
                    setListExpenses(response.data.dados)
                }

            } catch (error) {
                console.log(error);
            }
        }
        handleExpenses();
        handleCategories();
    }, [])

    return {
        listCategories,
        listExpenses
    }
}