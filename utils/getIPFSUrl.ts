// source - https://www.programiz.com/javascript/regex
// function to fetch IPFS hash from any ipfs URL
export async function getIPFSUrl(url: string): Promise<string> {
    let ipfsLink = url;
    if (url && url.includes('ipfs')) {
        const reguarExp = /ipfs:?\/+/;
        const hash = url.split(reguarExp)[1];
        ipfsLink = `https://ipfs.io/ipfs/${hash}`;
    }
    return ipfsLink;
}
