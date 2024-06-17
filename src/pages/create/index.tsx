import { Form } from "../../components/form";
import { User } from "../../components/user";
import { ProductData } from "../../context/productContext";
import "./style.css"

export function CreateProduct(){
    const product = {} as ProductData

    return(
        <div className="container"> 
            <User/> 
            <Form product={product} />
        </div>
    )
}