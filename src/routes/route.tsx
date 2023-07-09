import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/home-page";
import TypeRoute from "./type-route";
import CarDetailRouter from "./carDetail-route";

const router = createBrowserRouter(
    [
      {
        path:"/",
        element:<Homepage/>,
        children:[
          ...TypeRoute,
          ...CarDetailRouter
        ]
      },
      
    ]
  );
  export default router