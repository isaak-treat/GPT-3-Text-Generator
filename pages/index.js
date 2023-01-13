import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from 'react';
import Generator from "./generator";

export default function Home() {

  return (
    <div>
      <Generator />
    </div>
    
  );
}