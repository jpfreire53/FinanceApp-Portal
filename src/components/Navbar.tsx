import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import {
  HomeIcon,
  PlusCircleIcon,
  BarChartIcon,
  ListIcon,
  UserIcon,
  LogOutIcon,
  PackagePlusIcon,
  CreditCardIcon,
  PackageIcon
} from 'lucide-react'
import Cookies from 'js-cookie'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const email = Cookies.get("email")

  const handleLogout = () => {
    Cookies.remove("idUser")
    Cookies.remove("email")
    Cookies.remove("token")
    window.location.href = "/"
  }

  const navItems = [
    { path: '/features/dashboard', icon: HomeIcon, label: 'Visão geral' },
    {
      label: 'Gastos',
      pathCompare: "/features/expenses",
      icon: CreditCardIcon,
      subItems: [
        { path: '/features/expenses/create', icon: PlusCircleIcon, label: 'Adicionar Gasto' },
        { path: '/features/expenses', icon: ListIcon, label: 'Listar Gastos' },
        { path: '/features/expenses/monthly', icon: BarChartIcon, label: 'Cálculo Mensal' },
      ]
    },
    {
      label: 'Categorias',
      pathCompare: "/features/category",
      icon: PackageIcon,
      subItems: [
        { path: '/features/category/create', icon: PackagePlusIcon, label: 'Adicionar Categoria' },
        { path: '/features/category', icon: ListIcon, label: 'Listar Categorias' },
      ]
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Top navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/features/dashboard" className="flex items-center">
                <span className="text-xl font-semibold text-primaryOrange">Placey</span>
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-4">
              {navItems.map((item, index) => (
                item.subItems ? (
                  <DropdownMenu key={index}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className={`flex items-center ${
                        location.pathname.includes(item.pathCompare)
                        ? 'bg-primaryOrange text-white'
                        : 'text-primaryOrange hover:bg-primaryOrange hover:text-white transition-all duration-300 ease-in-out'
                      }`}>
                        <item.icon className="h-5 w-5 mr-2" />
                        {item.label}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {item.subItems.map((subItem, subIndex) => (
                        <DropdownMenuItem key={subIndex} asChild className='hover:bg-primaryOrange hover:text-white transition-all duration-500 ease-in-out'>
                          <Link to={subItem.path} className={`flex items-center text-primaryOrange`}>
                            <subItem.icon className="h-4 w-4 mr-2" />
                            {subItem.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    key={index}
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname === item.path
                        ? 'bg-primaryOrange text-white'
                        : 'text-primaryOrange hover:bg-primaryOrange hover:text-white transition-all duration-500 ease-in-out'
                    }`}
                  >
                    <item.icon className="h-5 w-5 mr-2" />
                    {item.label}
                  </Link>
                )
              ))}
            </nav>
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-avatar.jpg" alt={email || "User avatar"} />
                      <AvatarFallback>{email ? email[0].toUpperCase() : 'U'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Usuário</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {email || "email@example.com"}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/features/user/profile">
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>Perfil</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="m-2">
              Menu
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Navegação</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {navItems.map((item, index) => (
                item.subItems ? (
                  <DropdownMenuSub key={index}>
                    <DropdownMenuSubTrigger>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.label}</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        {item.subItems.map((subItem, subIndex) => (
                          <DropdownMenuItem key={subIndex} asChild>
                            <Link to={subItem.path}>
                              <subItem.icon className="mr-2 h-4 w-4" />
                              <span>{subItem.label}</span>
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                ) : (
                  <DropdownMenuItem key={index} asChild>
                    <Link to={item.path}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </DropdownMenuItem>
                )
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Page content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="container mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}