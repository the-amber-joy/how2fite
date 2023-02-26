import { useState, useEffect } from "react";
import Head from "next/head";

import { type Action } from "../lib/actions";
import { Part } from "../lib/parts";
import styles from "../styles/Home.module.css";

interface FightComponentProps {
  action: string;
  part: string;
}

const FightComponent = ({ action = "", part = "" }: FightComponentProps) => {
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

  const [action, setAction] = useState<string>("");
  const [part, setPart] = useState<string>("");

  const defaultBtnText = <span>&#128551;</span>;
  const activeBtnText = <span>&#x1F635;</span>
  const [buttonText, setButtonText] = useState<JSX.Element>(defaultBtnText);

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

  // load optons from DB on pageload
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

  const handleClick = () => {
    pickRandom()
  }

  const handleMouseDown = () => {
    console.log("mouse down")
    setButtonText(activeBtnText)
  }

  const handleMouseUp = () => {
    console.log("mouse up")
    setButtonText(defaultBtnText)
  }

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
        <FightComponent action={action} part={part} />
        <button
          className={styles.goBtn}
          onClick={handleClick}
          onMouseDown={() => handleMouseDown()}
          onMouseUp={() => handleMouseUp()}
          onTouchStart={() => handleMouseDown()}
          onTouchEnd={() => handleMouseUp()}
        >
          {buttonText}
        </button>
      </main>
    </div>
  );
}
