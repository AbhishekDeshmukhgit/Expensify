import styles from './Signup.module.css'
import React, { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'

export default function Signupp() {

  
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [displayname,setDisplayname]=useState('')
  const {signup,error,isPending}=useSignup()

  const handleSubmit = (e)=>{
    e.preventDefault()
    signup(email,password,displayname)
  }

  return (
    
    <form onSubmit={handleSubmit} className={styles['signup-form']}>
      <h2>Signup</h2>
      <label>
        <span>email:</span>
        <input
        type="email" 
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input type="password"
        onChange={(e)=>setPassword(e.target.value)}
        value={password}
        />
      </label>
      <label>
        <span>Display Name</span>
        <input type="text"
        onChange={(e)=>setDisplayname(e.target.value)}
        value={displayname}
        />
      </label>
      {!isPending &&<button className='btn'>Signup</button>}
      {isPending && <button className='btn' disabled>loading</button>}
      {error && <p>{error}</p>}
    </form>
  )
}
