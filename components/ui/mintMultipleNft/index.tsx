import { ethers } from 'ethers';
import { useContext, useEffect, useState } from 'react';
import { WalletContext } from '../../../pages/_app';
import { deployContract } from '../../../utils/contract_deployer';
import getLicences from '../../../utils/getLicences';
import uploadIpfsData from '../../../utils/nft/uploadIpfsData';
import { NFTCollectionData } from '../../../utils/nft_collection';
import { ERCs } from '../../../utils/types';
import { Button, ImageInput, TextInput, TextInputTypes } from '../generalComponents';
import DropdownInput from '../generalComponents/DropdownInput';
import Heading from './Heading';

const MintMultipleNft = () => {
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [securityContract, setSecurityContract] = useState('');
    const [license, setLicense] = useState(getLicences()[0].value);
    const [networkName, setNetworkName] = useState('');

    const [contractDetails, setContractDetails] = useState<void | {
        contractAddress: string;
        confirmationLink: string;
        abi: any;
    }>();

    const [nftImage, setNftImage] = useState<File>();
    const [nftName, setNftName] = useState('');
    const [nftDescription, setNftDescription] = useState('');

    const [afterDeploymentDesc, setAfterDeploymentDesc] = useState<Array<boolean>>([]);
    const [contractAddress, setContractAddress] = useState('');
    const [confirmationLink, setConfirmationLink] = useState('');

    const [step1Open, setStep1Open] = useState(true);
    const [step2Open, setStep2Open] = useState(false);
    const [step3Open, setStep3Open] = useState(false);
    const [step4Open, setStep4Open] = useState(false);

    const { signer, chainId, walletAddress } = useContext(WalletContext);

    useEffect(() => {
        if (signer) {
            signer.provider?.getNetwork().then((v) => {
                setNetworkName(v.name);
            });
        }
    }, [signer]);

    useEffect(() => {
        setAfterDeploymentDesc(new Array(30).fill(false));
    }, []);

    const updateAfterDeploymentDescByIndex = (index: number, value: boolean) => {
        setAfterDeploymentDesc(
            afterDeploymentDesc.map((v, i) => {
                if (i == index) {
                    return value;
                }
                return v;
            }),
        );
        console.log(afterDeploymentDesc);
    };

    const handleImageChange = (imageFile: File) => {
        setNftImage(imageFile);
    };

    const handleStep1Submit = async () => {
        console.log('Clicked Deployed');

        if (!chainId) return;

        if (!name || !symbol || !securityContract || !license) {
            return;
        }

        setStep1Open(false);
        setStep2Open(true);

        const nftCollectionOpts: NFTCollectionData = {
            name: name,
            symbol: symbol,
            securityContact: securityContract,
            license: license,
        };

        updateAfterDeploymentDescByIndex(0, true);
        updateAfterDeploymentDescByIndex(1, true);

        const contractDetailsLocal = await deployContract(nftCollectionOpts, ERCs.NFTCollection, signer, chainId);

        updateAfterDeploymentDescByIndex(2, true);

        setContractDetails(contractDetailsLocal);

        console.log(contractDetailsLocal);
        console.log(contractDetails);

        if (contractDetailsLocal) {
            updateAfterDeploymentDescByIndex(3, true);
            setContractAddress(contractDetailsLocal.contractAddress);
            updateAfterDeploymentDescByIndex(4, true);
            setConfirmationLink(contractDetailsLocal.confirmationLink);
            updateAfterDeploymentDescByIndex(5, true);
        } else {
            updateAfterDeploymentDescByIndex(6, true);
        }

        setStep3Open(true);
    };

    const handleStep3Submit = async () => {
        console.log('Clicked Mint');

        if (!nftImage || !nftName || !nftDescription) {
            return;
        }

        setStep3Open(false);
        setStep4Open(true);

        updateAfterDeploymentDescByIndex(7, true);

        const metadata = await uploadIpfsData({
            name: nftName,
            description: nftDescription,
            image: nftImage,
        });

        if (metadata) {
            console.log(metadata.url);

            if (contractDetails && signer) {
                updateAfterDeploymentDescByIndex(8, true);
                const contract = new ethers.Contract(contractDetails.contractAddress, contractDetails.abi, signer);
                await contract.safeMint(walletAddress, metadata.url);
                updateAfterDeploymentDescByIndex(9, true);
            } else {
                updateAfterDeploymentDescByIndex(10, true);
            }
        }

        updateAfterDeploymentDescByIndex(20, true);
    };

    const handleMintMoreSubmit = () => {
        setNftImage(undefined);
        setNftName('');
        setNftDescription('');

        setStep3Open(true);
        setStep4Open(false);
    };

    return (
        <div>
            <Heading />

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
                            label="Token Name*"
                            type={TextInputTypes.TEXT}
                            value={name}
                            setValue={setName}
                        />
                        <TextInput
                            id="symbol"
                            label="Token Symbol*"
                            type={TextInputTypes.TEXT}
                            value={symbol}
                            setValue={setSymbol}
                        />

                        <TextInput
                            id="securityContact"
                            label="Security Contact*"
                            type={TextInputTypes.TEXT}
                            value={securityContract}
                            setValue={setSecurityContract}
                        />
                        <DropdownInput
                            id="license"
                            label="License*"
                            valueOptions={getLicences()}
                            value={license}
                            setValue={setLicense}
                        />

                        <TextInput
                            id="network"
                            label="Network*"
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
                            <h2 className="text-xl font-semibold">Deployment Details</h2>
                            <p className="text-sm ml-0.5">Find Contract Deployment details</p>
                        </div>
                    </summary>

                    <hr className="my-3 border-gray-300" />

                    <p className={(afterDeploymentDesc[0] ? '' : ' hidden ') + 'whitespace-pre-line'}>
                        {'Generating Contract . . .'}
                    </p>
                    <p className={(afterDeploymentDesc[1] ? '' : ' hidden ') + 'whitespace-pre-line'}>
                        {'Deploying Contract . . .'}
                    </p>
                    <p className={(afterDeploymentDesc[2] ? '' : ' hidden ') + 'whitespace-pre-line'}>
                        {'Awaiting Wallet Confirmation . . .'}
                    </p>
                    <p
                        className={
                            (afterDeploymentDesc[3] ? '' : ' hidden ') + 'whitespace-pre-line text-green-500 font-bold'
                        }
                    >
                        {'Deplyoment Successful . . .'}
                    </p>
                    <br />
                    <p className={(afterDeploymentDesc[4] ? '' : ' hidden ') + 'whitespace-pre-line'}>
                        {'Contract Address: ' + contractAddress}
                    </p>
                    <p className={(afterDeploymentDesc[5] ? '' : ' hidden ') + 'whitespace-pre-line'}>
                        {'View Details on: '}{' '}
                        <a href={confirmationLink} target="_blank" className="text-blue-500 font-semibold">
                            {'confirmationLink'}
                        </a>
                    </p>
                    <p
                        className={
                            (afterDeploymentDesc[6] ? '' : ' hidden ') + 'whitespace-pre-line text-red-500 font-bold'
                        }
                    >
                        {'Deplyoment Failed . . .'}
                    </p>
                </details>

                <details id="step3" className="bg-white border border-black divide-gray-200 p-6" open={step3Open}>
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
                                label="Select Image*"
                                image={nftImage}
                                imageOnChange={handleImageChange}
                            />
                        </div>

                        <TextInput
                            id="nftName"
                            label="NFT Name*"
                            type={TextInputTypes.TEXT}
                            value={nftName}
                            setValue={setNftName}
                        />
                        <TextInput
                            id="nftDescription"
                            label="Description*"
                            type={TextInputTypes.TEXT}
                            value={nftDescription}
                            setValue={setNftDescription}
                        />

                        <Button
                            title="Mint"
                            onClick={() => {
                                handleStep3Submit();
                            }}
                            size="sm"
                        />
                    </div>
                </details>

                <details id="step4" className="bg-white border border-black divide-gray-200 p-6" open={step4Open}>
                    <summary
                        className="flex cursor-pointer"
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <div>
                            <h2 className="text-xl font-semibold">Minting Details</h2>
                            <p className="text-sm ml-0.5">Find NFT Minting details</p>
                        </div>
                    </summary>

                    <hr className="my-3 border-gray-300" />

                    <p className={(afterDeploymentDesc[7] ? '' : ' hidden ') + 'whitespace-pre-line'}>
                        {'Uploading NFT data . . .'}
                    </p>

                    <p className={(afterDeploymentDesc[8] ? '' : ' hidden ') + 'whitespace-pre-line'}>
                        {'Minting NFT . . .'}
                    </p>
                    <p
                        className={
                            (afterDeploymentDesc[9] ? '' : ' hidden ') + 'whitespace-pre-line text-green-500 font-bold'
                        }
                    >
                        {'Minting Successful . . .'}
                    </p>
                    <p
                        className={
                            (afterDeploymentDesc[10] ? '' : ' hidden ') + 'whitespace-pre-line text-red-500 font-bold'
                        }
                    >
                        {'Minting Failed . . .'}
                    </p>

                    <div
                        className={(afterDeploymentDesc[20] ? '' : ' hidden ') + 'grid grid-cols-1 mt-6 gap-4 max-w-md'}
                    >
                        <Button
                            title="Mint More"
                            onClick={() => {
                                handleMintMoreSubmit();
                            }}
                            size="sm"
                        />
                    </div>
                </details>
            </div>
        </div>
    );
};

export default MintMultipleNft;
