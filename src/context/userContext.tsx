import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { ReactNode, createContext, useEffect, useState } from "react";
import { auth, db } from "../services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";

interface UserProviderProps {
    children: ReactNode;
}

interface UserContextData {
    addUser: (uid: string, name: string, email: string) => void
    user: UserData
}

interface UserData {
    uid: string;
    name: string;
    email: string;
}

export const UserContext = createContext({} as UserContextData);

export function UserProvider({ children }:  UserProviderProps) {
    const [ user, setUser ] = useState<UserData>({
        uid: '',
        name: '',
        email: '',
    })

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                setUser({
                    uid: user.uid,
                    name: user.displayName || user.email?.split("@")[0],
                    email: user.email
                })
            } else {
                setUser({
                    uid: '',
                    name: '',
                    email: ''
                })
            }
        })
    }, [])

    async function checkUser(uidUser: string) {
        const userCollection = collection(db, 'user')
        const queryRef = query(userCollection)
        const snapshot = await getDocs(queryRef)
        const isUser = snapshot.docs.some(doc => doc.data().uidUser === uidUser)
        
        return isUser
    }

    async function addUser(uid: string, name: string, email: string) {
        if(await checkUser(uid)) {
            console.log("Usuário salvo já");
        } else {
            addDoc(collection(db, 'user'), {
                uidUser: uid,
                name: name,
                email: email,
            })
            .then(() => {
                console.log("Usuário salvo no banco");    
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }

    return(
        <UserContext.Provider value={{addUser, user}}>
            {children}
        </UserContext.Provider>
    )
}