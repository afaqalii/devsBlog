import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Details from './pages/Details'
import AddEditBlog from './pages/AddEditBlog'
import PageNotFound from './pages/PageNotFound'
import { ToastContainer } from 'react-toastify'
import Header from './components/Header'
import AuthForm from './pages/Form/AuthForm'
import Login from './pages/login/Login'
import Signup from './pages/Signup/Signup'

function App() {
   const appRoutes = [
    {path:'/', element:<Home/>},
    {path:'/details/:id', element:<Details/>},
    {path:'/create', element:<AddEditBlog/>},
    {path:'/update/:id', element:<AddEditBlog/>},
    {path:'/login', element:<Login/>},
    {path:'/signup', element:<Signup/>},
    {path:'*', element:<PageNotFound/>},
   ]
  return (
    <BrowserRouter>
    <Header/>
    <ToastContainer/>
      <Routes>
        {appRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
     </BrowserRouter>
  )
}

export default App
