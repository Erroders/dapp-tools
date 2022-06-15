import React, { useState } from 'react';
import uploadIpfsData from '../../../utils/nft/uploadIpfsData';
import { Button, CheckboxInput, ImageInput, TextInput, TextInputTypes } from '../generalComponents';
import RadioInput from '../generalComponents/RadioInput';

const CollectionMint = () => {
    const [name, setName] = useState('');
    // const [uriStorage, setUriStorage] = useState(true);
    const [burnable, setBurnable] = useState(false);
    const [pausable, setPausable] = useState(false);
    const [mintable, setMintable] = useState(true);
    const [supply, setSupply] = useState(false);
    const [access, setAccess] = useState('Ownable');
    const [securityContract, setSecurityContract] = useState('');
    const [license, setLicense] = useState('');

    const [nftImage, setNftImage] = useState<File>();
    const [nftName, setNftName] = useState('');
    const [nftDescription, setNftDescription] = useState('');
    const [nftExternalUrl, setNftExternalUrl] = useState('');

    const [step1Open, setStep1Open] = useState(true);
    const [step2Open, setStep2Open] = useState(false);

    const handleImageChange = (imageFile: File) => {
        setNftImage(imageFile);
    };

    const handleStep1Submit = () => {
        console.log('Clicked Next');

        if (!name || !access || !securityContract || !license) {
            return;
        }

        setStep1Open(false);
        setStep2Open(true);
    };
    const handleStep2Submit = async () => {
        console.log('Clicked Mint');

        if (!nftImage || !nftName || !nftDescription || !nftExternalUrl) {
            return;
        }

        const metadata = await uploadIpfsData({
            name: nftName,
            description: nftDescription,
            externalUrl: nftExternalUrl,
            image: nftImage,
        });

        console.log(metadata);

        // TODO: Upload Image on NFT Storage
        // TODO: Upload Data on NFT Storage
        // TODO: Generate Contract
        // TODO: Mint NFT
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

            <div className="p-6 max-w-screen-xl mx-auto space-y-4">
                <details id="step1" className="bg-white border border-black divide-gray-200 p-6" open={step1Open}>
                    <summary
                        className="flex cursor-pointer"
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <div>
                            <h2 className="text-xl font-semibold">Token Details</h2>
                            <p className="text-sm ml-0.5">Enter token details and choose your network</p>
                        </div>
                    </summary>

                    <hr className="my-3 border-gray-300" />

                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="grid grid-cols-1 gap-4 max-w-md">
                            <TextInput
                                id="name"
                                label="Token Name"
                                type={TextInputTypes.TEXT}
                                value={name}
                                setValue={setName}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <CheckboxInput id="burnable" label="Burnable" value={burnable} setValue={setBurnable} />
                                <CheckboxInput id="pausable" label="Pausable" value={pausable} setValue={setPausable} />
                                <CheckboxInput id="mintable" label="Mintable" value={mintable} setValue={setMintable} />
                                <CheckboxInput id="supply" label="Supply" value={supply} setValue={setSupply} />

                                <RadioInput
                                    id="accesss"
                                    label="Access Control"
                                    value={access}
                                    setValue={setAccess}
                                    valueOptions={[
                                        {
                                            value: 'ownable',
                                            label: 'Ownable',
                                        },
                                        {
                                            value: 'roles',
                                            label: 'Roles',
                                        },
                                    ]}
                                />
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

                            <Button
                                title="Next"
                                onClick={() => {
                                    handleStep1Submit();
                                }}
                                size="sm"
                            />
                        </div>
                    </div>
                </details>

                <details id="step2" className="bg-white border border-black divide-gray-200 p-6" open={step2Open}>
                    <summary
                        className="flex cursor-pointer"
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <div>
                            <h2 className="text-xl font-semibold">NFT Details</h2>
                            <p className="text-sm ml-0.5">Enter NFT Details and upload Image</p>
                        </div>
                    </summary>

                    <hr className="my-3 border-gray-300" />

                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="grid grid-cols-1 gap-4 max-w-md">
                            <div className="max-w-xs">
                                <ImageInput
                                    id="nftImage"
                                    label="Select Image"
                                    image={nftImage}
                                    imageOnChange={handleImageChange}
                                />
                            </div>

                            <TextInput
                                id="nftName"
                                label="NFT Name"
                                type={TextInputTypes.TEXT}
                                value={nftName}
                                setValue={setNftName}
                            />
                            <TextInput
                                id="nftDescription"
                                label="Description"
                                type={TextInputTypes.TEXT}
                                value={nftDescription}
                                setValue={setNftDescription}
                            />

                            <TextInput
                                id="nftExternalUrl"
                                label="External URL"
                                type={TextInputTypes.TEXT}
                                value={nftExternalUrl}
                                setValue={setNftExternalUrl}
                            />

                            <Button
                                title="Mint"
                                onClick={() => {
                                    handleStep2Submit();
                                }}
                                size="sm"
                            />
                        </div>
                    </div>
                </details>
            </div>
        </div>
    );
};

export default CollectionMint;

// {
//     "name": "TestNFTCollection",
//     "uri": "dhsgfdshgvjaghvdf",
//     "burnable": false,
//     "pausable": false,
//     "mintable": false,
//     "supply": true,
//     "accesss": "ownable",
//     "info": {
//         "securityContact": "rg@email.com",
//         "license": "MIT"
//     }
// }
