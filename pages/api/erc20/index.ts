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

// type for user provided data for ERC20 contract
export type ERC20Data = {
    name: string;
    symbol: string;
    burnable?: boolean;
    pausable?: boolean;
    premint?: string;
    mintable?: boolean;
    permit?: boolean;
    accesss?: Access;
    info?: {
        securityContact?: string;
        license?: string;
    };
};

// request handler
// NOTE: logs "API resolved without sending a response for /api/erc20, this may result in stalled requests."
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ abi: any; bytecode: any; contract: string } | string>,
) {
    const opts: ERC20Data = req.body;
    console.log(opts.name);
    const cb = (result: { abi: any; bytecode: any; contract: string }) => {
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(500).send('Error while creating contract');
        }
    };
    erc20(opts, cb);
}

// generate ERC20 contract using OpenZeppelin wizard solidity API
// then pass it to compile method to generate ABI and bytecode
function erc20(opts: ERC20Data, cb: any): { contract: string; abi: any; bytecode: any } | void {
    const erc20_opts: GenericOptions = {
        kind: 'ERC20',
        name: opts.name,
        symbol: opts.symbol,
        burnable: opts.burnable,
        snapshots: false, //-<
        pausable: opts.pausable,
        premint: opts.premint,
        mintable: opts.mintable,
        permit: opts.permit,
        votes: false, //-<
        flashmint: false, //-<
        access: opts.accesss,
        upgradeable: false, //-<
        info: opts.info,
    };
    const erc20_contract = buildGeneric(erc20_opts);
    const contract_code = printContract(erc20_contract);
    compile(contract_code, opts.name, cb);
}
