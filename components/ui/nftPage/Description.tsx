import React from 'react';

const Description = ({ description }: { description: string }) => {
    return (
        <div className="bg-white border-2 border-black divide-y divide-gray-200 my-2">
            <details className="p-6 group" open>
                <summary className="flex items-center justify-between cursor-pointer">
                    <h5 className="text-lg font-semibold text-gray-900">Description</h5>

                    <span className="relative flex-shrink-0 ml-1.5 w-5 h-5">
                        <svg
                            className="flex-shrink-0 ml-1.5 w-5 h-5 transition duration-300 group-open:-rotate-180"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </span>
                </summary>

                <p className="py-2 mt-4">{description || 'Description Not Available'}</p>
            </details>
        </div>
    );
};

export default Description;
