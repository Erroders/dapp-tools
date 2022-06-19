const Heading = () => {
    return (
        <header className="bg-gray-100">
            <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
                <div className="sm:justify-between sm:items-center sm:flex">
                    <div className="text-center sm:text-left">
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">ERC20</h1>
                        <p className="mt-1.5 text-sm tracking-wide text-gray-500">
                            An ERC20 token contract keeps track of fungible tokens: any one token is exactly equal to
                            any other token; no tokens have special rights or behavior associated with them. This makes
                            ERC20 tokens useful for things like a medium of exchange currency, voting rights, staking,
                            and more.
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Heading;
