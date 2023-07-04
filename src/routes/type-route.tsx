import { RouteObject } from "react-router-dom";
import Typelayout from "../pages/typepage/type-layout";
import Typepage from "../pages/typepage/type-page";
import TypeEdit from "../pages/typepage/type-edit";
import TypeAdd from "../pages/typepage/type-add";

const TypeRoute: RouteObject[] = [
  {
    path: "type",
    element: <Typelayout />,
    children: [
      {
        path: "",
        element: <Typepage />,
      },
      {
        path: "edit/:id",
        element: <TypeEdit />,
      },
      {
        path: "add",
        element: <TypeAdd />,
      },
    ],
  },
];
export default TypeRoute;
