import api from "@/config/api";
import { Category } from "@/types/Category";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { toast } from "../use-toast";

export default function () {
    const [description, setDescription] = useState<string>("");
    const [value, setValue] = useState<number>();
    const [selectedCategory, setSelectedCategory] = useState<string>();
    const [listCategories, setListCategories] = useState<Array<Category>>([]);
    const [data, setData] = useState<Date>(new Date())
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
        handleCategories();
    }, [])

    const handleCreateExpense = async () => {
        if (validate()) {
            let response = await api.post("/api/expenses/create", {
                description: description,
                value: value,
                date: data,
                idCategory: Number(selectedCategory),
                idUser: Number(idUser)
            }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (response.status === 200) {
                toast({
                    title: "Gasto registrado",
                    description: "Sucesso ao registrar este gasto!",
                })
            }

        }
    }

    const validate = () => {
        if (description === "") {
            toast({
                title: "Erro de campo em branco",
                description: "Informe a descrição",
            })
            return false;
        }
        if (value === 0) {
            toast({
                title: "Erro de campo em branco",
                description: "Informe o valor gasto",
            })
            return false;
        }
        if (Number(selectedCategory) === 0) {
            toast({
                title: "Erro de campo em branco",
                description: "Informe a categoria",
            })
            return false;
        }

        return true;
    }

    const handleDateChange = (day: Date | undefined) => {
        if (day) {
          setData(day); // Passa a data apenas se for válida
        } else {
          setData(new Date()); // Define um valor padrão ou trata o caso de `undefined`
        }
      };

    return {
        listCategories,
        description,
        setDescription,
        value,
        setValue,
        selectedCategory,
        setSelectedCategory,
        handleCreateExpense,
        handleDateChange,
        data,
        setData
    }
}