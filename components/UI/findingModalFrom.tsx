import React, { useState } from "react";
import { Grid, Input, StyledInputLabel } from "@nextui-org/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Container, Row, Text, Spacer } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import {
  EClassification,
  EFindingStatus,
  EFindingLocationType,
} from "../../types/audit.enum";
import WWEditor from "../Forms/wizywyg";
import { Audit, Finding } from "../../types/types";
import axios from "axios";

interface IFormInput {
  title: string;
  classification: EClassification;
  status: EFindingStatus;
  location: {
    type: EFindingLocationType;
    name: string;
    start: number;
    end: number;
  };
}

const FindingModalForm: React.FC<{
  audit: Audit;
  auditId: string | string[];
  setOpen: any;
}> = ({ audit, auditId, setOpen }) => {
  let upAudit: any = audit;

  const updateFindings = async () => {
    await axios
      .patch(
        `/api/audit/${auditId}`,
        mfAudit
      )
      .then((res) => {
        // console.log(audit)
        // setOpen(false)
        // Router.push(`/audit/${auditId}`);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  var auditToModify: Audit = audit;
  const [description, setDescription] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [findings, setFindings] = useState<Finding>();
  const [mfAudit, setMfAudit] = useState();

  const { control, handleSubmit, register, reset } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setFindings({
      title: data.title,
      description: description,
      recommendation: recommendation,
      classification: data.classification,
      status: data.status,
      location: {
        type: data.location.type,
        name: data.location.name,
        line_number: [{
          start: data.location.start,
          end: data.location.end,
        }],
      },
    });

    upAudit.findings.push(findings!);
    setMfAudit(upAudit);
    setDescription("");
    setRecommendation("");
    reset();
    updateFindings();
  };

  return (
    <Container css={{ height: "100%", width: "100%", overflowY: "scroll" }}>
      <Row css={{ height: "100%", width: "100%" }}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            height: "60vh",
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Grid.Container css={{ width: "100%" }}>
            <Grid>
              <Controller
                name="title"
                control={control}
                render={({ field }) => <Input label="Title" {...field} />}
              />
            </Grid>
          </Grid.Container>
          <Spacer y={1} />
          <Text size={15}>Add a description</Text>
          <Spacer y={1} />
          <Grid.Container css={{ width: "100%" }}>
            <Grid>
              <WWEditor setFunction={setDescription} />
            </Grid>
          </Grid.Container>

          <Spacer y={1} />
          <Text size={15}>Recommendation</Text>
          <Spacer y={1} />
          <Grid.Container css={{ width: "100%" }}>
            <Grid>
              <WWEditor setFunction={setRecommendation} />
            </Grid>
          </Grid.Container>

          <Spacer y={1.5} />
          <Grid.Container css={{ width: "100%" }}>
            <Grid css={{ display: "flex", flexDirection: "column" }}>
              <StyledInputLabel
                css={{
                  fontWeight: "$normal",
                  fontSize: "14px",
                  height: "42%",
                  paddingLeft: "5px",
                }}
              >
                Classification
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
                {...register("classification")}
              >
                <option value="CRITICAL">CRITICAL</option>
                <option value="HIGH">HIGH</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="LOW">LOW</option>
              </select>
            </Grid>
            <Spacer y={2} />
            <Grid
              css={{
                display: "flex",
                flexDirection: "column",
                paddingTop: "15px",
              }}
            >
              <StyledInputLabel
                css={{
                  fontWeight: "$normal",
                  fontSize: "14px",
                  height: "42%",
                  paddingLeft: "5px",
                }}
              >
                Status
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
                {...register("status")}
              >
                <option value="CRITICAL">FIXED</option>
                <option value="HIGH">TODO</option>
              </select>
            </Grid>
          </Grid.Container>

          <Spacer y={1} />
          <Text css={{ paddingLeft: "2px" }} size={15}>
            Location
          </Text>
          <Spacer y={1} />

          <Grid.Container css={{ width: "100%", paddingLeft: "2px" }}>
            <Grid>
              <select
                placeholder="Type"
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
                {...register("location.type")}
              >
                <option value="" disabled selected hidden>
                  Type
                </option>
                <option value="CRITICAL">CRITICAL</option>
                <option value="HIGH">HIGH</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="LOW">LOW</option>
              </select>
            </Grid>
            <Spacer y={3} />
            <Grid>
              <Controller
                name="location.name"
                control={control}
                render={({ field }) => <Input placeholder="Name" {...field} />}
              />
            </Grid>
          </Grid.Container>

          <Text size={15}>Line Number</Text>
          <Spacer y={1} />

          <Grid.Container css={{ width: "100%", paddingLeft: "2px" }}>
            <Grid>
              <Controller
                name="location.start"
                control={control}
                render={({ field }) => (
                  <Input placeholder="Start" type="number" {...field} />
                )}
              />
            </Grid>
            <Spacer y={2} />
            <Grid>
              <Controller
                name="location.end"
                control={control}
                render={({ field }) => (
                  <Input placeholder="End" type="number" {...field} />
                )}
              />
            </Grid>
          </Grid.Container>

          <Spacer y={1.5} />
          <hr
            style={{
              height: "1px",
              width: "97%",
              color: "black",
              marginLeft: "0.1vw",
            }}
          />
          <Grid.Container
            css={{
              display: "flex",
              justifyContent: "flex-start",
              paddingRight: "2.5vw",
            }}
          >
            <Grid>
              <Button size="sm" type="submit">
                Save Finding
              </Button>
            </Grid>
          </Grid.Container>
          <Spacer y={2} />
        </form>
      </Row>
    </Container>
  );
};

export default FindingModalForm;
