import { useState, useEffect, useRef } from "react";
import firebase from "firebase/app";
import { Question } from "../../interfaces";
import Layout from "../../components/Layout";
import useAuthentication from "../../fooks/authentication";
import dayjs from "dayjs";
import Link from "next/link";

const QuestionsReceived = () => {
  const { user } = useAuthentication();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isPaginationFinished, setIsPaginationFinished] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    if (!isPaginationFinished) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    if (rect.top + rect.height > window.innerHeight) {
      return;
    }

    loadNextQuestions();
  };

  const createBaseQuery = () => {
    // ドキュメントへの参照
    return firebase
      .firestore()
      .collection("questions")
      .where("receiverUid", "==", user.uid)
      .orderBy("createdAt", "desc")
      .limit(10);
  };

  const appendQuestions = async (
    snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  ) => {
    const gotQuestions = snapshot.docs.map((doc) => {
      const question = doc.data() as Question;
      question.id = doc.id;
      return question;
    });
    setQuestions(questions.concat(gotQuestions));
  };

  const loadQuestions = async () => {
    // クエリスナップショットの取得
    const snapshot = await createBaseQuery().get();

    if (snapshot.empty) {
      setIsPaginationFinished(true);
      return;
    }

    appendQuestions(snapshot);
  };

  const loadNextQuestions = async () => {
    if (questions.length === 0) {
      return;
    }

    const lastQuestion = questions[questions.length - 1];
    const snapshot = await createBaseQuery()
      .startAfter(lastQuestion.createdAt)
      .get();

    if (snapshot.empty) {
      return;
    }

    appendQuestions(snapshot);
  };

  useEffect(() => {
    // SSRしていないので不要？
    if (!process.browser) {
      return;
    }

    // SSR の場合やログイン状態になっていない場合
    if (user === null) {
      return;
    }

    loadQuestions();
  }, [process.browser, user]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [questions, scrollContainerRef.current, isPaginationFinished]);

  return (
    <Layout>
      <h1 className="h4">受け取った質問一覧</h1>
      <div className="row justify-content-center">
        <div className="col-12 col-md-6" ref={scrollContainerRef}>
          {questions.map((question) => (
            <Link href={`/questions/${question.id}`} key={question.id}>
              <a>
                <div className="card my-3">
                  <div className="card-body">
                    <div className="text-truncate">{question.body}</div>
                    <div className="text-muted text-end">
                      <small>
                        {dayjs(question.createdAt.toDate()).format(
                          "YYYY/MM/DD HH:mm"
                        )}
                      </small>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default QuestionsReceived;
