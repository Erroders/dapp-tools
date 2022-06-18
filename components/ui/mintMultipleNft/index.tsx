import { ethers } from 'ethers';
import { useContext, useEffect, useState } from 'react';
import networksData from '../../../data/networks.json';
import { WalletContext } from '../../../pages/_app';
import { deployContract } from '../../../utils/contract_deployer';
import getLicences from '../../../utils/getLicences';
import uploadIpfsData from '../../../utils/nft/uploadIpfsData';
import { NFTCollectionData } from '../../../utils/nft_collection';
import { ERCs } from '../../../utils/types';
import { Button, ImageInput, TextInput, TextInputTypes } from '../generalComponents';
import DropdownInput from '../generalComponents/DropdownInput';

const MintMultipleNft = () => {
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');
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

    const { signer, chainId, walletAddress } = useContext(WalletContext);

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

        if (!name || !symbol || !securityContract || !license) {
            return;
        }

        setStep1Open(false);
        setStep2Open(true);
    };

    const handleStep2Submit = async () => {
        console.log('Clicked Deploy');

        if (!chainId) return;

        if (!nftImage || !nftName || !nftDescription) {
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

            const nftCollectionOpts: NFTCollectionData = {
                name: name,
                symbol: symbol,
                securityContact: securityContract,
                license: license,
            };

            setAfterDeploymentDesc(afterDeploymentDesc + 'Generating Contract . . .\n');

            const contractDetailsPromise = deployContract(nftCollectionOpts, ERCs.NFTCollection, signer, chainId);

            setAfterDeploymentDesc(
                afterDeploymentDesc + 'Deploying Contract . . .\nAwaiting Wallet Confirmation . . .\n',
            );

            const contractDetails = await contractDetailsPromise;

            // console.log(contractDetails);

            if (contractDetails && signer) {
                const contract = new ethers.Contract(contractDetails.contractAddress, contractDetails.abi, signer);
                await contract.safeMint(walletAddress, metadata.url);
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
                            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">NFT Collection</h1>
                            <p className="mt-1.5 text-sm tracking-wide text-gray-500">
                                {
                                    "Allows you to mint multiple assets in one go. Even if each item in the collection is the same image, suppose, it would still have a unique ID on chain for distinction. That's more than enough to be known to mint your own collection."
                                }
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

export default MintMultipleNft;
