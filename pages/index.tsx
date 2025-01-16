import type { NextPage } from "next";
import { Container, Row } from "@nextui-org/react";
import Audit from "./audit";

const Home: NextPage = () => {
  return (
    <Container
      display="flex"
      alignItems="center"
      justify="center"
      css={{ height: "89vh", padding: "20px", overflow:'hidden' }}
    >
      <Row justify="center" align="center" >
      <Audit />
      </Row>
    </Container>
  );
};

export default Home;
