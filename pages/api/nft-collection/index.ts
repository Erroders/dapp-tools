/**
 * @author - rG
 *
 */

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { nftCollection, NFTCollectionData } from '../../../utils/nft_collection';

// request handler
// NOTE: logs "API resolved without sending a response for /api/erc20x, this may result in stalled requests."
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ abi: any; bytecode: any; contract: string } | string>,
) {
    const opts: NFTCollectionData = req.body;
    const cb = (result: { abi: any; bytecode: any; contract: string }) => {
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(500).send('Error while creating contract');
        }
    };
    nftCollection(opts, cb);
}
