import { toast } from "@/components/ui/use-toast";
import api from "@/config/api";
import Cookies from "js-cookie";
import { FormEvent, useState } from "react";

export default function () {
    const [description, setDescription] = useState<string>("");
    const [value, setValue] = useState<number>();
    const [date, setDate] = useState<Date>(new Date())
    const idUser = Cookies.get("idUser")
    const [loading, setLoading] = useState<boolean>(false);
    
    const handleCreateExpense = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true)
            await api.post("/api/expenses/create", {
                description: description,
                value: value,
                date: date,
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
                        title: "Receita registrada com sucessoo!",
                        description: "Sucesso ao registrar esta receita!",
                        duration: 5000
                    })
                }
            }).catch((error) => {
                if (error.response.status === 400) {
                    setLoading(false)
                    console.log(error)
                    toast({
                        title: "Erro ao adicionar a receita!",
                        description: `${error.response.data.mensagem}`,
                        duration: 5000
                    })
                }
                if (error.response.status === 500) {
                    setLoading(false)
                    toast({
                        title: "Erro ao adicionar a receita!",
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
        setDate(new Date()); 
    }

    const validate = () => {
        if (description === "") {
            toast({
                title: "Erro de campo em branco!",
                description: "Informe a descrição!",
                duration: 5000
            })
            return false;
        }
        if (value === 0) {
            toast({
                title: "Erro de campo em branco!",
                description: "Informe o valor da receita!",
                duration: 5000
            })
            return false;
        }
        if (isNaN(date.getTime())) {
            toast({
                title: "Erro de campo em branco!",
                description: "Informe a data!",
                duration: 5000
            })
            return false;
        }

        return true;
    }

    const handleDateChange = (day: Date | undefined) => {
        if (day) {
          setDate(day);
        } else {
          setDate(new Date());
        }
      };

    return {
        description,
        setDescription,
        value,
        setValue,
        handleCreateExpense,
        handleDateChange,
        date,
        loading
    }
}