import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

const ContainerUser = styled.div`
    margin: 20px;
`


export const User = (props) => {

    return (
        props.dataUser && props.dataUser.map((item, index) => {
            return (
                <ContainerUser key={item.id} >
                    <Link to={`/${item.id}`}><img src={item.image} alt={item.id} width="400px"/></Link>

                    <p>{item.first_name} {item.last_name}</p>
                    <p>{item.gender == 'F' ? 'Female': 'Male'}</p>
                    <p>{item.profession}</p>
                </ContainerUser>
            )
        })
    )
}