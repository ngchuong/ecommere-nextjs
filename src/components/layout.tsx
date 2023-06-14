import Header from "src/components/header";
import Footer from "src/components/footer/footer";
import BreadcrumbComp from "src/components/breadcumb";
import styled from "styled-components";

const MainLayout = styled('div')`
  min-height: 65vh;
`;
export default function Layout({ children }) {
  return (
    <>
      <Header />
      <BreadcrumbComp />
      <MainLayout>{children}</MainLayout>
      <Footer />
    </>
  );
}
