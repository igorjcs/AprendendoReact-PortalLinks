import { createBrowserRouter } from "react-router-dom" 

import { Home } from './pages/home'
import { Login } from './pages/login'
import { Admin } from './pages/admin'
import { Networks } from './pages/networks'
import { Private } from "./routes/private";
import { NotFound1 } from './pages/notfound/index1'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/admin',
    element: <Private><Admin/></Private>
  },
  {
    path: '/admin/social',
    element: <Private><Networks/></Private>
  },
  {
    path: '*',
    element: <NotFound1/>
  }
])

export { router };
