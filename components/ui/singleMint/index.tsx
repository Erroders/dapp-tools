import React, { useState } from 'react';
import { TextInput, TextInputTypes, SubmitButton, ImageInput, CheckboxInput } from '../generalComponents';

const SingleMint = () => {
    const [nftImage, setNftImage] = useState('');

    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [enumerable, setEnumerable] = useState(false);
    const [uriStorage, setUriStorage] = useState(true);
    const [burnable, setBurnable] = useState(false);
    const [pausable, setPausable] = useState(false);
    const [mintable, setMintable] = useState(true);
    const [incremental, setIncremental] = useState(false);
    const [access, setAccess] = useState(false);
    const [securityContract, setSecurityContract] = useState('');
    const [license, setLicense] = useState('');

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
                        <ImageInput
                            id="nftImage"
                            label="Select Image"
                            image={nftImage}
                            imageOnChange={handleImageChange}
                        />
                    </div>

                    <form
                        className="grid grid-cols-1 gap-4 max-w-md"
                        onSubmit={(e) => {
                            e.preventDefault();

                            // TODO: Submit Form
                        }}
                    >
                        <TextInput
                            id="name"
                            label="Token Name"
                            type={TextInputTypes.TEXT}
                            value={name}
                            setValue={setName}
                        />
                        <TextInput
                            id="symbol"
                            label="Token Symbol"
                            type={TextInputTypes.TEXT}
                            value={symbol}
                            setValue={setSymbol}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <CheckboxInput
                                id="enumerable"
                                label="Enumerable"
                                value={enumerable}
                                setValue={setEnumerable}
                            />
                            <CheckboxInput
                                id="uriStorage"
                                label="URI Storage"
                                value={uriStorage}
                                setValue={setUriStorage}
                            />
                            <CheckboxInput id="burnable" label="Burnable" value={burnable} setValue={setBurnable} />
                            <CheckboxInput id="pausable" label="Pausable" value={pausable} setValue={setPausable} />
                            <CheckboxInput id="mintable" label="Mintable" value={mintable} setValue={setMintable} />
                            <CheckboxInput
                                id="incremental"
                                label="Incremental"
                                value={incremental}
                                setValue={setIncremental}
                            />
                            {/* TODO: Make a radio button */}
                            <CheckboxInput id="accesss" label="Access Control" value={access} setValue={setAccess} />
                        </div>

                        <TextInput
                            id="securityContact"
                            label="Security Contact"
                            type={TextInputTypes.TEXT}
                            value={securityContract}
                            setValue={setSecurityContract}
                        />
                        <TextInput
                            id="license"
                            label="License"
                            type={TextInputTypes.TEXT}
                            value={license}
                            setValue={setLicense}
                        />

                        <SubmitButton title="Submit" />
                    </form>
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
