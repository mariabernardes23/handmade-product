import { List } from "@phosphor-icons/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css"

export function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className='navbar'>
      <Link to="/" className="name-logo">
        <img src="../src/assets/mais-vendidos.png" alt="" className="icon"/>
        <p className='name'>Produtos Artesanais</p>
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <List size={32} weight="bold" className="icon-menu"/>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <Link to={'/'} className='link'>Home</Link>
        </li>
        <li>
          <Link to={'/create-product'} className='link'>Cadastrar</Link>
        </li>
        <li>
          <Link to={'/sellers'} className="link">Vendedores</Link>
        </li>
        <li>
          <Link to={'/cart'} className='link'>Carrinho</Link>
        </li>
        <li>
          <Link to={'/order-history'} className="link">Pedidos</Link>
        </li>
      </ul>
    </nav>
  )
}