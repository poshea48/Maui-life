import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";

const Container = styled.main`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

const Content = styled.section`
  padding: 1em;
  flex: 1 auto;
`;
const Layout = ({ children }) => (
  <Container>
    <Navbar />
    <Content>{children}</Content>
    <Footer />
  </Container>
);

export default Layout;
