import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect, useRef } from 'react';
import { useTheme as useNextTheme } from 'next-themes'
import { Switch, useTheme } from '@nextui-org/react'
import { Input, Radio, Text, Textarea, Button, Spacer, Loading } from "@nextui-org/react";
import Typed from 'typed.js';

export default function Generator() {

  const el = useRef(null);
  const typed = useRef(null);

  const [data, setData] = useState( { text:'' });
  const [query, setQuery] = useState('');
  const [attrQuery, setAttrQuery] = useState('');
  const [typeQuery, setTypeQuery] = useState('kind');
  const [search, setSearch] = useState('');
  const [attributes, setAttributes] = useState('');
  const [type, setType] = useState('');
  const [screenType, setScreenType] = useState('horizontal');
  const [isLoading, setIsLoading] = useState(false);

  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  const handleGenerate = () => {
    setSearch(query);
    setAttributes(attrQuery);
    setType(typeQuery);
  }
  
  // typing animation
  useEffect(() => {
    const options = {
      strings: [ data.text ],
      typeSpeed: 30,
      backSpeed: 10,
      showCursor: false,
    };

    typed.current = new Typed(el.current, options);

    return () => {
      typed.current.destroy();
    }
  }, [data.text])

  // determine if web or mobile
  useEffect(() => {
    window.innerWidth > 700 ? setScreenType('horizontal') : setScreenType('vertical');
  }, [])

  // send data to OpenAI API
  useEffect(() => {
    const fetchData = async () => {
      if (search && attributes) {
      setIsLoading(true);
      const res = await fetch(`/api/openai`, {
        body: JSON.stringify({
          name: search,
          attributes: attributes,
          type: type,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })
      const data = await res.json();
      setData(data);
      setIsLoading(false);
    }};

    fetchData();
  }, [search, attributes, type]);
  
  return (
    <div className={styles.container}>
      <Head>
        <title>AI Message Generator</title>
      </Head>
      <main className={styles.main}>
      <Text
          h1
          size={60}
          css={{
            textGradient: "45deg, $purple600 -20%, $pink600 100%"
          }}
          weight="bold"
        >
        AI Message Generator
        </Text>

        <Switch
          checked={isDark}
          color="secondary"
          icon="???"
          onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
        />
        <Spacer y={2} />
        <Input
            value={query}
            onChange={event => setQuery(event.target.value)}
            clearable
            underlined
            size="lg"
            color="secondary"
            labelPlaceholder="Name"
        />
        <Spacer y={2} />
        <Textarea
          underlined
          clearable
          color="secondary"
          labelPlaceholder="Tell me about them..."
          size="xl"
          onChange={(e) => setAttrQuery(e.target.value)}
          css={{
              width: "50vw",
          }}
        />
        <Spacer y={2} />
        <Radio.Group defaultValue="kind" color="secondary" orientation={screenType} onChange={setTypeQuery}>
            <Radio value="kind" isSquared>Kind</Radio>
            <Radio value="playful" isSquared>Playful</Radio>
            <Radio value="funny" isSquared>Funny</Radio>
            <Radio value="roast" isSquared>Roast</Radio>
            <Radio value="sexy" isSquared>Sexy</Radio>
            <Radio value="strange" isSquared>Strange</Radio>
            <Radio value="spooky" isSquared>Spooky</Radio>
        </Radio.Group>
        <Spacer y={1} />
        <Button shadow color="gradient" auto onClick={() => handleGenerate()}>
          Generate
        </Button>
        <Spacer y={2} />
          {isLoading ? (
            <Loading type="gradient" color="secondary" />
         ) : (
          <>
          {el && (
            <div style={{width: '100%'}}>
              <span ref={el} />
            </div>
          )}
          </>
           )}
      </main>
    </div>
  );
}