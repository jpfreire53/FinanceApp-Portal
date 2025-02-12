import { toast } from '@/components/ui/use-toast';
import api from "@/config/api";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Expenses } from '@/types/Expenses';
import { Category } from '@/types/Category';

export default function () {
    const [listCategories, setListCategories] = useState<Array<Category>>([]);
    const [listExpenses, setListExpenses] = useState<Array<Expenses>>([]);
    const idUser = Cookies.get("idUser")
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        const handleCategories = async () => {
            try {
                setLoading(true)
                let response = await api.get(`/api/category/${idUser}`, {
                    withCredentials: true
                })

                if (response.status === 200) {
                    setLoading(false)
                    setListCategories(response.data.dados)
                }

            } catch (error: any) {
                if (error.response.status === 404) {
                    setLoading(false)
                    toast({
                        title: "Nenhuma categoria encontrada!",
                        description: error.response.data.mensagem,
                        duration: 5000
                    })
                }
                if (error.response.status === 500) {
                    setLoading(false)
                    toast({
                        title: "Erro ao buscar as categorias!",
                        description: error.response.data.mensagem,
                        duration: 5000
                    })
                }
            }
        }

        const handleRevenues = async () => {
            try {
                setLoading(true)
                let response = await api.get(`/api/expenses/${idUser}?page=${currentPage}&limit=${10}`, {
                    withCredentials: true
                })

                if (response.status === 200) {
                    setLoading(false)
                    setListExpenses(response.data.dados)
                    setTotalPages(response.data.paginacao.totalPage);
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
        
        handleCategories();
        handleRevenues();
    }, [currentPage])

    return {
        listCategories,
        listExpenses,
        loading,
        totalPages,
        setTotalPages,
        currentPage,
        setCurrentPage
    }
}