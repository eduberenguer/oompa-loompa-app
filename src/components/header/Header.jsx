import styled from 'styled-components'
import { Link } from 'react-router-dom'
import LOGO from '../assets/logo-umpa-loompa.png'

const ContainerHeader = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    flex-direction: row;
    background-color: #D8D8D8;
    padding: 5px 0px 5px 15%;
`

const Logo = styled.img`
   height: 35px;
   width: 35px;
   margin-right: 20px;
`

const HeaderText = styled.p`
    font-weight: 800;
`

export const Header = () => {
    return (
        <ContainerHeader>
            <Link to="/"><Logo src={LOGO} alt="logo"></Logo></Link>
            <HeaderText>Oompa Loompa´s Crew</HeaderText>
        </ContainerHeader>
    )
}