import { collection, onSnapshot, query } from "firebase/firestore";
import { ReactNode, createContext, useEffect, useState } from "react";
import { db } from "../services/firebaseConnection";

interface SellerProviderProps {
    children: ReactNode;
}

interface SellerContextData {
    listSeller: SellerData [];
}

export interface SellerData {
    uid: string,
    id: number,
    name: string
}

export const SellerContext = createContext({} as SellerContextData)

export function SellerProvider({children} : SellerProviderProps) {
    const [listSeller, setListSeller] = useState<SellerData[]>([])
    
    useEffect(() => {
        getDataSeller()
    }, [])

    function getDataSeller() {
        const sellerCollection = collection(db, 'seller')
        const queryRef = query(sellerCollection)

        onSnapshot(queryRef, (snapshot) => {
            const list = [] as SellerData[]
            snapshot.forEach((doc) => {
                list.push(
                    {
                        uid: doc.id,
                        id: doc.data().id,
                        name: doc.data().name
                    }
                )
                setListSeller(list)
            })
        })
    }

    return(
        <SellerContext.Provider value={{listSeller}}>
            {children}
        </SellerContext.Provider>
    )
}