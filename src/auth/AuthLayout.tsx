import { Outlet, Navigate } from "react-router-dom"

export const AuthLayout = () => {
  const isAuthenticated = false;


  return (
    <>
      <div>AuthLayout</div>
      {isAuthenticated ?
        (<Navigate to='/' />) :
        (
          <>
            <section className="flex flex-1 justify-center items-center flex-col py-10">
              <Outlet />
            </section>

            <img src="/side-img.svg" alt="sideImg" 
            className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"/>
          </>

        )

      }
    </>

  )
}
