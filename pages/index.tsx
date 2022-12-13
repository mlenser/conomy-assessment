import Head from 'next/head';
import { WalletConnector } from '../components/WalletConnector';
import styles from '../styles/Home.module.css';

const Home = () => (
  <>
    <Head>
      <title>conomy assessment</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>conomy assessment</h1>

      <WalletConnector />
    </main>
  </>
);

export default Home;
