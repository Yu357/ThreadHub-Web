import styles from '../styles/addCommentSection.module.css'

import React, { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore';
import db from '../utilities/Firebase'

function AddCommentSection(props) {

  const [text, setText] = useState('')

  const onInputText = (e) => {
    setText(e.target.value)
  }

  const createComment = () => {
    if (text === '') {
      alert('Please enter comment.')
      return
    }

    addDoc(collection(db, 'comments'), {
      threadId: props.threadId,
      createdAt: Date(),
      dailyUserId: 'unknown1234',
      text: text
    })
    console.log(`comment: ${text}`)
  }

  return (
    <div className={styles.addCommentSection}>

      <form>
        <textarea placeholder='Comment' rows='2' required onChange={onInputText}/>
      </form>

      <div className={styles.submitButtonContainer}>
        <button onClick={createComment}>Add a comment</button>
      </div>

    </div>
  )
}

export default AddCommentSection