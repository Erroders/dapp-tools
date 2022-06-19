const Heading = () => {
    return (
        <header className="bg-gray-100">
            <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
                <div className="sm:justify-between sm:items-center sm:flex">
                    <div className="text-center sm:text-left">
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Single NFT</h1>
                        <p className="mt-1.5 text-sm tracking-wide text-gray-500">
                            {
                                "Allows you to mint a unique piece of art, one at a time. This is for you if have only one image(or any other media file). But remember that you won't get to expand this into a collection later. That's more than enough to be known to mint your own unique NFT."
                            }
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Heading;
