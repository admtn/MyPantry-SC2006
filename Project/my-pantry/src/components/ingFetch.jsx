import { useState } from "react"

export const ingFetch = (url) => {
    const [data,setData] = useState(null)
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b66fbaaab8msh010a648f16505e6p1e88f1jsn1d336377b0f2',
            'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
        }
    };
    
    useEffect( () => {
      fetch(url, options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err))

      setData(response)
    } , [url])

    return {data}

}