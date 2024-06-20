import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, } from "firebase/auth"
import { FormEvent, useCallback, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../../services/firebaseConnection"
import "./style.css"
import { UserContext } from "../../context/userContext"

export function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const provider = new GoogleAuthProvider();
    const { addUser, checkRegister } = useContext(UserContext)

    const handleSubmit = useCallback((e: FormEvent) => {
        e.preventDefault()

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            const end = user.email.indexOf('@')
            const name = user.email.substring(0, end)
            addUser(user.uid, name, user.email)
            navigate('/', { replace: true })
            alert('Login realizado com sucesso!')
        })
        .catch((error) => {
            alert('Email ou senha incorreta!')
            console.log('Erro ao realizar login ' + error);
        })
    }, [email, password]);
 
    const singInGoogle = useCallback(async () => {
        const userCred = await signInWithPopup(auth, provider)
        
        if(userCred) {
            addUser(userCred.user.uid, userCred.user.displayName, userCred.user.email)
            navigate('/', { replace: true })
            alert('Login realizado com sucesso!')
        }
    }, [])

    const createRegister = useCallback(async () => {
        if (await checkRegister(email)) {
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                const end = user.email.indexOf('@')
                const name = user.email.substring(0, end)
                console.log(user.uid, name, user.email);
                addUser(user.uid, name, user.email)
                navigate('/', { replace: true })
                alert('Usuário criado com sucesso!')
            })
            .catch((error) => {
                console.log(error.code);
                console.log(error.message);
            });
        } else {
            alert('Email de usuário já registrado!')
            return
        }
    }, [email, password])
 
    return(
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form-login">
                <input
                    placeholder="seuemail@gmail.com" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    className="input-login"
                />

                <input 
                    placeholder="********"
                    type="password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-login"
                />

                <div className="center">
                    <button type="submit" className="button-login">Entrar</button>
                    <button type="button" onClick={singInGoogle} className="button-login">Entrar Com Google</button>
                </div>

                <div className="center">
                    <button type="button" onClick={createRegister} className="button-login">Criar Usuário</button>
                </div>
            </form>
        </div>
    )
}