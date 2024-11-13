import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "../css/Header.css";
export default function RootLayout() {
  return (
    <>
      <Header className="header" showCategories={window.location.pathname === "/"} />
      <Outlet></Outlet>
      <Footer className="footer" />
    </>
  )
}
