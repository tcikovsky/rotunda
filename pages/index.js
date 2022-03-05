import { useEffect, useState } from "react";
import Image from "next/image";
import anime from "animejs";
import styles from "../styles/Home.module.css";
import NavBar from "../Components/NavBar";
import Spinner from "../Components/Spinner";
import logo from "../public/rotunda_logo.png";

const logoCurPosEnum = Object.freeze({ up: 1, down: 2 });
let logoCurPos = logoCurPosEnum.down;
let lastYOffset = 0;

export default function Home() {
  const [movedUp, setMovedUp] = useState(false);

  const animateSpinnerAppearance = () => {
    switch (logoCurPos) {
      case logoCurPosEnum.up:
        anime({
          targets: document.querySelector("#spinnerWindow"),
          top: ["20vh", "100vh"],
          height: "0",
          easing: "spring(1, 100, 70, 0)",
          duration: 700,
        });
        anime({
          targets: document.querySelector("#left"),
          left: ["4vw", "-4vw"],
          duration: 700,
        });
        anime({
          targets: document.querySelector("#right"),
          right: ["4vw", "-4vw"],
          duration: 700,
        });
        break;
      case logoCurPosEnum.down:
        anime({
          targets: document.querySelector("#spinnerWindow"),
          top: ["100vh", "20vh"],
          height: "80vh",
          easing: "spring(1, 100, 70, 0)",
          duration: 700,
        });
        anime({
          targets: document.querySelector("#left"),
          left: ["-3vw", "4vw"],
          duration: 700,
        });
        anime({
          targets: document.querySelector("#right"),
          right: ["-3vw", "4vw"],
          duration: 700,
        });
        break;
    }
  };

  useEffect(() => {
    window.onscroll = () => {
      const yOffset = window.pageYOffset;
      //console.log(`lastYOffset: ${lastYOffset}, yOffset: ${yOffset}`);

      if (yOffset > lastYOffset && !movedUp) {
        logoCurPos = logoCurPosEnum.down;
        setMovedUp(true);
        if (logoCurPos === logoCurPosEnum.down) animateSpinnerAppearance();
      } else if (yOffset < lastYOffset && movedUp) {
        logoCurPos = logoCurPosEnum.up;
        setMovedUp(false);
        if (logoCurPos === logoCurPosEnum.up) animateSpinnerAppearance();
      }
      lastYOffset = yOffset;
    };
  });

  return (
    <div className={styles.container}>
      <div className={styles.blur}></div>
      <NavBar />
      <div
        style={
          movedUp
            ? { top: "1vh", width: "calc(18vh * 2.14453125)", height: "18vh" }
            : {
                top: "calc(75vh / 2 - 15vh)",
                width: "calc(25vw * 2.14453125)",
                height: "25vw",
              }
        }
        className={styles.headline}
      >
        <Image src={logo} layout="fill" />
      </div>
      <div
        style={movedUp ? { opacity: "0" } : { opacity: "1" }}
        className={styles.pointerRow}
      >
        <div className={styles.pointerShadow}>
          <div className={styles.pointer}></div>
        </div>
      </div>
      <Spinner />
    </div>
  );
}
