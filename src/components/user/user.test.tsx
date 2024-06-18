import { render } from "@testing-library/react"
import { User } from "."
import { MemoryRouter } from "react-router-dom"
import { UserContext } from "../../context/userContext"

describe(("Compomente User"), () => {
    test("Verificação menssagem quando o usuário não esta logado", () => {
        function addUser() {}
        const user = {
            uid: '',
            name: '',
            email: ''
        }

        const { getByText } = render(
            <MemoryRouter>
                <UserContext.Provider value={{addUser, user}}>
                    <User/>
                </UserContext.Provider>
            </MemoryRouter>
        )
    
        const welcon = getByText("Olá, vendedor(a)!")
        expect(welcon).toBeInTheDocument()
    })
    
    test("Verifica se o botão de login está na tela", () => {
        function addUser() {}
        const user = {
            uid: '',
            name: '',
            email: ''
        }

        const { getByText } = render(
            <MemoryRouter>
                <UserContext.Provider value={{addUser, user}}>
                    <User/>
                </UserContext.Provider>
            </MemoryRouter>
        )
    
        const buttonLogin = getByText("Entrar")
        expect(buttonLogin).toBeInTheDocument()
    })

    test("Verificação menssagem quando o usuário está logado", () => {
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
    
        const welcon = getByText(`Olá, ${user.name}!`)
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