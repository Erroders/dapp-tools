import { ethers } from 'ethers';

// Given chain_id and wallet address, return current token balances along with their spot prices and supports a variety of token standards like ERC20, ERC721 and ERC1155.
// source:
//- https://emailsaluja.medium.com/how-to-use-covalent-apis-700a971598af
//- https://www.covalenthq.com/docs/api/#/0/Get%20token%20balances%20for%20address/USD/1
export async function getWalletTokenDetails(
    provider: ethers.providers.Web3Provider | null,
): Promise<{ dustCryptocurrencyData: any[]; nonDustCryptocurrencyData: any[]; nftData: any[] } | undefined> {
    // covalent api key and base endpoint URL
    const API_KEY = process.env.NEXT_PUBLIC_COVALENT_API_KEY;
    const baseURL = process.env.NEXT_PUBLIC_COVALENT_BASEURL;

    let dustCryptocurrencyData: any[] = [];
    let nonDustCryptocurrencyData: any[] = [];
    let nftData: any[] = [];

    if (provider) {
        const chainId = (await provider.getNetwork()).chainId;
        const address = await (await provider.getSigner()).getAddress();

        const url = new URL(
            `${baseURL}/${chainId}/address/${address}/balances_v2/?key=${API_KEY}&format=json&nft=true&no-nft-fetch=false`,
        );

        const response = await fetch(url);
        if (response.ok) {
            const result = await response.json();
            const data = result.data.items;

            data.map((item: any) => {
                if (item.type === 'cryptocurrency') {
                    nonDustCryptocurrencyData.push(item);
                } else if (item.type === 'dust') {
                    dustCryptocurrencyData.push(item);
                } else if (item.type === 'nft') {
                    nftData.push(item);
                }
            });
            return {
                dustCryptocurrencyData: dustCryptocurrencyData,
                nonDustCryptocurrencyData: nonDustCryptocurrencyData,
                nftData: nftData,
            };
        }
        throw new Error('Something went wrong .....');
    }
}
