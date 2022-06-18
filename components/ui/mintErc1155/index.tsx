import React, { useContext, useEffect, useState } from 'react';
import { WalletContext } from '../../../pages/_app';
import uploadIpfsData from '../../../utils/nft/uploadIpfsData';
import { Button, CheckboxInput, ImageInput, TextInput, TextInputTypes } from '../generalComponents';
import DropdownInput from '../generalComponents/DropdownInput';
import networksData from '../../../data/networks.json';
import { ERC1155Data } from '../../../pages/api/erc1155';
import { deployContract } from '../../../utils/contract_deployer';
import { ERCs } from '../../../utils/types';
import path from 'path';

const MintErc1155 = () => {
    const [name, setName] = useState('');
    const [burnable, setBurnable] = useState(false);
    const [pausable, setPausable] = useState(false);
    const [mintable, setMintable] = useState(false);
    const [supply, setSupply] = useState(false);
    const [access, setAccess] = useState('Ownable');
    const [upgradeable, setUpgradeable] = useState('false');
    const [securityContract, setSecurityContract] = useState('');
    const [license, setLicense] = useState('');
    const [networkName, setNetworkName] = useState('');

    const [nftImage, setNftImage] = useState<File>();
    const [nftName, setNftName] = useState('');
    const [nftDescription, setNftDescription] = useState('');
    const [nftExternalUrl, setNftExternalUrl] = useState('');
    const [nftQuantity, setNftQuantity] = useState('1');

    const [afterDeploymentDesc, setAfterDeploymentDesc] = useState('');

    const [step1Open, setStep1Open] = useState(true);
    const [step2Open, setStep2Open] = useState(false);
    const [step3Open, setStep3Open] = useState(false);

    const { signer, chainId } = useContext(WalletContext);

    useEffect(() => {
        if (signer) {
            signer.provider?.getNetwork().then((v) => {
                setNetworkName(v.name);
            });
        }
    }, [signer]);

    const handleImageChange = (imageFile: File) => {
        setNftImage(imageFile);
    };

    const handleStep1Submit = () => {
        console.log('Clicked Next');

        if (!name || !access || !upgradeable || !securityContract || !license) {
            return;
        }

        setStep1Open(false);
        setStep2Open(true);
    };

    const handleStep2Submit = async () => {
        console.log('Clicked Mint');

        if (!chainId) return;

        if (!nftImage || !nftName || !nftDescription || !nftQuantity) {
            return;
        }

        if (!(access == 'ownable' || access == 'roles' || access == undefined)) {
            return;
        }

        const nets = Object.values(networksData).map((n) => {
            return n.network;
        });

        setStep2Open(false);
        setStep3Open(true);

        setAfterDeploymentDesc(afterDeploymentDesc + 'Uploading NFT data . . .\n');

        const metadata = await uploadIpfsData({
            name: nftName,
            description: nftDescription,
            externalUrl: nftExternalUrl,
            image: nftImage,
        });

        if (metadata) {
            console.log(metadata);

            const erc1155pts: ERC1155Data = {
                name: name,
                uri: metadata.url,
                burnable: burnable,
                pausable: pausable,
                mintable: mintable,
                supply: supply,
                accesss: access,
                info: {
                    securityContact: securityContract,
                    license: license,
                },
            };

            setAfterDeploymentDesc(afterDeploymentDesc + 'Generating Contract . . .\n');

            const contractDetailsPromise = deployContract(erc1155pts, ERCs.ERC1155, signer, chainId);

            setAfterDeploymentDesc(
                afterDeploymentDesc + 'Deploying Contract . . .\nAwaiting Wallet Confirmation . . .\n',
            );

            const contractDetails = await contractDetailsPromise;

            // console.log(contractDetails);

            if (contractDetails) {
                setAfterDeploymentDesc(afterDeploymentDesc + 'Deplyoment Successful . . .\n');
                setAfterDeploymentDesc(afterDeploymentDesc + '\n\n');
                setAfterDeploymentDesc(
                    afterDeploymentDesc + 'Contract Address: ' + contractDetails.contractAddress + ' \n',
                );

                setAfterDeploymentDesc(
                    afterDeploymentDesc + 'View Details on: ' + contractDetails.confirmationLink + '\n',
                );
            } else {
                setAfterDeploymentDesc(afterDeploymentDesc + 'Deplyoment Failed . . .\n');
            }
        }
    };

    return (
        <div>
            <header className="bg-gray-100">
                <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
                    <div className="sm:justify-between sm:items-center sm:flex">
                        <div className="text-center sm:text-left">
                            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">ERC1155</h1>
                            <p className="mt-1.5 text-sm tracking-wide text-gray-500">
                                A standard interface for contracts that manage multiple token types. A single deployed
                                contract may include any combination of fungible tokens, non-fungible tokens or other
                                configurations (e.g. semi-fungible tokens). The idea is simple and seeks to create a
                                smart contract interface that can represent and control any number of fungible and
                                non-fungible token types. In this way, the ERC-1155 token can do the same functions as
                                an ERC-20 and ERC-721 token, and even both at the same time. And best of all, improving
                                the functionality of both standards, making it more efficient, and correcting obvious
                                implementation errors on the ERC-20 and ERC-721 standards.
                            </p>
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
                            <h2 className="text-xl font-semibold">Contract Details</h2>
                            <p className="text-sm ml-0.5">Enter Contract Details and choose your Network</p>
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
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <DropdownInput
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
                                <DropdownInput
                                    id="upgradeable"
                                    label="Upgradeable"
                                    value={upgradeable}
                                    setValue={setUpgradeable}
                                    valueOptions={[
                                        {
                                            value: 'false',
                                            label: 'False',
                                        },
                                        {
                                            value: 'transparent',
                                            label: 'Transparent',
                                        },
                                        {
                                            value: 'uups',
                                            label: 'Uups',
                                        },
                                    ]}
                                    disabled
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

                            <TextInput
                                id="network"
                                label="Network"
                                type={TextInputTypes.TEXT}
                                value={networkName}
                                setValue={setNetworkName}
                                disabled={true}
                            />

                            <Button
                                title="Deploy"
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
                            <h2 className="text-xl font-semibold">Token Details</h2>
                            <p className="text-sm ml-0.5">Upload image and enter Token Details</p>
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

                            <TextInput
                                id="nftQuantity"
                                label="nftQuantity"
                                type={TextInputTypes.NUMBER}
                                value={nftQuantity}
                                setValue={setNftQuantity}
                                minNum={1}
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

                <details id="step3" className="bg-white border border-black divide-gray-200 p-6" open={step3Open}>
                    <summary
                        className="flex cursor-pointer"
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <div>
                            <h2 className="text-xl font-semibold">Deployment Details</h2>
                            <p className="text-sm ml-0.5">Find Contract Deployment details</p>
                        </div>
                    </summary>

                    <hr className="my-3 border-gray-300" />

                    <p className="whitespace-pre-line">{afterDeploymentDesc}</p>
                </details>
            </div>
        </div>
    );
};

export default MintErc1155;
