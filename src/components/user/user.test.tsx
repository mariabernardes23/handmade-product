import { render } from "@testing-library/react"
import { User } from "."
import { MemoryRouter } from "react-router-dom"
import { UserContext, UserProvider } from "../../context/userContext"

describe(("Verificação sem usuário logado"), () => {
    test("Verifica nome usuário quanto não tem usuario", () => {
        const { getByText } = render(
            <MemoryRouter>
                <UserProvider>
                    <User/>
                </UserProvider>
            </MemoryRouter>
        )
    
        const welcon = getByText(`Olá, vendedor(a)!`)
        expect(welcon).toBeInTheDocument()
    })
    
    test("Verifica botão login", () => {
        const { getByText } = render(
            <MemoryRouter>
                <UserProvider>
                    <User/>
                </UserProvider>
            </MemoryRouter>
        )
    
        const buttonLogin = getByText("Entrar")
        expect(buttonLogin).toBeInTheDocument()
    })
})

describe(("Verificação com usuário logado"), () => {
    test("Verifica nome usuário quanto não tem usuario", () => {
        function addUser() {}
        const user = {
            uid: '123',
            name: 'Teste Almeida',
            email: 'teste@gmail.com'
        }

        const { getByText } = render(
            <MemoryRouter>
                <UserContext.Provider value={{addUser, user}}>
                    <User/>
                </UserContext.Provider>
            </MemoryRouter>
        )
    
        const welcon = getByText(`Olá, Teste Almeida!`)
        expect(welcon).toBeInTheDocument()
    })
    
    test("Verifica botão logout", () => {
        function addUser() {}
        const user = {
            uid: '123',
            name: 'Teste Almeida',
            email: 'teste@gmail.com'
        }

        const { getByText } = render(
            <MemoryRouter>
                <UserContext.Provider value={{addUser, user}}>
                    <User/>
                </UserContext.Provider>
            </MemoryRouter>
        )
    
        const buttonLogin = getByText("Sair")
        expect(buttonLogin).toBeInTheDocument()
    })
})