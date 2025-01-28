import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState } from 'react';

const sortOptions = [
  {
    id: 1,
    title: 'Sort By Created At: ASC',
    key: 'sortByCreatedAtASC'
  },
  {
    id: 2,
    title: 'Sort by File Name : ASC',
    key: 'sortByFileNameASC'
  },
  {
    id: 3,
    title: 'Sort by File Name : DESC',
    key: 'sortByFileNameDESC'
  }
]

export default function Home({results}) {
  const [sortOptionIndex, setSortOptionIndex] = useState(0)
  return (
    <div className={styles.container}>
      <Head>
        <title>SU-FSD</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
      </Head>

      <main>
        <h1 className={styles.title}>
          SU-FSD
        </h1>

        {sortOptions.map((item, index) => {
          return (
            <>
              <button key={item?.id} onClick={() => setSortOptionIndex(index)}>{item.title}</button>
              <br></br>
            </>
          )
        })}

        <h2 className={styles.description}>
          Displaying results for "{sortOptions[sortOptionIndex].title}"
        </h2>

        <div className={styles.grid}>
          {results?.[sortOptions[sortOptionIndex]?.key].map((item) => {
            return (
                <div className={styles.card}>
                  <p>{item}</p>
                </div>
            )
           })}
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}


export async function getServerSideProps(context) {
  const results = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/readFile`)
  const resultsJson = await results.json()
  return {
    props: {
      results: resultsJson
      // props for your component
    },
  };
}