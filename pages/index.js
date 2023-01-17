import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from 'react';
import { Roboto } from '@next/font/google';
import Generator from "./generator";

const roboto = Roboto({
    weight: ['400', '700'],
    style: ['normal'],
    subsets: ['latin'],
 });

export default function Home() {

  return (
    <div className={roboto.className}>
      <Generator />
    </div>
    
  );
}