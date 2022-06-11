import React from 'react';
import { Card, CardProps } from '../generalComponents';
import _homepageInfo from '../../../data/homepageInfo.json';

interface HomepageInfoProps extends CardProps {
    key: string;
    link: string;
}

const homepageInfo = _homepageInfo as Array<HomepageInfoProps>;

const Homepage = () => {
    return (
        <div className="p-6 max-w-screen-xl mx-auto">
            <div className="grid grid-cols-3 gap-4">
                {homepageInfo.map((value) => {
                    return (
                        <Card
                            title={value.title}
                            key={value.key}
                            description={value.description}
                            icon={value.icon}
                            secondaryTitle={value.secondaryTitle}
                            actionBtnText={value.actionBtnText}
                            actionBtnLink={value.actionBtnLink}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Homepage;
