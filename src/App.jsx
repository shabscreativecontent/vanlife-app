import './App.css';
import React from 'react';
import { 
  BrowserRouter, 
  Routes, 
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom"
import Login, { loginLoader, action as loginAction } from "./pages/Login"
import Layout from './components/Layout';
import Home from "./pages/Home"
import About from "./pages/About"
import Vans, { loader as vansLoader } from "./pages/vans/Vans"
import VanDetail, { loader as VanDetailLoader } from "./pages/vans/VanDetail"
import HostLayout, { loader as hostLoader } from './components/HostLayout';
import Dashboard, { loader as dashboardLoader } from './pages/host/Dashboard';
import Income from "./pages/host/Income"
import Reviews from "./pages/host/Reviews"
import HostVans, {loader as hostVansLoader} from "./pages/host/HostVans"
import HostVanDetail, {loader as hostVanDetailLoader} from "./pages/host/HostVanDetail"
import HostVanInfo from "./pages/host/HostVanInfo"
import HostVanPhoto from "./pages/host/HostVanPhoto"
import HostVanPricing from "./pages/host/HostVanPricing"
import NotFound from "./pages/404"
import RouteError from './components/RouteError';
import { requireAuth } from './utilis';

// localStorage.removeItem("loggedIn")

import "./server"

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route
            path="login"
            element={<Login />}
            loader={loginLoader}
            action={loginAction}
          />
          <Route 
            path="vans" 
            element={<Vans />} 
            errorElement={<RouteError />}
            loader={vansLoader} />
          <Route 
            path="vans/:id" 
            element={<VanDetail />}  
            errorElement={<RouteError />}
            loader={VanDetailLoader}
          />
          
          <Route 
            path="host" 
            element={<HostLayout />}
          >
            <Route 
              index 
              element={<Dashboard />} 
              loader={dashboardLoader}
            />
            <Route 
              path="income" 
              element={<Income />} 
              loader={async ({request})=> await requireAuth(request)}
            />
            <Route 
              path="reviews" 
              element={<Reviews />} 
              loader={async ({request})=> await requireAuth(request)}
            />
            <Route 
              path="vans" 
              element={<HostVans />}  
              errorElement={<RouteError />}
              loader={hostVansLoader}
            />
            <Route 
              path="vans/:id" 
              element={<HostVanDetail />} 
              errorElement={<RouteError />}
              loader={hostVanDetailLoader} 
            >
              <Route 
                index 
                element={<HostVanInfo />}
                loader={async ({request})=> await requireAuth(request)} 
              />
              <Route 
                path='pricing' 
                element={<HostVanPricing />}
                loader={async ({request})=> await requireAuth(request)}
              />
              <Route 
                path='photos' 
                element={<HostVanPhoto />}
                loader={async ({request})=> await requireAuth(request)}
              />
            </Route>
          </Route>
          <Route path='*' element={<NotFound />} />
        </Route>
))

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
