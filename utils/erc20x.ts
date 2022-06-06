/**
 * @author - rG
 * @resources -
 *  https://docs.superfluid.finance/superfluid/developers/developer-guides/super-tokens
 *  https://github.com/superfluid-finance/CustomSuperTokens
 *
 */

import compile from './contract_compiler';
import { readFileSync } from 'fs';

// type for user provided data for ERC20x contract
export type ERC20xData = {
    name: string;
    symbol: string;
    factory: string;
    supply: string;
    userData: string;
    type: 'Burnable' | 'BurnMint' | 'Capped' | 'Mintable';
};

// https://stackoverflow.com/questions/59934393/typescript-string-format-does-not-exist
function stringFormat(template: string, ...args: any[]) {
    return template.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
    });
}

// generate ERC20x contract using OpenZeppelin wizard solidity API
// then pass it to compile method to generate ABI and bytecode
export function erc20x(opts: ERC20xData, cb: any): { contract: string; abi: any; bytecode: any } | void {
    const erc20x_opts: ERC20xData = {
        name: opts.name,
        symbol: opts.symbol,
        factory: opts.factory,
        supply: opts.supply,
        userData: opts.userData,
        type: opts.type,
    };
    let file: string = readFileSync(`./utils/contracts/${opts.type}SuperToken.sol`, { encoding: 'utf-8' });
    switch (opts.type) {
        case 'Burnable':
            file = stringFormat(file, opts.name, opts.symbol, opts.factory, opts.supply, opts.userData);
            break;
        case 'BurnMint':
            file = stringFormat(file, opts.name, opts.symbol, opts.factory, opts.supply, opts.userData);
            break;
        case 'Capped':
            file = stringFormat(file, opts.name, opts.symbol, opts.factory, opts.supply);
            break;
        case 'Mintable':
            file = stringFormat(file, opts.name, opts.symbol, opts.factory);
            break;
    }
    compile(file, opts.name, cb);
}
