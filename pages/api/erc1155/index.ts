/**
 * @author - rG
 * @resources -
 *  https://github.com/OpenZeppelin/contracts-wizard
 *
 */

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Access, erc1155 as ERC1155, GenericOptions } from '@openzeppelin/wizard';
import compile from '../../../utils/contract_compiler';
import { formatContractName } from '../../../utils/string_formatter';

// type for user provided data for ERC1155 contract
export type ERC1155Data = {
    name: string;
    uri: string;
    burnable?: boolean;
    pausable?: boolean;
    mintable?: boolean;
    supply?: boolean;
    accesss?: Access;
    info?: {
        securityContact?: string;
        license?: string;
    };
};

// request handler
// NOTE: logs "API resolved without sending a response for /api/erc1155, this may result in stalled requests."
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ abi: any; bytecode: any; contract: string; metadata: any } | string>,
) {
    const opts: ERC1155Data = req.body;
    const cb = (result: { abi: any; bytecode: any; contract: string; metadata: any }) => {
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(500).send('Error while creating contract');
        }
    };
    erc1155(opts, cb);
}

// generate ERC1155 contract using OpenZeppelin wizard solidity API
// then pass it to compile method to generate ABI and bytecode
function erc1155(opts: ERC1155Data, cb: any): { abi: any; bytecode: any; contract: string; metadata: any } | void {
    opts.name = formatContractName(opts.name);
    const erc1155_opts: GenericOptions = {
        kind: 'ERC1155',
        ...opts,
        upgradeable: false, //-<
    };
    const contract_code = ERC1155.print(erc1155_opts);
    compile(contract_code, opts.name, cb);
}
