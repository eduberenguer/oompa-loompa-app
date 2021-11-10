import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ICON from '../assets/icon_search.png'

const ContainerHeaderMain = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 30px;
    max-width: 80%;
    position: relative;
`

const Input = styled.input`
    padding: 7px;
    border-radius: 8px;
    font-weight: 100;
`

const IconSearch = styled.img`
    position: absolute;
    width: 20px;
    height: 20px;
    border-left: solid 1px grey;
    padding-left: 10px;
    padding-right: 10px;
`

export const HeaderMain = (props) => {

    const handleChange = (e) => {
        const value = e.target.value;
        props.setValueInput(value)
    }

    return(
        <ContainerHeaderMain>
            <Input placeholder="Search" onChange={handleChange} />
            <IconSearch src={ICON}/>
        </ContainerHeaderMain>
    )
}