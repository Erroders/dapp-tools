import makeBlockie from 'ethereum-blockies-base64';
import { NftTransaction } from '../components/ui/nftPage/NftTransactionsProps';
import { getIPFSUrl } from './getIPFSUrl';
import { NFT, token, nft_data, external_data, NFTMetadata, CryptoCurrency, NFTTransaction } from './types';

export async function tokenAsNFT(token: token): Promise<NFT | null> {
    if (token.type === 'nft') {
        if (token.nft_data) {
            const nft_data: nft_data = token.nft_data[0];
            if (nft_data) {
                // console.log('nft_data found');
                let external_data: external_data | null = nft_data.external_data ? nft_data.external_data : null;
                let metadata: NFTMetadata = {
                    name: token.contract_name,
                    description: null,
                    external_url: nft_data.token_url,
                    image: null,
                };

                const nft: NFT = {
                    attributes: null,
                    burned: nft_data.burned,
                    contract_address: token.contract_address,
                    contract_name: token.contract_name,
                    contract_ticker_symbol: token.contract_ticker_symbol,
                    supports_erc: nft_data.supports_erc
                        ? nft_data.supports_erc.length > 0
                            ? nft_data.supports_erc
                            : null
                        : null,
                    metadata_url: nft_data.token_url,
                    metadata: metadata,
                    original_owner: nft_data.original_owner,
                    owner: nft_data.owner,
                    token_id: nft_data.token_id,
                    token_balance: nft_data.token_balance,
                    token_price_wei: nft_data.token_price_wei,
                };

                if (nft_data.token_url || external_data?.external_url) {
                    let url = '';
                    if (nft_data.token_url) {
                        url = getIPFSUrl(nft_data.token_url);
                    } else if (external_data?.external_url) {
                        url = getIPFSUrl(external_data.external_url);
                    }
                    const response = await fetch(url);
                    const metadata_fetched = await response.json();
                    if (metadata_fetched) {
                        // console.log('metadata found');
                        metadata = {
                            ...metadata,
                            name: metadata_fetched.name ? metadata_fetched.name : null,
                            description: metadata_fetched.description ? metadata_fetched.description : null,
                            external_url: metadata_fetched.externalUrl
                                ? getIPFSUrl(metadata_fetched.externalUrl)
                                : null,
                        };
                        if (metadata_fetched.image) {
                            // console.log('image found');
                            const img_url = getIPFSUrl(metadata_fetched.image);
                            nft.metadata = { ...metadata, image: img_url };
                        }
                        // console.log(nft.metadata);
                        return nft;
                    }
                }

                if (external_data && nft.metadata) {
                    external_data.name && (nft.metadata.name = external_data.name);
                    external_data.description && (nft.metadata.description = external_data.description);
                    external_data.attributes &&
                        external_data.attributes.length > 0 &&
                        (nft.attributes = external_data.attributes);
                    return nft;
                }
            }
        }
    }
    return null;
}

export async function tokenAsCryptocurrency(token: token): Promise<CryptoCurrency | null> {
    if (token.type === 'cryptocurrency' || token.type === 'dust' || token.type === 'stablecoin') {
        const cc = {
            contract_decimals: token.contract_decimals,
            contract_name: token.contract_name,
            contract_ticker_symbol: token.contract_ticker_symbol,
            contract_address: token.contract_address,
            supports_erc: token.supports_erc ? (token.supports_erc.length > 0 ? token.supports_erc : null) : null,
            logo_url: token.logo_url ? token.logo_url : makeBlockie(token.contract_address),
            balance: token.balance,
        };

        return cc;
    }
    return null;
}

export async function asNFTTransaction(tx: NftTransaction): Promise<NFTTransaction> {
    const nft_tx: NFTTransaction = {
        block_signed_at: tx.block_signed_at,
        tx_hash: tx.tx_hash,
        from_address: tx.from_address,
        from_address_label: tx.from_address_label ? tx.from_address_label : null,
        to_address: tx.to_address,
        to_address_label: tx.to_address_label ? tx.to_address_label : null,
        value: tx.value,
    };
    return nft_tx;
}
