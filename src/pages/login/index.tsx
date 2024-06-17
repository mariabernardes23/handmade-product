import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, } from "firebase/auth"
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
    const { addUser } = useContext(UserContext)

    const handleSubmit = useCallback((e: FormEvent) => {
        e.preventDefault()

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            const end = user.email.indexOf('@')
            const name = user.email.substring(0, end)
            addUser(user.uid, name, user.email)
            navigate('/', { replace: true })
            alert('Login realizado com sucesso')
        })
        .catch((error) => {
            console.log('Erro ao realizar login ' + error);
        })
    }, [email, password]);
 
    const singInGoogle = useCallback(() => {
        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log(user.uid, user.displayName, user.email)
            addUser(user.uid, user.displayName, user.email)
            navigate('/', { replace: true })
            alert('Login realizado com sucesso')
        }).catch((error) => {
            console.log(error);
            console.log(GoogleAuthProvider.credentialFromError(error));
        });
    }, [])
 
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
                    <button onClick={singInGoogle} className="button-login">Entrar Com Google</button>
                </div>
            </form>
        </div>
    )
}