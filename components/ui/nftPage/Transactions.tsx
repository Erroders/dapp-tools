import React from 'react';

import { NftTransaction } from './NftTransactionsProps';
import TransactionCard from './TransactionCard';

interface TransactionsProps {
    data: NftTransaction[];
}

const Transactions = ({ data }: TransactionsProps) => {
    return (
        <div className="bg-white border-2 border-black divide-y divide-gray-200 my-2">
            <details className="p-6 group" open>
                <summary className="flex items-center justify-between cursor-pointer">
                    <h5 className="text-lg font-semibold text-gray-900">Transactions</h5>

                    <span className="relative flex-shrink-0 ml-1.5 w-5 h-5">
                        <svg
                            className="flex-shrink-0 ml-1.5 w-5 h-5 transition duration-300 group-open:-rotate-180"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </span>
                </summary>

                <div className="text-sm w-full my-4 grid gap-1.5">
                    <div className="grid grid-cols-5 whitespace-pre-wrap gap-4 font-semibold mb-1.5">
                        <div className="">Event</div>
                        <div className="">Price</div>
                        <div className="">From</div>
                        <div className="">To</div>
                        <div className="">Date</div>
                    </div>

                    <div className="">
                        {data.map((transaction, index) => {
                            return (
                                <div key={index}>
                                    {index != 0 && <div className="border-b border-gray-400 my-1.5"></div>}
                                    <TransactionCard {...transaction} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </details>
        </div>
    );
};

export default Transactions;
