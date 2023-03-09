import { useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import Head from "next/head";
import { VolumeX, Volume2, Volume1 } from "react-feather";

import speak from "../util/speak";
import { type Action } from "../lib/actions";
import { Part } from "../lib/parts";
import styles from "../styles/Home.module.css";

const letsFightSound = new URL(
  "../sounds/letsfight.wav",
  import.meta.url
) as unknown as string;

const fightSound = new URL(
  "../sounds/fight.wav",
  import.meta.url
) as unknown as string;

const VOLUME = {
  MUTE: { level: 0, name: "mute", icon: <VolumeX /> },
  HALF: { level: 0.5, name: "half", icon: <Volume1 /> },
  FULL: { level: 1, name: "full", icon: <Volume2 /> },
};

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
  const [counter, setCounter] = useState<number>(0);

  const defaultBtnText = <span>&#128551;</span>; // anguished face (open sad mouth, big eyes)
  const activeBtns = [
    <span>&#x1F620;</span>, // angry face
    <span>&#x1F616;</span>, // confounded face (squiggle mouth, squinty eyes)
    <span>&#x1F62B;</span>, // tired face (open sad mouth, squinty eyes)
    <span>&#x1F635;</span>, // dizzy face (X-eyes, O mouth)
  ];
  // \u200D (joiner)
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

  const [volume, setVolume] = useState<{
    level: number;
    name: string;
    icon: JSX.Element;
  }>(VOLUME.MUTE);

  const changeVolume = () => {
    if (volume == VOLUME.MUTE) {
      setVolume(VOLUME.HALF);
      const audio = new Audio(letsFightSound);
      audio.volume = VOLUME.HALF.level;
      audio.play();
    }
    if (volume == VOLUME.HALF) {
      setVolume(VOLUME.FULL);
      const audio = new Audio(fightSound);
      audio.volume = VOLUME.FULL.level;
      audio.play();
    }
    if (volume == VOLUME.FULL) {
      setVolume(VOLUME.MUTE);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && volume !== VOLUME.MUTE) {
      speak(`${action} ${part}!`, volume.level);
    }
  }, [action, part]);

  const pickRandom = useCallback(() => {
    const randomPart = Math.floor(Math.random() * parts.length);
    setPart(parts[randomPart].name);

    const randomAction = Math.floor(Math.random() * actions.length);
    setAction(actions[randomAction].name);
  }, [actions, parts]);

  const handleClick = () => {
    pickRandom();
  };

  const handleMouseDown = () => {
    setButtonText(activeBtns[counter]);
  };

  const handleMouseUp = () => {
    setButtonText(defaultBtnText);
    if (counter === 3) {
      setCounter(0);
    } else {
      setCounter(counter + 1);
    }
  };

  useEffect(() => {
    if (actions.length > 0 && parts.length > 0) {
      pickRandom();
    }
  }, [actions, parts, pickRandom]);

  return (
    <div className={styles.container}>
      <Head>
        <title>How 2 Fite</title>
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
      <footer className={styles.footer}>
        <button
          className={clsx(styles.soundBtn, styles[volume.name])}
          onClick={changeVolume}
        >
          {volume.icon}
        </button>
      </footer>
    </div>
  );
}
