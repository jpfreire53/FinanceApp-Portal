import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import {
  HomeIcon,
  PlusCircleIcon,
  BarChartIcon,
  ListIcon,
  UserIcon,
  MenuIcon,
  XIcon,
  LogOutIcon,
  PackagePlusIcon
} from 'lucide-react'
import Cookies from 'js-cookie'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const email = Cookies.get("email");

  const handleLogout = () => {
    Cookies.remove("idUser")
    Cookies.remove("email")
    Cookies.remove("token")
    window.location.href = "/";
  }

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white w-64 min-h-screen flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed left-0 top-0 z-40 lg:translate-x-0 lg:static lg:z-auto`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-2xl font-bold text-gray-800">FinanceApp</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            <XIcon className="h-6 w-6" />
          </Button>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <ul className="p-4 space-y-2">
            <li>
              <Link to="/features/dashboard" className="flex items-center p-2 rounded-lg hover:bg-gray-100">
                <HomeIcon className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/features/expenses/create" className="flex items-center p-2 rounded-lg hover:bg-gray-100">
                <PlusCircleIcon className="mr-3 h-5 w-5" />
                Adicionar Gasto
              </Link>
            </li>
            <li>
              <Link to="/features/category/create" className="flex items-center p-2 rounded-lg hover:bg-gray-100">
                <PackagePlusIcon className="mr-3 h-5 w-5" />
                Adicionar Categoria
              </Link>
            </li>
            <li>
              <Link to="/features/expenses" className="flex items-center p-2 rounded-lg hover:bg-gray-100">
                <ListIcon className="mr-3 h-5 w-5" />
                Listar Gastos
              </Link>
            </li>
            <li>
              <Link to="/features/expenses/monthly" className="flex items-center p-2 rounded-lg hover:bg-gray-100">
                <BarChartIcon className="mr-3 h-5 w-5" />
                Cálculo Mensal
              </Link>
            </li>
            <li>
              <Link to="/features/user/profile" className="flex items-center p-2 rounded-lg hover:bg-gray-100">
                <UserIcon className="mr-3 h-5 w-5" />
                Perfil
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navbar */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSidebar}
                  className="lg:hidden"
                >
                  <MenuIcon className="h-6 w-6" />
                </Button>
              </div>
              <div className="flex items-center">
                <span className="text-gray-700 mr-4">Olá, {email ? email : "Usuário"}!</span>
                <Button onClick={handleLogout} variant="destructive" size="sm">
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  Sair
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}