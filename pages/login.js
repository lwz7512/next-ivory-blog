import React, { useState, useEffect } from 'react'

import Link from 'next/link'
import Layout from '../components/layout'
import Container from '../components/container'
import PostTitle from '../components/post-title'
import { signin } from '../lib/api'
import PulseLoader from 'react-spinners/PulseLoader'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';

export default function LoginPage() {

  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailValid, setEmailValid] = useState(true)
  const [passwdValid, setPasswdValid] = useState(true)
  const [sending, setSending] = useState(false)
  const notify = () => toast.error('Incorrect username or password.😓');

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
    if(!email) return setEmailValid(false)
    if(!password) return setPasswdValid(false)
    if(!emailValid || !passwdValid) return
    if(sending) return // repeatedly submit not allowed

    setSending(true) // valid input now!
    signin(email, password).then(res => {
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
        <div className="bg-white w-full lg:w-4/12 md:6/12 w-10/12 m-auto sm:my-20 sm:shadow-sm">
          <div className="py-8 px-8 rounded-xl">
            <h1 className="font-medium text-2xl mt-3 text-center">Welcome Back</h1>
            <form action="" className="mt-6">
                <div className="my-5 text-sm">
                    <label htmlFor="username" className="block text-black">User Email</label>
                    <input id="username" 
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
                    <div className="flex justify-end mt-2 text-xs text-blue-600">
                      <Link href="/signup">
                        <a className="block">No Account? Signup</a>
                      </Link>
                    </div>
                </div>

                <button type="button"
                  className={sending?'btn-disabled':'btn-normal'}
                  onClick={submit}>
                    {sending?(<PulseLoader color="#0f0" size="10px" />):'Log In'}
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