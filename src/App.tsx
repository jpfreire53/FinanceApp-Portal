import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import CreateCategory from "./pages/CreateCategory"
import AddExpenses from "./pages/AddExpenses"
import MonthlyExpenses from "./pages/MonthlyExpenses"
import ListExpenses from "./pages/ListExpenses"
import UserProfile from "./pages/UserProfile"
import Layout from "./components/Navbar"
import LoginSignin from "./pages/LoginSignin"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginSignin />}/>
        <Route path="/features/dashboard" element={
            <Layout>
              <Dashboard />
            </Layout>
          } />

        <Route path="/features/category/create" element={
            <Layout>
              <CreateCategory />
            </Layout>
          } />

        <Route path="/features/expenses/create" element={
            <Layout>
              <AddExpenses />
            </Layout>
        } />

        <Route path="/features/expenses/monthly" element={
            <Layout>
              <MonthlyExpenses />
            </Layout>
          } />

        <Route path="/features/expenses" element={
            <Layout>
              <ListExpenses />
            </Layout>
          } />

        <Route path="/features/user/profile" element={
            <Layout>
              <UserProfile />
            </Layout>
          } />

      </Routes>
    </BrowserRouter>
  )
}

export default App
