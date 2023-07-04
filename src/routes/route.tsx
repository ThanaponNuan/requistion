import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/home-page";
import TypeRoute from "./type-route";

const router = createBrowserRouter(
    [
      {
        path:"/",
        element:<Homepage/>,
        children:[
          ...TypeRoute
        ]
      },
      
    ]
  );
  export default router