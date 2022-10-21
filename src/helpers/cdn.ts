export function CDN(resource: string){
    return process.env.REACT_APP_CDN_URL + resource + "?v=" + process.env.REACT_APP_CDN_VERSION;
}
export default CDN;