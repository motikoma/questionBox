import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import firebase from "firebase/app";
import Layout from "../../components/Layout";
import { Question } from "../../interfaces/index";
import { Answer } from "../../interfaces/index";
import useAuthentication from "../../fooks/authentication";
import TwitterShareButton from "../../components/TwitterShareButton";
import getDescription from "../../lib/getDescription";

type Query = {
  id: string;
};

export default function QuestionsShow() {
  const router = useRouter();
  const query = router.query as Query;
  const { user } = useAuthentication();
  const [isSending, setIsSending] = useState<boolean>();
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [description, setDescription] = useState<string>();
  const [ogpImageUrl, setOgpImageUrl] = useState<string>();
  const [body, setBody] = useState<string>("");
  const [question, setQuestion] = useState<Question | null>(null);

  async function loadData() {
    // --- 質問の読み込み ---
    if (query.id === undefined) {
      return;
    }

    const questionDoc = await firebase
      .firestore()
      .collection("questions")
      .doc(query.id)
      .get();
    if (!questionDoc.exists) {
      return;
    }

    const gotQuestion = questionDoc.data() as Question;
    // documentのidをgotQuestion.idに代入する
    gotQuestion.id = questionDoc.id;
    setQuestion(gotQuestion);

    // --- 回答の読み込み ---
    if (!gotQuestion.isReplied) {
      return;
    }

    const answerSnapshot = await firebase
      .firestore()
      .collection("answers")
      .where("questionId", "==", gotQuestion.id)
      .limit(1)
      .get();
    if (answerSnapshot.empty) {
      return;
    }

    const gotAnswer = answerSnapshot.docs[0].data() as Answer;
    gotAnswer.id = answerSnapshot.docs[0].id;
    setAnswer(gotAnswer);
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    // 回答データの登録&質問データのisRepliedをtrueに更新するを同時に実行したいためトランザクション処理を実装

    const answerRef = firebase.firestore().collection("answers").doc();
    await firebase.firestore().runTransaction(async (t) => {
      t.set(answerRef, {
        uid: user.uid,
        // ?を記載することでnullではなくundefindを返すことでエラーを防ぐ
        questionId: question?.id,
        body,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      t.update(firebase.firestore().collection("questions").doc(question?.id), {
        isReplied: true,
      });
    });

    const now = new Date().getTime();
    setAnswer({
      id: "",
      uid: user.uid,
      questionId: question?.id,
      body,
      createdAt: new firebase.firestore.Timestamp(now / 1000, now % 1000),
    } as Answer);
  };

  useEffect(() => {
    if (user === null) {
      return;
    }

    if (answer) {
      // TODO: metaタグの生成が先に始まっており、後からdescriptionが変更されてしまっている
      setDescription(getDescription(answer));
      setOgpImageUrl(
        `${process.env.NEXT_PUBLIC_WEB_URL}/api/answers/${answer.id}/ogp`
      );
    }

    loadData();
  }, [query.id, user, answer]);

  return (
    <Layout>
      <Head>
        <meta name="description" key="description" content={description} />
        <meta property="og:image" key="ogImage" content={ogpImageUrl} />
        <meta
          name="twitter:card"
          key="twitterCard"
          content="summary_large_image"
        />
        <meta name="twitter:image" key="twitterImage" content={ogpImageUrl} />
      </Head>
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          {question && (
            <>
              <div className="card">
                <div className="card-body">{question.body}</div>
              </div>

              <section className="text-center mt-4">
                <h2 className="h4">回答</h2>

                {answer === null ? (
                  <form onSubmit={onSubmit}>
                    <textarea
                      className="form-control"
                      placeholder="おげんきですか？"
                      rows={6}
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      required
                    ></textarea>
                    <div className="m-3">
                      {isSending ? (
                        <div
                          className="spinner-border text-secondary"
                          role="status"
                        ></div>
                      ) : (
                        <button type="submit" className="btn btn-primary">
                          回答する
                        </button>
                      )}
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="card">
                      <div className="card-body text-left">{answer.body}</div>
                    </div>
                    {ogpImageUrl && (
                      <div className="my-3 d-flex justify-content-center">
                        <TwitterShareButton
                          url={ogpImageUrl}
                          text={answer.body}
                        />
                      </div>
                    )}
                  </>
                )}
              </section>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
