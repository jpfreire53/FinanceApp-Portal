import { FormEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusIcon, Trash2Icon } from 'lucide-react'
import useCategoryCreate from '@/hooks/Category/useCategoryCreate'
import { Toaster } from '@/components/ui/toaster'
import useCategoryList from '@/hooks/Category/useCategoryList'
import { motion } from "framer-motion";
import { Skeleton } from '@/components/ui/skeleton'

export default function CreateCategory() {
  const { name, setName, handleCreateCategory, loading: loadingList } = useCategoryCreate();
  const { categories, setCategories, loading } = useCategoryList();

  const adicionarCategoria = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (name.trim()) {
      handleCreateCategory(e);
      setCategories([...categories, { name: name, createdAt: "", updatedAt: "", idCategory: 0, idUser: 0 }])
      setName('')
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4"
    >
      <Toaster />
      <h1 className="text-2xl font-bold mb-6">Criar Categoria de Gastos</h1>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
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
                  required
                  placeholder="Ex: Alimentação, Transporte, Lazer"
                />
              </div>
              <Button type="submit">
                <PlusIcon className="mr-2 h-4 w-4" /> Adicionar Categoria
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8"
      >
        <h2 className="text-xl font-semibold mb-4">Categorias Existentes</h2>
        <ul className="space-y-2">
          {loading || loadingList ? (
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index}>
                <CardContent className="flex items-center justify-between p-4">
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </CardContent>
              </Card>
            ))
          ) : categories.map((categoria) => (
            <motion.li 
              key={categoria.idCategory}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }} 
              className="bg-white p-3 rounded shadow flex items-center justify-between"
            >
              {categoria.name}
              <Button variant="destructive" size="icon"><Trash2Icon></Trash2Icon></Button>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}