import { useContext, useEffect, useState } from 'react';
import networksData from '../../../data/networks.json';
import { ERC20Data } from '../../../pages/api/erc20';
import { WalletContext } from '../../../pages/_app';
import { deployContract } from '../../../utils/contract_deployer';
import getLicences from '../../../utils/getLicences';
import { ERCs } from '../../../utils/types';
import { Button, CheckboxInput, TextInput, TextInputTypes } from '../generalComponents';
import DropdownInput from '../generalComponents/DropdownInput';
import Heading from './Heading';

const MintErc20 = () => {
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [burnable, setBurnable] = useState(false);
    const [snapshots, setSnapshots] = useState(false);
    const [pausable, setPausable] = useState(false);
    const [premint, setPremint] = useState('');
    const [mintable, setMintable] = useState(false);
    const [permit, setPermit] = useState(false);
    const [votes, setVotes] = useState(false);
    const [flashmint, setFlashmint] = useState(false);
    const [access, setAccess] = useState('ownable');
    const [upgradeable, setUpgradeable] = useState('false');
    const [securityContract, setSecurityContract] = useState('');
    const [license, setLicense] = useState(getLicences()[0].value);
    const [networkName, setNetworkName] = useState('');

    const [afterDeploymentDesc, setAfterDeploymentDesc] = useState<Array<boolean>>([]);
    const [contractAddress, setContractAddress] = useState('');
    const [confirmationLink, setConfirmationLink] = useState('');

    const [step1Open, setStep1Open] = useState(true);
    const [step2Open, setStep2Open] = useState(false);

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

    const handleStep1Submit = async () => {
        console.log('Clicked Mint');

        if (!chainId) return;

        if (!name || !symbol || !premint || !access || !upgradeable || !securityContract || !license) {
            return;
        }

        if (Number.parseInt(premint) < 1) {
            return;
        }

        if (!(access == 'ownable' || access == 'roles' || access == undefined)) {
            return;
        }

        const erc20Opts: ERC20Data = {
            name: name,
            symbol: symbol,
            burnable: burnable,
            pausable: pausable,
            premint: premint,
            mintable: mintable,
            permit: permit,
            accesss: access,
            flashmint: flashmint,
            snapshots: snapshots,
            votes: votes,
            info: {
                securityContact: securityContract,
                license: license,
            },
        };

        const nets = Object.values(networksData).map((n) => {
            return n.network;
        });

        setStep1Open(false);
        setStep2Open(true);

        updateAfterDeploymentDescByIndex(0, true);

        const contractDetailsPromise = deployContract(erc20Opts, ERCs.ERC20, signer, chainId);

        updateAfterDeploymentDescByIndex(1, true);
        updateAfterDeploymentDescByIndex(2, true);

        const contractDetails = await contractDetailsPromise;

        if (contractDetails) {
            updateAfterDeploymentDescByIndex(3, true);
            setContractAddress(contractDetails.contractAddress);
            updateAfterDeploymentDescByIndex(4, true);
            setConfirmationLink(contractDetails.confirmationLink);
            updateAfterDeploymentDescByIndex(5, true);
        } else {
            updateAfterDeploymentDescByIndex(6, true);
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
                            id="premint"
                            label="Premint"
                            type={TextInputTypes.NUMBER}
                            value={premint}
                            setValue={setPremint}
                            minNum={1}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <CheckboxInput id="burnable" label="Burnable" value={burnable} setValue={setBurnable} />
                            <CheckboxInput id="snapshots" label="Snapshots" value={snapshots} setValue={setSnapshots} />
                            <CheckboxInput id="pausable" label="Pausable" value={pausable} setValue={setPausable} />
                            <CheckboxInput id="mintable" label="Mintable" value={mintable} setValue={setMintable} />
                            <CheckboxInput id="permit" label="Permit" value={permit} setValue={setPermit} />
                            <CheckboxInput id="votes" label="Votes" value={votes} setValue={setVotes} />
                            <CheckboxInput id="flashmint" label="Flashmint" value={flashmint} setValue={setFlashmint} />
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
            </div>
        </div>
    );
};

export default MintErc20;
