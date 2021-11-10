import styled from "styled-components"

export const NameUserText = styled.p`
    font-size: 20px;
    font-weight: bold;
    margin: 0;
`

export const GendreUserText = styled(NameUserText)`
    font-size: 15px;
    font-weight: 300;
`

export const ProfessionUserText = styled(GendreUserText)`
    font-style: italic;
`

export const DescriptionUserText = styled(GendreUserText)`
    margin-top: 20px;
    font-style: italic;
`