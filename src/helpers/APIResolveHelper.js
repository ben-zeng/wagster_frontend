const API_HOST_PRODUCTION = "https://api-wagster.herokuapp.com";
const API_HOST_DEVELOPMENT = "http://localhost:3000";

export function resolveAPIEndpoint(endpoint) {
    if (process.env.NODE_ENV === 'production') {
        return `${API_HOST_PRODUCTION}/api/v1/${endpoint}`;
    }
    else {
        return `${API_HOST_DEVELOPMENT}/api/v1/${endpoint}`;
    }
}

export function resolveAPIImage(imagePath) {
    if (process.env.NODE_ENV === 'production') {
        return `${imagePath}`;
    }
    else {
        return `${API_HOST_DEVELOPMENT}${imagePath}`;
    }
}
