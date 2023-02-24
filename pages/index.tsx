import { useState, useEffect } from "react";
import Head from "next/head";

import { type Action } from "../lib/actions";

import styles from "../styles/Home.module.css";

interface ActionComponentProps {
  key: number;
  name: string;
}

const ActionComponent = ({ name }: ActionComponentProps) => {
  return (
    <div>
      <div className={styles.text}>{name}</div>
    </div>
  );
};

export default function Home() {
  const [actions, setActions] = useState<Action[]>([]);

  const getActions = async () => {
    const resp = await fetch("api/actions");
    const actions = await resp.json();
    setActions(actions);
    console.log(actions);

    // TODO: Amber, 2023-02-24 - Pick a random action here
  };

  useEffect(() => {
    getActions();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>postgres.js + next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <h2>HOW 2 FITE</h2>
      </header>
      <main className={styles.main}>
        <div className={styles.title}>FITE!</div>
        <div>
          {actions.map((action, index) => (
            <ActionComponent
              key={action.id}
              name={action.name}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
