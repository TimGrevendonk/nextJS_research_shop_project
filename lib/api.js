// custom error class.
export class ApiError extends Error {
    // constructor (parameters for when this class is "called")
    constructor(url, status) {
        // set the error response.
        super(`'${url}' returned ${status}`)
        // the standard stacktrace error to find where the error occures.
        if (Error.captureStackTrace){
            Error.captureStackTrace(this, ApiError);
        }
        // set the name for the stacktrace to display.
        this.name = "ApiError";
        this.status = status;
    }
}

// fetch data from url.
export async function fetchJson(url){
    const response = await fetch(url);
    // of response is not ok, throw (custom) ApiError with given response code.
    if (!response.ok){
        throw new ApiError(url, response.status)
    }
    return await response.json()
}
