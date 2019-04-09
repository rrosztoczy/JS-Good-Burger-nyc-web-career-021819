

const adapter = (url) => {
    const headers = {'Content-Type': 'application/json'}
    let getAll = async () => {
        let resp = await fetch(url)
        let jsonResults = await resp.json()
        return jsonResults
      }
      
    let create = async (body) => {
    const configObj = {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
    }
    let resp = await fetch(url, configObj)
    let jsonResults = await resp.json()
    return jsonResults
    }

    return {
        getAll,
        create
    }
}



    // this section belongs back in .js file
    // // initial load:
    // 

    // creatE:
 