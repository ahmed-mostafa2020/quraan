//this app is installed with bootstrap ,materialUI and tailwind

import Image from "next/image";
import image from "../../public/photo10.svg";
import Link from "next/link";
import { IoLogoWhatsapp } from "react-icons/io";

export default function NavBar() {
  return (
    <>
      <nav className="navbar">
        <div className="container">
          <a href="#">
            <Image
              className="logo"
              src={image}
              alt="logo"
              width={100}
              height={80}
            />
          </a>

          <h1 className="goods">
            {" "}
            لِّيَدَّبَّرُوا <span>آيَاتِهِ </span>{" "}
          </h1>
          {/* <div>
            <Link href='/' className="mr-2 p-1">الرئيسية </Link>
            <Link href='/login' className="mr-2 p-1">Login </Link>
            <Link href='/register' className="p-1">Register </Link>
            <Link href='/result' className="p-1">result </Link>
            <p>الموقع تحت التطوير </p>
          </div> */}

          <Link
            href="https://chat.whatsapp.com/Hokw6zJMbIF9Z43SUYOZo6"
            className="whats"
            target="blank"
          >
            <IoLogoWhatsapp />
          </Link>
        </div>
      </nav>
    </>
  );
}
