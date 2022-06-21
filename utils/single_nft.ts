/**
 * @author - rG
 * @resources -
 *
 */

import compile from './contract_compiler';
import { readFileSync } from 'fs';
import { formatContractName, stringFormat } from './string_formatter';

// type for user provided data for SingleNFT contract
export type SingleNFTData = {
    name: string;
    symbol: string;
    tokenId: number;
    uri: string;
    securityContact?: string;
    license?: string;
};

// generate SingleNFT contract using OpenZeppelin wizard solidity API
// then pass it to compile method to generate ABI and bytecode
export function singleNft(
    opts: SingleNFTData,
    cb: any,
): { abi: any; bytecode: any; contract: string; metadata: any } | void {
    opts.name = formatContractName(opts.name);
    let file: string = readFileSync(`${process.cwd()}/utils/contracts/SingleNFT.sol`, { encoding: 'utf-8' });
    file = stringFormat(file, opts.name, opts.symbol, opts.tokenId, opts.uri, opts.securityContact, opts.license);
    compile(file, opts.name, cb);
}
