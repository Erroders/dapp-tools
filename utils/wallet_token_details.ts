import { CryptoCurrency, NFT, token } from './types';
import { tokenAsCryptocurrency, tokenAsNFT } from './type_functions';

// Given chain_id and wallet address, return current token balances along with their spot prices and supports a variety of token standards like ERC20, ERC721 and ERC1155.
// source:
//- https://emailsaluja.medium.com/how-to-use-covalent-apis-700a971598af
//- https://www.covalenthq.com/docs/api/#/0/Get%20token%20balances%20for%20address/USD/1
export async function getWalletTokenDetails(
    walletAddress: string,
    chainId: string,
): Promise<
    | {
          dustCryptocurrencyData: CryptoCurrency[] | null;
          nonDustCryptocurrencyData: CryptoCurrency[] | null;
          nftData: NFT[] | null;
      }
    | undefined
> {
    // covalent api key and base endpoint URL
    const API_KEY = process.env.NEXT_PUBLIC_COVALENT_API_KEY;
    const baseURL = process.env.NEXT_PUBLIC_COVALENT_BASEURL;

    let dustCryptocurrencyData: any[] = [];
    let nonDustCryptocurrencyData: any[] = [];
    let nftData: any[] = [];

    if (walletAddress && chainId) {
        const url = `${baseURL}/${chainId}/address/${walletAddress}/balances_v2/?key=${API_KEY}&format=json&nft=true&no-nft-fetch=false`;

        console.log('fetch start');
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
        console.log('fetch end');
        if (response.ok) {
            try {
                const result = await response.json();
                const data = result.data.items as token[];
                for (const item of data) {
                    if (item.type === 'cryptocurrency') {
                        const cc = await tokenAsCryptocurrency(item);
                        cc && nonDustCryptocurrencyData.push(cc);
                    } else if (item.type === 'dust') {
                        const cc = await tokenAsCryptocurrency(item);
                        cc && dustCryptocurrencyData.push(cc);
                    } else if (item.type === 'stablecoin') {
                        const cc = await tokenAsCryptocurrency(item);
                        cc && nonDustCryptocurrencyData.push(cc);
                    } else if (item.type === 'nft') {
                        const nft = await tokenAsNFT(item);
                        nft && nftData.push(nft);
                    }
                }
            } catch (e) {
                console.log(e);
            }
        }

        return {
            dustCryptocurrencyData: dustCryptocurrencyData.length > 0 ? dustCryptocurrencyData : null,
            nonDustCryptocurrencyData: nonDustCryptocurrencyData.length > 0 ? nonDustCryptocurrencyData : null,
            nftData: nftData.length > 0 ? nftData : null,
        };
    }
}
