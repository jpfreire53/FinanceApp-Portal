import { useToast } from "@/components/ui/use-toast";
import { FormEvent, useState } from "react";
import Cookies from "js-cookie";
import api from "@/config/api";
import Utils from "@/utils/Utils";

export default function () {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const { toast } = useToast();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        if (email == "" && password == "") {
            setLoading(false)
            toast({
                title: "Login Error!",
                description: "Inform the email and/or password",
                duration: 5000
            })
        } else if (password.length < 8) {
            setLoading(false)
            toast({
                title: "Login Error!",
                description: "the password must be greater than 8",
                duration: 5000
            })
        } else {
            const encryptDataLogin = Utils.encryptData({
                email: email,
                password: password
            })

            await api.post("/api/user/login", {
                data: encryptDataLogin
            }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                if (response.status === 200) {
                    toast({
                        title: "Sucesso ao realizar login!",
                        description: `${email} logado com sucesso!`,
                        duration: 5000
                      })
                      Cookies.set("token", response.data.token)
                      Cookies.set("idUser", response.data.user.idUser);
                      Cookies.set("email", response.data.user.email)
                      Cookies.set("name", response.data.user.name)
                      Cookies.set("firstTime", response.data.user.firstTime)
                      setTimeout(() => {
                        setLoading(false)
                        window.location.href = "/features/dashboard"
                      }, 3000)
                }
            }).catch((error) => {
                if (error.response.status === 404) {
                    setLoading(false)
                    console.log(error)
                    toast({
                        title: "Erro ao realizar login!",
                        description: `${error.response.data.mensagem}`,
                        duration: 5000
                    })
                }
                if (error.response.status === 401) {
                    setLoading(false)
                    console.log(error)
                    toast({
                        title: "Erro ao realizar login!",
                        description: `${error.response.data.mensagem}`,
                        duration: 5000
                    })
                }
            })

            
        } 
    }

    const handleCreateSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(Utils.verifyPassword(password)?.success)
        if (email === "" && password === "" && name === "") {
            toast({
                title: "Erro ao criar a conta!",
                description: "Informe o seu email, sua senha e seu nome",
                duration: 5000
            })
        } else if (!Utils.verifyPassword(password)!.success) {
            toast({
                title: "Erro ao criar a conta!",
                description: Utils.verifyPassword(password)!.message,
                duration: 5000
            })
        } else {
            try {
                let response = await api.post("/api/user/create", {
                    name: name,
                    email: email,
                    password: password
                }, {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
    
                if (response.status === 201) {
                    clearFields()
                    toast({
                        title: "Conta criada com sucesso!",
                    })
                    setTimeout(() => {
                        setLoading(false)
                        window.location.href = "/features/dashboard"
                    }, 3000)
                }
            } catch (error: any) {
                if (error.response.status === 409) {
                    setLoading(false)
                    toast({
                        title: "Erro ao criar a conta!",
                        description: `${error.response.data.mensagem}`,
                        duration: 5000
                    })
                }
                if (error.response.status === 500) {
                    setLoading(false)
                    console.log(error)
                    toast({
                        title: "Erro ao criar a conta!",
                        description: `${error.response.data.mensagem}`,
                        duration: 5000
                    })
                }
            }   
        } 
    }

    function clearFields() {
        setName("")
        setEmail("")
        setPassword("")
    }


    return {
        email,
        setEmail,
        password,
        setPassword,
        handleSubmit,
        handleCreateSubmit,
        name,
        setName,
        loading
    }
}