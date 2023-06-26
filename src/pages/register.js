import { useEffect } from "react";
import Image from "next/image";
import image from "../../public/photo10.svg";
import Link from "next/link";
import RegisterForm from "../components/RegisterForm";
import { useRouter } from "next/router";
import Helmet from "@/helpers/Helmet";

export default function Register() {
  //redirect
  let router = useRouter();
  function redirect(page) {
    router.push(page);
  }
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      redirect("/");
    }
  }, []);

  return (
    <>
      <Helmet title={"إنشاء حساب"} />

      <section className="register">
        <div className="container py-3">
          <div className="wrap">
            <div className="logo-img">
              <Image
                loading="lazy"
                src={image}
                width={500}
                height={500}
                alt="logo"
              />
            </div>

            <div className="info">
              <div className="header">
                <h2>إنشاء حساب</h2>
              </div>

              <RegisterForm />

              <div className="footer">
                <p className="member text-center">
                  <Link data-toggle="tab" href="/login">
                    تسجيل دخول
                  </Link>
                  &nbsp; لديك حساب بالفعل؟
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
