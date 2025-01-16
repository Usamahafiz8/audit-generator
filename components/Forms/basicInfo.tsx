import React, {Dispatch, SetStateAction, useContext, useEffect,} from "react";
import {Button, Container, Grid, Input, Row, Spacer, StyledInputLabel, Text} from "@nextui-org/react";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {BasicInfoContextType} from "../../types/context.types";
import {BasicInfoContext} from "../../context/BasicInfoContext";
import {ETypeOfSmartContract} from "../../types/audit.enum";
import {useRouter} from "next/router";
import {Audit, Scope} from "../../types/types";

interface IFormInput {
    client_name: string;
    start_date: string;
    type_of_smart_contract: ETypeOfSmartContract;
    end_date?: string;
}

// type AuditT = {
//   version: string,
//   custom_audit_id: string,
//   client_name: string,
//   start_date: string,
//   end_date: string
//   type_of_smart_contract: string,
//   scope: Scope
//   commit_hashes: [CommitHash]
//   findings: [Finding]
// };
// interface auditT {
//   audit:Audit
// }
const BasicInfo: React.FC<{ setStage: Dispatch<SetStateAction<string>>, audit?: Audit }> = (
    {setStage, audit},
) => {
    const {basicInfo, saveBasicInfo} = useContext(
        BasicInfoContext
    ) as BasicInfoContextType;
    const {control, handleSubmit, register, } = useForm<IFormInput>();
    const rout = useRouter();



    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        saveBasicInfo(data);
        setStage("Scope");
    };

    return (
        <Container css={{height: "100%", width: "100%"}}>
            <Row>
                <Text h6 size={22} color="black" css={{m: 0}}>
                    Basic Info
                </Text>
            </Row>
            <Spacer y={0.5}/>
            <hr/>
            <Spacer y={1}/>
            <Row css={{height: "100%"}}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    style={{height: "100%", display: "flex", flexDirection: "column"}}
                >
                    <Grid.Container css={{width: "100%"}}>
                        <Grid>
                            <Controller
                                name="client_name"
                                control={control}
                                render={({field}) => (
                                    <Input initialValue={audit?.client_name} placeholder={"Name"} required label="Client Name" {...field} />
                                )}
                            />
                        </Grid>
                        <Spacer x={1}/>
                        <Grid>
                            <Controller
                                name="start_date"
                                control={control}
                                render={({field}) => (
                                    <Input initialValue={audit?.start_date} placeholder={audit?.start_date} required type="date"
                                           label="Start Date" {...field} />
                                )}
                            />
                        </Grid>
                    </Grid.Container>
                    <Spacer y={1}/>
                    <Grid.Container css={{width: "100%"}}>
                        <Grid>
                            <StyledInputLabel

                                css={{
                                    fontWeight: "$normal",
                                    fontSize: "14px",
                                    height: "0%",
                                    paddingLeft: "5px",
                                }}

                                placeholder={audit?.type_of_smart_contract}
                            >
                                Type / Subtype
                            </StyledInputLabel>
                            <Spacer y={0.3}/>
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
                                {...register("type_of_smart_contract")}
                            >
                                <option value="BRIDGE">BRIDGE</option>
                            </select>
                        </Grid>
                        <Spacer x={1.7}/>
                        <Grid>
                            <Controller
                                name="end_date"
                                control={control}
                                render={({field}) => (
                                    <Input initialValue={audit?.end_date} placeholder={audit?.end_date} type="date" label="End Date" {...field} />
                                )}
                            />
                        </Grid>
                    </Grid.Container>
                    <Spacer y={1.5}/>
                    <Grid css={{display: "flex", justifyContent: "end"}}>
                        <Button size="sm" type="submit">
                            {rout?.asPath === "/audit/new" ? "Create" : "Update"}
                        </Button>
                    </Grid>
                </form>
            </Row>
        </Container>
    );
};

export default BasicInfo;
