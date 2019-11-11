export const GET = "GET";
export const PUT = "PUT";
export const DELETE = "DELETE";
export const POST = "POST";

export enum RequestType {
    GET = 'GET',
    PUT = 'PUT',
    DELETE = 'DELETE',
    POST = 'POST'
}

export enum ContentType {
    APPLICATION_JSON = "application/json",

}

interface RequestOption {
    url: string;
    method: RequestType;
    body?: any;
}

export const request = (options: RequestOption, content_type=ContentType.APPLICATION_JSON, response_type=ContentType.APPLICATION_JSON) => {
    const headers = new Headers();

    if(content_type !== null) {
        headers.append('Content-Type', content_type);
        headers.append('Accept', response_type);
    }

    if(content_type === ContentType.APPLICATION_JSON) {
        options = {
            ...options,
            body: JSON.stringify(options.body)
        }
    }

    // if(localStorage.getItem(ACCESS_TOKEN)) {
    //     headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    // }

    const defaults = {
        headers: headers
    };

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