import { Toaster } from "@/components/ui/toaster"

import { Route, Routes } from "react-router-dom"

import { SigninForm } from "./auth/forms/SigninForm"
import SignupForm from "./auth/forms/SignupForm"
import { Home } from "./root/pages"
import { AuthLayout } from "./auth/AuthLayout"
import {RootLayout} from './root/RootLayout'
import './globals.css'


function App() {

  return (
<>
    <main className="flex h-screen">
    <Routes>
      {/* {'public route'} */}
      <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />}/>
          <Route path="/sign-up" element={<SignupForm />}/>
      </Route>


      {/* {private route} */}
      <Route element={<RootLayout/>}>
          <Route index element={<Home/>} /> 
      </Route>
    </Routes>
    <Toaster />
    </main>
</>
  )
}

export default App
