import { useCallback, useContext, useEffect, useState } from "react";
import { Table, TableBody, TableButton, TableContainer, TableHeader, TableImg, TableTd, TableText, TableTh, TableTr } from "../style-componentns/table/style";
import { CheckFat, Pencil, Trash } from "@phosphor-icons/react";
import { CartContext, ProductCartData } from "../../context/cartContext";
import { ImageContext } from "../../context/imageContext";

const TableCart: React.FC<ProductCartData> = ({uid, uidProduct, id, name, description, price, quantity}) => {
    const { deleteProductCart, updateProductCart } = useContext(CartContext)
    const [ editProduct, setEditProduct] = useState(false)
    const [ newQuantity, setNewQuantity ] = useState(quantity)
    const { getImage } = useContext(ImageContext);
    const [img, setImg] = useState('')

    useEffect(() => {
        async function getImg() {
            const imageUrl = await getImage(name);
            setImg(imageUrl)
        }

        getImg()
    }, [uid]);
    
    const increment = useCallback(() => {
        setNewQuantity(valueCurrent => valueCurrent + 1)   
    }, [newQuantity])
 
    const decrement = useCallback(() => {
        if(newQuantity == 1) {
            return
        }
        setNewQuantity(valueCurrent => valueCurrent - 1)
    }, [newQuantity])
 
    const updateQuantity = useCallback((uid: string) => {
        console.log(newQuantity);
        if(quantity == newQuantity) {
            setEditProduct(false)
        } else {
            updateProductCart(uid, id, newQuantity)
            setEditProduct(false)
        }
    }, [newQuantity])

    return(
        <>
        <TableContainer>
                <Table>
                    <TableHeader>
                        <TableTr>
                            <TableTh>Produto</TableTh>
                            <TableTh>Quantidade</TableTh>
                            <TableTh>Preço</TableTh>
                            <TableTh>Total</TableTh>
                            <TableTh>Ações</TableTh>
                        </TableTr>
                    </TableHeader>
                    <TableBody>
                        <TableTr>
                            <TableTd>
                                <TableImg src={img} />
                                <TableText>{name}</TableText>
                            </TableTd>
                            
                            <TableTd>
                                {
                                    editProduct ? 
                                    <>
                                        <TableButton onClick={decrement}>-</TableButton>
                                            {newQuantity}
                                        <TableButton onClick={increment}>+</TableButton>
                                        <TableButton onClick={() => updateQuantity(uid)}> <CheckFat size={11} color="#fff5f5" weight="fill" /> </TableButton>
                                    </>
                                    :
                                    <TableText>{quantity}</TableText>
                                }
                            </TableTd>
                            <TableTd>R$ {price.toFixed(2)}</TableTd>
                            <TableTd>R$ {quantity * price}</TableTd>
                            <TableTd>
                                <TableButton onClick={() => setEditProduct(true)}> <Pencil size={24} color="#fff5f5"/> </TableButton>
                                <TableButton onClick={() => deleteProductCart(uid)}> <Trash size={24} color="#fff5f5"/> </TableButton>
                            </TableTd>
                        </TableTr>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default TableCart