import { render } from "@testing-library/react"
import { User } from "."
import { MemoryRouter } from "react-router-dom"
import { UserContext } from "../../context/userContext"


describe(("Compomente User"), () => {
    test("Verifica a menssagem que aparece quando o usuário não está logado", () => {
        function addUser() {}
        const mockUser = {
            uid: '',
            name: '',
            email: ''
        }

        const { getByText } = render(
            <MemoryRouter>
                <UserContext.Provider value={{addUser, user: mockUser}}>
                    <User/>
                </UserContext.Provider>
            </MemoryRouter>
        )
    
        const welcon = getByText("Olá, vendedor(a)!")
        expect(welcon).toBeInTheDocument()
    })
    
    test("Verifica se o botão de login está na tela", () => {
        function addUser() {}
        const mockUser = {
            uid: '',
            name: '',
            email: ''
        }

        const { getByText } = render(
            <MemoryRouter>
                <UserContext.Provider value={{addUser, user: mockUser}}>
                    <User/>
                </UserContext.Provider>
            </MemoryRouter>
        )
    
        const buttonLogin = getByText("Entrar")
        expect(buttonLogin).toBeInTheDocument()
    })

    test("Verifica a menssagem que aparece quando o usuário está logado", () => {
        function addUser() {}
        const mockUser = {
            uid: '123',
            name: 'Teste Almeida',
            email: 'teste@gmail.com'
        }

        const { getByText } = render(
            <MemoryRouter>
                <UserContext.Provider value={{addUser, user: mockUser}}>
                    <User/>
                </UserContext.Provider>
            </MemoryRouter>
        )
    
        const welcon = getByText(`Olá, ${mockUser.name}!`)
        expect(welcon).toBeInTheDocument()
    })
    
    test("Verifica se o botão de logout está na tela", () => {
        function addUser() {}
        const mockUser = {
            uid: '123',
            name: 'Teste Almeida',
            email: 'teste@gmail.com'
        }

        const { getByText } = render(
            <MemoryRouter>
                <UserContext.Provider value={{addUser, user: mockUser}}>
                    <User/>
                </UserContext.Provider>
            </MemoryRouter>
        )
    
        const buttonLogin = getByText("Sair")
        expect(buttonLogin).toBeInTheDocument()
    })
})