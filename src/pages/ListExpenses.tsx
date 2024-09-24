import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchIcon } from 'lucide-react'
import useExpensesList from '@/hooks/Expenses/useExpensesList'
import { motion } from 'framer-motion'
import { Skeleton } from '@/components/ui/skeleton'

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
            className="w-full bg-white"
          />
        </div>
        <Select value={categoria} onValueChange={setCategoria}>
          <SelectTrigger className="w-full md:w-[200px] bg-white">
            <SelectValue placeholder="Filtrar por categoria" />
          </SelectTrigger>
          <SelectContent className='bg-white'>
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
        <Table className='bg-white'>
          <TableHeader>
            <TableRow>
              <TableHead>Descrição</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                </TableRow>
              ))
            ) : gastosFiltrados.map((gasto) => (
              <TableRow key={gasto.idExpenses}>
                <TableCell>{gasto.description}</TableCell>
                <TableCell>{listCategories.length > 0 && listCategories.filter(categoria => categoria.idCategory == gasto.idCategory)[0].name}</TableCell>
                <TableCell>R$ {Number(gasto.value).toFixed(2)}</TableCell>
                <TableCell>{new Date(gasto.date).toLocaleDateString('pt-BR')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </motion.div>
  )
}