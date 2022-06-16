import React, { useState } from 'react';
import { Button, CheckboxInput, TextInput, TextInputTypes } from '../generalComponents';
import RadioInput from '../generalComponents/RadioInput';

const MintErc20 = () => {
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [burnable, setBurnable] = useState(true);
    const [pausable, setPausable] = useState(true);
    const [premint, setPremint] = useState('');
    const [mintable, setMintable] = useState(true);
    const [permit, setPermit] = useState(false);
    const [access, setAccess] = useState('Ownable');
    const [securityContract, setSecurityContract] = useState('');
    const [license, setLicense] = useState('');

    const handleStep1Submit = () => {
        console.log('Clicked Next');

        if (!name || !symbol || !premint || !access || !securityContract || !license) {
            return;
        }

        // TODO: Generate Contract
        // setStep1Open(false);
        // setStep2Open(true);
    };

    return (
        <div>
            <header className="bg-gray-100">
                <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
                    <div className="sm:justify-between sm:items-center sm:flex">
                        <div className="text-center sm:text-left">
                            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">ERC 20</h1>
                            <p className="mt-1.5 text-sm tracking-wide text-gray-500">Mint a ERC-20 Token</p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="p-6 max-w-screen-xl mx-auto space-y-4">
                <details id="step1" className="bg-white border border-black divide-gray-200 p-6" open={true}>
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
                                defaultValue={1}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <CheckboxInput id="burnable" label="Burnable" value={burnable} setValue={setBurnable} />
                                <CheckboxInput id="pausable" label="Pausable" value={pausable} setValue={setPausable} />
                                <CheckboxInput id="mintable" label="Mintable" value={mintable} setValue={setMintable} />
                                <CheckboxInput id="permit" label="Permit" value={permit} setValue={setPermit} />

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
                                title="Mint"
                                onClick={() => {
                                    handleStep1Submit();
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

export default MintErc20;

// {
//     "name": "TestToken",
//     "symbol": "TST",
//     "burnable": true,
//     "pausable": true,
//     "premint": "", # any interger value as string
//     "mintable": true,
//     "permit": false,
//     "access": "ownable",
//     "info": {
//       "securityContact": "rg@email.com",
//       "license": "MIT"
//     }
// }
