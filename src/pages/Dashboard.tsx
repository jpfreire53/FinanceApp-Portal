import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUpIcon, TrendingDownIcon, DollarSignIcon, CheckCircleIcon, AlertCircleIcon } from 'lucide-react'

const data = [
  { month: 'Jan', gastos: 4000, receita: 6000 },
  { month: 'Fev', gastos: 3000, receita: 5500 },
  { month: 'Mar', gastos: 2000, receita: 5000 },
  { month: 'Abr', gastos: 2780, receita: 6200 },
  { month: 'Mai', gastos: 1890, receita: 4900 },
  { month: 'Jun', gastos: 2390, receita: 5100 },
]

export default function Dashboard() {
  const saldo = 5000
  const gastosMes = 3500
  const receitaMes = 6000
  const percentualGasto = (gastosMes / receitaMes) * 100
  const metaGasto = 4000

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-4 text-primaryPurple">Dashboard Financeira</h1>

      {/* Linha de Indicadores Financeiros */}
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3">
        <Card className="shadow-lg bg-primaryOrange">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Saldo Atual</CardTitle>
            <DollarSignIcon className="h-5 w-5 text-muted-foreground" color="white" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">R$ {saldo.toFixed(2)}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg bg-primaryPurple">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Gastos do Mês</CardTitle>
            <TrendingDownIcon className="h-5 w-5 text-muted-foreground" color="white" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">R$ {gastosMes.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card className="shadow-lg bg-primaryOrange">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Receita do Mês</CardTitle>
            <TrendingUpIcon className="h-5 w-5 text-muted-foreground" color="white" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">R$ {receitaMes.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Meta de Gastos */}
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-primaryPurple">Meta de Gastos</CardTitle>
          {gastosMes <= metaGasto ? (
            <CheckCircleIcon className="h-5 w-5 text-green-500" />
          ) : (
            <AlertCircleIcon className="h-5 w-5 text-red-500" />
          )}
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-primaryPurple">
            R$ {gastosMes.toFixed(2)} / R$ {metaGasto.toFixed(2)}
          </div>
          <Progress color="white" value={(gastosMes / metaGasto) * 100} className="mt-3" />
        </CardContent>
        <CardFooter className="text-muted-foreground text-primaryPurple">
          {gastosMes <= metaGasto ? 'Dentro da meta' : 'Acima da meta'}
        </CardFooter>
      </Card>

      {/* Tabela de Gastos Mensais */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Gastos nos Últimos 6 Meses</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="min-w-full table-auto text-left text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2">Mês</th>
                <th className="px-4 py-2">Gastos</th>
                <th className="px-4 py-2">Receita</th>
                <th className="px-4 py-2">Variação</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                const variacao = ((item.gastos - data[index - 1]?.gastos) / (data[index - 1]?.gastos || item.gastos)) * 100
                return (
                  <tr key={item.month}>
                    <td className="border px-4 py-2">{item.month}</td>
                    <td className="border px-4 py-2">R$ {item.gastos.toFixed(2)}</td>
                    <td className="border px-4 py-2">R$ {item.receita.toFixed(2)}</td>
                    <td className={`border px-4 py-2 ${variacao >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {index > 0 ? `${variacao.toFixed(2)}%` : 'N/A'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
