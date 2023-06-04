import Header from "src/components/header";
import Footer from "src/components/footer/footer";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
