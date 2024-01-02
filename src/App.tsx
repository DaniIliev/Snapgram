
import { Route, Routes } from "react-router-dom"
import { SigninForm } from "./auth/forms/SigninForm"
import SignupForm from "./auth/forms/SignupForm"
import { Home } from "./root/pages"
import { AuthLayout } from "./auth/AuthLayout"
import {RootLayout} from './root/RootLayout'


function App() {

  return (
<>
    <main className="flex h-screen">
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
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
    </main>
</>
  )
}

export default App
