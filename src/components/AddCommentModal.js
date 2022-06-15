import styles from '../styles/addCommentModal.module.css'

import { FaTimes } from 'react-icons/fa'
import React, { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore';
import db from '../utilities/Firebase'
import { getAuth } from "firebase/auth"

function AddCommentModal(props) {

  const [displayName, setDisplayName] = useState('')
  const [text, setText] = useState('')

  const onInputDisplayName = (e) => {
    setDisplayName(e.target.value)
  }

  const onInputText = (e) => {
    setText(e.target.value)
  }

  const createComment = () => {
    if (text === '') {
      alert('Please enter text.')
      return
    }

    if (text.length > 2000) {
      alert('Too many charactors on text.')
      return
    }

    // Get user
    const auth = getAuth();
    const user = auth.currentUser;
    let userId = ''
    if (user) {
      userId = user.uid
    } else {
      userId = 'noname'
    }

    addDoc(collection(db, 'comments'), {
      threadId: props.threadId,
      createdAt: Date(),
      userId: userId,
      text: text,
    })
    console.log(`text: ${text}`)

    closeModal()
  }

  const closeModal = () => {
    setText('')
    props.close()
  }

  return (
    <div className={props.isOpenModal ? `` : styles.invisible}>
      <div className={styles.modalShadow} onClick={() => {closeModal()}}></div>
      <div className={styles.modal}>

        <button className={styles.timesButton} onClick={() => {closeModal()}}>
          <FaTimes/>
        </button>

        <form>
          <input placeholder="Display name" required onChange={onInputDisplayName} value={displayName}/>
          <textarea placeholder='Text' rows='5' required onChange={onInputText} value={text}/>
        </form>

        <div className={styles.submitButtonContainer}>
          <button onClick={createComment}>Add</button>
        </div>
      
      </div>
    </div>
  )
}

export default AddCommentModal