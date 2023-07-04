import { Outlet } from "react-router-dom"
import Headerbar from "../components/headerbar"

function Homepage() {
    return (
        <>
        <Headerbar />
        <Outlet />
        </>
    )
  }
  
  export default Homepage