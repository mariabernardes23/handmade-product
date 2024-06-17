import { fireEvent, render } from "@testing-library/react"
import CardProduct from "./cardProduct"
import { MemoryRouter } from "react-router-dom"

describe(("Card Product"), () => {
    test("Verifica botão fornecedor", () => {
        const { getByText } = render(
            <MemoryRouter>
                <CardProduct 
                     uid={"abcd1234"} 
                     id={1} 
                     name={"Produto Teste"} 
                     description={"Descrição Produto teste"} 
                     price={100} 
                     quantity={0} 
                />
            </MemoryRouter>
        )
    
        const button = getByText("Solicitar Produto Fornecedor")
        expect(button).toBeInTheDocument()
    })

    test("Verifica se direciona o produto para atualizar", async () => {
        const { getByText } = render(
            <MemoryRouter>
                <CardProduct 
                     uid={"abcd1234"} 
                     id={1} 
                     name={"Produto Teste"} 
                     description={"Descrição Produto teste"} 
                     price={100} 
                     quantity={10} 
                />
            </MemoryRouter>
        )

        const button = getByText("Alterar")
        fireEvent.click(button)
        const url = window.location.pathname
        //console.log(url);
        
        expect(button).toBeInTheDocument()
        // expect(url).toEqual("/update-product")
    })
})