import { Pencil, ShoppingCart, Trash } from "@phosphor-icons/react";
import { ProductContext, ProductData } from "../../../context/productContext";
import { CardBody, CardButton, CardButtonII, CardCenter, CardContainer, CardFlex, CardImg, CardText, CardTitle } from "../../style-componentns/card/style";
import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import { CartContext } from "../../../context/cartContext";
import { ImageContext } from "../../../context/imageContext";

const CardProduct: React.FC<ProductData> = ({uid, id, name, description, price, quantity}) => {
    const navigate = useNavigate()
    const { deleteProduct } = useContext(ProductContext)
    const { addProductCart } = useContext(CartContext)
    const { getImage } = useContext(ImageContext);
    const [img, setImg] = useState('')

    useEffect(() => {
        async function getImg() {
            const imageUrl = await getImage(name);
            setImg(imageUrl)
        }

        getImg()
    }, [uid]);

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
            <CardImg src={img} />
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
                            <CardButton onClick={handleSubmit} aria-label="Alterar Produto"> <Pencil size={24}/> </CardButton>
                            <CardButton onClick={() => deleteProduct(uid)}> <Trash size={24}/> </CardButton>
                            <CardButton onClick={() => addProductCart(uid, id, name, description, price, 0)} aria-label="Adicionar ao Carrinho"> <ShoppingCart size={24} /> </CardButton>
                        </CardFlex> 
                        : 
                        <CardCenter>
                            <CardButtonII onClick={() => alert("Produto solicitado ao fornecedor!")}>Solicitar Produto Fornecedor</CardButtonII>
                        </CardCenter>
                }
            </CardBody>
        </CardContainer>
    )
}

export default CardProduct;