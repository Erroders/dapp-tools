import React, { useState } from 'react';
import Input, { InputTypes } from '../generalComponents/Input';

const SingleMint = () => {
    const [nftImage, setNftImage] = useState('');
    const handleImageChange = (imageFile: File) => {
        // setNftImage(imageUrl);
        // TODO: Upload Image on NFT Storage
    };

    return (
        <div>
            <header className="bg-gray-100">
                <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
                    <div className="sm:justify-between sm:items-center sm:flex">
                        <div className="text-center sm:text-left">
                            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Single Mint</h1>
                            <p className="mt-1.5 text-sm tracking-wide text-gray-500">Mint a Unique ERC-721 NFT</p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="p-6 max-w-screen-xl mx-auto">
                <div>
                    <h2 className="text-xl font-semibold">Token Details</h2>
                    <p className="text-sm ml-0.5">Enter token details and choose your network</p>
                    <hr className="my-3 border-gray-300" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="max-w-md">
                        <Input
                            id="nftImage"
                            label="Select Image"
                            type={InputTypes.IMAGE}
                            image={nftImage}
                            imageOnChange={handleImageChange}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 max-w-md">
                        <Input id="name" label="Token Name" type={InputTypes.TEXT} />
                        <Input id="symbol" label="Token Symbol" type={InputTypes.TEXT} />

                        <div className="grid grid-cols-2 gap-4">
                            <Input id="enumerable" label="Enumerable" type={InputTypes.CHECKBOX} />
                            <Input id="uriStorage" label="URI Storage" type={InputTypes.CHECKBOX} />
                            <Input id="burnable" label="Burnable" type={InputTypes.CHECKBOX} />
                            <Input id="pausable" label="Pausable" type={InputTypes.CHECKBOX} />
                            <Input id="mintable" label="Mintable" type={InputTypes.CHECKBOX} />
                            <Input id="incremental" label="Incremental" type={InputTypes.CHECKBOX} />
                            <Input id="accesss" label="Access Control" type={InputTypes.CHECKBOX} />
                        </div>

                        <Input id="securityContact" label="Security Contact" type={InputTypes.TEXT} />
                        <Input id="license" label="License" type={InputTypes.TEXT} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleMint;

/**
{
    "name": "TestNFT",
    "symbol": "TNFT",
    "baseUri": "https://dvsfdg.com/samplenft.png",
    "enumerable": false,
    "uriStorage": true,
    "burnable": false,
    "pausable": false,
    "mintable": true,
    "incremental": false,
    "accesss": "ownable",
    "info": {
        "securityContact": "rg@email.com",
        "license": "MIT"
    }
}
 */
