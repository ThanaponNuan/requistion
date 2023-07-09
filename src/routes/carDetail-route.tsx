import { RouteObject } from "react-router-dom";
import CarDetailLayout from "../pages/carDetailpage/carDetail-layout";
import CarDetailpage from "../pages/carDetailpage/carDetail-page";

const CarDetailRouter: RouteObject[] = [
  {
    path: "car-details",
    element: <CarDetailLayout />,
    children: [
      {
        path: "",
        element: <CarDetailpage />,
      },
    //   {
    //     path: "edit/:id",
    //     element: <TypeEdit />,
    //   },
    //   {
    //     path: "add",
    //     element: <TypeAdd />,
    //   },
    ],
  },
];
export default CarDetailRouter;
