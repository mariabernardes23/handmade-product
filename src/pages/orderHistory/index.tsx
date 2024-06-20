import { FormEvent, useCallback, useContext, useState } from "react"
import { OrderContext } from "../../context/orderContext"
import CardOrder from "../../components/card/cardOrder"
import "./style.css"
import { SellerContext } from "../../context/sellerContext"
import { User } from "../../components/user"

export function OrderHistory() {
    const { listOrder, getDataOrderSeller, listOrderSeller } = useContext(OrderContext)
    const { listSeller } = useContext(SellerContext)
    const [nameSeller, setNameSeller] = useState('')
    
    const OrderHistorySeller = useCallback((e: FormEvent) => {
        e.preventDefault()
        getDataOrderSeller(nameSeller)
    }, [nameSeller])
 
    return(
        <div className="container">
            <User/> 
            <form onSubmit={OrderHistorySeller} className="form-name-seller">
                <select value={nameSeller} onChange={(e) => setNameSeller(e.target.value)} className="select">
                    <option value={'select'}>Todos</option>
                    {
                        listSeller.map((item, index) => (
                            <option key={index} value={item.name}>{item.name}</option>
                        ))   
                    }
                </select>
                <button className="button-cart" type="submit">Filtrar</button>
            </form>

            {
                nameSeller != '' &&  nameSeller != 'select' ? 
                    listOrderSeller.map((item, index) => (
                        <CardOrder 
                        key={index}
                        uid={item.uid} 
                        nameSeller={item.nameSeller} 
                        order={item.order}
                        />
                    ))
                :
                    listOrder.map((item, index) => (
                        <CardOrder 
                            key={index}
                            uid={item.uid} 
                            nameSeller={item.nameSeller} 
                            order={item.order}
                        />
                    ))
            }
        </div>
    )
}