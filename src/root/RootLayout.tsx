import { BotomBar } from "@/components/shared/BotomBar"
import LeftSideBar from "@/components/shared/LeftSideBar"
import TopBar from "@/components/shared/TopBar"

import { Outlet } from "react-router-dom"

export const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <TopBar />
      <LeftSideBar />
      <section className="flex flex-1 h-full justify-center">
          <Outlet/>
      </section>
      <BotomBar />
    </div>
  )
}
