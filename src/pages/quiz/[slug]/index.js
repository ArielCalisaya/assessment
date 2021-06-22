import { useContext, useEffect, useRef } from "react";
import { StoreContext } from "@store/StoreProvider";
import { types } from "@store/reducer";
import styles from "@styles/Home.module.css";
import QuizCard from "src/components/quizCard";
import Head from "next/head";

export const getStaticPaths = async () => {
  const res = await fetch(`${process.env.API_HOST}/assessment`);
  const data = await res.json();
  const paths = data.map((res) => {
    return {
      params: { slug: res.slug.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const slug = context.params.slug;
  const res = await fetch(
    `${process.env.API_HOST}/assessment/${slug}`
  );
  const data = await res.json();
  return {
    props: { quiz: data },
  };
};

const QuizSlug = ({ quiz }) => {
  const [store, dispatch] = useContext(StoreContext);
  const intervalRef = useRef(null);

  useEffect(() => {
    dispatch({
      type: types.setQuesions,
      payload: quiz.questions,
    });

  }, []);

  const handleStartQuiz = () => {
    if (store.started) {
      dispatch({
        type: types.timerRef,
        payload: intervalRef.current
      })

    } else {
      const currentTime = Date.now() - store.timer;
        store.timerRef = setInterval(() => {
        dispatch({
          type: types.startTimer,
          payload: Math.floor((Date.now() - currentTime) / 1000),
        });
      }, 1000);
      dispatch({ type: types.setStarted });
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{quiz.title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {store.showFinalScore !== true && store.started === true ? (
        <p className={styles.currentQuestion} style={{ zIndex: -1 }}>
          {store.currentQuestion}/{store.questions.length}
        </p>
      ) : null }
      
      <p className={styles.quiz_timer} style={{zIndex: 99}}>
        {store.timer} sec
      </p>

    

      <div className={styles.quiz_main}>
        {!store.started ? (
          <>
            <h1 className={styles.quiz_title}>{quiz.title}</h1>

            <div className={styles.grid}>
              <button className={styles.start} onClick={handleStartQuiz}>
                <h2>Start</h2>
              </button>
            </div>
          </>
        ) : (
          <QuizCard />
        )}
      </div>
    </div>
  );
};

export default QuizSlug;
