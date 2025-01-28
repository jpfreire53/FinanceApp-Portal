import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from 'framer-motion'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { SearchIcon } from 'lucide-react'
import useExpensesList from '@/hooks/Expenses/useExpensesList'

export default function ListExpenses() {
  const [filtro, setFiltro] = useState('')
  const [categoria, setCategoria] = useState('')

  const { listCategories, listExpenses, loading } = useExpensesList();

  const gastosFiltrados = listExpenses.filter(gasto => 
    gasto.description.toLowerCase().includes(filtro.toLowerCase()) && 
    (categoria === '' || categoria === 'Todas' || gasto.idCategory === Number(categoria))
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4"
    >
      <h1 className="text-2xl font-bold mb-6">Lista de Gastos</h1>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col md:flex-row gap-4 mb-6"
      >
        <div className="flex-1">
          <Input
            placeholder="Buscar por descrição"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="w-full bg-white border-primaryPurple"
          />
        </div>
        <Select value={categoria} onValueChange={setCategoria}>
          <SelectTrigger className="w-full md:w-[200px] bg-white border-primaryPurple">
            <SelectValue placeholder="Filtrar por categoria" />
          </SelectTrigger>
          <SelectContent className='bg-white'>
            <SelectItem value="Todas">Todas</SelectItem>
            {listCategories.map((cat) => (
              <SelectItem key={cat.idCategory} value={cat.idCategory.toString()}>{cat.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-white shadow-lg border border-primaryPurple">
          <CardHeader className="flex items-center justify-between">
            <h2 className="text-primaryPurple font-bold">Gastos Filtrados</h2>
            <SearchIcon className="text-primaryPurple" />
          </CardHeader>
          <CardContent>
            <table className="min-w-full table-auto text-left text-sm">
              <thead>
                <tr className="bg-primaryOrange text-white">
                  <th className="px-4 py-2">Descrição</th>
                  <th className="px-4 py-2">Categoria</th>
                  <th className="px-4 py-2">Valor</th>
                  <th className="px-4 py-2">Data</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index}>
                      <td><Skeleton className="h-4 w-[200px]" /></td>
                      <td><Skeleton className="h-4 w-[100px]" /></td>
                      <td><Skeleton className="h-4 w-[100px]" /></td>
                      <td><Skeleton className="h-4 w-[100px]" /></td>
                    </tr>
                  ))
                ) : gastosFiltrados.map((gasto) => (
                  <tr key={gasto.idExpenses} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">{gasto.description}</td>
                    <td className="border px-4 py-2">{listCategories.length > 0 && listCategories.filter(categoria => categoria.idCategory == gasto.idCategory)[0].name}</td>
                    <td className="border px-4 py-2 text-primaryOrange">R$ {Number(gasto.value).toFixed(2)}</td>
                    <td className="border px-4 py-2">{new Date(gasto.date).toLocaleDateString('pt-BR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
          <CardFooter className="text-primaryPurple">
            {gastosFiltrados.length > 0 ? `${gastosFiltrados.length} registros encontrados` : 'Nenhum gasto encontrado'}
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  )
}
