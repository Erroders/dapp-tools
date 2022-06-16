import path from 'path';
import React, { useContext, useState } from 'react';
import { ERC721Data } from '../../../pages/api/erc721';
import { WalletContext } from '../../../pages/_app';
import { deployContract } from '../../../utils/contract_deployer';
import uploadIpfsData from '../../../utils/nft/uploadIpfsData';
import { ERCs } from '../../../utils/types';
import { TextInput, TextInputTypes, ImageInput, CheckboxInput, Button } from '../generalComponents';
import networksData from '../../../data/networks.json';

const MintMultipleNft = () => {
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [securityContract, setSecurityContract] = useState('');
    const [license, setLicense] = useState('');
    const [networkName, setNetworkName] = useState('');

    const [nftImage, setNftImage] = useState<File>();
    const [nftName, setNftName] = useState('');
    const [nftDescription, setNftDescription] = useState('');
    const [nftExternalUrl, setNftExternalUrl] = useState('');

    const [afterDeploymentDesc, setAfterDeploymentDesc] = useState('');

    const [step1Open, setStep1Open] = useState(true);
    const [step2Open, setStep2Open] = useState(false);
    const [step3Open, setStep3Open] = useState(false);

    const walletContext = useContext(WalletContext);
    walletContext.web3Provider?.getNetwork().then((v) => {
        setNetworkName(v.name);
    });

    const handleImageChange = (imageFile: File) => {
        setNftImage(imageFile);
    };

    const handleStep1Submit = () => {
        console.log('Clicked Next');

        if (!name || !symbol || !securityContract || !license) {
            return;
        }

        setStep1Open(false);
        setStep2Open(true);
    };

    const handleStep2Submit = async () => {
        console.log('Clicked Deploy');

        if (!nftImage || !nftName || !nftDescription) {
            return;
        }

        const nets = Object.values(networksData).map((n) => {
            return n.network;
        });

        const currentNetwork = await walletContext.web3Provider?.getNetwork();
        if (!currentNetwork) {
            return;
        }

        const currentChainId = currentNetwork.chainId.toString();
        const currentNetworkName = currentNetwork.name;

        if (!nets.includes(currentNetworkName)) {
            return;
        }

        // TODO: ERROR: Temporary solution for deployContract
        if (!(currentChainId == '80001' || currentChainId == '137')) {
            return;
        }

        setStep2Open(false);
        setStep3Open(true);

        setAfterDeploymentDesc(afterDeploymentDesc + 'Uploading NFT data . . .\n');

        const metadata = await uploadIpfsData({
            name: nftName,
            description: nftDescription,
            externalUrl: nftExternalUrl,
            image: nftImage,
        });

        console.log(metadata.url);

        const erc721pts: ERC721Data = {
            name: name,
            symbol: symbol,
            baseUri: metadata.url,
            info: {
                securityContact: securityContract,
                license: license,
            },
        };

        setAfterDeploymentDesc(afterDeploymentDesc + 'Generating Contarct . . .\n');

        const contractDetailsPromise = deployContract(
            erc721pts,
            ERCs.ERC721,
            walletContext.web3Provider,
            currentChainId,
        );

        setAfterDeploymentDesc(afterDeploymentDesc + 'Deploying Contarct . . .\nAwaiting Wallet Confirmation . . .\n');

        const contractDetails = await contractDetailsPromise;

        // console.log(contractDetails);

        if (contractDetails) {
            setAfterDeploymentDesc(afterDeploymentDesc + 'Deplyoment Successful . . .\n');
            setAfterDeploymentDesc(afterDeploymentDesc + '\n\n');
            setAfterDeploymentDesc(
                afterDeploymentDesc + 'Contarct Address: ' + contractDetails.contractAddress + ' \n',
            );

            const conrtractExplorerUrl =
                new URL(
                    path.join('tx', contractDetails.contractAddress.split('tx/')[1]),
                    networksData[currentChainId].blockExplorerURL,
                ).toString() + '/';

            setAfterDeploymentDesc(afterDeploymentDesc + 'View Details on: ' + conrtractExplorerUrl + ' \n');
        } else {
            setAfterDeploymentDesc(afterDeploymentDesc + 'Deplyoment Failed . . .\n');
        }
    };

    return (
        <div>
            <header className="bg-gray-100">
                <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
                    <div className="sm:justify-between sm:items-center sm:flex">
                        <div className="text-center sm:text-left">
                            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">NFT Collection</h1>
                            <p className="mt-1.5 text-sm tracking-wide text-gray-500">
                                Allows you to mint multiple assets in one go. Even if each item in the collection is the
                                same image, suppose, it would still have a unique ID on chain for distinction. That's
                                more than enough to be known to mint your own collection.
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
                            <p className="text-sm ml-0.5">Upload image and enter NFT Details</p>
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
                            <p className="text-sm ml-0.5">Find Contarct Deployment details</p>
                        </div>
                    </summary>

                    <hr className="my-3 border-gray-300" />

                    <p className="whitespace-pre-line">{afterDeploymentDesc}</p>
                </details>
            </div>
        </div>
    );
};

export default MintMultipleNft;
