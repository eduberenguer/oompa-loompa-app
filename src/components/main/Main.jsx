import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {User} from '../user/User'
import ICON from '../assets/icon_search.png'

const ContainerData = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    max-width: 70%;
    margin: 0 auto;
`

const HeaderMain = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 30px;
    margin-right: 150px;
    position: relative;
`

const ContainerTitle = styled.div`

`

const Input = styled.input`
    padding: 7px;
    border-radius: 8px;

`

const IconSearch = styled.img`
    position: absolute;
    width: 20px;
    height: 20px;
    border-left: solid 1px grey;
    padding-left: 10px;
    padding-right: 10px;
`

export const Main = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataFilter, setDataFilter] = useState("");
    const [page, setPage ] = useState(1)

    const fechedData = async (page) => {
        let URL_API = `https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas?page=${page}`
        const response = await fetch(URL_API)
        const json = await response.json()
        setLoading(false)
        setData(data.concat(json.results))
        const date = new Date()
        window.localStorage.setItem('data', JSON.stringify(data.concat(json.results)))
        window.localStorage.setItem('page', page)
        window.localStorage.setItem('date', date)
    }

    useEffect(() => {
        const currentDate = new Date()
        const requestDate = new Date(window.localStorage.getItem('date')) 
        requestDate.setDate(requestDate.getDate() + 1)
        if(currentDate > requestDate){
            window.localStorage.clear()
            fechedData(page)
        }else{
            setData(JSON.parse(window.localStorage.getItem("data")))
            setPage(JSON.parse(window.localStorage.getItem("page")))
            setLoading(false)
        }
        setLoading(false)
    },[])

    const handleChange = (e) => {
        const value = e.target.value;
        const filter = data && data.filter(item => item.first_name.toLowerCase().includes(value.toLowerCase()) 
                                                   || item.last_name.toLowerCase().includes(value.toLowerCase())
                                                   || item.profession.toLowerCase().includes(value.toLowerCase()));
        setDataFilter(filter);
    }

    const onInView = (e) => {
        e.preventDefault()
        const sumPage = page + 1 
        setPage(sumPage)
        fechedData(sumPage)
    }

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) { onInView(e)}
    }
     
    return (
        <div onScroll={handleScroll}  style={{overflowY: 'scroll', maxHeight: '100vh'}}>
            <HeaderMain>
                <Input placeholder="Search" onChange={handleChange} />
                <IconSearch src={ICON}/>
            </HeaderMain>
            <ContainerTitle>
                <h1>Find your Oompa Loompa</h1>
                <h2>There are more than 100k</h2>
            </ContainerTitle>
            <ContainerData >
                {loading ? <p>Loading...</p> : dataFilter ? <User dataUser={dataFilter}/> : <User dataUser={data}/> }
            </ContainerData>
        </div>
    );
}