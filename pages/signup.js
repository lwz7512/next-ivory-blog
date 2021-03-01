import React, { useState, useEffect } from 'react'

import Link from 'next/link'
import Layout from '../components/layout'
import Container from '../components/container'
import PostTitle from '../components/post-title'
import { signup } from '../lib/api'
import PulseLoader from 'react-spinners/PulseLoader'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';

export default function SignupPage() {

  const router = useRouter()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nameValid, setNameValid] = useState(true)
  const [emailValid, setEmailValid] = useState(true)
  const [passwdValid, setPasswdValid] = useState(true)
  const [sending, setSending] = useState(false)
  const notify = () => toast.success('Register new user failed.😓');

  const nameChangeHandler = (evt) => {
    let tmpName = evt.currentTarget.value
    if(tmpName.length < 20) setName(tmpName)
  }

  const emailChangeHandler = (evt) => {
    let tmpEmail = evt.currentTarget.value
    setEmail(tmpEmail)
    let re = /\S+@\S+\.\S+/
    let valid = re.test(tmpEmail)
    setEmailValid(valid)
  }

  const passwdChangeHandler = (evt) => {
    let tmpPassword = evt.currentTarget.value
    setPassword(tmpPassword)
    if(Number(tmpPassword) == NaN) return setPasswdValid(false)
    let re = /^[0-9]{6,}$/
    let valid = re.test(tmpPassword)
    setPasswdValid(valid)
  }

  const submit = () => {
    if(!name) return setNameValid(false)
    if(!email) return setEmailValid(false)
    if(!password) return setPasswdValid(false)
    if(!name || !emailValid || !passwdValid) return
    if(sending) return // repeatedly submit not allowed

    setSending(true) // valid input now!
    signup(name, email, password).then(res => {
      if(res){
        router.push('/profile') // forward to profile page
      }else{
        notify() // popup failure toast
        setSending(false)
      }
    })
  }

  return (
    <Layout>
      <Container>
        <div className="bg-white w-full lg:w-4/12 md:6/12 w-10/12 m-auto sm:my-10 sm:shadow-sm">
          <div className="py-8 px-8 rounded-xl">
            <h1 className="font-medium text-2xl mt-3 text-center">Create New Account</h1>
            <form action="" className="mt-6">
              <div className="my-5 text-sm">
                  <label htmlFor="userename" className="block text-black">User Name</label>
                  <input id="userename" 
                    type="text" autoFocus
                    className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full" 
                    placeholder="Your name" 
                    value={name}
                    onChange={nameChangeHandler}
                    />
                    <div className="flex justify-end mt-2 text-xs text-red-600">
                      {!nameValid?(name?'user name no more than 20 chars':'user name required.'):''}
                    </div>
              </div>
              <div className="my-5 text-sm">
                  <label htmlFor="useremail" className="block text-black">User Email</label>
                  <input id="useremail" 
                    type="text" autoFocus
                    className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full" 
                    placeholder="Valid Email Address" 
                    value={email}
                    onChange={emailChangeHandler}
                    />
                    <div className="flex justify-end mt-2 text-xs text-red-600">
                      {!emailValid?(email?'use valid email format':'Email required.'):''}
                    </div>
              </div>
              <div className="my-5 text-sm">
                  <label htmlFor="password" className="block text-black">Password</label>
                  <input id="password" 
                    type="password"
                    className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                    placeholder="6 digits at least" 
                    value={password}
                    onChange={passwdChangeHandler}
                    />
                  <div className="flex justify-end mt-2 text-xs text-red-600">
                  {(!passwdValid)?(password?'6 digits at least':'Password required.'):''}
                  </div>
              </div>

              <button type="button"
                className={sending?'btn-disabled':'btn-normal'}
                onClick={submit}>
                  {sending?(<PulseLoader color="#0f0" size="10px" />):'Sign Up'}
                </button>
            </form>
          </div>
        </div>
        <ToastContainer 
          position="bottom-center"
          autoClose={2500}
          />
      </Container>
    </Layout>
  )
}