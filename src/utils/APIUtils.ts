export const GET = "GET";
export const PUT = "PUT";
export const DELETE = "DELETE";
export const POST = "POST";

export type RequestType = typeof GET | typeof PUT | typeof DELETE | typeof POST;

interface RequestOption {
    url: string;
    method: RequestType;
    body?: any;
}

export const request = (options: RequestOption, content_type='application/json') => {
    const headers = new Headers()

    if(content_type !== null) {
        headers.append('Content-Type', content_type)
    }

    // if(localStorage.getItem(ACCESS_TOKEN)) {
    //     headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    // }

    const defaults = {headers: headers };
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};