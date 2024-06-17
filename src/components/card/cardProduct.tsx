import { Pencil, ShoppingCart, Trash } from "@phosphor-icons/react";
import { ProductContext, ProductData } from "../../context/productContext";
import { CardBody, CardButton, CardButtonII, CardCenter, CardContainer, CardFlex, CardImg, CardText, CardTitle } from "../style-componentns/card/style";
import { useNavigate } from "react-router-dom";
import { useCallback, useContext } from "react";
import { CartContext } from "../../context/cartContext";

const CardProduct: React.FC<ProductData> = ({uid, id, name, description, price, quantity}) => {
    const navigate = useNavigate()
    const { deleteProduct } = useContext(ProductContext)
    const { addProductCart } = useContext(CartContext)
    
    const handleSubmit = useCallback(() => {
        const product = {
            uid: uid,
            id: id,
            name: name,
            description: description,
            price: price,
            quantity: quantity,
        }
        navigate('/update-product', { state: {product} })
    }, [])
    
    return(
        <CardContainer>
            <CardImg src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Floor-stone_02.JPG/1200px-Floor-stone_02.JPG' />
            <CardBody>
                <CardTitle>{name}</CardTitle>
                <CardText>{description}</CardText> 
                <CardFlex>
                    <CardText>R$ {price}</CardText>
                    <CardText>Quantidade: {quantity}</CardText>
                </CardFlex>
                {
                    quantity > 0 ?
                        <CardFlex>
                            <CardButton onClick={handleSubmit}> <Pencil size={24}/> </CardButton>
                            <CardButton onClick={() => deleteProduct(uid)}> <Trash size={24}/> </CardButton>
                            <CardButton onClick={() => addProductCart(uid, id, name, description, price, 0)}> <ShoppingCart size={24} /> </CardButton>
                        </CardFlex> 
                        : 
                        <CardCenter>
                            <CardButtonII>Solicitar Produto Fornecedor</CardButtonII>
                        </CardCenter>
                }
            </CardBody>
        </CardContainer>
    )
}

export default CardProduct;