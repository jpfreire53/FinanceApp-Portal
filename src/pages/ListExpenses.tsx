import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchIcon } from 'lucide-react'
import useExpensesList from '@/hooks/Expenses/useExpensesList'

export default function ListExpenses() {
  const [filtro, setFiltro] = useState('')
  const [categoria, setCategoria] = useState('')

  const { listCategories, listExpenses } = useExpensesList();

  const gastosFiltrados = listExpenses.filter(gasto => 
    gasto.description.toLowerCase().includes(filtro.toLowerCase()) && 
    (categoria === '' || categoria === 'Todas' || gasto.idCategory === Number(categoria))
  )

  console.log(gastosFiltrados)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Lista de Gastos</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Buscar por descrição"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="w-full"
          />
        </div>
        <Select value={categoria} onValueChange={setCategoria}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filtrar por categoria" />
          </SelectTrigger>
          <SelectContent>
            {listCategories.map((cat) => (
              <SelectItem key={cat.idCategory} value={cat.idCategory.toString()}>{cat.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button className="w-full md:w-auto">
          <SearchIcon className="mr-2 h-4 w-4" /> Buscar
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Descrição</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Data</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {gastosFiltrados.map((gasto) => (
            <TableRow key={gasto.idExpenses}>
              <TableCell>{gasto.description}</TableCell>
              <TableCell>R$ {Number(gasto.value).toFixed(2)}</TableCell>
              <TableCell>{listCategories.length > 0 && listCategories.filter(categoria => categoria.idCategory == gasto.idCategory)[0].name}</TableCell>
              <TableCell>{new Date(gasto.date).toLocaleDateString('pt-BR')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}