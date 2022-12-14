import { useWeb3React } from '@web3-react/core';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '../Button/Button';
import { coinbaseWallet, genericWallet, metamaskWallet } from './connectors';
import styles from './Wallet.module.css';

type WalletType = 'metamask' | 'coinbase' | 'generic';

const LOCAL_STORAGE_WALLET_VARIABLE_NAME = 'conomy-assessment-wallet';
const ETH_AMOUNT_FOR_DEMO = 1000000000000000;

const getConnectorFromWalletType = (
  walletType: WalletType,
): AbstractConnector => {
  if (walletType === 'coinbase') {
    return coinbaseWallet;
  }
  if (walletType === 'metamask') {
    return metamaskWallet;
  }
  return genericWallet;
};

export const Wallet = () => {
  const { active, account, activate, chainId, deactivate, library } =
    useWeb3React();
  const [showChainId, setShowChainId] = useState(false);
  const [showAccountBalance, setShowAccountBalance] = useState(false);
  const [accountBalance, setAccountBalance] = useState(0);

  const connect = useCallback(
    async (walletType: WalletType) => {
      try {
        const connector = getConnectorFromWalletType(walletType);
        await activate(connector);
        localStorage.setItem(LOCAL_STORAGE_WALLET_VARIABLE_NAME, walletType);
      } catch (error) {
        console.log(error);
      }
    },
    [activate],
  );

  const disconnect = useCallback(async () => {
    try {
      await deactivate();
      localStorage.removeItem(LOCAL_STORAGE_WALLET_VARIABLE_NAME);
      setShowChainId(false);
      setAccountBalance(0);
    } catch (error) {
      console.log(error);
    }
  }, [deactivate]);

  const getBalance = useCallback(() => {
    library?.eth
      .getBalance(account)
      .then((balance: number) => setAccountBalance(balance));
  }, [account, library?.eth]);

  useEffect(() => {
    const connectedWallet = localStorage?.getItem(
      LOCAL_STORAGE_WALLET_VARIABLE_NAME,
    );
    if (
      connectedWallet &&
      (connectedWallet === 'generic' ||
        connectedWallet === 'coinbase' ||
        connectedWallet === 'metamask')
    ) {
      connect(connectedWallet);
    }
  }, [connect]);

  useEffect(() => {
    getBalance();
  }, [chainId, getBalance]);

  const sendTransaction = () => {
    library.eth.sendTransaction({
      from: account,
      to: account,
      value: ETH_AMOUNT_FOR_DEMO,
    });
  };

  if (active) {
    return (
      <div className={styles.group}>
        <div className={styles.actionAndData}>
          <Button onClick={() => setShowChainId(true)}>Get chain ID</Button>
          {showChainId && chainId ? <div>Chain ID: {chainId}</div> : null}
        </div>
        <div className={styles.actionAndData}>
          <Button
            onClick={() => {
              setShowAccountBalance(true);
              getBalance();
            }}
          >
            Get balance
          </Button>
          {showAccountBalance && accountBalance ? (
            <div>Balance: {accountBalance}</div>
          ) : null}
        </div>
        <div>
          <Button onClick={sendTransaction}>Send transaction</Button>
        </div>
        <div>
          <Button onClick={disconnect}>Disconnect</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.group}>
      <div>
        <Button onClick={() => connect('metamask')}>Connect to MetaMask</Button>
      </div>
      <div>
        <Button onClick={() => connect('coinbase')}>Connect to Coinbase</Button>
      </div>
      <div>
        <Button onClick={() => connect('generic')}>
          Connect to another wallet
        </Button>
      </div>
    </div>
  );
};
