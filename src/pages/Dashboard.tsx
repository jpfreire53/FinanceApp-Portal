import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowUpIcon, DollarSign, ArrowDownIcon, Wallet } from 'lucide-react'
import { motion } from "framer-motion"
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useExpensesList from "@/hooks/Expenses/useExpensesList"
import Utils from "@/utils/Utils"

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview')
  const { listExpenses } = useExpensesList();
  const totalExpenses = listExpenses.length;
  const totalValueExpenses = listExpenses.reduce((acc, curr) => acc + Number(curr.value), 0);

  const overviewData = [
    { name: 'Jan', total: 1200 },
    { name: 'Fev', total: 900 },
    { name: 'Mar', total: 1600 },
    { name: 'Abr', total: 1300 },
    { name: 'Mai', total: 1800 },
    { name: 'Jun', total: 2000 },
  ]

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
                    <div className="text-2xl font-bold">R$ 5.231,89</div>
                    <p className="text-xs text-muted-foreground">+20.1% em relação ao mês passado</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Receitas</CardTitle>
                    <ArrowUpIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">R$ 3.000,00</div>
                    <p className="text-xs text-muted-foreground">+2.5% em relação ao mês passado</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Despesas</CardTitle>
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
                    <div className="text-2xl font-bold">R$ 1.431,80</div>
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
                            <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                            <AvatarFallback>{transaction.description}</AvatarFallback>
                          </Avatar>
                          <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">{transaction.description}</p>
                            <p className="text-sm text-muted-foreground">{transaction.date}</p>
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
