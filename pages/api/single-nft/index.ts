/**
 * @author - rG
 *
 */

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { singleNft, SingleNFTData } from '../../../utils/single_nft';

// request handler
// NOTE: logs "API resolved without sending a response for /api/erc20x, this may result in stalled requests."
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ abi: any; bytecode: any; contract: string; metadata: any } | string>,
) {
    const opts: SingleNFTData = req.body;
    console.log(opts);
    const cb = (result: { abi: any; bytecode: any; contract: string; metadata: any }) => {
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(500).send('Error while creating contract');
        }
    };
    singleNft(opts, cb);
}
