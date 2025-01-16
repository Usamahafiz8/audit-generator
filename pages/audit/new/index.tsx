import type { NextPage } from "next";
import { Col, Container, Row, Text, Grid, Spacer } from "@nextui-org/react";
import NewAuditStages from "../../../components/Forms/newAuditStages";
import { useState } from "react";
import FormContainer from "../../../components/Forms/formContainer";

const NewAudit : NextPage = () => {
    const [stage, setStage] = useState<string>("Basic Info");

    return (
        <Container
          display="flex"
          alignItems="center"
          css={{ height: "89vh", padding: "20px" }}
        >
          <Row justify="center" align="center">
            <Container
              css={{
                height: "80vh",
                width: "55vw",
                backgroundColor: "#ffffff",
                boxShadow: "6px 6px 50px 10px #eeeeee",
                padding: "40px",
                
              }}
            >
              <Grid.Container css={{height:'100%'}}>
                <Grid xs={4}>
              <Col css={{width:'50%'}}>
                <Text h6 size={22} color="black" css={{ m: 0 }}>
                  New Audit
                </Text>
                <Spacer y={0.5} />
                <hr />
                <Spacer y={1} />
                <NewAuditStages stage={stage} />
              </Col>
              </Grid>
              
              <Grid xs={8}>
              <Col>
                <FormContainer stage={stage} setStage={setStage}/>
              </Col>
              </Grid>
              </Grid.Container>
            </Container>
          </Row>
        </Container>
      );
    };
    
    export default NewAudit;