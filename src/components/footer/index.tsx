import { FacebookLogo, InstagramLogo, TwitterLogo } from "@phosphor-icons/react";
import "./style.css"

export function Footer() {
    return(
        <footer className="footer">
            <section className="information">
                <p>Todos os direitos reservados.</p>
                <span>
                    <InstagramLogo size={28} weight="fill" className="social-network"/>
                    <TwitterLogo size={28} weight="fill" className="social-network"/>
                    <FacebookLogo size={28}  weight="fill" className="social-network"/>
                </span>
            </section> 
        </footer>
    )
}