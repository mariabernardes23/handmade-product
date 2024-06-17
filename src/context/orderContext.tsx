import { ReactNode, createContext, useEffect, useState } from "react";
import { ProductData } from "./productContext";
import { addDoc, collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../services/firebaseConnection";

interface OrderProviderProps {
    children: ReactNode;
}

interface OrderContextData {
    addOrder: (nameSeller: string, orders: ProductData[]) => void
    listOrder: OrderData[]
    getDataOrderSeller: (name: string) => void
    listOrderSeller: OrderData[]
}

export interface OrderData {
    uid: string;
    nameSeller: string;
    order: ProductData[]
}

export const OrderContext = createContext({} as OrderContextData)

export function OrderProvider({ children }: OrderProviderProps) {
    const [listOrder, setListOrder] = useState<OrderData[]>([])
    const [listOrderSeller, setListOrderSeller] = useState<OrderData[]>([])

    useEffect(() => {
        getDataOrder()
    }, [listOrder])
    
    async function addOrder(nameSeller: string, orders: ProductData[]) {
        addDoc(collection(db, 'order'), {
            nameSeller: nameSeller,
            orders: orders
        })
        .then(() => {
            console.log("Pedido salvo no banco");
        })
        .catch((error) => {
            console.log(error);  
        })
    }

    function getDataOrder() {
        const orderCollection = collection(db, 'order')
        const queryRef = query(orderCollection)

        onSnapshot(queryRef, (snapshot) => {
            const list = [] as OrderData[]
            snapshot.forEach((doc) => {
                list.push(
                    {
                        uid: doc.id,
                        nameSeller: doc.data().nameSeller,
                        order: doc.data().orders
                    }
                )
            })
            setListOrder(list)
        })
    }

    function getDataOrderSeller(name: string) {
        const orderCollection = collection(db, 'order')
        const queryRef = query(orderCollection, where('nameSeller', '==', name))

        onSnapshot(queryRef, (snapshot) => {
            const list = [] as OrderData[]
            snapshot.forEach((doc) => {
                list.push(
                    {
                        uid: doc.id,
                        nameSeller: doc.data().nameSeller,
                        order: doc.data().orders
                    }
                )
            })
            setListOrderSeller(list)
        })
    }

    return(
        <OrderContext.Provider value={{addOrder, listOrder, getDataOrderSeller, listOrderSeller}}>
            {children}
        </OrderContext.Provider>
    )
}