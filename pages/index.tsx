import Head from 'next/head';
import { Wallet } from '../components/Wallet';
import styles from '../styles/Home.module.css';

const Home = () => (
  <>
    <Head>
      <title>conomy assessment</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>conomy assessment</h1>

      <Wallet />
    </main>
  </>
);

export default Home;
