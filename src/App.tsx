import { Toaster } from "@/components/ui/toaster"

import { Route, Routes } from "react-router-dom"

import { SigninForm } from "./auth/forms/SigninForm"
import SignupForm from "./auth/forms/SignupForm"
import { AllUsers, CreatePost, Explore, Home, PostDetails, Profile, Saved, UpdatePost, UpdateProfile } from "./root/pages"
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
          <Route path="/explore" element={<Explore />}/> 
          <Route path="/saved" element={<Saved />}/> 
          <Route path="/all-users" element={<AllUsers />}/> 
          <Route path="/create-post" element={<CreatePost />}/> 
          <Route path="/update-post/:id" element={<UpdatePost />}/> 
          <Route path="/post/:id" element={<PostDetails />}/> 
          <Route path="/profile/:id" element={<Profile />}/> 
          <Route path="/update-profile/:id" element={<UpdateProfile />}/> 
      </Route>
    </Routes>
    <Toaster />
    </main>
</>
  )
}

export default App
