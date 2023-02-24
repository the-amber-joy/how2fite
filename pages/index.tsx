import { useState, useEffect } from "react";
import Head from "next/head";

import { type Action } from "../lib/actions";

import styles from "../styles/Home.module.css";
import { Part } from "../lib/parts";

interface FightComponentProps {
  action: string;
  part: string;
}

const FightComponent = ({ action, part }: FightComponentProps) => {
  return (
    <div>
      <div className={styles.text}>
        {action} {part}
      </div>
    </div>
  );
};

export default function Home() {
  const [actions, setActions] = useState<Action[]>([]);
  const [parts, setParts] = useState<Part[]>([]);

  const [action, setAction] = useState<string | null>();
  const [part, setPart] = useState<string | null>();

  const getActions = async () => {
    const resp = await fetch("api/actions");
    const actions = await resp.json();

    setActions(actions);
  };

  const getParts = async () => {
    const resp = await fetch("api/parts");
    const parts = await resp.json();

    setParts(parts);
  };

  useEffect(() => {
    getActions();
    getParts();
  }, []);

  const pickRandom = () => {
    const randomPart = Math.floor(Math.random() * parts.length);
    setPart(parts[randomPart].name);

    const randomAction = Math.floor(Math.random() * actions.length);
    setAction(actions[randomAction].name);
  };

  useEffect(() => {
    if (actions.length > 0 && parts.length > 0) {
      pickRandom();
    }
  }, [actions, parts]);

  return (
    <div className={styles.container}>
      <Head>
        <title>How 2 Fite</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <h2>HOW 2 FITE</h2>
      </header>
      <main className={styles.main}>
        <div className={styles.title}>FITE!</div>
          <FightComponent action={action || ""} part={part || ""} />
        <button className={styles.goBtn} onClick={pickRandom}>
          &#128551;
        </button>
      </main>
    </div>
  );
}
