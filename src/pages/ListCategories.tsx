import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2Icon } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import useCategoryList from '@/hooks/Category/useCategoryList'
import { useNavigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'

export default function ListCategories() {
  const { categories, setCategories, loading } = useCategoryList()
  const navigate = useNavigate()

  const removerCategoria = (idCategory: number) => {
    // Função para remover a categoria da lista
    setCategories(categories.filter(categoria => categoria.idCategory !== idCategory))
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-6"
    >
      <Toaster />
      <h1 className="text-3xl font-semibold mb-8 text-center">Categorias Existentes</h1>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="max-w-lg mx-auto"
      >
        <ul className="space-y-4">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="shadow-sm">
                <CardContent className="flex items-center justify-between p-4">
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </CardContent>
              </Card>
            ))
          ) : categories.length > 0 ? (
            categories.map((categoria) => (
              <motion.li
                key={categoria.idCategory}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="bg-white p-4 rounded shadow flex items-center justify-between"
              >
                {categoria.name}
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removerCategoria(categoria.idCategory)}
                  className="hover:bg-red-600"
                >
                  <Trash2Icon />
                </Button>
              </motion.li>
            ))
          ) : (
            <p className="text-center text-gray-500">Nenhuma categoria cadastrada.</p>
          )}
        </ul>
      </motion.div>

      <div className="flex justify-center mt-6">
        <Button variant="link" className='text-primaryPurple hover:text-indigo-600 transition-all duration-300 ease-in-out' onClick={() => navigate('/features/category/create')}>Criar Nova Categoria</Button>
      </div>
    </motion.div>
  )
}
