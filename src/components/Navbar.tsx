import type React from "react"
import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  HomeIcon,
  PlusCircleIcon,
  BarChartIcon,
  ListIcon,
  PackagePlusIcon,
  CreditCardIcon,
  PackageIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  LogOutIcon,
  MenuIcon,
} from "lucide-react"
import Cookies from "js-cookie"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "../hooks/useMediaQuery"
import placeyLogo from "@/assets/icons/logo-placey-vertical-1.svg"
import placeyLogoHorizontal from "@/assets/icons/logo-placey-horizontal-1.svg"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const email = Cookies.get("email")
  const name = Cookies.get("name")
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    if (isMobile) {
      setIsExpanded(false)
    }
  }, [isMobile])

  function handleLogout() {
    Cookies.remove("idUser")
    Cookies.remove("email")
    Cookies.remove("token")
    window.location.href = "/"
  }

  const navItems = [
    { path: "/features/dashboard", icon: HomeIcon, label: "Visão geral" },
    {
      label: "Gastos",
      pathCompare: "/features/expenses",
      icon: CreditCardIcon,
      subItems: [
        { path: "/features/expenses/create", icon: PlusCircleIcon, label: "Adicionar Gasto" },
        { path: "/features/expenses", icon: ListIcon, label: "Listar Gastos" },
        { path: "/features/expenses/monthly", icon: BarChartIcon, label: "Cálculo Mensal" },
      ],
    },
    {
      label: "Categorias",
      pathCompare: "/features/category",
      icon: PackageIcon,
      subItems: [
        { path: "/features/category/create", icon: PackagePlusIcon, label: "Adicionar Categoria" },
        { path: "/features/category", icon: ListIcon, label: "Listar Categorias" },
      ],
    },
  ]

  const sidebarVariants = {
    expanded: { width: 240 },
    collapsed: { width: 72 },
  }

  const NavContent = () => (
    <>
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <img
          className={`${isExpanded ? "w-32" : "w-8"} transition-all duration-200`}
          src={isExpanded ? placeyLogoHorizontal : placeyLogo}
          alt="logo"
        />
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500 hover:text-gray-700"
          >
            {isExpanded ? <ChevronLeftIcon className="h-4 w-4" /> : <ChevronRightIcon className="h-4 w-4" />}
          </Button>
        )}
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        {navItems.map((item, index) => (
          <div key={index} className="mb-2">
            {item.subItems ? (
              <div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={`flex items-center px-4 py-2 cursor-pointer ${
                        location.pathname.includes(item.pathCompare)
                          ? "bg-orange-100 text-orange-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-3 text-sm whitespace-nowrap overflow-hidden"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </TooltipTrigger>
                  {!isExpanded && <TooltipContent side="right">{item.label}</TooltipContent>}
                </Tooltip>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-6 mt-1 space-y-1 overflow-hidden"
                    >
                      {item.subItems.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          className={`flex items-center px-4 py-1.5 text-sm ${
                            location.pathname === subItem.path
                              ? "text-orange-600"
                              : "text-gray-600 hover:text-orange-600"
                          }`}
                        >
                          <subItem.icon className="h-4 w-4 mr-2" />
                          <span>{subItem.label}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-2 ${
                      location.pathname === item.path
                        ? "bg-orange-100 text-orange-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-3 text-sm whitespace-nowrap overflow-hidden"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                </TooltipTrigger>
                {!isExpanded && <TooltipContent side="right">{item.label}</TooltipContent>}
              </Tooltip>
            )}
          </div>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-100">
        <div onClick={() => navigate("/features/user/profile")} className="flex items-center mb-4 cursor-pointer">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-avatar.jpg" alt={email || "User avatar"} />
            <AvatarFallback>{email ? email[0].toUpperCase() : "U"}</AvatarFallback>
          </Avatar>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="ml-3 overflow-hidden"
              >
                <p className="text-sm font-medium text-gray-700 whitespace-nowrap">{name || "Usuário"}</p>
                <p className="text-xs text-gray-500 whitespace-nowrap">{email || "email@example.com"}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="destructive"
              size={isExpanded ? "default" : "icon"}
              onClick={handleLogout}
              className="w-full"
            >
              <LogOutIcon className="h-4 w-4" />
              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-2 whitespace-nowrap overflow-hidden"
                  >
                    Sair
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </TooltipTrigger>
          {!isExpanded && <TooltipContent side="right">Sair</TooltipContent>}
        </Tooltip>
      </div>
    </>
  )

  return (
    <div className="flex min-h-screen bg-gray-50">
      <TooltipProvider>
        {isMobile ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="fixed top-4 left-4 z-50"
            >
              <MenuIcon className="h-6 w-6" />
            </Button>
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.aside
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-40 overflow-hidden"
                >
                  <NavContent />
                </motion.aside>
              )}
            </AnimatePresence>
          </>
        ) : (
          <motion.aside
            initial="collapsed"
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={sidebarVariants}
            transition={{ duration: 0.2 }}
            className="bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col z-10 overflow-hidden"
          >
            <NavContent />
          </motion.aside>
        )}
      </TooltipProvider>

      <main
        className={`flex-1 transition-all duration-200 ${isMobile ? "ml-0" : isExpanded ? "ml-60" : "ml-20"} px-6 py-8`}
      >
        {children}
      </main>
    </div>
  )
}

