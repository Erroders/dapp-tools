import React from 'react';
import { Card } from '../generalComponents';

const Homepage = () => {
    const icon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
    );

    return (
        <div className="p-6 max-w-screen-xl mx-auto">
            <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6, 7].map(() => {
                    return (
                        <a href="https://google.com">
                            <Card
                                title="Go around the world"
                                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, praesentium voluptatem
                        omnis atque culpa repellendus."
                                actionBtnText="Read more"
                                icon={icon}
                            />
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

export default Homepage;
