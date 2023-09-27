import { RouteObject } from "react-router-dom";
import CarDetailLayout from "../pages/carDetailpage/carDetail-layout";
import CarDetailpage from "../pages/carDetailpage/carDetail-page";
import CarDetailAdd from "../pages/carDetailpage/carDetail-add";
import CarDetailEdit from "../pages/carDetailpage/carDetail-edit";
const CarDetailRouter: RouteObject[] = [
  {
    path: "car-details",
    element: <CarDetailLayout />,
    children: [
      {
        path: "",
        element: <CarDetailpage />,
      },
      {
        path: "edit/:id",
        element: <CarDetailEdit />, 
      },
      {
        path: "add",
        element: <CarDetailAdd />,
      },
    ],
  },
];
export default CarDetailRouter;
