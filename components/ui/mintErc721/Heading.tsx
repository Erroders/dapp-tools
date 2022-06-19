const Heading = () => {
    return (
        <header className="bg-gray-100">
            <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
                <div className="sm:justify-between sm:items-center sm:flex">
                    <div className="text-center sm:text-left">
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">ERC721</h1>
                        <p className="mt-1.5 text-sm tracking-wide text-gray-500">
                            You can make a fungible token using ERC20, but what if not all tokens are alike? This comes
                            up in situations like real estate, voting rights, or collectibles, where some items are
                            valued more than others, due to their usefulness, rarity, etc. ERC721 is a standard for
                            representing ownership of non-fungible tokens, that is, where each token is unique.
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Heading;
