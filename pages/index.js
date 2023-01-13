import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState( { text:'' });
  const [query, setQuery] = useState('');
  const [attrQuery, setAttrQuery] = useState('');
  const [search, setSearch] = useState('');
  const [attributes, setAttributes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (search && attributes) {
      setIsLoading(true);
      const res = await fetch(`/api/openai`, {
        body: JSON.stringify({
          name: search,
          attributes: attributes,
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
  }, [search, attributes]);
  return (
    <div className={styles.container}>
      <Head>
        <title>Comeback Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <a>AI Comeback Generator</a>
        </h1>

        <p className={styles.description}>Looking for a quick and clever comeback? Look no further than the AI Comeback Generator! Using the power of GPT-3 technology, our app generates instant, witty responses to any situation. </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Name:</h3>
            <input
              className={styles.input}
              type="text"
              value={query}
              onChange={event => setQuery(event.target.value)}
            />
          </div>
          <div className={styles.card}>
            <h3>Tell me about them</h3>
            <input
              type="text"
              value={attrQuery}
              onChange={event => setAttrQuery(event.target.value)}
            />
          </div>
        <div className={styles.card}>
        <button
          type="button"
          onClick={() => {
            setSearch(query)
            setAttributes(attrQuery)
          }
          }
        >
          Click!
        </button>
        </div>
        <div className={styles.card}>
          <h4>Comeback:</h4>  
          {isLoading ? (
            <div>Loading ...</div>
         ) : (
           <span>
           {data.text}
           </span>
           )}
           
          </div>
        </div>
      </main>
    </div>
  );
}