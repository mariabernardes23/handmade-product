import { Link } from "react-router-dom";
import { User } from "../../components/user";
import "./style.css"
export function Notfound() {
    return(
        <>
            <User/>
            <div className="error">               
                <img src="../src/assets/erro.jpg" alt="" className="img-error"/>
                <button className="button"><Link to={"/"} className="link">Voltar ao Home</Link></button>
            </div>
        </>
    )
}