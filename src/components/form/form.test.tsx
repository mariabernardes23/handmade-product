import { MemoryRouter } from "react-router-dom";
import { ProductData, ProductProvider } from "../../context/productContext";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { Form } from "../form/index";

global.alert = jest.fn();

describe('Compomente Form', () => {
    test("Verifica se os dados do produto são capturado pelos inputs do formulário", () => {
        const mockProduct = {} as ProductData;
        const { getByPlaceholderText, getByText } = render(
            <MemoryRouter>
                <ProductProvider>
                    <Form product={mockProduct} />
                </ProductProvider>
            </MemoryRouter>
        );

        const inputName = getByPlaceholderText("Nome do produto")
        const inputDescription = getByPlaceholderText("Descrição do produto")
        const inputPrice = getByPlaceholderText("Valor do Produto")
        const inputQuantity = getByPlaceholderText("Quantidade")
        const button = getByText("Cadastrar")

        expect(inputName).toBeInTheDocument()
        expect(inputDescription).toBeInTheDocument()
        expect(inputPrice).toBeInTheDocument()
        expect(inputQuantity).toBeInTheDocument()
        expect(button).toBeInTheDocument()

        fireEvent.change(inputName, { target: { value: 'Produto Teste' } })
        fireEvent.change(inputDescription, { target: { value: 'Descrição Produto Teste' } })
        fireEvent.change(inputPrice, { target: { value: 100 } })
        fireEvent.change(inputQuantity, { target: { value: 10 } })

        expect(inputName).toHaveValue('Produto Teste')
        expect(inputDescription).toHaveValue('Descrição Produto Teste')
        expect(inputPrice).toHaveValue(100)
        expect(inputQuantity).toHaveValue(10)
    });

    test("Verifica se ocorre o envio do formulário com os dados incompletos", async () => {
        const mockProduct = {} as ProductData;
        const { getByPlaceholderText, getByText } = render(
            <MemoryRouter>
                <ProductProvider>
                    <Form product={mockProduct} />
                </ProductProvider>
            </MemoryRouter>
        );

        const inputName = getByPlaceholderText("Nome do produto");
        const inputDescription = getByPlaceholderText("Descrição do produto");
        const inputPrice = getByPlaceholderText("Valor do Produto");
        const inputQuantity = getByPlaceholderText("Quantidade");
        const button = getByText("Cadastrar")

        expect(inputName).toBeInTheDocument()
        expect(inputDescription).toBeInTheDocument()
        expect(inputPrice).toBeInTheDocument()
        expect(inputQuantity).toBeInTheDocument()
        expect(button).toBeInTheDocument()

        fireEvent.change(inputName, { target: { value: 'Produto Teste' } })
        fireEvent.change(inputDescription, { target: { value: '' } })
        fireEvent.change(inputPrice, { target: { value: 100 } })
        fireEvent.change(inputQuantity, { target: { value: 1 } })
        fireEvent.click(button);

        await waitFor(() => {
            expect(global.alert).toHaveBeenCalledWith("Prencha todos os campos do fomulario!");
        });
    });

    test("Verifica se o formulário é preenchido com os dados do produto para alteração", () => {
        const mockProduct = {
            uid: "abcd123",
            id: 1,
            name: "Nome Produto",
            description: "Descrição Produto",
            price: 10,
            quantity: 100,
        }
        
        const { getByPlaceholderText, getByText } = render(
            <MemoryRouter>
                <ProductProvider>
                    <Form product={mockProduct} />
                </ProductProvider>
            </MemoryRouter>
        );

        const inputName = getByPlaceholderText("Nome do produto")
        const inputDescription = getByPlaceholderText("Descrição do produto")
        const inputPrice = getByPlaceholderText("Valor do Produto")
        const inputQuantity = getByPlaceholderText("Quantidade")
        const button = getByText("Atualizar")

        expect(inputName).toHaveValue(mockProduct.name)
        expect(inputDescription).toHaveValue(mockProduct.description)
        expect(inputPrice).toHaveValue(mockProduct.price)
        expect(inputQuantity).toHaveValue(mockProduct.quantity)
        expect(button).toBeInTheDocument()
    })
})