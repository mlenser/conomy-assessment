import { useWeb3React } from '@web3-react/core';
import { useCallback, useEffect } from 'react';
import { injected } from './connectors';
import styles from './WalletConnector.module.css';

export const WalletConnector = () => {
  const { active, account, activate, deactivate } = useWeb3React();

  const connect = useCallback(async () => {
    try {
      await activate(injected);
      localStorage.setItem('isWalletConnected', 'true');
    } catch (error) {
      console.log(error);
    }
  }, [activate]);

  const disconnect = useCallback(async () => {
    try {
      await deactivate();
      localStorage.setItem('isWalletConnected', 'false');
    } catch (error) {
      console.log(error);
    }
  }, [deactivate]);

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem('isWalletConnected') === 'true') {
        await connect();
      }
    };
    connectWalletOnPageLoad();
  }, [connect]);

  return (
    <div>
      {active ? (
        <>
          <div>
            Connected with <b>{account}</b>
          </div>
        </>
      ) : null}
      <div>
        <button
          className={styles.button}
          onClick={active ? disconnect : connect}
        >
          {active ? 'Disconnect' : 'Connect to MetaMask'}
        </button>
      </div>
    </div>
  );
};
