import { toast } from '@/components/ui/use-toast';
import { Revenues } from './../../types/Revenues';
import api from "@/config/api";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function () {
    const [listRevenues, setListRevenues] = useState<Array<Revenues>>([]);
    const idUser = Cookies.get("idUser")
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        const handleRevenues = async () => {
            try {
                setLoading(true)
                let response = await api.get(`/api/revenues/user/${idUser}?page=${currentPage}&limit=${10}`, {
                    withCredentials: true
                })

                if (response.status === 200) {
                    setLoading(false)
                    setListRevenues(response.data.dados)
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
        handleRevenues();
    }, [currentPage])

    return {
        listRevenues,
        loading,
        totalPages,
        setTotalPages,
        currentPage,
        setCurrentPage
    }
}