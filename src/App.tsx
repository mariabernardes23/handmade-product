import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { ProductProvider } from './context/productContext'
import { CartProvider } from './context/cartContext'
import { SellerProvider } from './context/sellerContext'
import { OrderProvider } from './context/orderContext'
import { UserProvider } from './context/userContext'

function App() {

  return (
    <>
      <ProductProvider>
        <CartProvider> 
          <SellerProvider>
            <OrderProvider>
              <UserProvider>
                <RouterProvider router={ router } />
              </UserProvider>
            </OrderProvider>
          </SellerProvider>
        </CartProvider>
      </ProductProvider>
    </>
  )
}

export default App
