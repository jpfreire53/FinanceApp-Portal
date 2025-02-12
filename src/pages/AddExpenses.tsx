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
import { FormEvent, useState } from "react";

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

  const [errors, setErrors] = useState({ description: false, value: false, date: false, selectedCategory: false });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const newErrors = {
        description: !description.trim(),
        value: !value,
        date: !data,
        selectedCategory: !selectedCategory
      };
      setErrors(newErrors);
  
      if (!newErrors.description && !newErrors.value && !newErrors.date) {
        handleCreateExpense(e);
      }
    };

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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="descricao" className={errors.description ? "text-red-500" : "text-primaryPurple"}>Descrição</Label>
                {loading ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <>
                    <Input
                      id="descricao"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Ex: Compras no supermercado"
                      className={`border ${errors.description ? "border-red-500" : "border-primaryPurple"}`}
                    />
                    {errors.description && <p className="text-red-500 text-sm">Este campo é obrigatório.</p>}
                  </>
                )}
              </div>
              <div>
                <Label htmlFor="valor" className={errors.value ? "text-red-500" : "text-primaryPurple"}>Valor (R$)</Label>
                {loading ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <>
                    <Input
                      id="valor"
                      type="number"
                      step="0.01"
                      value={value}
                      onChange={(e) => setValue(Number(e.target.value))}
                      placeholder="0,00"
                      className={`border ${errors.value ? "border-red-500" : "border-primaryPurple"}`}
                    />
                    {errors.value && <p className="text-red-500 text-sm">Este campo é obrigatório.</p>}
                  </>
                )}
              </div>
              <div>
                <Label htmlFor="categoria" className={errors.selectedCategory ? "text-red-500" : "text-primaryPurple"}>Categoria</Label>
                {loading ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className={`border ${errors.selectedCategory ? "border-red-500" : "border-primaryPurple"}`}>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent className={`border ${errors.selectedCategory ? "border-red-500" : "border-primaryPurple"}`}>
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
                    {errors.selectedCategory && <p className="text-red-500 text-sm">Este campo é obrigatório.</p>}
                  </>
                )}
              </div>
              <div>
                <Label className={errors.date ? "text-red-500" : "text-primaryPurple"}>Data</Label>
                {loading ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <>
                    <DatePicker onChange={handleDateChange} selectedDate={data} className="" />
                    {errors.date && <p className="text-red-500 text-sm">Este campo é obrigatório.</p>}
                  </>
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
