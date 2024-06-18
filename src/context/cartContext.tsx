import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { db } from "../services/firebaseConnection";

interface CartProviderProps {
    children: ReactNode;
}

interface CartContextData {
    addProductCart: (uidProduct: string, id: number, name: string, description: string, price: number, quantity: number) => void;
    listProductCart: ProductCartData[];
    updateProductCart: (uid: string, id: number, quantity: number) => void;
    deleteProductCart: (uid: string) => void;
    clearCart: () => void;
    totalPrice: number;
    qtdeProductCart: number
}

export interface ProductCartData {
    uid: string;
    uidProduct: string;
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
}

export const CartContext = createContext({} as CartContextData)

export function CartProvider({ children } : CartProviderProps) {
    const [listProductCart, setListProductCart ] = useState<ProductCartData[]>([])
    const [totalProduct, setTotalProduct ] = useState(0)
    
    useEffect(() => {
        getDataProductsCart()
    }, [listProductCart])

    const totalPrice = useMemo(() => {
        let sunPrice = 0
        listProductCart.map((item) => {
            sunPrice = ((item.quantity * item.price) + sunPrice)
        })
        return sunPrice
    }, [listProductCart])

    const qtdeProductCart = useMemo(() => {
        let sunQuantity = 0
        listProductCart.map((item) => {
            sunQuantity = item.quantity + sunQuantity
        })
        return sunQuantity
    }, [listProductCart])

    async function checkProduct(id: number, quantity: number) {
        const cartCollection = collection(db, 'cart')
        const queryRef = query(cartCollection, where('id', '==', id ))
        const snapshot = await getDocs(queryRef)
        const product = {
            uid: '',
            uidProduct: '',
            id: 0,
            name: '',
            description: '',
            price: 0,
            quantity: '',
            isProduct: false
        }
      
        snapshot.forEach((doc) => {
            product.uid = doc.id
            product.uidProduct = doc.data().uidProduct
            product.id = doc.data().id
            product.name = doc.data().name
            product.description = doc.data().description
            product.price = doc.data().price
            product.quantity = quantity == 0 ? (doc.data().quantity + 1) : (doc.data().quantity + quantity)
            product.isProduct = true
        })
        return product
    }

    async function addProductCart(uidProduct: string, id: number, name: string, description: string, price: number, quantity: number){
        const product = await checkProduct(id, quantity)
        if(product.isProduct) {
            updateProductCart(product.uid, product.id, Number(product.quantity))
        } else {
            addDoc(collection(db, 'cart'), {
                uidProduct: uidProduct,
                id: id,
                name: name,
                description: description,
                price: price,
                quantity: quantity == 0 ? 1 : quantity,
                cartAt: new Date(),
            })
            .then(() => {
                alert("Produto adicionado ao carrinho!");
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }

    function getDataProductsCart() {
        const cartCollection = collection(db, 'cart')
        const queryRef = query(cartCollection)

        onSnapshot(queryRef, (snapshot) => {
            const list = [] as ProductCartData[]
            snapshot.forEach((doc) => {
                list.push(
                    {
                        uid: doc.id,
                        uidProduct: doc.data().uidProduct,
                        id: doc.data().id,
                        name: doc.data().name,
                        description: doc.data().description,
                        price: doc.data().price,
                        quantity: doc.data().quantity,
                        
                    }
                )
                setListProductCart(list)
            })
        })
    }

    async function updateProductCart(uid: string, id: number, quantity: number) {
        const index = listProductCart.findIndex(item => item.id === id)
        const updateProduct = listProductCart[index]
        
        updateProduct.quantity = quantity;
        console.log(updateProduct.quantity);

        const docRef = doc(db, 'cart', uid)

        await updateDoc(docRef, {
            'quantity': quantity,
        })
        .then(() => {
            listProductCart.splice(index, 1, updateProduct)
            alert("Quantidade Atulizada com sucesso!")
        })
        .catch((error) => {
            console.log("Erro:" + error);
        })
    }

    async function deleteProductCart(uid: string) {
        const docRef = doc(db, 'cart', uid)

        await deleteDoc(docRef)
        .then(() => {
            const newListProduct = listProductCart.filter(item => item.uid !== uid);
            setListProductCart(newListProduct);
            alert("Produto removido do carrinho com sucesso!");
        })
        .catch((error) => {
            console.log(error);
        })
    }

    async function clearCart() {
        const cartCollection = collection(db, 'cart')
        const queryRef = query(cartCollection)
        const snapshot = await getDocs(queryRef)

        snapshot.forEach(async (doc) => {
            console.log(doc.ref);
            
            await deleteDoc(doc.ref)
            .then(() => {
                setListProductCart([])
            })
            .catch((error) => {
                console.log(error);
            })
        })
    }
    
    return(
        <CartContext.Provider value={{ addProductCart, listProductCart, updateProductCart, deleteProductCart, clearCart, totalPrice, qtdeProductCart }}>
            {children}
        </CartContext.Provider>
    )
} 