import React, { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db, storage } from '../firebase.js'

import { useNavigate } from 'react-router-dom'

function AdminEditEvent() {
    const navigate = useNavigate()

  useEffect(() => {
    //navgate to login
    onAuthStateChanged(auth, (user) => {
      if (!user || user.email !== 'info@durgaville.com') {
        navigate('/adminlogin')
      }
    })
  }, [navigate])

  return (
    <div>

    </div>
  )
}

export default AdminEditEvent
