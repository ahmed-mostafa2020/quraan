import NavBar from "./NavBar";
import UnderDeveloping from "./UnderDeveloping";
export default function Layout({ children }) {
  return (
    <>
      <UnderDeveloping />

      <NavBar />
      {children}
    </>
  );
}
