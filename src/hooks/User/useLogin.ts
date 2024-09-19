import { useToast } from "@/components/ui/use-toast";
import { FormEvent, useState } from "react";
import Cookies from "js-cookie";
import api from "@/config/api";

export default function () {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [name, setName] = useState<string>("")
    const { toast } = useToast();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email == "" && password == "") {
            toast({
                title: "Login Error!",
                description: "Inform the email and/or password",
              })
        } else if (password.length < 8) {
            toast({
                title: "Login Error!",
                description: "the password must be greater than 8",
              })
        } else {
            await api.post("/api/user/login", {
                email: email,
                password: password
            }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                if (response.status === 200) {
                    toast({
                        title: "Login Success!",
                        description: `${email} logged successfully!`,
                      })
                      Cookies.set("token", response.data.token)
                      Cookies.set("idUser", response.data.user.idUser);
                      Cookies.set("email", response.data.user.email)
                      setTimeout(() => {
                          window.location.href = "/features/dashboard"
                      }, 3000)
                }
            }).catch((error) => {
                if (error.response.status === 404) {
                    console.log(error)
                    toast({
                        title: "Login Error!",
                        description: `${error.response.data.mensagem}`,
                      })
                }
            })

            
        } 
    }

    const handleCreateSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email === "" && password === "" && name === "") {
            toast({
                title: "Login Error!",
                description: "Inform the email, password and name",
              })
        } else if (password.length < 8) {
            toast({
                title: "Login Error!",
                description: "the password must be greater than 8",
              })
        } else {
            let response = await api.post("/api/user/create", {
                name: name,
                email: email,
                password: password,
                salary: 0
            }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (response.status === 201) {
                toast({
                    title: "User Created!",
                })
            }
        } 
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
    }
}