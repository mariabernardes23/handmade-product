import { FormEvent, useCallback, useContext, useState } from "react"
import { ProductContext, ProductData } from "../../context/productContext"
import "./style.css"
import { useNavigate } from "react-router-dom"


export function Form(props: { product: ProductData}) {
    const [name, setName] = useState( props.product.name || '')
    const [description, setDescription] = useState(props.product.description ||'')
    const [price, setPrice] = useState(props.product.price || 0)
    const [quantity, setQuantity] = useState(props.product.quantity || 0)
    const { addProduct, updateProduct } = useContext(ProductContext)
    const navigate = useNavigate()
    
    const clearField = useCallback(() => {
        setName('')
        setDescription('')
        setPrice(0)
        setQuantity(0)
    }, [])

    const handleSubmit = useCallback((e: FormEvent) => {
        e.preventDefault()
        if(name == '' || description == '' || price == 0 || quantity == 0) {
            alert("Prencha todos os campos do fomulario!")
            return
        } else {
            if(props.product.uid == null) { 
                addProduct(name, description, price, quantity)
            } else {
                updateProduct(props.product.uid, props.product.id, name, description, price, quantity)
            }
            clearField()
            navigate('/', { replace: true })
        }
    }, [name, description, price, quantity])
    
    return(

        <form onSubmit={handleSubmit} className="form">
            <h1 className="header">{props.product.uid == null ? 'Cadastro de Produto' : 'Atualização do Produto'}</h1>
            <input 
                placeholder="Nome do produto"
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
            />

            <textarea 
                placeholder="Descrição do produto"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input"
            />

            <input 
                placeholder="Valor do Produto"
                type="number"
                min={1}
                step={0.5}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="input"
            />

            <input 
                placeholder="Quantidade"
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="input"
            />

            <div className="center">
                <button type="submit" className="button">{props.product.uid == null ? 'Cadastrar' : 'Atualizar'}</button>
            </div>
        </form>
    )
}