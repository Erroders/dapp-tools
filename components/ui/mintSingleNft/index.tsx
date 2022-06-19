import { useContext, useEffect, useState } from 'react';
import networksData from '../../../data/networks.json';
import { WalletContext } from '../../../pages/_app';
import { deployContract } from '../../../utils/contract_deployer';
import getLicences from '../../../utils/getLicences';
import uploadIpfsData from '../../../utils/nft/uploadIpfsData';
import { SingleNFTData } from '../../../utils/single_nft';
import { ERCs } from '../../../utils/types';
import { Button, ImageInput, TextInput, TextInputTypes } from '../generalComponents';
import DropdownInput from '../generalComponents/DropdownInput';
import Heading from './Heading';

const MintSingleNft = () => {
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [securityContract, setSecurityContract] = useState('');
    const [license, setLicense] = useState(getLicences()[0].value);
    const [networkName, setNetworkName] = useState('');
    const [tokenId, setTokenId] = useState('1');

    const [nftImage, setNftImage] = useState<File>();
    const [nftName, setNftName] = useState('');
    const [nftDescription, setNftDescription] = useState('');
    const [nftExternalUrl, setNftExternalUrl] = useState('');

    const [afterDeploymentDesc, setAfterDeploymentDesc] = useState<Array<boolean>>([]);
    const [contractAddress, setContractAddress] = useState('');
    const [confirmationLink, setConfirmationLink] = useState('');

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

    useEffect(() => {
        setAfterDeploymentDesc(new Array(10).fill(false));
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
    };

    const handleImageChange = (imageFile: File) => {
        setNftImage(imageFile);
    };

    const handleStep1Submit = () => {
        console.log('Clicked Next');

        if (!nftImage || !nftName || !nftDescription) {
            return;
        }

        setStep1Open(false);
        setStep2Open(true);
    };

    const handleStep2Submit = async () => {
        console.log('Clicked Deploy');

        if (!chainId) return;

        if (!name || !symbol || !securityContract || !tokenId || !license) {
            return;
        }

        const nets = Object.values(networksData).map((n) => {
            return n.network;
        });

        setStep2Open(false);
        setStep3Open(true);

        updateAfterDeploymentDescByIndex(0, true);

        const metadata = await uploadIpfsData({
            name: nftName,
            description: nftDescription,
            externalUrl: nftExternalUrl,
            image: nftImage,
        });

        if (metadata) {
            console.log(metadata.url);

            const singleNftOpts: SingleNFTData = {
                name: name,
                symbol: symbol,
                tokenId: Number.parseInt(tokenId),
                uri: metadata.url,
                securityContact: securityContract,
                license: license,
            };
            updateAfterDeploymentDescByIndex(1, true);

            const contractDetailsPromise = deployContract(singleNftOpts, ERCs.SingleNFT, signer, chainId);

            updateAfterDeploymentDescByIndex(2, true);
            updateAfterDeploymentDescByIndex(3, true);

            const contractDetails = await contractDetailsPromise;

            if (contractDetails) {
                updateAfterDeploymentDescByIndex(4, true);
                setContractAddress(contractDetails.contractAddress);
                updateAfterDeploymentDescByIndex(5, true);
                setConfirmationLink(contractDetails.confirmationLink);
                updateAfterDeploymentDescByIndex(6, true);
            } else {
                updateAfterDeploymentDescByIndex(7, true);
            }
        }
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
                            title="Next"
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
                            id="tokenId"
                            label="Token ID"
                            type={TextInputTypes.NUMBER}
                            value={tokenId}
                            setValue={setTokenId}
                            minNum={1}
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

                    <p className={(afterDeploymentDesc[0] ? '' : ' hidden ') + 'whitespace-pre-line'}>
                        {'Uploading NFT data . . .'}
                    </p>
                    <p className={(afterDeploymentDesc[1] ? '' : ' hidden ') + 'whitespace-pre-line'}>
                        {'Generating Contract . . .'}
                    </p>
                    <p className={(afterDeploymentDesc[2] ? '' : ' hidden ') + 'whitespace-pre-line'}>
                        {'Deploying Contract . . .'}
                    </p>
                    <p className={(afterDeploymentDesc[3] ? '' : ' hidden ') + 'whitespace-pre-line'}>
                        {'Awaiting Wallet Confirmation . . .'}
                    </p>
                    <p
                        className={
                            (afterDeploymentDesc[4] ? '' : ' hidden ') + 'whitespace-pre-line text-green-500 font-bold'
                        }
                    >
                        {'Deplyoment Successful . . .'}
                    </p>
                    <br />
                    <p className={(afterDeploymentDesc[5] ? '' : ' hidden ') + 'whitespace-pre-line'}>
                        {'Contract Address: ' + contractAddress}
                    </p>
                    <p className={(afterDeploymentDesc[6] ? '' : ' hidden ') + 'whitespace-pre-line'}>
                        {'View Details on: '}{' '}
                        <a href={confirmationLink} target="_blank" className="text-blue-500 font-semibold">
                            {confirmationLink}
                        </a>
                    </p>
                    <p
                        className={
                            (afterDeploymentDesc[7] ? '' : ' hidden ') + 'whitespace-pre-line text-red-500 font-bold'
                        }
                    >
                        {'Deplyoment Failed . . .'}
                    </p>
                </details>
            </div>
        </div>
    );
};

export default MintSingleNft;
