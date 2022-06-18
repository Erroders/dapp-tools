import path from 'path';
import React, { useContext, useEffect, useState } from 'react';
import { ERC721Data } from '../../../pages/api/erc721';
import { WalletContext } from '../../../pages/_app';
import { deployContract } from '../../../utils/contract_deployer';
import uploadIpfsData from '../../../utils/nft/uploadIpfsData';
import { ERCs } from '../../../utils/types';
import { TextInput, TextInputTypes, ImageInput, CheckboxInput, Button } from '../generalComponents';
import DropdownInput from '../generalComponents/DropdownInput';
import networksData from '../../../data/networks.json';
import getLicences from '../../../utils/getLicences';

const MintErc721 = () => {
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [enumerable, setEnumerable] = useState(false);
    const [uriStorage, setUriStorage] = useState(false);
    const [burnable, setBurnable] = useState(false);
    const [pausable, setPausable] = useState(false);
    const [mintable, setMintable] = useState(false);
    const [incremental, setIncremental] = useState(false);
    const [votes, setVotes] = useState(false);
    const [access, setAccess] = useState('ownable');
    const [upgradeable, setUpgradeable] = useState('false');
    const [securityContract, setSecurityContract] = useState('');
    const [license, setLicense] = useState(getLicences()[0].value);
    const [networkName, setNetworkName] = useState('');

    const [nftImage, setNftImage] = useState<File>();
    const [nftName, setNftName] = useState('');
    const [nftDescription, setNftDescription] = useState('');
    const [nftExternalUrl, setNftExternalUrl] = useState('');

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
        console.log('Clicked Deploy');

        console.log({
            name: name,
            symbol: symbol,
            enumerable: enumerable,
            uriStorage: uriStorage,
            burnable: burnable,
            pausable: pausable,
            mintable: mintable,
            incremental: incremental,
            votes: votes,
            access: access,
            upgradeable: upgradeable,
            securityContract: securityContract,
            license: license,
            networkName: networkName,
        });

        if (!name || !symbol || !access || !upgradeable || !securityContract || !license) {
            return;
        }

        setStep1Open(false);
        setStep2Open(true);
    };

    const handleStep2Submit = async () => {
        console.log('Clicked Mint');

        if (!chainId) return;

        if (!nftImage || !nftName || !nftDescription) {
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
            console.log(metadata.url);

            const erc721pts: ERC721Data = {
                name: name,
                symbol: symbol,
                baseUri: metadata.url,
                burnable: burnable,
                pausable: pausable,
                mintable: mintable,
                accesss: access,
                votes: votes,
                enumerable: enumerable,
                incremental: incremental,
                uriStorage: uriStorage,
                info: {
                    securityContact: securityContract,
                    license: license,
                },
            };

            setAfterDeploymentDesc(afterDeploymentDesc + 'Generating Contract . . .\n');

            const contractDetailsPromise = deployContract(erc721pts, ERCs.ERC721, signer, chainId);

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
                    afterDeploymentDesc + 'View Details on: ' + contractDetails.confirmationLink + ' \n',
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
                            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">ERC721</h1>
                            <p className="mt-1.5 text-sm tracking-wide text-gray-500">
                                You can make a fungible token using ERC20, but what if not all tokens are alike? This
                                comes up in situations like real estate, voting rights, or collectibles, where some
                                items are valued more than others, due to their usefulness, rarity, etc. ERC721 is a
                                standard for representing ownership of non-fungible tokens, that is, where each token is
                                unique.
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

                    <div className="grid grid-cols-1 mt-6 gap-4 max-w-md">
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
                            <CheckboxInput id="votes" label="Votes" value={votes} setValue={setVotes} />
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
                        <DropdownInput
                            id="license"
                            label="License"
                            valueOptions={getLicences()}
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

                    <div className="grid grid-cols-1 mt-6 gap-4 max-w-md">
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

export default MintErc721;
