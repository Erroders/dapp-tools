/**
 * @author - rG
 * @resources -
 *  https://github.com/OpenZeppelin/contracts-wizard
 *
 */

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Access, erc721 as ERC721, GenericOptions } from '@openzeppelin/wizard';
import compile from '../../../utils/contract_compiler';
import { formatContractName } from '../../../utils/string_formatter';

// type for user provided data for ERC721 contract
export type ERC721Data = {
    name: string;
    symbol: string;
    baseUri?: string;
    enumerable?: boolean;
    uriStorage?: boolean;
    burnable?: boolean;
    pausable?: boolean;
    mintable?: boolean;
    incremental?: boolean;
    votes?: boolean;
    accesss?: Access;
    info?: {
        securityContact?: string;
        license?: string;
    };
};

// request handler
// NOTE: logs "API resolved without sending a response for /api/erc721, this may result in stalled requests."
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ abi: any; bytecode: any; contract: string } | string>,
) {
    const opts: ERC721Data = req.body;
    const cb = (result: { abi: any; bytecode: any; contract: string }) => {
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(500).send('Error while creating contract');
        }
    };
    erc721(opts, cb);
}

// generate ERC721 contract using OpenZeppelin wizard solidity API
// then pass it to compile method to generate ABI and bytecode
function erc721(opts: ERC721Data, cb: any): { contract: string; abi: any; bytecode: any } | void {
    opts.name = formatContractName(opts.name);
    const erc721_opts: GenericOptions = {
        kind: 'ERC721',
        ...opts,
        upgradeable: false, //-<
    };
    const contract_code = ERC721.print(erc721_opts);
    compile(contract_code, opts.name, cb);
}
