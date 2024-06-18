import { fireEvent, render, waitFor } from "@testing-library/react"
import CardProduct from "./cardProduct"
import { MemoryRouter } from "react-router-dom"
import { ProductContext } from "../../../context/productContext"
import { Cart } from "../../../pages/cart"
import { CardButton } from "../../style-componentns/card/style"
import { ShoppingCart } from "@phosphor-icons/react"

global.alert = jest.fn();

jest.mock('react-router-dom', () => {
    const nav = jest.fn();
    return {
      ...jest.requireActual('react-router-dom'),
      mockedNavigation: nav,
      useLocation: jest.fn(() => ({ pathname: '/' })),
      useNavigate: jest.fn(() => nav),
    };
});
  
const Router = require('react-router-dom');

describe(("Compomente Card Product"), () => {
    beforeEach(() => {
        jest.clearAllMocks();
      });
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
        

        const button = getByLabelText("Alterar Produto")
        fireEvent.click(button)

        expect(Router.mockedNavigation).toHaveBeenCalledWith("/update-product")
        //console.log(getByLabelText("Alterar Produto"));
        //console.log("click" + fireEvent.click(button));
        

        // const url = window.location.pathname
        // console.log(url);
        
        // expect(button).toBeInTheDocument()
        // expect(url).toEqual("/update-product")
    })

    test("Vericação se ao clicar no botão faz a chamada da função para adicionar o produto no carrinho", async () => {
        const mockAddProductCart = jest.fn()

        const { getByRole } = render(
            <CardButton 
                onClick={() => mockAddProductCart("abcd1234", 1, "Produto Cart", "Descrição Produto Cart", 50, 0)}
            >
                <ShoppingCart size={24} />
            </CardButton>
        )

        const button = getByRole("button")
        fireEvent.click(button)

        expect(mockAddProductCart).toHaveBeenCalledWith("abcd1234", 1, "Produto Cart", "Descrição Produto Cart", 50, 0);
    })
})