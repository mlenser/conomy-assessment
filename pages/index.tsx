import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home = () => (
  <div className={styles.container}>
    <Head>
      <title>conomy assessment</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>conomy assessment</h1>
    </main>
  </div>
);

export default Home;
