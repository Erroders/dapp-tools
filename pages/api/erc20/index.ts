/**
 * @author - rG
 * @resources -
 *  https://github.com/OpenZeppelin/contracts-wizard
 *
 */

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Access, erc20 as ERC20, GenericOptions } from '@openzeppelin/wizard';
import compile from '../../../utils/contract_compiler';
import { formatContractName } from '../../../utils/string_formatter';

// type for user provided data for ERC20 contract
export type ERC20Data = {
    name: string;
    symbol: string;
    burnable?: boolean;
    snapshots?: boolean;
    pausable?: boolean;
    premint?: string;
    mintable?: boolean;
    permit?: boolean;
    votes?: boolean;
    flashmint?: boolean;
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
    res: NextApiResponse<{ abi: any; bytecode: any; contract: string; metadata: any } | string>,
) {
    const opts: ERC20Data = req.body;
    const cb = (result: { abi: any; bytecode: any; contract: string; metadata: any }) => {
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
function erc20(opts: ERC20Data, cb: any): { abi: any; bytecode: any; contract: string; metadata: any } | void {
    opts.name = formatContractName(opts.name);
    const erc20_opts: GenericOptions = {
        kind: 'ERC20',
        ...opts,
        upgradeable: false, //-<
    };
    ERC20.defaults;
    const contract_code = ERC20.print(erc20_opts);
    compile(contract_code, opts.name, cb);
}
