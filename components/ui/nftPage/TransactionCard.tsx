import React from 'react';
import { NftTransaction } from './NftTransactionsProps';

const TransactionCard = ({
    from_address,
    from_address_label,
    to_address,
    to_address_label,
    block_signed_at,
    value,
}: NftTransaction) => {
    const price = Number.parseFloat(value) / 10 ** 18;
    const date = new Date(block_signed_at);

    let dateString = (date.getUTCDate() < 10 ? '0' : '') + date.getUTCDate().toString();
    dateString = dateString + '/' + (date.getUTCMonth() < 10 ? '0' : '') + date.getUTCMonth().toString();
    dateString = dateString + '/' + date.getUTCFullYear().toString();

    return (
        <div className="grid grid-cols-5 whitespace-pre-wrap gap-4">
            <div className="">{price != 0 ? 'Sale' : 'Transfer'}</div>
            <div className="">{price != 0 ? price : ''}</div>
            <div className="truncate">{from_address_label || from_address}</div>
            <div className="truncate">{to_address_label || to_address}</div>
            <div className="truncate">{dateString}</div>
        </div>
    );
};

export default TransactionCard;
