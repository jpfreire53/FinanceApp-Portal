import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import CreateCategory from "./pages/CreateCategory"
import AddExpenses from "./pages/AddExpenses"
import MonthlyExpenses from "./pages/MonthlyExpenses"
import ListExpenses from "./pages/ListExpenses"
import UserProfile from "./pages/UserProfile"
import Layout from "./components/Navbar"
import Login from "./pages/Login"
import Cookies from "js-cookie"
import Signin from "./pages/Signin"
import ListCategories from "./pages/ListCategories"

function App() {
  const idUser = Cookies.get("idUser")

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          idUser !== undefined ? 
            <Navigate to="/features/dashboard" />
          :
            <Login />
          }/>
        <Route path="/signin" element={
          idUser !== undefined ? 
            <Navigate to="/features/dashboard" />
          :
            <Signin />
          }/>
        <Route path="/features/dashboard" element={
          idUser === undefined ? 
            <Navigate to="/" />
          :
            <Layout>
              <Dashboard />
            </Layout>
          } />

        <Route path="/features/category/create" element={
          idUser === undefined ? 
            <Navigate to="/" />
          :
            <Layout>
              <CreateCategory />
            </Layout>
          } />

        <Route path="/features/category" element={
          idUser === undefined ? 
            <Navigate to="/" />
          :
            <Layout>
              <ListCategories />
            </Layout>
          } />

        <Route path="/features/expenses/create" element={
          idUser === undefined ? 
            <Navigate to="/" />
          :
            <Layout>
              <AddExpenses />
            </Layout>
        } />

        <Route path="/features/expenses/monthly" element={
          idUser === undefined ? 
            <Navigate to="/" />
          :
            <Layout>
              <MonthlyExpenses />
            </Layout>
          } />

        <Route path="/features/expenses" element={
          idUser === undefined ? 
            <Navigate to="/" />
          :
            <Layout>
              <ListExpenses />
            </Layout>
          } />

        <Route path="/features/user/profile" element={
          idUser === undefined ? 
            <Navigate to="/" />
          :
            <Layout>
              <UserProfile />
            </Layout>
          } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
