import { MemoryRouter } from "react-router-dom";
import { ProductData, ProductProvider } from "../../context/productContext";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { Form } from "../form/index";

global.alert = jest.fn();

describe('no formulário', () => {
    test("Verificação se um produto é cadastrado e salvo no banco de dados com sucesso", async () => {
        const product = {} as ProductData;
        const { getByPlaceholderText, getByText } = render(
            <MemoryRouter>
                <ProductProvider>
                    <Form product={product} />
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

    test("Verificação se um produto é criado com dados incopleto", async () => {
        const product = {} as ProductData;
        const { getByPlaceholderText, getByText } = render(
            <MemoryRouter>
                <ProductProvider>
                    <Form product={product} />
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

    test("Verifica se o formulario é preenchido com os dados do produto para alteração", () => {
        const product = {
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
                    <Form product={product} />
                </ProductProvider>
            </MemoryRouter>
        );

        const inputName = getByPlaceholderText("Nome do produto")
        const inputDescription = getByPlaceholderText("Descrição do produto")
        const inputPrice = getByPlaceholderText("Valor do Produto")
        const inputQuantity = getByPlaceholderText("Quantidade")
        const button = getByText("Atualizar")

        expect(inputName).toHaveValue(product.name)
        expect(inputDescription).toHaveValue(product.description)
        expect(inputPrice).toHaveValue(product.price)
        expect(inputQuantity).toHaveValue(product.quantity)
        expect(button).toBeInTheDocument()
    })
});
