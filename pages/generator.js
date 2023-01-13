import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from 'react';
import { Input, Radio, Text, Textarea, Button, Spacer, Loading } from "@nextui-org/react";

export default function Generator() {
  const [data, setData] = useState( { text:'' });
  const [query, setQuery] = useState('');
  const [attrQuery, setAttrQuery] = useState('');
  const [typeQuery, setTypeQuery] = useState('kind');
  const [search, setSearch] = useState('');
  const [attributes, setAttributes] = useState('');
  const [type, setType] = useState('');
  const [screenType, setScreenType] = useState('horizontal');
  const [isLoading, setIsLoading] = useState(false);
    
  useEffect(() => {
    window.innerWidth > 700 ? setScreenType('horizontal') : setScreenType('vertical');
  }, [])

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
        <Radio.Group defaultValue="kind" color="secondary" orientation={screenType} onChange={setTypeQuery}>
            <Radio value="kind" isSquared>Kind</Radio>
            <Radio value="mean" isSquared>Mean</Radio>
            <Radio value="funny" isSquared>Funny</Radio>
            <Radio value="roast" isSquared>Roast</Radio>
            <Radio value="sexy" isSquared>Sexy</Radio>
            <Radio value="strange" isSquared>Strange</Radio>
        </Radio.Group>
            <Spacer y={2} />
        <Textarea
            underlined
            clearable
            color="secondary"
            labelPlaceholder="Tell me about them..."
            size="xl"
            onChange={(e) => setAttrQuery(e.target.value)}
            css={{
                width: "100%",
            }}
        />
            <Spacer y={1} />
        <Button shadow color="gradient" auto onClick={() => {
            setSearch(query);
            setAttributes(attrQuery);
            setType(typeQuery);
        }}>
          Generate
        </Button>
        <div className={styles.card}>
          {isLoading ? (
            <Loading type="gradient" color="secondary" />
         ) : (
           <span>
           {data.text}
           </span>
           )}
           
          </div>
      </main>
    </div>
  );
}