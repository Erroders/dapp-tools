import React from 'react';
import NftCard from './NftCard';
import NftCollectionTokenProps from './NftCollectionTokenProps';

interface CollectionProps {
    data: Array<NftCollectionTokenProps>;
}

const Collection = ({ data }: CollectionProps) => {
    return (
        <div className="bg-white border-2 border-black divide-y divide-gray-200 my-2">
            <details className="p-6 group" open>
                <summary className="flex items-center justify-between cursor-pointer">
                    <h5 className="text-lg font-semibold text-gray-900">More from this Collection</h5>

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
                    <div className="flex gap-4 overflow-x-scroll p-4">
                        {/* <div className="ml-4"></div> */}
                        {data.map((token, index) => {
                            return (
                                <div key={token.token_id}>
                                    <NftCard {...token} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </details>
        </div>
    );
};

export default Collection;
