import styled from 'styled-components'
import { Link } from 'react-router-dom'
import LOGO from '../assets/logo-umpa-loompa.png'

const ContainerHeader = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    flex-direction: row;
    background-color: #D8D8D8;
    padding-left: 50px;
`

const Logo = styled.img`
   height: 35px;
   width: 35px;
   margin-right: 20px;
`

export const Header = () => {
    return (
        <ContainerHeader>
            <Link to="/"><Logo src={LOGO} alt="logo"></Logo></Link>
            <h4>Oompa Loompa´s Crew</h4>
        </ContainerHeader>
    )
}