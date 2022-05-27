import styles from '../styles/thread.module.css'

import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot, where, doc, getDoc } from "firebase/firestore";
import db from '../utilities/Firebase';

function Thread() {

  let { threadId } = useParams()

  const [threadTitle, setThreadTitle] = useState()
  const [comments, setComments] = useState([])

  useEffect(() => {

    readThread();

    // Get comments
    const q = query(collection(db, "comments"), where("threadId", "==", threadId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push(doc);
        console.log(`Comment id: ${doc.id}, text: ${doc.data().text}`);
      });

      setComments(docs);
    });

    return () => {
      unsubscribe();
    };
    
  }, []);

  async function readThread() {
    const docSnap = await getDoc(doc(db, "threads", threadId));

    if (docSnap.exists()) {
      console.log(`Thread id: ${docSnap.id}, title: ${docSnap.data().title}`);
      setThreadTitle(docSnap.data().title);
    } else {
      console.log("Thread not found.");
    }
  }

  return (
    <main>
      <div className={styles.largeContainer}>
        <h2 className={styles.title}>{threadTitle}</h2>
      </div>
    </main>
  )
}

export default Thread