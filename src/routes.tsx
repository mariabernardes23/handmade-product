import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { CreateProduct } from "./pages/create";
import { UpdateProduct } from "./pages/update";
import { Cart } from "./pages/cart";
import { Seller } from "./pages/seller";
import { OrderHistory } from "./pages/orderHistory";
import { Private } from "./routes/private";
import { Notfound } from "./pages/notfound";
import { ImageProvider } from "./context/imageContext";

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: '/',
                element: <ImageProvider> <Home/> </ImageProvider>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/create-product',
                element: <Private> <CreateProduct/> </Private>
            },
            {
                path: '/update-product',
                element: <Private> <UpdateProduct/> </Private>

            }, 
            {
                path: '/cart',
                element: <Private> <ImageProvider> <Cart/> </ImageProvider> </Private>
            },
            {
                path: '/sellers',
                element: <Seller/>
            },
            {
                path: '/order-history',
                element: <ImageProvider> <OrderHistory/> </ImageProvider>
            },
            {
                path: '*',
                element: <Notfound />
            }
        ]
    }
])

export { router }