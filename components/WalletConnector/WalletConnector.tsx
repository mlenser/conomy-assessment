import { useWeb3React } from '@web3-react/core';
import { useCallback, useState } from 'react';
import { injected } from './connectors';
import styles from './WalletConnector.module.css';

const ETH_AMOUNT_FOR_DEMO = 1000000000000000;

export const WalletConnector = () => {
  const { active, account, activate, chainId, deactivate, library } =
    useWeb3React();
  const [showChainId, setShowChainId] = useState(false);
  const [accountBalance, setAccountBalance] = useState(0);

  const connect = useCallback(async () => {
    try {
      await activate(injected);
    } catch (error) {
      console.log(error);
    }
  }, [activate]);

  const disconnect = useCallback(async () => {
    try {
      await deactivate();
    } catch (error) {
      console.log(error);
    }
  }, [deactivate]);

  const getBalance = () => {
    library.eth
      .getBalance(account)
      .then((balance: number) => setAccountBalance(balance));
  };

  const sendTransaction = () => {
    library.eth.sendTransaction({
      from: account,
      to: account,
      value: ETH_AMOUNT_FOR_DEMO,
    });
  };

  return (
    <div>
      {active ? (
        <>
          <div className={styles.buttonGroup}>
            <button onClick={() => setShowChainId(true)}>Get chain ID</button>
            <button onClick={getBalance}>Get balance</button>
            <button onClick={sendTransaction}>Send transaction</button>
            <button onClick={disconnect}>Disconnect</button>
          </div>

          <div className={styles.dataGroup}>
            <div>
              {showChainId && chainId ? <div>Chain ID: {chainId}</div> : null}
            </div>
            <div>
              {accountBalance ? <div>Balance: {accountBalance}</div> : null}
            </div>
          </div>
        </>
      ) : (
        <div className={styles.buttonGroup}>
          <button onClick={connect}>Connect to MetaMask</button>
        </div>
      )}
    </div>
  );
};
