import { FormEvent, useCallback, useContext, useState } from "react"
import { CartContext } from "../../context/cartContext"
import TableCart from "../../components/table/table"
import { SellerContext } from "../../context/sellerContext"
import { OrderContext } from "../../context/orderContext"
import "./style.css"
import { useNavigate } from "react-router-dom"
import { ProductContext } from "../../context/productContext"
import { User } from "../../components/user"

export function Cart() {
    const { listProductCart, totalPrice, clearCart } = useContext(CartContext)
    const { listSeller } = useContext(SellerContext)
    const [nameSeller, setNameSeller] = useState('')
    const { addOrder } = useContext(OrderContext)
    const { listProduct, updateQuatityProduct } = useContext(ProductContext)
    const navigate = useNavigate()

    function checkQuantityProduct() {
        for(let productCart of listProductCart) {
            let product = listProduct.find(product => product.id === productCart.id)

            if(productCart.quantity > product.quantity) {
                alert("Não há quantidade suficiente de " + product.name + " no estoque.\nQuantidade do produdo em estoque " + product.quantity)
                return false
            }
        }
        return true
    }

    const finish = useCallback((e: FormEvent)=> {
        e.preventDefault()
        
        if (nameSeller != '' && nameSeller != 'select' && checkQuantityProduct()) {
            addOrder(nameSeller, listProductCart)
            listProductCart.map((item) => {
                updateQuatityProduct(item.uidProduct, item.id, item.quantity)
            })
            clearCart()
        } else {
            alert("Selecione um vendedor para finalizar a compra!")
        }
    }, [nameSeller, listProductCart])

    return(
        <div className="container">
            <User/>
            {
                listProductCart.length > 0 ?
                <>
                    <h1 className="header-cart">Carrinho de Produtos</h1>
                    <div className="info-cart">
                        <p className="info">Total R${totalPrice.toFixed(2)}</p>
                        <button onClick={clearCart} className="button-cart">Limpar Carrinho</button>
                    </div>

                    {
                        listProductCart.map((item, index) => (
                            <div key={index}>
                                <TableCart
                                    uid={item.uid}
                                    uidProduct={item.uidProduct} 
                                    id={item.id} 
                                    name={item.name} 
                                    description={item.description} 
                                    price={item.price} 
                                    quantity={item.quantity}
                                />  
                            </div>   
                        ))
                    }
            
                    <form onSubmit={finish} className="form-order">
                        <select value={nameSeller} onChange={(e) => setNameSeller(e.target.value)} className="select">
                            <option value={'select'}>Selecione</option>
                            {
                                listSeller.map((item, index) => (
                                    <option key={index} value={item.name}>{item.name}</option>
                                ))
                            }
                        </select>
                        <button className="button-cart" type="submit">Finalizar</button>
                    </form>
                </> 
                :
                <div className="empty-cart">
                    <img src="../src/assets/cesta-vazia.png" alt="" className="empty-img"/>
                    <h1 className="empty-message">Opps carrinho vazio...</h1>
                    
                    <button onClick={() => navigate('/', {replace: true})} className="button-cart">Ver Produtos</button>
                </div>
            }
        </div>
    )
}