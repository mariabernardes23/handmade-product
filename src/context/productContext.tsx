import { addDoc, collection, deleteDoc, doc, getDocs, limit, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
import { ReactNode, createContext, useEffect, useState } from "react";
import { db } from "../services/firebaseConnection";

interface ProductProviderProps {
    children: ReactNode;
}

interface ProductContextData {
    addProduct: (name: string, description: string, price: number, quantity: number) => void;
    listProduct: ProductData[]
    updateProduct: (uid: string, id: number, name: string, description: string, price: number, quantity: number) => void;
    updateQuatityProduct: (uid: string, id: number, quantity: number) => void;
    deleteProduct: (uid: string) => void
}

export interface ProductData {
    uid: string;
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
}

export const ProductContext = createContext({} as ProductContextData)

export function ProductProvider({ children } : ProductProviderProps ) {
    const [listProduct, setListProduct] = useState<ProductData[]>([])
  
    useEffect(() => {
        getProducts()
    }, [listProduct])

    async function getId() {
        const productCollection = collection(db, 'product')
        const queryRef = query(productCollection, orderBy('id', 'desc'), limit(1)) 

        const snapshot = await getDocs(queryRef)
        
        if(snapshot.empty) {
            return 1
        } else {
            return snapshot.docs[0].data().id + 1
        }
    }

    async function checkProduct(id: number) {
        const productCollection = collection(db, 'product')
        const queryRef = query(productCollection, where('id', '==', id))
        const snapshot = await getDocs(queryRef)
        const product = {
            uid: '',
            id: 0,
            name: '',
            description: '',
            price: 0,
            quantity: 0,
            isProduct: false,
        }

        snapshot.forEach((doc) => {
            product.uid = doc.id
            product.id = doc.data().id
            product.name = doc.data().name
            product.description = doc.data().description
            product.price = doc.data().price
            product.quantity = doc.data().quantity
            product.isProduct = true
        })

        return product
    }

    async function addProduct(name: string, description: string, price: number, quantity: number) {  
        const id = await getId()
        const product = await checkProduct(id)
        
        if(product.isProduct) {
            alert('Produto já cadastrado')
        } else {
            await addDoc(collection(db, 'product'), {
                id: id,
                name: name,
                description: description,
                price: price,
                quantity: quantity,
                productAt: new Date()
            })
            .then(() => {
                alert('Produto cadastrado com sucesso')
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }

    function getProducts() {
        const productCollection = collection(db, 'product')
        const queryRef = query(productCollection)
        
        onSnapshot(queryRef, (snapshot) => {
            const list = [] as ProductData[]
            snapshot.forEach((doc) => {
                list.push(
                    {
                        uid: doc.id,
                        id: doc.data().id,
                        name: doc.data().name,
                        description: doc.data().description,
                        price: doc.data().price,
                        quantity: doc.data().quantity
                    }
                )
                setListProduct(list)
            })
        })
    }
    
    async function updateProduct(uid: string, id: number, name: string, description: string, price: number, quantity: number) {
        const index = listProduct.findIndex(item => item.id === id)

        const updateProduct = listProduct[index]

        updateProduct.name = name
        updateProduct.description = description
        updateProduct.price = price
        updateProduct.quantity = quantity

        const docRef = doc(db, 'product', uid)

        await updateDoc(docRef, {
            'name': name,
            'description': description,
            'price': price,
            'quantity': quantity
        })
        .then(() => {
            listProduct.splice(index, 1, updateProduct)
            alert("Produto Atualizado com sucesso")
        })
        .catch((error) => {
            console.log(error);
        })
    }

    async function updateQuatityProduct(uid: string, id: number, quantity: number) {
        const index = listProduct.findIndex(item => item.id === id)
        const updateProduct = listProduct[index]
        
        const newQuantity = updateProduct.quantity - quantity
        updateProduct.quantity = newQuantity

        const docRef = doc(db, 'product', uid)

        await updateDoc(docRef, {
            'quantity': newQuantity
        })
        .then(() => {
            listProduct.splice(index, 1, updateProduct)
            console.log("Produto Atualizado com sucesso")
        })
        .catch((error) => {
            console.log(error);
        })
    }

    async function deleteProduct(uid: string) {
        const docRef = doc(db, 'product', uid)

        await deleteDoc(docRef)
        .then(() => {
            const newListProduct = listProduct.filter(item => item.uid === uid)
            setListProduct(newListProduct)
            alert("Produto deletado com sucesso")
        })
        .catch((error) => {
            console.log(error);
        })
    }
    
    return(
        <ProductContext.Provider value={{addProduct, listProduct, updateProduct, deleteProduct, updateQuatityProduct}}>
            {children}
        </ProductContext.Provider>
    )
}