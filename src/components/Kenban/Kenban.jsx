import { Howl } from "howler";
import * as data from "./data";
import styles from "src/components/Kenban/Kenban.module.css";

// var se = [""];
// var keyDownResult;
// var Key_flag = [];
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
    class: data.bgColor[i] + "Key", //黒鍵か白鍵か
    bgColor: data.bgColor[i], //黒鍵か白鍵か
    hz: data.hz[i], //周波数
    toneName: data.toneName[i], //音名（CDE表記）
    solfa: data.solfa[i], //階名 (ドレミ表記)
    pushLetter1: data.pushLetter1[i], //キー情報1
    pushLetter2: data.pushLetter2[i], //キー情報2
    pushCode1: data.pushCode1[i], //キー取得コード1
    pushCode2: data.pushCode2[i], //キー取得コード2
    leftPosition: data.leftPosition[i], //鍵盤の位置
    pushed: false, //キーが押されたかどうか
  });
}

console.log(KENBAN)
export function Kenban(props) {
  return (
    <div>
      {KENBAN.map((item) => {
        return <div key={item.id} id={item.id} className={item.class} style={{ left: `${item.leftPosition}px` }}>{item.id}</div>;
      })}
    </div>
  );

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
}
