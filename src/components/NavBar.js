import Image from "next/image";
import image from "../../public/logo.png";
import Link from "next/link";
import { IoLogoWhatsapp } from "react-icons/io";

export default function NavBar() {
  return (
    <>
      <nav className="navbar">
        <div className="container">
          <Image
            loading="lazy"
            className="logo"
            src={image}
            alt="logo"
            width={70}
            height={80}
          />

          <h1 className="goods">
            لِّيَدَّبَّرُوا <span>آيَاتِهِ </span>
          </h1>

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
