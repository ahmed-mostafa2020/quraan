import * as React from 'react';
import Image from "next/image";
import image from '../../public/photo10.svg';
import Link from 'next/link';
import LogForm from "../components/LogForm";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Helmet from "@/helpers/Helmet";


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
      <Helmet title={'تسجيل الدخول'} ></Helmet>

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
