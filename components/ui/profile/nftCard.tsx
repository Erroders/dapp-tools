import React, { useEffect, useState } from 'react';

// source - https://www.programiz.com/javascript/regex
// function to fetch IPFS hash from any ipfs URL
export function fetchIPFSHash(url: string): string {
    const reguarExp = /ipfs:?\/+/;
    const output = url.split(reguarExp);
    return output[1];
}

interface ICard {
    contractAddress: string;
    contractName: string;
    contractSymbol: string;
    type: 'nft';
    nftData: {
        tokenId: string;
        tokenBalance: string;
        tokenUrl: string;
        ercSupports: string[];
    };
}

interface IIPFSdata {
    ipfsLink: string;
    name: string;
    description: string;
    imageUrl: string;
}

const NFTCard = (props: ICard) => {
    const [ipfsData, setIpfsData] = useState<IIPFSdata>();

    useEffect(() => {
        const fetchData = async (tokenUrl: string) => {
            let link = tokenUrl;
            // check if link is ipfs or not
            if (tokenUrl.includes('ipfs')) {
                const hash = fetchIPFSHash(tokenUrl);
                link = `https://ipfs.io/ipfs/${hash}`;
            }
            const response = await fetch(link, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            });
            const text = await response.json();
            if (text) {
                let imageLink = text.image;
                if (imageLink.includes('ipfs')) {
                    const imageHash = fetchIPFSHash(imageLink);
                    imageLink = `https://ipfs.io/ipfs/${imageHash}`;
                }
                const data: IIPFSdata = {
                    name: text.name,
                    description: text.description,
                    imageUrl: imageLink,
                    ipfsLink: link,
                };
                setIpfsData(data);
            }
        };
        fetchData(props.nftData.tokenUrl);
    }, [props.contractAddress]);

    return (
        <div className="relative block group h-56">
            <span className="absolute inset-0 border-2 border-black border-dashed"></span>

            <div className="relative flex items-end h-full transition-transform transform bg-white border-2 border-black group-hover:-translate-x-2 group-hover:-translate-y-2">
                <img
                    src={ipfsData && ipfsData.imageUrl}
                    className="w-full h-full object-cover absolute opacity-90"
                    alt={props.contractName}
                />
                <div className="w-full h-full justify-end flex flex-col bg-black bg-opacity-10 z-10 transition-opacity group-hover:opacity-0 group-hover:absolute">
                    <h2 className="px-8 text-xl text-white font-bold">{ipfsData && ipfsData.name}</h2>
                    <h2 className="px-8 pb-8 mt-1 text-base font-medium text-white">
                        {props.contractName}
                        {props.contractSymbol && (
                            <span className="text-sm font-semibold"> ({props.contractSymbol})</span>
                        )}
                    </h2>
                </div>

                <div className="absolute w-full h-full bg-black flex justify-end flex-col bg-opacity-50 transition-opacity opacity-0 group-hover:opacity-100 group-hover:relative">
                    <h2 className="px-8 mt-4 text-xl font-bold text-white">{ipfsData && ipfsData.name}</h2>
                    <p className="px-8 text-xl mt-0.5 font-bold text-white">
                        <span className="text-base font-medium">Token ID : </span>
                        {props.nftData.tokenId}
                    </p>
                    <div className="px-8 flex gap-2 items-center mt-3">
                        {props.nftData.ercSupports.map((erc, index) => {
                            return (
                                <div key={index}>
                                    <span className="rounded-full px-4 py-1 bg-green-50 text-green-700 font-medium text-xs">
                                        {erc}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                    <div className=" px-8 pb-4 flex text-xs mt-1.5 font-semibold items-center gap-1 justify-end text-white cursor-pointer">
                        <span>Know More</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NFTCard;
