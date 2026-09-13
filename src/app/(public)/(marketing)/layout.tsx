import Footer from "@/components/layout/public/Footer";
import Header from "@/components/layout/public/Header";
import { ReactNode } from "react";

export default function layout({children}:{children:ReactNode}) {
  return (
    <div className="flex flex-col min-h-screen">
        <Header></Header>
        <div className="flex-1">{children}</div>
        <Footer></Footer>
    </div>
  )
}
