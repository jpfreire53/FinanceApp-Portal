import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CameraIcon } from 'lucide-react'
import useUserList from '@/hooks/User/useUserList'
import useUserEdit from '@/hooks/User/useUserEdit'

export default function UserProfile() {
  const { user } = useUserList();
  const { name, setName, email, setEmail, handleEdit } = useUserEdit();

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
    }
  }, [user])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Perfil do Usuário</h1>
      <Card>
        <CardHeader>
          <CardTitle>Suas Informações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center mb-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src="/placeholder-avatar.jpg" alt="Foto de perfil" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm" className="mt-2">
              <CameraIcon className="mr-2 h-4 w-4" /> Alterar Foto
            </Button>
          </div>
          <form onSubmit={handleEdit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">Atualizar Perfil</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}