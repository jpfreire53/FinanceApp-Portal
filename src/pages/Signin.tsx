import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Toaster } from '@/components/ui/toaster'
import { Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import useLogin from '@/hooks/User/useLogin'
import placeyLogo from "@/assets/icons/logo-placey-horizontal-1.svg"
import { FormEvent, useState } from "react"

export default function Signin() {
  const { email, setEmail, password, setPassword, name, setName, handleCreateSubmit, loading } = useLogin();
  const [errors, setErrors] = useState({ name: false, email: false, password: false });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = {
      name: !name.trim(),
      email: !email.trim(),
      password: !password.trim()
    }

    setErrors(newErrors);

    if (!newErrors.name && !newErrors.email && !newErrors.password) {
      handleCreateSubmit(e);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 p-4"
    >
      <Toaster />
      <motion.div
        className="w-full max-w-md"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold flex items-center justify-center"><img className='w-1/2 h-1/2' src={placeyLogo} alt="logo" /></CardTitle>
            <CardDescription className="text-center">Crie sua conta para começar</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label className={`${errors.name && "text-red-500"}`} htmlFor="nome">Nome</Label>
                <>
                  <Input
                    id="nome"
                    placeholder="Seu nome"
                    value={name}
                    className={`border ${errors.name && "border-red-500"}`}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && <p className="text-red-500 text-sm">Este campo é obrigatório.</p>}
                </>
              </div>
              <div className="space-y-2">
                <Label className={`${errors.email && "text-red-500"}`} htmlFor="email-cadastro">E-mail</Label>
                <>
                  <Input
                    id="email-cadastro"
                    type="email"
                    placeholder="seu@email.com"
                    className={`border ${errors.email && "border-red-500"}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && <p className="text-red-500 text-sm">Este campo é obrigatório.</p>}
                </>
              </div>
              <div className="space-y-2">
                <Label className={`${errors.password && "text-red-500"}`} htmlFor="senha-cadastro">Senha</Label>
                <>
                  <Input
                    id="senha-cadastro"
                    type="password"
                    className={`border ${errors.password && "border-red-500"}`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && <p className="text-red-500 text-sm">Este campo é obrigatório.</p>}
                </>
              </div>
              <Button type="submit" className="w-full bg-primaryPurple hover:bg-indigo-600" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Cadastrando...
                  </>
                ) : (
                  'Cadastrar'
                )}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Já tem uma conta?{' '}
                <Link to="/" className="text-blue-600 hover:underline">
                  Faça login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}