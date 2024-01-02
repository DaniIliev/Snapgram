import { Route, Routes } from "react-router-dom"
import { SigninForm } from "./auth/forms/SigninForm"
import SignupForm from "./auth/forms/SignupForm"
import { Home } from "./pages"
import { AuthLayout } from "./auth/AuthLayout"


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
      <Route index element={<Home/>} /> 
    </Routes>
    </main>
</>
  )
}

export default App
