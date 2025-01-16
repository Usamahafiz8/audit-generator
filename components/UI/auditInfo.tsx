import {
  Badge,
  Container,
  Grid,
  Spacer,
  Text,
  Button,
} from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { Audit } from "../../types/types";
import AuditFindingCard from "./auditFindingCard";
import FindingModal from "./newFindingModal";
import Router from "next/router";
const download = require("downloadjs");
import Link from "next/link"
const AuditInfo: React.FC<{ audit: Audit; auditId: string | string[] }> = ({
  audit,
  auditId,
}) => {
  const [open, setOpen] = useState(false);
  const [auditDetails, setAuditDetails] = useState<Audit>();

  const downloadPDF = async () => {
    await axios
      .get(`/api/${auditId}`, {
        responseType: "blob",
      })
      .then((resp) => {
        download(resp.data, "report", "application/pdf");
      })
      .catch((e) => {
        console.log("error here");
        console.error(e.response.data);
      });
  };

  const singleAuditInfo = async () => {
    console.log("mai chal pra");
    await axios
      .get(`/api/audit/${auditId}`)
      .then((resp) => {
        setAuditDetails(resp.data);
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container
      display="flex"
      alignItems="center"
      justify="center"
      css={{
        height: "89vh",
        width: "85vw",
        padding: "20px",
        overflow: "hidden",
      }}
    >
      <Grid.Container>
        <Grid
          xs={4}
          css={{
            display: "flex",
            alignItems: "start",
            justifyContent: "start",
            height: "75vh",
            flexDirection: "column",
            borderRight: "0.5px solid #f1f3f5",
          }}
        >
          <Grid.Container
            css={{
              flexDirection: "row",
              display: "flex",
              alignContent: "start",
              justifyContent: "start",
            }}
          >
            <Grid>
              <Text h3 css={{ paddingLeft: "0px" }}>
                {audit.client_name}
              </Text>
            </Grid>
            <Spacer x={0.5} />
            <Grid>
              <Badge size="sm" color="secondary" css={{ marginTop: "8px" }}>
                v{audit.version}
              </Badge>
            </Grid>
          </Grid.Container>
          <hr style={{ height: "1px", width: "90%", color: "black" }} />
          <Spacer y={0.5} />
          <Text h4>Contract Information</Text>
          <Text
            css={{
              flexDirection: "row",
              display: "flex",
              alignContent: "start",
              justifyContent: "start",
            }}
          >
            {" "}
            <Text color="grey" h6>
              Type :
            </Text>{" "}
            <Spacer x={0.1} /> <Text h6>{audit.type_of_smart_contract}</Text>
          </Text>
          <Text
            css={{
              flexDirection: "row",
              display: "flex",
              alignContent: "start",
              justifyContent: "start",
            }}
          >
            {" "}
            <Text color="grey" h6>
              Start Date :
            </Text>{" "}
            <Spacer x={0.1} /> <Text h6>{audit.start_date}</Text>
          </Text>
          <Text
            css={{
              flexDirection: "row",
              display: "flex",
              alignContent: "start",
              justifyContent: "start",
            }}
          >
            {" "}
            <Text color="grey" h6>
              End Date :
            </Text>{" "}
            <Spacer x={0.1} /> <Text h6>{audit.end_date}</Text>
          </Text>
          <hr style={{ height: "1px", width: "90%", color: "black" }} />
          <Spacer y={0.5} />
          <Text h4>Scope</Text>
          <Text
            css={{
              flexDirection: "row",
              display: "flex",
              alignContent: "start",
              justifyContent: "start",
            }}
          >
            {" "}
            <Text color="grey" h6>
              Repository :
            </Text>{" "}
            <Spacer x={0.1} /> <Text h6>{audit.scope.repository_link}</Text>
          </Text>
          <Text
            css={{
              flexDirection: "row",
              display: "flex",
              alignContent: "start",
              justifyContent: "start",
            }}
          >
            {" "}
            <Text color="grey" h6>
              Documentation :
            </Text>{" "}
            <Spacer x={0.1} /> <Text h6>{audit.scope.documentation}</Text>
          </Text>
          <Text
            css={{
              flexDirection: "row",
              display: "flex",
              alignContent: "start",
              justifyContent: "start",
            }}
          >
            {" "}
            <Text color="grey" h6>
              Tests :
            </Text>{" "}
            <Spacer x={0.1} /> <Text h6>{audit.scope.tests_status}</Text>
          </Text>
          <Text
            css={{
              flexDirection: "row",
              display: "flex",
              alignContent: "start",
              justifyContent: "start",
            }}
          >
            {" "}
            <Text color="grey" h6>
              Auditors :
            </Text>{" "}
            <Spacer x={0.1} />{" "}
            <Text h6>
              {audit.scope.auditors.map((auditor) => auditor.first_name)}
            </Text>
          </Text>
          <Text
            css={{
              flexDirection: "row",
              display: "flex",
              alignContent: "start",
              justifyContent: "start",
            }}
          >
            {" "}
            <Text color="grey" h6>
              Reviewers :
            </Text>{" "}
            <Spacer x={0.1} />{" "}
            <Text h6>
              {audit.scope.reviewed_by.map((rev) => rev.first_name)}
            </Text>
          </Text>
          <hr style={{ height: "1px", width: "90%", color: "black" }} />
          <Spacer y={0.5} />

          <Text h4>Commit hashes</Text>
          <>
            {" "}
            {audit.commit_hashes.map((ch, key) => {
              return (
                <Text
                  key={key}
                  css={{
                    flexDirection: "row",
                    display: "flex",
                    alignContent: "start",
                    justifyContent: "start",
                  }}
                >
                  {" "}
                  <Text color="grey" h6>
                    Label :
                  </Text>{" "}
                  <Spacer x={0.1} /> <Text h6>Value</Text>
                </Text>
              );
            })}
          </>
        </Grid>
        <Grid
          xs={8}
          css={{
            display: "flex",
            alignItems: "start",
            justifyContent: "start",
            height: "70vh !important",
            flexDirection: "column",
            paddingLeft: "2vw",
          }}
        >
          <Grid.Container
            css={{
              display: "flex",
              alignItems: "start",
              justifyContent: "start",
              flexDirection: "row",
              paddingRight: "30px",
            }}
          >
            <Text h3 css={{ paddingLeft: "0.1vw" }}>
              Findings
            </Text>
            <Spacer x={0.5} />
            <Grid css={{ marginTop: "8px" }}>
              <Button
                onPress={() => {
                  setOpen(!open);
                }}
                bordered
                size="xs"
                color="primary"
                auto
              >
                + Add Finding
              </Button>
            </Grid>
            <Spacer x={15.2} />
            <Grid css={{ marginTop: "8px" }}>
                <Link href={`update/${auditId}`}>

                Edit

                    </Link>

            </Grid>
            <Spacer x={0.5} />
            <Grid css={{ marginTop: "8px" }}>
              <Button
                size="xs"
                color="secondary"
                auto
                onPress={() => {
                  downloadPDF();
                }}
              >
                Export As PDF
              </Button>
            </Grid>
          </Grid.Container>
          <hr
            style={{
              height: "1px",
              width: "94%",
              color: "black",
              marginLeft: "0.1vw",
            }}
          />
          <Spacer y={0.5} />
          <Grid
            css={{
              overflowY: "scroll",
              height: "100%",
              paddingRight: "20px",
              width: "100%",
            }}
          >
            <AuditFindingCard findings={audit.findings} />
          </Grid>
          <FindingModal
            open={open}
            setOpen={setOpen}
            audit={audit}
            auditId={auditId}
          />
        </Grid>
      </Grid.Container>
    </Container>
  );
};

export default AuditInfo;
