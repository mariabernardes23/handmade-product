import { SellerData } from "../../context/sellerContext";
import { CardBody, CardCenter, CardContainer, CardImg, CardTitle } from "../style-componentns/card/style";

const CardSeller: React.FC<SellerData> = ({uid, id, name}) => {
    return(
        <CardContainer>
            <CardImg src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Floor-stone_02.JPG/1200px-Floor-stone_02.JPG' />
            <CardBody>
                <CardCenter>
                    <CardTitle>{name}</CardTitle>
                </CardCenter>
            </CardBody>
        </CardContainer>
    )
}

export default CardSeller