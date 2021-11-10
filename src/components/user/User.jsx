import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { NameUserText, ProfessionUserText, GendreUserText} from '../../components/utils/userText.js'

const ContainerUser = styled.div`
    margin: 20px;
`
const ContainerTextBox = styled.div`
    text-align: left;
    margin-top: 10px;
`
const CustomNameUserText = styled(NameUserText)`
    margin: 2px;
`

export const User = (props) => {

    return (
        props.dataUser && props.dataUser.map((item, index) => {
            return (
                <ContainerUser key={item.id} >
                    <Link to={`/${item.id}`}><img src={item.image} alt={item.id} width="400px"/></Link>
                    <ContainerTextBox>
                        <CustomNameUserText>{item.first_name} {item.last_name}</CustomNameUserText>
                        <GendreUserText>{item.gender == 'F' ? 'Female': 'Male'}</GendreUserText>
                        <ProfessionUserText>{item.profession}</ProfessionUserText>
                    </ContainerTextBox>
                </ContainerUser>
            )
        })
    )
}