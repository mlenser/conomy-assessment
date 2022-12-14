import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';

const baseUrl = 'https://mainnet.infura.io/v3';

const ETHEREUM_MAINNET_CHAIN_ID = 1;
const ROPSTEN_CHAIN_ID = 3;
const RINKEBY_CHAIN_ID = 4;
const GOERLI_CHAIN_ID = 5;
const OPTIMISM_CHAIN_ID = 10;
const KOVAN_CHAIN_ID = 42;
const POLYGON_MAINNET_CHAIN_ID = 137;
const ARBITRUM_ONE_CHAIN_ID = 42161;
const AURORA_MAINNET_CHAIN_ID = 1313161554;

export const metamaskWallet = new InjectedConnector({
  supportedChainIds: [
    ETHEREUM_MAINNET_CHAIN_ID,
    ROPSTEN_CHAIN_ID,
    RINKEBY_CHAIN_ID,
    GOERLI_CHAIN_ID,
    OPTIMISM_CHAIN_ID,
    KOVAN_CHAIN_ID,
    POLYGON_MAINNET_CHAIN_ID,
    ARBITRUM_ONE_CHAIN_ID,
    AURORA_MAINNET_CHAIN_ID,
  ],
});

export const coinbaseWallet = new WalletLinkConnector({
  appName: 'conomy-assessment',
  url: `${baseUrl}/${process.env.INFURA_KEY}`,
});

export const genericWallet = new WalletConnectConnector({
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  rpc: {
    1: `${baseUrl}/${process.env.INFURA_KEY}`,
  },
});
