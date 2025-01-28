import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HomeIcon,
  PlusCircleIcon,
  BarChartIcon,
  ListIcon,
  PackagePlusIcon,
  CreditCardIcon,
  PackageIcon
} from 'lucide-react';
import Cookies from 'js-cookie';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import placeyLogo from "@/assets/icons/logo-placey-vertical-1.svg";
import placeyLogoHorizontal from "@/assets/icons/logo-placey-horizontal-1.svg";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const email = Cookies.get("email");
  const name = Cookies.get("name");

  function handleLogout() {
    Cookies.remove("idUser");
    Cookies.remove("email");
    Cookies.remove("token");
    window.location.href = "/";
  };

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
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: isExpanded ? 250 : 80 }}
        className="bg-white shadow-md h-screen fixed left-0 top-0 flex flex-col z-10 overflow-hidden"
      >
        <div className="flex items-center justify-between p-4">
          {!isExpanded && <img className='w-8 h-8 cursor-pointer' onClick={() => setIsExpanded(!isExpanded)} src={placeyLogo} alt="logo" />}
          {isExpanded && <img className='w-12 h-12 cursor-pointer'onClick={() => setIsExpanded(!isExpanded)} src={placeyLogoHorizontal} alt="logo" />}
          <button
            className="ml-auto focus:outline-none"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? '<' : '>'}
          </button>
        </div>
        <nav className="flex-1 mt-4">
          {navItems.map((item, index) => (
            <div key={index} className="mb-2">
              {item.subItems ? (
                <div>
                  <div
                    className={`flex items-center px-4 py-2 cursor-pointer ${
                      location.pathname.includes(item.pathCompare) ? 'bg-primaryOrange text-white' : 'text-gray-600'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {isExpanded && <span className="ml-2">{item.label}</span>}
                  </div>
                  {isExpanded && (
                    <div className="ml-8">
                      {item.subItems.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          className="flex items-center px-4 py-1 text-sm text-gray-600 hover:text-primaryOrange"
                        >
                          <subItem.icon className="h-4 w-4" />
                          <span className="ml-2">{subItem.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-2 ${
                    location.pathname === item.path ? 'bg-primaryOrange text-white' : 'text-gray-600'
                  } hover:bg-primaryOrange hover:text-white`}
                >
                  <item.icon className="h-5 w-5" />
                  {isExpanded && <span className="ml-2">{item.label}</span>}
                </Link>
              )}
            </div>
          ))}
        </nav>
        <div className="p-4">
          <div className="flex items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-avatar.jpg" alt={email || "User avatar"} />
              <AvatarFallback>{email ? email[0].toUpperCase() : 'U'}</AvatarFallback>
            </Avatar>
            {isExpanded && (
              <div className="ml-2">
                <p className="text-sm font-medium">{name || "Usuário"}</p>
                <p className="text-xs text-gray-500">{email || "email@example.com"}</p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 w-full bg-red-500 text-white py-2 rounded-md"
          >
            Sair
          </button>
        </div>
      </motion.aside>

      {/* Main content */}
      <main className="flex-1 ml-20 md:ml-[250px] px-6 py-8">
        {children}
      </main>
    </div>
  );
}
