import styled from "styled-components";

const TableContainer = styled.div`
    overflow-x: auto;
    margin-bottom: 2rem;
`
const Table = styled.table`
    border-collapse: separate;
    border-spacing: 0;
    border: 0.5rem solid #203936;
    border-radius: 0.8rem;
    width: 100%;
    text-align: center;
    overflow: hidden;
`

const TableHeader = styled.thead`
    background-color: #326862;
    color: #FFFFFF;
`

const TableTr = styled.tr`
`

const TableTh = styled.th`
    border: 0.5rem solid #203936;
    padding: 0.5rem;
    text-transform: uppercase;
    font-weight: bold;
`

const TableTd = styled.td`
    border: 0.5rem solid #203936;
    word-wrap: break-word;
    text-justify: inter-word;
    padding: 0.5rem;
`

const TableBody = styled.tbody``

const TableImg = styled.img`
    width: 100%;
    height: 8rem;
    object-fit: contain;

    @media screen and (max-width: 600px){
        height: 6rem;
    }
`

const TableText = styled.p`
    margin: 0;
` 

const TableButton = styled.button`
    cursor: pointer;
    margin: 0 0.4rem;
    background-color: #C52F0C;
    border: 0;
    border-radius: 0.2rem;
    color: #F6ECE2;
    font-size: 1.2rem;

    &:hover {
        background-color: #D15521;
    }
`

export { TableContainer, Table, TableHeader,  TableTr, TableTh, TableBody,  TableTd, TableImg, TableText, TableButton }