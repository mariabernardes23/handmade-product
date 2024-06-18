import { SellerData } from "../../context/sellerContext";
import { CardBody, CardCenter, CardContainer, CardImg, CardTitle } from "../style-componentns/card/style";

const CardSeller: React.FC<SellerData> = ({uid, id, name, imgUrl}) => {
    return(
        <CardContainer>
            <CardImg src={imgUrl} />
            <CardBody>
                <CardCenter>
                    <CardTitle>{name}</CardTitle>
                </CardCenter>
            </CardBody>
        </CardContainer>
    )
}

export default CardSeller