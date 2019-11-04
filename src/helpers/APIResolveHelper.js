// (function (exports) {
//
//     function resolveAPIEndpoint(endpoint) {
//
//         if (process.env.NODE_ENV === 'development') {
//             return `http://localhost:3000/api/v1/${endpoint}`
//         }
//         if (process.env.NODE_ENV === 'production') {
//             return `https://api-wagster.herokuapp.com/api/v1/${endpoint}`
//         }
//
//     }
//
//     // const resolveAPIEndpoint = (endpoint) => {
//     //     if (process.env.NODE_ENV === 'development') {
//     //         return `http://localhost:3000/api/v1/${endpoint}`
//     //     }
//     //     if (process.env.NODE_ENV === 'production') {
//     //         return `https://api-wagster.herokuapp.com/api/v1/${endpoint}`
//     //     }
//     // };
//
//     exports.resolveAPIEndpoint = resolveAPIEndpoint;
//
// })(this);

export function resolveAPIEndpoint(endpoint) {
    if (process.env.REACT_APP_STAGE === 'dev')
        return `http://localhost:3000/api/v1/${endpoint}`;
    else
        return `https://api-wagster.herokuapp.com/api/v1/${endpoint}`;

}
