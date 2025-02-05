import { toast } from "@/components/ui/use-toast";
import api from "@/config/api";
import { Category } from "@/types/Category";
import Cookies from "js-cookie";
import { FormEvent, useEffect, useState } from "react";

export default function () {
    const [description, setDescription] = useState<string>("");
    const [value, setValue] = useState<number>();
    const [selectedCategory, setSelectedCategory] = useState<string>();
    const [listCategories, setListCategories] = useState<Array<Category>>([]);
    const [data, setData] = useState<Date>(new Date())
    const idUser = Cookies.get("idUser")
    const [loading, setLoading] = useState<boolean>(false);
    
    useEffect(() => {
        const handleCategories = async () => {
            try {
                let response = await api.get(`/api/category/${idUser}`, {
                    withCredentials: true
                })

                if (response.status === 200) {
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
        handleCategories();
    }, [])

    const handleCreateExpense = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true)
            await api.post("/api/expenses/create", {
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
            }).then((response) => {
                if (response.status === 201) {
                    setLoading(false)
                    clearFields()
                    toast({
                        title: "Gasto registrado",
                        description: "Sucesso ao registrar este gasto!",
                        duration: 5000
                    })
                }
            }).catch((error) => {
                if (error.response.status === 400) {
                    setLoading(false)
                    console.log(error)
                    toast({
                        title: "Erro ao adicionar um gasto!",
                        description: `${error.response.data.mensagem}`,
                        duration: 5000
                    })
                }
                if (error.response.status === 500) {
                    setLoading(false)
                    toast({
                        title: "Erro ao adicionar um gasto!",
                        description: error.response.data.mensagem,
                        duration: 5000
                    })
                }
            })

            

        }
    }

    const clearFields = () => {
        setDescription(""); 
        setValue(undefined); 
        setSelectedCategory(""); 
        setData(new Date()); 
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

    const handleDateChange = (day: Date | null) => {
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
        setData,
        loading
    }
}