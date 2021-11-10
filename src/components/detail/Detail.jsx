import React, { useEffect, useState } from 'react'
import { useParams} from 'react-router-dom'
import styled from 'styled-components'
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
    @media (min-width: 800px) {
        width: 550px;
    }
    @media (min-width: 1300px) {
        width: 600px;
    }
`

const ContainerInfo = styled.div`
    padding: 0px 20px 0px 20px;
    text-align: left;
    @media (max-width: 1300px) {
        padding: 0px;
    }
`

export const Detail = () => {
    const [ detailData, setDetailData ] = useState('')
    const [ loading, setLoading ] = useState(true)
    const userId = useParams()

    const fechedDetailDate = async () => {
        const API_URL_DETAIL = `https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas/${userId.id}`
        fetch(API_URL_DETAIL)
            .then(response => {
                return response.json()
            })
            .then(json => {
                setLoading(false)
                setDetailData(json)
                window.localStorage.setItem('detailData', JSON.stringify(json))
                window.localStorage.setItem('detailDataDate', new Date())
            });
    }

    const checkRetrievedDate = () => {
        const currentDate = new Date()
        const requestDetailDate = window.localStorage.getItem('detailDataDate') && new Date(window.localStorage.getItem('detailDataDate'))
        requestDetailDate && requestDetailDate.setDate(requestDetailDate.getDate() + 1)
        if (requestDetailDate && currentDate > requestDetailDate) return true
        return false
    }

    useEffect(() => {
        const checkValidate = checkRetrievedDate()
        !checkValidate ? fechedDetailDate() : setDetailData(window.localStorage.getItem('detailDataDate'))
    },[])

    return(
        <div>
            {loading 
                ? <p>Loading...</p> 
                : <ContainerDetail>
                    <ContainerImage>
                        <DetailImage src={detailData.image} alt={detailData.first_name} />
                    </ContainerImage>
                    <ContainerInfo>
                        <NameUserText>{detailData.first_name} {detailData.last_name}</NameUserText>
                        <GendreUserText>{detailData.gender == 'F' ? 'Female': 'Male'}</GendreUserText>
                        <ProfessionUserText>{detailData.profession}</ProfessionUserText>
                        <DescriptionUserText dangerouslySetInnerHTML={{__html: detailData.description}}></DescriptionUserText>
                    </ContainerInfo>
                </ContainerDetail>
            }
        </div>
    )
}
