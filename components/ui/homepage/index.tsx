/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Card, CardProps } from '../generalComponents';
import _homepageInfo from '../../../data/homepageInfo.json';
import profiles from '../../../data/profiles.json';
import { useRouter } from 'next/router';
import Profile from '../generalComponents/Profile';

interface HomepageInfoProps extends CardProps {
    key: string;
    link: string;
}

const homepageInfo = _homepageInfo as Array<HomepageInfoProps>;

const Homepage = () => {
    const router = useRouter();

    return (
        <div className="p-6 max-w-screen-xl mx-auto">
            <section className="mt-24 mb-16">
                <h1 className="text-3xl text-center my-5 font-medium">
                    Launch your NFTs or cryptocurrencies on any EVM supported chain in just few clicks
                </h1>
                <p className="text-lg text-center px-72">
                    {
                        "No extra fees or hidden charges. Using OpenZeppelin's battle tested and secure standard contract library. No overhead of writing code or hiring a developer."
                    }
                </p>
            </section>
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
                                subtitle={value.subtitle}
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
            <section id="#developers" className="mt-44 mb-16">
                <h2 className="text-3xl font-medium text-center">Contributors</h2>
                <div className="flex mx-auto justify-center gap-20 my-10">
                    {profiles.map((profile, index) => {
                        return <Profile key={index} {...profile} />;
                    })}
                </div>
            </section>
            <footer className="h-20 border-t-2 border-black border-dashed flex flex-col items-center justify-center pt-5">
                <p className="font-semibold">
                    <span className="inline">
                        made with
                        <img src="/profile/hb.png" alt="black heart" className="inline scale-75" />
                    </span>
                </p>
                <p>
                    © {new Date().getFullYear()}
                    <a className="underline" href="https://github.com/Erroders">
                        Erroders
                    </a>
                </p>
            </footer>
        </div>
    );
};

export default Homepage;
