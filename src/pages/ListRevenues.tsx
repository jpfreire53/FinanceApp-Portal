import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { motion } from 'framer-motion'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { SearchIcon } from 'lucide-react'
import { Toaster } from '@/components/ui/toaster'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import useRevenuesPaginationList from '@/hooks/Revenues/useRevenuesPaginationList'

export default function ListRevenues() {
  const [filtro, setFiltro] = useState('')

  const { listRevenues, loading, setCurrentPage, totalPages } = useRevenuesPaginationList();

  const receitasFiltradas = listRevenues.filter(revenue => revenue.description.toLowerCase().includes(filtro.toLowerCase()))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4"
    >
      <Toaster />
      <h1 className="text-2xl font-bold mb-6">Lista de Receitas</h1>
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
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-white shadow-xl border border-primaryPurple">
          <CardHeader className="flex items-center justify-between">
            <h2 className="text-primaryPurple font-bold">Receitas Filtradas</h2>
            <SearchIcon className="text-primaryPurple" />
          </CardHeader>
          <CardContent>
            <table className="min-w-full table-auto text-left text-sm">
              <thead>
                <tr className="bg-primaryOrange text-white">
                  <th className="px-4 py-2">Descrição</th>
                  <th className="px-4 py-2">Valor</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index}>
                      <td><Skeleton className="h-4 w-[200px]" /></td>
                      <td><Skeleton className="h-4 w-[100px]" /></td>
                    </tr>
                  ))
                ) : receitasFiltradas.map((receita) => (
                  <tr key={receita.idRevenue} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">{receita.description}</td>
                    <td className="border px-4 py-2 text-primaryOrange">R$ {Number(receita.value).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
          <CardFooter className="text-primaryPurple">
            {receitasFiltradas.length > 0 ? `${receitasFiltradas.length} registros encontrados` : 'Nenhum gasto encontrado'}
          </CardFooter>
        </Card>
          <Pagination className="bg-white rounded-lg shadow-lg border border-primaryPurple mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} />
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink onClick={() => setCurrentPage(index + 1)}>{index + 1}</PaginationLink>
                </PaginationItem>
              ))}

              {totalPages > 5 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
              <PaginationItem>
                <PaginationNext onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} />
              </PaginationItem>
            </PaginationContent>
        </Pagination>
      </motion.div>
    </motion.div>
  )
}
