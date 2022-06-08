# Dapp Tools

## Connect Wallet

```tsx
import connectWallet, { wallets } from '../components/wallet/connectWallet';

connectWallet(wallets.WALLETCONNECT).then((provider) => {
  console.log(provider);
});


```

**Options (more to be added)**: 
- wallets.WALLETCONNECT
- wallets.METAMASK
