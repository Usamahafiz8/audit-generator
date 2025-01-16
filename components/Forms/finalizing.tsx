import React, { useContext, useState, Dispatch, SetStateAction } from "react";
import { Grid, Input, StyledInputLabel } from "@nextui-org/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Container, Row, Text, Spacer, Card } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import {
  BasicInfoContextType,
  ScopeContextType,
  CommitHashContextType,
  FindingContextType,
} from "../../types/context.types";
import { BasicInfoContext } from "../../context/BasicInfoContext";
import { ScopeContext } from "../../context/ScopeContext";
import { CommitHashContext } from "../../context/CommitHashContext";
import { FindingContext } from "../../context/FindingContext";
import { Audit, CommitHash, Finding } from "../../types/types";
import axios from "axios";
import Router, { useRouter } from "next/router";

interface IFormInput {
  version: string;
  custom_audit_id: string;
  executive_summary: string;
}

const Finalizing: React.FC<{
  setStage: Dispatch<SetStateAction<string>>;
  audit?: Audit;
}> = ({ setStage,audit }) => {
  const { finding } = useContext(FindingContext) as FindingContextType;
  const { scope } = useContext(ScopeContext) as ScopeContextType;
  const { commitHash } = useContext(CommitHashContext) as CommitHashContextType;
  const { basicInfo } = useContext(BasicInfoContext) as BasicInfoContextType;
  const { control, handleSubmit } = useForm<IFormInput>();
  const [eSummary, setESummary] = useState("");
  const rout = useRouter();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const auditUpdateId = Router.query.updateId;
    if (Router.asPath === "/audit/new") {
      await axios
        .post("/api/audit", {
          version: data.version,
          executive_summary: eSummary,
          custom_audit_id: data.custom_audit_id,
          client_name: basicInfo?.client_name!,
          start_date: basicInfo?.start_date!,
          end_date: basicInfo?.end_date!,
          type_of_smart_contract: basicInfo?.type_of_smart_contract!,
          scope: scope!,
          commit_hashes: commitHash,
          findings: finding,
        })
        .then((res) => {
        })
        .catch((e) => {
        });
    } else {
      await axios
        .patch(`/api/audit/update/${auditUpdateId}`, {
          version: data.version,
          executive_summary: eSummary,
          custom_audit_id: data.custom_audit_id,
          client_name: basicInfo?.client_name!,
          start_date: basicInfo?.start_date!,
          end_date: basicInfo?.end_date!,
          type_of_smart_contract: basicInfo?.type_of_smart_contract!,
          scope: scope!,
          commit_hashes: commitHash,
          findings: finding,
        })
        .then((res) => {
        })
        .catch((e) => {
        });
    }

    Router.push("/");
  };
  return (
    <>
      <Container css={{ height: "100%", width: "100%" }}>
        <Row>
          <Text h6 size={22} color="black" css={{ m: 0 }}>
            Finalizing
          </Text>
        </Row>
        <Spacer y={0.5} />
        <hr />
        <Spacer y={1} />
        <Row css={{ height: "100%" }}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Grid.Container css={{ width: "100%", flexDirection: "column" }}>
              <Grid>
                <Card
                  variant="flat"
                  css={{
                    height: "5vh",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    paddingLeft: "10px",
                  }}
                >
                  <Text
                    css={{ display: "flex", flexDirection: "row" }}
                    size={14}
                  >
                    <b>Note: </b>
                    <Text
                      size={14}
                      css={{
                        marginLeft: "5px",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      Please provide version if an audit already exists.{" "}
                      <Text
                        size={14}
                        color="gray"
                        css={{
                          marginLeft: "5px",
                        }}
                      >
                        Default (v1.00.00)
                      </Text>
                    </Text>
                  </Text>
                </Card>
              </Grid>
              <Spacer y={1} />
              <Grid>
                <Controller
                  name="version"
                  control={control}
                  render={({ field }) => (
                    <Input
                        initialValue={audit?.version}
                        placeholder="vX.XX.XX" label="Version" {...field} />
                  )}
                />
              </Grid>
              <Spacer y={1} />
              <Grid>
                <Controller
                  name="custom_audit_id"
                  control={control}
                  render={({ field }) => (
                    <Input
                        initialValue={audit?.custom_audit_id}
                        label="Custom Audit ID" {...field} />
                  )}
                />
              </Grid>
              <Spacer x={1} />
              <Grid css={{ display: "flex", flexDirection: "column" }}>
                <StyledInputLabel
                  css={{
                    fontWeight: "$normal",
                    fontSize: "14px",
                    height: "42%",
                    paddingLeft: "5px",
                  }}
                >
                  Executive Summary
                </StyledInputLabel>
                <Spacer y={1} />
                <select
                  style={{
                    fontSize: "13px",
                    background: "#f1f3f5",
                    color: "black",
                    borderRadius: "10px",
                    border: "none",
                    outline: "none",
                    width: "11vw",
                    height: "5.5vh",
                    padding: "10px",
                  }}
                  defaultValue={eSummary}
                  onChange={(e) => setESummary(e.target.value)}
                >
                  <option value="NOT_SECURE">Not Secure</option>
                  <option value="INSUFFICIENTLY_SECURED">
                    Insufficently Secured
                  </option>
                  <option value="SECURED">Secured</option>
                  <option value="WELL_SECURED">Well Secured</option>
                </select>
              </Grid>
            </Grid.Container>
            <Spacer y={1.5} />
            <Grid
              css={{ display: "flex", justifyContent: "start", width: "100%" }}
            >
              <Button size="xs" type="submit">
                {rout?.asPath === "/audit/new" ? "Save Audit" : "Update Audit"}
              </Button>
            </Grid>
          </form>
        </Row>
      </Container>
    </>
  );
};

export default Finalizing;
