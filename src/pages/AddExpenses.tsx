import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusIcon } from "lucide-react";
import useExpensesCreate from "@/hooks/Expenses/useExpensesCreate";
import { Toaster } from "@/components/ui/toaster";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import DatePicker from "@/components/DatePicker";

export default function AddExpenses() {
  const {
    listCategories,
    description,
    setDescription,
    value,
    setValue,
    selectedCategory,
    setSelectedCategory,
    handleCreateExpense,
    handleDateChange,
    data,
    loading,
  } = useExpensesCreate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4"
    >
      <Toaster />
      <h1 className="text-2xl font-bold text-primaryPurple mb-6">Adicionar Gasto</h1>
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
        <Card className="border border-primaryPurple shadow-lg">
          <CardHeader>
            <CardTitle className="text-primaryOrange">Novo Gasto</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateExpense} className="space-y-4">
              <div>
                <Label htmlFor="descricao" className="text-primaryPurple">Descrição</Label>
                {loading ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <Input
                    id="descricao"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Ex: Compras no supermercado"
                    className="border-primaryPurple"
                  />
                )}
              </div>
              <div>
                <Label htmlFor="valor" className="text-primaryPurple">Valor (R$)</Label>
                {loading ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <Input
                    id="valor"
                    type="number"
                    step="0.01"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    placeholder="0,00"
                    className="border-primaryPurple"
                  />
                )}
              </div>
              <div>
                <Label htmlFor="categoria" className="text-primaryPurple">Categoria</Label>
                {loading ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="border-primaryPurple">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent className="border-primaryPurple">
                      {listCategories.length > 0 ? (
                        listCategories.map((cat) => (
                          <SelectItem key={cat.idCategory} value={cat.idCategory.toString()}>
                            {cat.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem disabled value="0">Sem categorias cadastradas</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                )}
              </div>
              <div>
                <Label className="text-primaryPurple">Data</Label>
                {loading ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <DatePicker onChange={handleDateChange} selectedDate={data} />
                )}
              </div>
              <Button type="submit" className="w-full bg-primaryPurple text-white hover:bg-primaryOrange">
                <PlusIcon className="mr-2 h-4 w-4" /> Adicionar Gasto
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
