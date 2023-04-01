import { Howl } from "howler";
import * as data from "./data";
import { useState, useRef } from "react";
import styles from "./Kenban.module.css";

// 4/2 todo キー入力を可能にする。
// ピンチズームを可能にする。
// サスティンで伸ばしているとき、押したキーに色が付いたまま

//ピンチズームを可能・不可にする。
const touchHandler = (event) => {
  if (event.touches.length > 1) {
    event.preventDefault();
  }
};
const swipeHandler = (event) => {
  event.preventDefault();
};

const keyLength = 32;

const se = [];
// インスタンスを生成
for (let i = 0; i < keyLength; i++) {
  se[i] = new Howl({
    src: [`Sounds/re_${i + 1}.mp3`],
    //読み込む音声ファイル
    // 設定 (以下はデフォルト値です)
    preload: true, // 事前ロード
    volume: 1.0, // 音量(0.0〜1.0の範囲で指定)
    loop: false, // ループ再生するか
    autoplay: false, // 自動再生するか
  });
}

const KENBAN = [];
for (let i = 0; i < keyLength; i++) {
  KENBAN.push({
    id: i, //音番号
    class: data.bgColor[i], //黒鍵か白鍵か
    bgColor: data.bgColor[i], //黒鍵か白鍵か
    hz: data.hz[i], //周波数
    toneName1: data.toneName1[i], //音名（CDE表記）
    toneName2: data.toneName2[i], //音名（CDE表記）♭言い換え
    solfa1: data.solfa1[i], //階名 (ドレミ表記)
    solfa2: data.solfa2[i], //階名 (ドレミ表記)　♭言い換え
    pushLetter1: data.pushLetter1[i], //キー情報1
    pushLetter2: data.pushLetter2[i], //キー情報2
    pushCode1: data.pushCode1[i], //キー取得コード1
    pushCode2: data.pushCode2[i], //キー取得コード2
    leftPosition: data.leftPosition[i], //鍵盤の位置
    pushed: false, //キーが押されたかどうか
  });
}

