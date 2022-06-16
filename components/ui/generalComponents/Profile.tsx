type Props = {
    img: string;
    name: string;
    twitter?: string;
    github?: string;
    linkedin?: string;
    about: string;
};

const Profile = ({ img, name, about }: Props) => {
    return (
        <div className="group flex flex-col items-center justify-between py-10">
            <div className="relative">
                <span className="absolute h-60 w-60 rounded-full inset-0 border-2 border-black border-dashed"></span>
                <img
                    className="object-cover w-full h-60 w-60 rounded-full transition-transform transform bg-white border-2 border-black group-hover:-translate-x-1 group-hover:-translate-y-2"
                    src={img}
                    alt={name}
                />
            </div>
            <h5 className="mt-4 text-xl font-bold text-gray-900">{name}</h5>
            <p className="max-w-sm mt-2 text-gray-700 px-10">{about}</p>
        </div>
    );
};

export default Profile;
