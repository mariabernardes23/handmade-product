import { useContext, useMemo } from "react"
import { CartContext } from "../../context/cartContext"
import { OrderData } from "../../context/orderContext"
import { CardBody, CardButton, CardContainer, CardDiv, CardFlex, CardFlexII, CardImg, CardText, CardTitle } from "../style-componentns/cardOrder/style"

const CardOrder: React.FC<OrderData> = ({uid, nameSeller, order}) => {
    const { addProductCart } = useContext(CartContext)

    const totalPrice = useMemo(() => {
        let sunPrice = 0
        order.map(item => {
           sunPrice = (item.price * item.quantity) + sunPrice
        })
        return sunPrice
    }, [order])

    function addCart() {
        order.map((item) => {
            addProductCart(item.uid, item.id, item.name, item.description, item.price, item.quantity)
        })
    }

    return(
        <CardContainer>
            <CardTitle>Vendedor(a): {nameSeller}</CardTitle>
            {
                order.map((item, index) => (
                    <CardBody key={index}>
                        <CardFlex key={index}>
                            <CardImg src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Floor-stone_02.JPG/1200px-Floor-stone_02.JPG'/>
                            <CardDiv>
                                <CardText>{item.name}</CardText>
                                <CardText>R$ {item.price}</CardText>
                            </CardDiv>
                            <CardDiv>
                                <CardText>Quantidade: {item.quantity}</CardText>
                                <CardText>Preço Total R$ {item.price * item.quantity}</CardText>
                            </CardDiv>
                        </CardFlex>
                    </CardBody>
                ))
            }
            <CardFlexII>
                <CardText>Total do Pedido R$ {totalPrice}</CardText>
                <CardButton onClick={() => addCart()}>Recomprar</CardButton>
            </CardFlexII>
        </CardContainer>
    )
}

export default CardOrder