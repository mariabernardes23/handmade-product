import { useContext } from "react"
import { SellerContext } from "../../context/sellerContext"
import CardSeller from "../../components/card/cardSeller"
import { User } from "../../components/user"
import "./style.css"

export function Seller() {
    const { listSeller } = useContext(SellerContext)

    return(
        <>
            <div className="name-user">
                <User/>
            </div>
            
            <div className="card-list">
                {listSeller.map((item, index) => (
                    <CardSeller
                        key={index}
                        uid={item.uid}
                        id={item.id}
                        name={item.name} />
                )
                )}
            </div>
        </>
    )
}