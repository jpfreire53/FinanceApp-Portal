import React from 'react'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Toaster } from '@/components/ui/toaster'
import { Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import useLogin from '@/hooks/User/useLogin'

export default function Login() {
  const { email, setEmail, password, setPassword, handleSubmit, loading } = useLogin();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primaryPurple to-indigo-500 p-4"
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
            <CardTitle className="text-2xl font-bold text-center">FinanceApp</CardTitle>
            <CardDescription className="text-center">Entre para gerenciar suas finanças</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-login">E-mail</Label>
                <Input
                  id="email-login"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="senha-login">Senha</Label>
                <Input
                  id="senha-login"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-primaryPurple hover:bg-indigo-600" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Não tem uma conta?{' '}
                <Link to="/signin" className="text-blue-600 hover:underline">
                  Cadastre-se
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}