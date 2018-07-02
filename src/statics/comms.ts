export class Communications {

    constructor() {
    }

    public sendToServer(_data: object): Promise<any> {
        console.log(_data);
        return fetch('http://127.0.0.1:9000', {
            body: JSON.stringify(_data), // must match 'Content-Type' header
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, same-origin, *omit
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json'
            },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // *client, no-referrer
        })
            .then(response => console.log(response)) // parses response to JSON

    }
}