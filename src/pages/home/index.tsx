import { useContext } from "react"
import { ProductContext } from "../../context/productContext"
import CardProduct from "../../components/card/cardProduct"
import "./style.css"
import { User } from "../../components/user"

export function Home() {
    const { listProduct } = useContext(ProductContext)

    return (
        <>
            <div className="name-user">
                <User/>
            </div>
            
            <div className="card-list">
                {
                    listProduct.map((item, index) => (
                        <CardProduct 
                            key={index}
                            uid={item.uid}
                            id={item.id} 
                            name={item.name} 
                            description={item.description} 
                            price={item.price} 
                            quantity={item.quantity} 
                        />
                    ))
                }
            </div>
        </>
    )
}