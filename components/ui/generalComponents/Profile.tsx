import Image from 'next/image';
import Link from 'next/link';

type Props = {
    img: string;
    name: string;
    twitter?: string;
    github?: string;
    gmail?: string;
    linkedin?: string;
    about: string;
};

const Profile = ({ img, name, about, github, twitter, gmail }: Props) => {
    return (
        <div className="group flex flex-col items-center py-10">
            <div className="relative">
                <span className="absolute h-60 w-60 rounded-full inset-0 border-2 border-black border-dashed"></span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={img}
                    alt={name}
                    className="object-cover h-60 w-60 rounded-full transition-transform transform bg-white border-2 border-black group-hover:-translate-x-1 group-hover:-translate-y-2"
                />
            </div>
            <h5 className="mt-4 text-xl font-bold text-gray-900">{name}</h5>
            <div>
                <ul className="flex justify-center gap-5 my-5">
                    {github && (
                        <li className="cursor-pointer hover:animate-pulse">
                            <Link href={github}>
                                <Image src={'/profile/github.svg'} alt={'github'} width={25} height={25} />
                            </Link>
                        </li>
                    )}
                    {twitter && (
                        <li className="cursor-pointer hover:animate-pulse">
                            <Link href={twitter}>
                                <Image src={'/profile/twitter.svg'} alt={'twitter'} width={30} height={30} />
                            </Link>
                        </li>
                    )}
                    {gmail && (
                        <li className="cursor-pointer hover:animate-pulse">
                            <Link href={gmail}>
                                <Image src={'/profile/gmail.svg'} alt={'gmail'} width={25} height={25} />
                            </Link>
                        </li>
                    )}
                </ul>
                <p className="max-w-sm mt-2 text-gray-700 px-10 flex gap-1">
                    <span className="text-5xl opacity-0 group-hover:opacity-100 transition-transform transform delay-200 group-hover:-translate-y-2">
                        “
                    </span>
                    <span className="text-center group-hover:font-medium">{about}</span>
                    <span className="text-5xl opacity-0 group-hover:opacity-100 transition-transform transform delay-200 group-hover:translate-y-2 self-end">
                        ”
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Profile;
