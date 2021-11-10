import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {User} from '../user/User'
import { fechedData } from '../../api/request'
import { HeaderMain } from './HeaderMain'
import { CustomSpinner } from '../utils/CustomSpinner'

const ContainerData = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    max-width: 75%;
    margin: 0 auto;
`

const ContainerTitle = styled.div`
    padding-bottom: 50px;
`

const TitleText = styled.p`
    font-size: 45px;
    margin: 0;
`

const SubTitleText = styled.p`
    font-size: 35px;
    color: #5B5B5B;
    margin: 0;
`

export const Main = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataFilter, setDataFilter] = useState("");
    const [page, setPage ] = useState(1)

    useEffect(() => {
        setLoading(true);
        const currentDate = new Date()
        const requestDate = new Date(window.localStorage.getItem('date')) 
        requestDate && requestDate.setDate(requestDate.getDate() + 1)
        if(currentDate > requestDate){
            window.localStorage.clear()
            fechedData(data, page).then(res => {
                setData(data.concat(res))
                setLoading(false)
            })
        }else{
            setData(JSON.parse(window.localStorage.getItem("data")))
            setPage(JSON.parse(window.localStorage.getItem("page")))
            setLoading(false)
        }
    },[setData])

    const setValueInput = (value) => {
        if(!value){
            setDataFilter("")
            return
        }
        const filter = data && data.filter(item => item.first_name.toLowerCase().includes(value.toLowerCase()) 
                                                || item.last_name.toLowerCase().includes(value.toLowerCase())
                                                || item.profession.toLowerCase().includes(value.toLowerCase()))
        setDataFilter(filter)
    }

    const onInView = (e) => {
        e.preventDefault()
        const sumPage = page + 1 
        setPage(sumPage)
        fechedData(data, sumPage).then(res => setData(data.concat(res)))
    }

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) { onInView(e) }
    }
    return (
        <div onScroll={handleScroll}  style={{overflowY: 'scroll', maxHeight: '100vh'}}>
            <HeaderMain setValueInput={setValueInput}/>
            <ContainerTitle>
                <TitleText>Find your Oompa Loompa</TitleText>
                <SubTitleText>There are more than 100k</SubTitleText>
            </ContainerTitle>
            <ContainerData >
                {loading ? <CustomSpinner />: <User dataUser={!dataFilter ? data : dataFilter}/> }
            </ContainerData>
        </div>
    );
}