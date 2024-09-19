import { FormEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusIcon } from 'lucide-react'
import useCategoryCreate from '@/hooks/Category/useCategoryCreate'
import { Toaster } from '@/components/ui/toaster'
import useCategoryList from '@/hooks/Category/useCategoryList'

export default function CreateCategory() {
  const { name, setName, handleCreateCategory } = useCategoryCreate();
  const { categories, setCategories } = useCategoryList();

  const adicionarCategoria = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (name.trim()) {
      await handleCreateCategory(e);
      setCategories([...categories, { name: name, createdAt: "", updatedAt: "", idCategory: 0, idUser: 0 }])
      setName('')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <h1 className="text-2xl font-bold mb-6">Criar Categoria de Gastos</h1>
      <Card>
        <CardHeader>
          <CardTitle>Nova Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={adicionarCategoria} className="space-y-4">
            <div>
              <Label htmlFor="categoria">Nome da Categoria</Label>
              <Input
                id="categoria"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Alimentação, Transporte, Lazer"
              />
            </div>
            <Button type="submit">
              <PlusIcon className="mr-2 h-4 w-4" /> Adicionar Categoria
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Categorias Existentes</h2>
        <ul className="space-y-2">
          {categories.map((categoria, index) => (
            <li key={index} className="bg-white p-3 rounded shadow">{categoria.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}