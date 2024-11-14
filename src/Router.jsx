import { createBrowserRouter } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";
import Register from "./components/Register";
import DetailsProduct from "./components/DetailsProduct";
import Cart from "./components/Cart";
import RootLayout from "./layouts/RootLayout";


const Router = createBrowserRouter([
{
    path:"/",
    element: <RootLayout />,
    children:[
    { index:true, element:<Main />},
    { path:"/login", element:<Login />},
    { path:"/register", element:<Register />},
    { path:"/detailsproduct/:id", element:<DetailsProduct />},
    { path:"/cart", element:<Cart />}
    ]
}
]);

export default Router;

/*
<Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/detailsproduct/:id"
              element={<DetailsProduct />}
            ></Route>
            <Route path="/cart" element={<Cart />} />*/