import React, { useEffect, useState } from 'react';
import { useParams} from "react-router-dom"


export const Detail = () => {
    const [ detailData, setDetailData ] = useState('')
    const userId = useParams()

    const fechedDetailDate = async () => {
        console.log('test')
        const API_URL_DETAIL = `https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas/${userId.id}`
        fetch(API_URL_DETAIL)
            .then(response => {
                return response.json()
            })
            .then(json => {
                setDetailData(json)
                window.localStorage.setItem('detailData', JSON.stringify(json))
                window.localStorage.setItem('detailDataDate', new Date())
            });
    }

    const checkRetrievedDate = () => {
        const currentDate = new Date()
        const requestDetailDate = new Date(window.localStorage.getItem('detailDataDate'))
        requestDetailDate.setDate(requestDetailDate.getDate() + 1)
        if (currentDate > requestDetailDate) return true
        return false
    }

    useEffect(() => {
        const checkValidate = checkRetrievedDate()
        console.log(checkValidate)
        !checkValidate ? fechedDetailDate() : setDetailData(window.localStorage.getItem('detailDataDate'))
    },[])



    return(
        <div>
            <h4>detail</h4>
            <p>{detailData.first_name}</p>
            <p>{detailData.last_name}</p>
        </div>
    )
}
