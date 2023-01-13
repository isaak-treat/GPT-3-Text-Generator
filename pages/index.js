import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from 'react';
import Generator from "./generator";
import { useTheme as useNextTheme } from 'next-themes'
import { Switch, useTheme } from '@nextui-org/react'

export default function Home() {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();

  return (
    <div>
      <Switch
        checked={isDark}
        color="secondary"
        icon="☀"
        onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
      />
      <Generator />
    </div>
    
  );
}