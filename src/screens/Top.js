import styles from '../styles/top.module.css'

import React, { useEffect, useState } from 'react'
import { collection, query, onSnapshot } from "firebase/firestore"
import db from '../utilities/Firebase'

import Header from '../components/Header'
import ThreadCard from '../components/ThreadCard'
import AddThreadModal from '../components/AddThreadModal'

function Top() {

  const [documents, setDocuments] = useState([])
  const [isOpenModal, setIsOpenModal] = useState(false)

  useEffect(() => {
    const q = query(collection(db, "threads"))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = []
      querySnapshot.forEach((doc) => {
        docs.push(doc)
        console.log(`Thread id: ${doc.id}, title: ${doc.data().title}, createdAt: ${doc.data().createdAt}`)
      })

      setDocuments(docs)
    })

    return () => {
      unsubscribe()
    }
    
  }, [])
  
  return (
    <div>
      <AddThreadModal isOpenModal={isOpenModal}/>
      <Header/>

      <main>

        <div className={styles.largeContainer}>
          <div className={styles.titleBar}>
            <h2>Threads</h2>
            <button onClick={() => setIsOpenModal(true)}>Create new thread</button>
          </div>


          <div className={styles.cardContainer}>
            {
              documents.map(document => (
                <ThreadCard key={document.id} document={document}/>
              ))
            }
          </div>
        
        </div>
      </main>

    </div>
  )
}

export default Top