export function Kenban(props) {
  const [selectValue, setSelectValue] = useState(0);
  const [isShow1, setIsShow1] = useState(false);
  const [isShow2, setIsShow2] = useState(true);
  const [isShow3, setIsShow3] = useState(false);
  const [isShow4, setIsShow4] = useState(false);
  const el_select = useRef(0);

  const changeSelectValue = () => {
    setSelectValue((selectValue) => el_select.current.selectedIndex);
  };
  const changeIsShow1 = () => {
    setIsShow1((isShow1) => {
      return !isShow1;
    });
  };
  const changeIsShow2 = () => {
    setIsShow2((isShow2) => {
      return !isShow2;
    });
  };
  const changeIsShow3 = () => {
    setIsShow3((isShow3) => {
      return !isShow3;
    });
  };
  const changeIsShow4 = () => {
    setIsShow4((isShow4) => {
      return !isShow4;
    });
  };
  const changeColor = (e) => {
    if (!isShow3) return;
    e.target.style.backgroundColor === "yellow"
      ? (e.target.style.backgroundColor = null)
      : (e.target.style.backgroundColor = "yellow");
  };

  //何のキーが押されたかを判定してコードを返す
  const check_code = (e) => {
    e.preventDefault();
    const target = e.code;
    const index1 = data.pushCode1.indexOf(target);
    const index2 = data.pushCode2.indexOf(target);
    const index = Math.max(index1, index2);
    return index;
  };
  const playSound = (e) => {
    e.preventDefault();
    const index = e.target.id.slice(1);
    if (KENBAN[index].pushed) return;
    KENBAN[index].pushed = true;
    se[index].play();
  };
  const KeyDown = (e) => {
    const index = check_code(e);
    if (index === -1 || undefined) return;
    if (KENBAN[index].pushed) return;
    KENBAN[index].pushed = true;
    se[index].play();
    document.getElementById("k" + index).style.backgroundColor = "rgba(252, 165, 165)";
  };
  const KeyUp = (e) => {
    if (isShow4) return;
    const index = check_code(e);
    if (index === -1 || undefined) return;
    se[index].pause();
    se[index].seek(0);
    KENBAN[index].pushed = false;
    document.getElementById("k" + index).style.backgroundColor = KENBAN[index].bgColor;
  };
  const stopSound = (e) => {
    if (isShow4) return;
    const index = e.target.id.slice(1);
    se[index].pause();
    se[index].seek(0);
    KENBAN[index].pushed = false;
  };

  const soundAllStop = () => {
    for (let i = 0; i < keyLength; i++) {
      se[i].pause();
      se[i].seek(0);
      KENBAN[i].pushed = false;
    }
  };

  return (
    <div>
      <select ref={el_select} name="" id="keyName" onChange={changeSelectValue}>
        <option value="1">階名表記</option>
        <option value="2">英語名表記</option>
        <option value="3">表記しない</option>
      </select>

      <label htmlFor="pinchZoom">
        <input id="pinchZoom" type="checkbox" onChange={changeIsShow1} />
        ピンチズームを可能にする
      </label>
      <label for="keyDown">
        <input type="checkbox" id="keyDown" onChange={changeIsShow2} checked={isShow2} />
        キーを表示する
      </label>
      <label for="checkMark">
        <input type="checkbox" id="checkMark" onChange={changeIsShow3} />
        しるしをつける
      </label>
      <label for="sustain">
        <input type="checkbox" id="sustain" onChange={changeIsShow4} />
        音をのばす
      </label>
      <button onClick={soundAllStop}>音を止める</button>

      <button type="text" onClick={(e)=>{e.target.style.backgroundColor="yellow"}} onKeyDown={KeyDown} onKeyUp={KeyUp} value="test">
        キーボード入力ON
      </button>

      <div className={styles.kenban}>
        {KENBAN.map((item) => {
          return (
            <div
              key={item.id}
              id={"k" + item.id}
              className={
                item.class === "white" ? `${styles.key} ${styles.whiteKey}` : `${styles.key} ${styles.blackKey}`
              }
              style={{ left: `${item.leftPosition}px` }}
              onMouseDown={playSound}
              onTouchStart={playSound}
              onMouseUp={stopSound}
              onTouchEnd={stopSound}
            >
              {isShow2 ? (
                <div id={"p" + item.id} className={styles.pushKeyName}>
                  {item.pushLetter2}
                  {<br />}
                  {item.pushLetter1}
                </div>
              ) : null}

              <div id={"t" + item.id} className={styles.toggleButton} onClick={changeColor}></div>

              {selectValue === 0 ? (
                <div id={"n" + item.id} className={styles.keyNote}>
                  {item.solfa2}
                  {<br />}
                  {item.solfa1}
                </div>
              ) : selectValue === 1 ? (
                <div id={"n" + item.id} className={styles.keyNote}>
                  {item.toneName2}
                  {<br />}
                  {item.toneName1}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// <div className="relative key_place">
//   <button type="text" className="relative -top-6 btn" onKeyDown={KeyDown} onKeyUp={KeyUp} value="test">
//     キーボード入力ON
//   </button>

//   <div className="absolute top-8 flex justify-center">
//     {W_KEY.map((W_KEY) => {
//       return (
//         <div
//           key={W_KEY.index}
//           id={W_KEY.index}
//           className="WH"
//           onMouseDown={Play_WH}
//           onTouchStart={Play_WH}
//           onMouseUp={Pause_WH}
//           onTouchEnd={Pause_WH}
//         >
//           {W_KEY.note}
//           <br />
//           {W_KEY.label}
//         </div>
//       );
//     })}

//   var gakki = "ke-";

//   switch (props.gakki) {
//     case "けんばんハーモニカ":
//       gakki = "ke-";
//       break;
//     case "リコーダー":
//       gakki = "re_";
//       break;
//     case "もっきん":
//       gakki = "mo_";
//       break;
//     case "てっきん":
//       gakki = "te_";
//       break;
//   }

//   //何のキーが押されたかを判定してコードを返す
//   const check_code = (e) => {
//     return (keyDownResult = KEY_CODE.indexOf(e.code));
//   };

//   const Play_BK = (e) => {
//     const index = ITEMS_BK_INDEX.indexOf(Number(e.target.id));
//     se[ITEMS_BK_INDEX[index]].play();
//   };

//   const Pause_BK = (e) => {
//     const index = ITEMS_BK_INDEX.indexOf(Number(e.target.id));
//     se[ITEMS_BK_INDEX[index]].pause();
//     se[ITEMS_BK_INDEX[index]].seek(0);
//   };

//   const Play_WH = (e) => {
//     const index = ITEMS_WH_INDEX.indexOf(Number(e.target.id));
//     se[ITEMS_WH_INDEX[index]].play();
//   };

//   const Pause_WH = (e) => {
//     const index = ITEMS_WH_INDEX.indexOf(Number(e.target.id));
//     se[ITEMS_WH_INDEX[index]].pause();
//     se[ITEMS_WH_INDEX[index]].seek(0);
//   };

//   const KeyDown = (e) => {
//     check_code(e);
//     if (Key_flag[keyDownResult] === false) {
//       Key_flag[keyDownResult] = true;
//       se[keyDownResult].play();
//       document.getElementById(keyDownResult).style.backgroundColor = "rgba(252, 165, 165)";
//     }
//   };

//   const KeyUp = (e) => {
//     check_code(e);
//     if (Key_flag[keyDownResult] === true) {
//       Key_flag[keyDownResult] = false;
//       se[keyDownResult].pause();
//       se[keyDownResult].seek(0);
//       //直接DOMを触らずにできる方法があれば尚いいのだが。
//       // エレメントrefを配列化できるといいのかも…
//       if (document.getElementById(keyDownResult).className == "WH") {
//         document.getElementById(keyDownResult).style.backgroundColor = "";
//       } else {
//         document.getElementById(keyDownResult).style.backgroundColor = "";
//       }
//     }
// };
