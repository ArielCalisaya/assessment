import Head from "next/head";
import styles from "@styles/Home.module.css";
import Link from "next/link";
import { StoreContext } from "@store/StoreProvider";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { updateQueryStringWithCurrentURLParams } from "src/util";
import { types } from "@store/reducer";
import { isWindow } from "src/util";

export const getStaticProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/assessment`);
  const data = await res.json();
  return {
    props: { quizList: data },
  };
};

export default function Home({ quizList }) {
  const [store, dispatch] = useContext(StoreContext);
  const router = useRouter();
  const { debug } = router.query;
  const currentWindow = isWindow ? window.location.pathname : null;

  // Stops the timer and restarts it when come back to the start
  useEffect(() => {
    if (currentWindow !== `/quiz/`) {
      clearInterval(store.timerRef);
      dispatch({ type: types.resetTimer });
      dispatch({ type: types.resetCurrentQuestion });
      dispatch({ 
        type: types.setFinalScore,
        payload: false
      });
      dispatch({
        type: types.setMultiAnswerSelection,
        payload: []
      })
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Assessment</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to{" "}
          <a
            href="https://github.com/breatheco-de/assessment"
            target="_blank"
            rel="noopener noreferrer"
          >
            Assessment
          </a>
        </h1>

        <p className={styles.description}>
          Test your knowledge{" "}
          {/* <code className={styles.code}>pages/index.js</code> */}
        </p>

        <div className={styles.grid}>
          {quizList.length === 0 ? (
            <p>Loading...</p>
          ) : (
            quizList.map((quiz, i) => {
              return (
                <Link key={i} href={`/quiz/${quiz.slug}?`+((debug == "true") ? "debug=true" : "")} passHref>
                  <div className={styles.card}>
                    <h2>{quiz.slug} &rarr;</h2>
                    <p>{quiz.title}</p>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://4Geeks.com/"
          target="_blank"
          rel="noopener"
        >
          Powered by 4Geeks.com
        </a>
      </footer>
    </div>
  );
}
