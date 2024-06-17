import styled from "styled-components";

const CardContainer = styled.div`
    border: 0.5rem solid #203936;
    border-radius: 2rem;
    overflow: hidden;
    padding: 1.5rem;
    margin: 4rem 0;
`
const CardBody = styled.div`
    border-bottom: 0.2rem solid #203936;
`

const CardDiv = styled.div`
`

const CardFlex = styled.div`
    display: flex;
    justity-content: flex-start;
    align-items: center;
    margin: 1rem 0;

    @media screen and (max-width: 900px){
        display: block;
    }
`
const CardFlexII = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 1rem;

    @media screen and (max-width: 900px){
        display: block;
    }
`

const CardImg = styled.img`
    height: 5rem;
    border-radius: 0.7rem;
    margin-right: 2rem;

    @media screen and (max-width: 900px){
        margin-right: 0;
        width: 100%;
        height: auto;
    }
`

const CardTitle = styled.h5`
    margin: 0 0 1.5rem 0;
`

const CardText = styled.p`
    margin-right: 2rem;
    text-align: justify;

    @media screen and (max-width: 900px){
        margin-right: 0;
    }
`

const CardButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0.3rem;
    margin: 0 0 0.5rem 0;
    width: 10%;
    background-color: #C52F0C;
    border: 0;
    border-radius: 0.7rem;
    color: #F6ECE2;
    font-size: 1rem;

    &:hover {
        background-color: #D15521;
    }
    
    @media screen and (max-width: 900px){
        width: 30%;
    }

    @media screen and (max-width: 900px){
        width: 100%;
    }
`

export { CardContainer, CardBody, CardDiv, CardFlex, CardFlexII, CardImg, CardTitle, CardText, CardButton}