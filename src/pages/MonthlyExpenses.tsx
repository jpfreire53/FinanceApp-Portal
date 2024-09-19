import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import useMonthlyExpensesList from '@/hooks/MonthlyExpenses/useMonthlyExpensesList'
import useUserList from '@/hooks/User/useUserList'
import { MonthlyExpenses as MonthlyType } from '@/types/MonthlyExpenses'

export default function MonthlyExpenses() {
  const getCurrentMonth = (): string => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // getMonth() retorna de 0 (janeiro) a 11 (dezembro)
    return `${currentMonth}`;
  };
  const { data } = useMonthlyExpensesList();
  const { user } = useUserList();

  const [mes, setMes] = useState<string>(getCurrentMonth())
  const [salary, setSalary] = useState<string>();
  const [expenses, setExpenses] = useState<Array<MonthlyType>>([]);

  useEffect(() => {
    if (user) {
      setSalary(user.salary);
    }

    if (data) {
      setExpenses(data.filter((gastos) => gastos.Mes === Number(mes)))
    }
  }, [mes])

  const totalGastos = expenses.reduce((acc, gasto) => acc + Number(gasto.TotalGasto), 0)
  const percentualGastoTotal = (totalGastos / Number(salary)) * 100

  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Cálculo de Gastos Mensais</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Selecione o Mês</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={mes} onValueChange={setMes}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um mês" />
            </SelectTrigger>
            <SelectContent>
              {meses.map((nomeMes, index) => (
                <SelectItem key={index + 1} value={(index + 1).toString()}>{nomeMes}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Resumo Financeiro</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>Salário: R$ {Number(salary).toFixed(2)}</p>
            <p>Total de Gastos: R$ {totalGastos.toFixed(2)}</p>
            <p>Percentual de Gastos: {percentualGastoTotal.toFixed(2)}%</p>
            <Progress value={percentualGastoTotal} className="w-full" />
          </div>
        </CardContent>
      </Card>
      <h2 className="text-xl font-semibold mb-4">Gastos por Categoria</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {expenses.map((gasto, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{gasto.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">R$ {Number(gasto.TotalGasto).toFixed(2)}</p>
              <p className="text-sm text-gray-500">
                {((Number(gasto.TotalGasto) / Number(salary)) * 100).toFixed(2)}% do salário
              </p>
              <Progress value={(Number(gasto.TotalGasto) / Number(salary)) * 100} className="mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}