import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowUpIcon, DollarSign, ArrowDownIcon, Wallet } from 'lucide-react'
import { motion } from "framer-motion"
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import useExpensesList from "@/hooks/Expenses/useExpensesList"
import { format, subMonths } from "date-fns"
import { ptBR } from "date-fns/locale"
import Utils from "@/utils/Utils"
import useRevenuesList from "@/hooks/Revenues/useRevenuesList"

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview')
  const { listExpenses } = useExpensesList();
  const { listRevenues } = useRevenuesList();

  const totalExpenses = listExpenses.length;
  const totalValueExpenses = listExpenses.reduce((acc, curr) => acc + Number(curr.value), 0);
  const totalValueRevenues = listRevenues.reduce((acc, revenue) => acc + Number(revenue.value), 0);
  const balanceTotal = totalValueRevenues - totalValueExpenses;
  const savingValue = balanceTotal - totalValueExpenses;

  const overviewData = useMemo(() => {
    const now = new Date();
    const lastSixMonths = Array.from({ length: 5 }, (_, i) => {
      const monthDate = subMonths(now, i);
      return {
        name: format(monthDate, "MMM", { locale: ptBR }),
        total: 0,
        month: format(monthDate, "yyyy-MM"),
      };
    }).reverse();

    listExpenses.forEach((expense) => {
      const expenseMonth = expense.date.split("T")[0].slice(0, 7);
      const monthData = lastSixMonths.find((m) => m.month === expenseMonth);
      if (monthData) {
        monthData.total += Number(expense.value);
      }
    });

    return lastSixMonths.map(({ name, total }) => ({ name, total }));
  }, [listExpenses]);

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="space-y-8"
    >
      <div className="flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl text-primaryOrange font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <Button onClick={() => navigate("/features/expenses/create")} className="bg-primaryPurple">Adicionar Gasto</Button>
            </div>
          </div>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="analytics">Metas</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{Utils.formattedValue(balanceTotal)}</div>
                    <p className="text-xs text-muted-foreground">+20.1% em relação ao mês passado</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Receitas</CardTitle>
                    <ArrowUpIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{Utils.formattedValue(totalValueRevenues)}</div>
                    <p className="text-xs text-muted-foreground">+2.5% em relação ao mês passado</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Gastos</CardTitle>
                    <ArrowDownIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{Utils.formattedValue(totalValueExpenses)}</div>
                    <p className="text-xs text-muted-foreground">+18.7% em relação ao mês passado</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Economia</CardTitle>
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{Utils.formattedValue(savingValue)}</div>
                    <p className="text-xs text-muted-foreground">+4.3% em relação ao mês passado</p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Visão Geral</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={overviewData}>
                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `R$${value}`} />
                        <Bar dataKey="total" fill="#4524b1" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Transações Recentes</CardTitle>
                    <CardDescription>Você fez {totalExpenses} transações este mês.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {listExpenses.map((transaction) => (
                        <div key={transaction.idExpenses} className="flex items-center">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback>{transaction.idExpenses}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">{transaction.description}</p>
                            <p className="text-sm text-muted-foreground">{transaction.date.split("T")[0]}</p>
                          </div>
                          <div className={`ml-auto font-medium ${Number(transaction.value) > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {Number(transaction.value) > 0 ? '+' : '-'}R$ {Math.abs(Number(transaction.value)).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Metas Financeiras</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Suas metas financeiras aqui...</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </motion.div>
  )
}
