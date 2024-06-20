import { fireEvent, render } from "@testing-library/react"
import CardProduct from "./cardProduct"
import { CardButton } from "../../style-componentns/card/style"
import { ShoppingCart } from "@phosphor-icons/react"
import { MemoryRouter } from "react-router-dom"
import { ImageProvider } from "../../../context/imageContext"

global.alert = jest.fn()

jest.mock('react-router-dom', () => {
    const nav = jest.fn()
    return {
      ...jest.requireActual('react-router-dom'),
      mockedNavigation: nav,
      useNavigate: jest.fn(() => nav),
    }
})
  
const Router = require('react-router-dom')

describe(("Compomente Card Product"), () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    test("Verifica se o botão fornecedor aparece na tela quando a quantidade do produto é igual a 0", () => {
        const { getByText } = render(
            <MemoryRouter>
                <ImageProvider>
                    <CardProduct 
                        uid={"abcd1234"} 
                        id={1} 
                        name={"Produto Teste"} 
                        description={"Descrição Produto teste"} 
                        price={100} 
                        quantity={0} 
                    />
                </ImageProvider>
            </MemoryRouter>
        )
    
        const button = getByText("Solicitar Produto Fornecedor")
        expect(button).toBeInTheDocument()
    })

    test("Verifica se redireciona o produto para a página de atualização", async () => {
        const mockProduct = {
            uid: "abcd123",
            id: 1,
            name: "Nome Produto",
            description: "Descrição Produto",
            price: 10,
            quantity: 100,
        }
        
        const { getByLabelText } = render(
            <Router.MemoryRouter initialEntries={['/']}>
                <ImageProvider> 
                    <CardProduct {...mockProduct} />
                </ImageProvider> 
            </Router.MemoryRouter>
        );

        const button = getByLabelText("Alterar Produto")
        fireEvent.click(button)

        expect(Router.mockedNavigation).toHaveBeenCalledWith(
            '/update-product',
            {
              state: { product: mockProduct },
            }
        )
    })

    test("Vericação se ao clicar no botão faz a chamada da função para adicionar o produto no carrinho com os dados corretos do produto", async () => {
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