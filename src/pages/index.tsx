// import Head from 'next/head'
// import Image from 'next/image'
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";
// import * as se from "src/components/se";
import { useCallback, useEffect, useState, useRef } from "react";
import { Layout } from "src/components/Layout/Layout";
import { Kenban } from "src/components/Kenban/Kenban";

const ITEM = ["けんばんハーモニカ", "リコーダー", "もっきん", "てっきん"];

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const el_select = useRef<HTMLSelectElement>(null);
  const [gakkiName, setGakkiName] = useState("けんばんハーモニカ");
  const changeGakki = () => {
    setGakkiName((gakkiName) => el_select.current!.value);
  };

  return (
    <Layout title="けんばん">
      <p className="text-xs">
        音楽の授業でテレビ等に写して指導できるキーボードです。児童練習用は
        <a href="https://jimitas-app.vercel.app/10kenban">こちら</a>
        <br />
        注目させたいキーに色をつけたり、音をのばしたままにしたりできるので、
        <span style={{color:"orangered"}}>音階やハーモニーの学習に適しています。</span>
        <br />
        キーを押しても音が出ない場合は<span style={{color:"orangered"}}>「音を止める」</span>ボタンを一度押してリセットしてください。
        <br />
        スマートフォン等で上手く表示されない場合、ブラウザのメニューから「PC版で開く」を選んで表示してください。
      </p>
      {/* <select ref={el_select} onChange={changeGakki} className="select m-8">
        {ITEM.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select> */}
      <Kenban gakki={gakkiName} />
    </Layout>
  );
}
