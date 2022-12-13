import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';

const baseUrl = 'https://mainnet.infura.io/v3';

export const metamaskWallet = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

export const coinbaseWallet = new WalletLinkConnector({
  appName: 'conomy-assessment',
  url: `${baseUrl}/${process.env.INFURA_KEY}`,
});

export const genericWallet = new WalletConnectConnector({
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  // TODO: investigate the API of this. The docs are sparse.
  // @ts-ignore
  rpcUrl: `${baseUrl}/${process.env.INFURA_KEY}`,
});
