import type { AppProps } from 'next/app';
import { provider } from 'web3-core';
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';
import '../styles/globals.css';
import 'node_modules/modern-normalize/modern-normalize.css';

const getLibrary = (provider: provider) => new Web3(provider);

const App = ({ Component, pageProps }: AppProps) => (
  <Web3ReactProvider getLibrary={getLibrary}>
    <Component {...pageProps} />
  </Web3ReactProvider>
);

export default App;
