import styles from "../styles/Spinner.module.css";
import anime from "animejs";
import { useEffect, useState } from "react";

const positions = [
  { left: "12.5vw", top: "6vh", height: "72vh" },
  { left: "2vw", top: "4vh", height: "74vh" },
  { left: "12.5vw", top: "2vh", height: "76vh" },
  { left: "23vw", top: "4vh" },
];

const sideEnum = Object.freeze({ left: 1, right: 2 });
let turnLeft;
let turnRight;

export default function Spinner() {
  const [varForceUpdate, forceUpdate] = useState();

  useEffect(() => {
    const one = {
      digit: 1,
      lastDigit: 0,
      node: document.querySelector("#one"),
    };
    const two = {
      digit: 2,
      lastDigit: 0,
      node: document.querySelector("#two"),
    };
    const three = {
      digit: 3,
      lastDigit: 0,
      node: document.querySelector("#three"),
    };
    const four = {
      digit: 4,
      lastDigit: 0,
      node: document.querySelector("#four"),
    };
    const nums = [one, two, three, four];

    const animateSpin = () => {
      nums.forEach((num) => {
        anime({
          targets: num.node,
          easing: "linear",
          keyframes: (el, i, l) => {
            const pos = positions[num.digit];
            const lastPos = positions[num.lastDigit];
            switch (num.digit) {
              case 1:
                return [{ left: pos.left }, { top: [lastPos.top, pos.top] }];
              case 2:
                return [{ top: pos.top }, { left: [lastPos.left, pos.left] }];
            }
          },
          duration: 500,
        });
      });
    };
    turnLeft = () => {
      nums.forEach((num) => {
        num.digit++;
        num.lastDigit = num.digit - 1;
        if (num.digit > 4) {
          num.digit = 1;
        }
      });
      animateSpin();
    };

    turnRight = () => {
      nums.forEach((num) => {
        num--;
        num.lastDigit = num.digit + 1;
        if (num.digit < 1) {
          num.digit = 4;
        }
      });
      animateSpin();
    };
  }, []);

  const handleClick = (side) => {
    forceUpdate(varForceUpdate + Math.random());

    switch (side) {
      case sideEnum.left:
        turnLeft();
        break;

      case sideEnum.right:
        turnRight();
        break;
    }
  };

  return (
    <div>
      <div className={styles.windows} id="spinnerWindow">
        <div className={styles.one + " tabs"} id="one"></div>
        <div className={styles.two + " tabs"} id="two"></div>
        <div className={styles.three + " tabs"} id="three"></div>
        <div className={styles.four + " tabs"} id="four"></div>
      </div>
      <div className={styles.arrows}>
        <div
          onClick={() => handleClick(sideEnum.left)}
          className={styles.left}
          id="left"
        ></div>
        <div
          onClick={() => handleClick(sideEnum.right)}
          className={styles.right}
          id="right"
        ></div>
      </div>
    </div>
  );
}
