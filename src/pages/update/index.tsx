import { useLocation } from "react-router-dom";
import { Form } from "../../components/form";
import { ProductData } from "../../context/productContext";
import { User } from "../../components/user";
import "./style.css"

export function UpdateProduct() {
    const location = useLocation();
    const { product } = location.state as { product: ProductData}
    
    return(
        <div className="container">
            <User/>
            <Form product={product}/>
        </div>  
    )
}