import React from 'react';
import { Card, CardProps } from '../generalComponents';
import _homepageInfo from '../../../data/homepageInfo.json';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface HomepageInfoProps extends CardProps {
    key: string;
    link: string;
}

const homepageInfo = _homepageInfo as Array<HomepageInfoProps>;

const Homepage = () => {
    const router = useRouter();

    return (
        <div className="p-6 max-w-screen-xl mx-auto">
            <div className="grid grid-cols-3 gap-4">
                {homepageInfo.map((value) => {
                    return (
                        <div
                            key={value.key}
                            className={value.link && 'cursor-pointer'}
                            onClick={() => {
                                router.push(value.link);
                            }}
                        >
                            <Card
                                title={value.title}
                                description={value.description}
                                icon={value.icon}
                                secondaryTitle={value.secondaryTitle}
                                actionBtnText={value.actionBtnText}
                                actionBtnLink={value.actionBtnLink}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Homepage;
