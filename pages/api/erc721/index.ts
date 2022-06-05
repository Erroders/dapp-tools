/**
 * @author - rG
 * @resources -
 *  https://github.com/OpenZeppelin/contracts-wizard
 *
 */

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Access, buildGeneric, GenericOptions, printContract } from 'root/packages/core/dist/index';
import compile from '../../../utils/contract_compiler';

// type for user provided data for ERC721 contract
type ERC721Data = {
    name: string;
    symbol: string;
    baseUri: string;
    enumerable: boolean;
    uriStorage: boolean;
    burnable: boolean;
    pausable: boolean;
    mintable: boolean;
    incremental: boolean;
    accesss?: Access;
    info?: {
        securityContact?: string;
        license?: string;
    };
};

// request handler
// NOTE: logs "API resolved without sending a response for /api/erc721, this may result in stalled requests."
export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const opts: ERC721Data = req.body;
    const cb = (result: any) => {
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
    const erc721_opts: GenericOptions = {
        kind: 'ERC721',
        name: opts.name,
        symbol: opts.symbol,
        baseUri: opts.baseUri,
        enumerable: opts.enumerable,
        uriStorage: opts.uriStorage,
        burnable: opts.burnable,
        pausable: opts.pausable,
        mintable: opts.mintable,
        incremental: opts.incremental,
        votes: false,
        access: opts.accesss,
        upgradeable: false, //-<
        info: opts.info,
    };
    const erc721_contract = buildGeneric(erc721_opts);
    const contract_code = printContract(erc721_contract);
    compile(contract_code, opts.name, cb);
}
