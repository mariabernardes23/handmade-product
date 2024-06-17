import { useCallback, useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/userContext"
import { auth } from "../../services/firebaseConnection"
import { signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import "./style.css"

export function User() {
    const [name, setName] = useState('')
    const { user } = useContext(UserContext)
    const navigate = useNavigate() 
    
    useEffect(() => {
        setName(user.name || 'vendedor(a)')
    },[user])
    
    async function logout() {
        signOut(auth).then(() => {
            console.log('saiu');
        }).catch((error) => {
            console.log(error);
        });
    }

    const login = useCallback(() => {
        navigate('/login', { replace: true })
    }, [])

    return(
        <div className="user-name">
            <h1>Olá, {name}!</h1>
            {
                user.name != "" ? <button onClick={logout} className="button-logout">Sair</button>
                :
                <button onClick={login} className="button-logout">Entrar</button>
            }
        </div>
    )
}