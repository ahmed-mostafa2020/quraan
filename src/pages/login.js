import Head from "next/head";
import * as React from 'react';
import Image from "next/image";
import image from '../../public/photo10.svg';
import Link from 'next/link';
import LogForm from "../components/LogForm";
import { useRouter } from "next/router";
import { useEffect } from "react";


export default function Login() {
    //redirect
    let router = useRouter();
    function redirect(page) {
      router.push(page);
    }
  useEffect(() => {
    let token = localStorage.getItem('token');
    if(token){
      redirect('/');
    }
  },[]);


  return (
    <>
      <Head>
        <title>جروب القرءان الكريم | تسجيل الدخول</title>
        <meta name="description" content="جروب القراءن الكريم" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/blob14.svg" />
      </Head>

      <section className="login">
        <div className="container py-3">
          <div className="wrap">
            <div className="logoimg">
              <Image src={image} width={400} height={400} alt="logo" />
            </div>

            <div className="info">
              <div className="header">
                <h2>تسجيل الدخول</h2>
              </div>

              <LogForm />
              
              <div className="footer">
                <p className="member text-center"> <Link data-toggle="tab" href="/register">إنشاء حساب</Link>  ليس لديك حساب؟</p>
              </div>
            
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
