import React, { useEffect, useState } from 'react'
import { useParams} from 'react-router-dom'
import { fechedDetailData } from '../../api/requestDetail'
import styled from 'styled-components'
import { CustomSpinner } from '../utils/CustomSpinner' 
import { NameUserText, DescriptionUserText, ProfessionUserText, GendreUserText} from '../../components/utils/userText.js'
 
const ContainerDetail = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 70%;
    margin: 0 auto;
    margin-top: 80px;
    @media (max-width: 1300px) {
        flex-direction: column;
    }
`

const ContainerImage = styled.div``

const DetailImage = styled.img`
    width: 320px;
    margin-bottom: 30px;
    @media (min-width: 800px) {
        width: 550px;
    }
    @media (min-width: 1300px) {
        width: 600px;
    }
`

const ContainerInfo = styled.div`
    padding: 0px 20px 0px 20px;
    width: 60%;
    text-align: left;
    @media (max-width: 1300px) {
        padding: 0px;
        width: 100%;
    }
`

export const Detail = () => {
    const [ detailData, setDetailData ] = useState('')
    const [ loading, setLoading ] = useState(true)
    const userId = useParams()

    const checkRetrievedDate = () => {
        const currentDate = new Date()
        const requestDetailDate = window.localStorage.getItem('detailDataDate') && new Date(window.localStorage.getItem('detailDataDate'))
        requestDetailDate && requestDetailDate.setDate(requestDetailDate.getDate() + 1)
        if (requestDetailDate && currentDate > requestDetailDate) return true
        return false
    }

    useEffect(() => {
        const checkValidate = checkRetrievedDate()
        if(!checkValidate){
            fechedDetailData(userId.id).then(res => setDetailData(res))
            setLoading(false)
        }else{
            setDetailData(window.localStorage.getItem('detailDataDate'))
        }

    },[])

    const { image, first_name, last_name, gender, profession, description} = detailData
    console.log(detailData)
    return(
        <div>
            {loading 
                ? <CustomSpinner />
                : <ContainerDetail>
                    <ContainerImage>
                        <DetailImage src={image} alt={first_name} />
                    </ContainerImage>
                    <ContainerInfo>
                        <NameUserText>{first_name} {last_name}</NameUserText>
                        <GendreUserText>{gender}</GendreUserText>
                        <ProfessionUserText>{profession}</ProfessionUserText>
                        <DescriptionUserText dangerouslySetInnerHTML={{__html: detailData.description}}></DescriptionUserText>
                    </ContainerInfo>
                </ContainerDetail>
            }
        </div>
    )
}
