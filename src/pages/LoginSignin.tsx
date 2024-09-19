import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useLogin from '@/hooks/User/useLogin'
import { Toaster } from '@/components/ui/toaster'

export default function LoginSignin() {
  const { email, setEmail, password, setPassword, handleSubmit, name, setName, handleCreateSubmit } = useLogin();

  return (
    <div className="container mx-auto p-4 flex items-center justify-center min-h-screen">
      <Toaster />
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Bem-vindo ao FinanceApp</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="cadastro">Cadastro</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
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
                <Button type="submit" className="w-full">Entrar</Button>
              </form>
            </TabsContent>
            <TabsContent value="cadastro">
              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome</Label>
                  <Input
                    id="nome"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-cadastro">E-mail</Label>
                  <Input
                    id="email-cadastro"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="senha-cadastro">Senha</Label>
                  <Input
                    id="senha-cadastro"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Cadastrar</Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}