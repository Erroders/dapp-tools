// source - https://www.programiz.com/javascript/regex
// function to fetch IPFS hash from any ipfs URL
export function getIPFSUrl(url: string): string {
    let ipfsLink = url;
    if (url && !url.includes('http') && !url.includes('ipfs')) {
        ipfsLink = `https://ipfs.io/ipfs/${url}`;
    } else if (url && url.includes('ipfs')) {
        const reguarExp = /ipfs:?\/+/;
        const hash = url.split(reguarExp)[1];
        ipfsLink = `https://ipfs.io/ipfs/${hash}`;
    }
    return ipfsLink;
}
