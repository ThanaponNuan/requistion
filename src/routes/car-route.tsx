import { RouteObject } from "react-router-dom";
import CarLayout from "../pages/carpage/car-layout";
import Carpage from "../pages/carpage/car-page";
import CarEdit from "../pages/carpage/car-edit";
import CarAdd from "../pages/carpage/car-add";

const CarRouter: RouteObject[] = [
  {
    path: "car",
    element: <CarLayout />,
    children: [
      {
        path: "",
        element:<Carpage/>,
      },
      {
        path:"edit/:id",
        element:<CarEdit/>,
      },
      {
        path:"add",
        element:<CarAdd/>
      }
    ],
  },
];
export default CarRouter;
