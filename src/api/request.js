
export const fechedData = async (data, page) => {
    let URL_API = `https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas?page=${page}`
    const response = await fetch(URL_API)
    const json = await response.json()
    const date = new Date()

    window.localStorage.setItem('data', JSON.stringify(data.concat(json.results)))
    window.localStorage.setItem('page', page)
    window.localStorage.setItem('date', date)

    return json.results
}