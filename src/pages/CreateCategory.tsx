import { FormEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusIcon } from 'lucide-react'
import useCategoryCreate from '@/hooks/Category/useCategoryCreate'
import { Toaster } from '@/components/ui/toaster'
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom'

export default function CreateCategory() {
  const { name, setName, handleCreateCategory, loading: loadingList } = useCategoryCreate();
  const navigate = useNavigate()

  const adicionarCategoria = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (name.trim()) {
      handleCreateCategory(e)
      setName('')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-6 space-y-6"
    >
      <Toaster />
      <h1 className="text-3xl font-semibold mb-8 text-center">Criar Nova Categoria</h1>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-lg mx-auto"
      >
        <Card className="shadow-lg border">
          <CardHeader>
            <CardTitle className="text-xl text-center">Adicionar Nova Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={adicionarCategoria} className="space-y-6">
              <div>
                <Label htmlFor="categoria">Nome da Categoria</Label>
                <Input
                  id="categoria"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Ex: Alimentação, Transporte, Lazer"
                  className="border-gray-300 focus:ring-primary focus:border-primary"
                />
              </div>
              <div className="flex justify-center">
                <Button type="submit" className="bg-primaryPurple text-white hover:bg-indigo-600 transition-all duration-300 ease-in-out">
                  <PlusIcon className="mr-2 h-4 w-4" /> Adicionar Categoria
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      <div className="flex justify-center mt-6">
        <Button variant="link" className='text-primaryPurple hover:text-indigo-600 transition-all duration-300 ease-in-out' onClick={() => navigate('/features/category')}>Ver Categorias Existentes</Button>
      </div>
    </motion.div>
  )
}
