const Heading = () => {
    return (
        <header className="bg-gray-100">
            <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
                <div className="sm:justify-between sm:items-center sm:flex">
                    <div className="text-center sm:text-left">
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">NFT Collection</h1>
                        <p className="mt-1.5 text-sm tracking-wide text-gray-500">
                            {
                                "Allows you to mint multiple assets in one go. Even if each item in the collection is the same image, suppose, it would still have a unique ID on chain for distinction. That's more than enough to be known to mint your own collection."
                            }
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Heading;
