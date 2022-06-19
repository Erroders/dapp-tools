const Heading = () => {
    return (
        <header className="bg-gray-100">
            <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
                <div className="sm:justify-between sm:items-center sm:flex">
                    <div className="text-center sm:text-left">
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">ERC1155</h1>
                        <p className="mt-1.5 text-sm tracking-wide text-gray-500">
                            A standard interface for contracts that manage multiple token types. A single deployed
                            contract may include any combination of fungible tokens, non-fungible tokens or other
                            configurations (e.g. semi-fungible tokens). The idea is simple and seeks to create a smart
                            contract interface that can represent and control any number of fungible and non-fungible
                            token types. In this way, the ERC-1155 token can do the same functions as an ERC-20 and
                            ERC-721 token, and even both at the same time. And best of all, improving the functionality
                            of both standards, making it more efficient, and correcting obvious implementation errors on
                            the ERC-20 and ERC-721 standards.
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Heading;
