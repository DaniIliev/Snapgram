import { Route, Routes } from "react-router-dom"


function App() {

  return (
<>
    <main className="flex h-screen">

    <Routes>
      {/* {'public route'} */}
      <Route path="/sign-in" element={<SigninForm />}/>
      <Route path="/sign-up" element={<SignupForm />}/>
      
      {/* {private route} */}
    </Routes>
    </main>
</>
  )
}

export default App
