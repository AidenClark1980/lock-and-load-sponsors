import { ConnectButton } from '@rainbow-me/rainbowkit';

export function WalletButton() {
  return (
    <ConnectButton 
      chainStatus="icon"
      accountStatus={{
        smallScreen: 'avatar',
        largeScreen: 'full',
      }}
      showBalance={{
        smallScreen: false,
        largeScreen: true,
      }}
    />
  );
}
