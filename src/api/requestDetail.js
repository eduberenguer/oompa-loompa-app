
export const fechedDetailData = async (userId) => {
    const API_URL_DETAIL = `https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas/${userId}`
    const response = await fetch(API_URL_DETAIL)
    const res = await response.json()
    const date = new Date()

    window.localStorage.setItem('detailData', JSON.stringify(res))
    window.localStorage.setItem('detailDataDate', date)

    const { image, first_name, last_name, gender, profession, description } = res

    const user = {
        image,
        first_name,
        last_name, 
        gender: gender == 'F' ? 'Female' : 'Male',
        profession, 
        description
    }

    return user
}