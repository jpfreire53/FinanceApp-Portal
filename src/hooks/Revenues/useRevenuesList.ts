import { Revenues } from './../../types/Revenues';
import api from "@/config/api";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function () {
    const [listRevenues, setListRevenues] = useState<Array<Revenues>>([]);
    const idUser = Cookies.get("idUser")
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const handleRevenues = async () => {
            try {
                setLoading(true)
                let response = await api.get(`/api/revenues/user/${idUser}`, {
                    withCredentials: true
                })

                if (response.status === 200) {
                    setLoading(false)
                    setListRevenues(response.data.dados)
                }

            } catch (error: any) {
                if (error.response.status === 404) {
                    setLoading(false)
                }
                if (error.response.status === 400) {
                    setLoading(false)
                }
                if (error.response.status === 500) {
                    setLoading(false)
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