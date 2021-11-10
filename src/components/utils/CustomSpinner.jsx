import styled, { keyframes } from "styled-components"
import LOGO  from '../assets/logo-umpa-loompa.png'

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

export const Loader = styled.img`
  margin-top: 50px;
  width: 2.28571429rem;
  height: 2.28571429rem;
  animation: ${spin} 0.6s linear infinite;
`

export const CustomSpinner = () => {

    return(
        <Loader src={LOGO}/>
    )
}