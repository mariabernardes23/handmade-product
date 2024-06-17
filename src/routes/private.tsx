import { Spinner } from "@phosphor-icons/react";
import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../services/firebaseConnection";
import "./style.css"
import { UserContext } from "../context/userContext";

interface PrivateProps {
    children: ReactNode
}

export function Private({ children }: PrivateProps) {
    const [signed, setSigned] = useState(false)
    const [loading, setLoading] = useState(true)
    const { user } = useContext(UserContext) 

    useEffect(() => {
        // const unsub = onAuthStateChanged(auth, (user) => {
        //     if(user) {
        //         setSigned(true)
        //     } else {
        //         setSigned(false);
        //     }
        //     setLoading(false);
        // })

        // return () => {
        //     unsub()
        // }
        if(user.uid == '' && user.email == '' && user.name == '') {
            setSigned(false)
        } else {
            setSigned(true);
        }
        setLoading(false);
    }, [user])

    if(loading) {
        return (
            <div className="loading">
                <Spinner size={100} weight="bold" className="icon-loading"/>
                <p className="text-loading">Carregando...</p>
            </div>
        )
    }

    if(!signed) {
        return <Navigate  to="/login" />
    }

    return children
}