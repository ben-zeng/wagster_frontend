export function resolveAPIEndpoint(endpoint) {
    if (process.env.NODE_ENV === 'production')
        return `https://api-wagster.herokuapp.com/api/v1/${endpoint}`;
    else
        return `http://localhost:3000/api/v1/${endpoint}`;
}
