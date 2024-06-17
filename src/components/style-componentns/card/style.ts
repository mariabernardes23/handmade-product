import styled from "styled-components";

const CardContainer = styled.div`
    width: 20rem;
    margin: 0 4rem 4rem 4rem;
    border: 0.5rem solid #203936;
    border-radius: 2rem;
    overflow: hidden;

    @media screen and (max-width: 900px){
        margin: 2rem;
        width: 15rem;
    }

    @media screen and (max-width: 600px) {
        width: 40rem; 
        margin: 2rem 1rem;
    }
`

const CardImg = styled.img`
    width: 100%;
    height: 15rem;
    padding: 1rem;
    object-fit: contain;
    border-radius: 2rem;

    @media screen and (max-width: 900px){
        height: 10rem;
    }
`

const CardBody = styled.div`
    padding: 0 1.2rem;
    word-wrap: break-word;
    text-align: justify;
    text-justify: inter-word;
`

const CardFlex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const CardTitle = styled.h5`
    font-size: 1.3rem;
    margin: 0 0 0.5rem 0;
`

const CardText = styled.p`
    font-size: 1rem;
    margin: 0.5rem 0;
`

const CardButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0.3rem;
    margin: 0 0 0.5rem 0;
    width: 30%;
    background-color: #C52F0C;
    border: 0;
    border-radius: 0.7rem;
    color: #F6ECE2;
    font-size: 1rem;

    &:hover {
        background-color: #D15521;
    }
`

const CardButtonII = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0.3rem;
    margin: 0 0 0.5rem 0;
    width: 80%;
    background-color: #C52F0C;
    border: 0;
    border-radius: 0.7rem;
    color: #F6ECE2;
    font-size: 1rem;

    &:hover {
        background-color: #D15521;
    }
    
    @media screen and (max-width: 900px){
       width: 100%;
    }

    @media screen and (max-width: 600px) {
        width: 100%;
    }
`

const CardCenter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export { CardContainer, CardImg, CardBody, CardFlex, CardTitle, CardText, CardButton, CardButtonII, CardCenter }