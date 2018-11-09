export function get_port() {
    return (!process.env.dev) ?
        location.port :
        process.env.dev
}

export async function request(body, type, serverURL){
    return fetch(serverURL + '/' + type, {
        method:"POST",
        body: JSON.stringify(body)
    }).then(response => {return response.json()}).catch(err => {console.error(err)});
}

export async function get_config(serverURL) {
    return fetch(serverURL + '/config', {
        method:"GET"
    }).then(response => {return response.json()}).catch(err => {console.error(err)});
}
