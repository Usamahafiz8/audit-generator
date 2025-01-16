import react, {SetStateAction, useContext, useState, Dispatch} from "react";
import {Grid, Input, StyledInputLabel} from "@nextui-org/react";
import {useForm, SubmitHandler, Controller} from "react-hook-form";
import {Container, Row, Text, Spacer} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import {
    EClassification,
    EFindingStatus,
    EFindingLocationType,
} from "../../types/audit.enum";
import WWEditor from "./wizywyg";
import {Audit, Finding} from "../../types/types";
import {FindingContextType} from "../../types/context.types";
import {FindingContext} from "../../context/FindingContext";

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

const Findings: React.FC<{ setStage: Dispatch<SetStateAction<string>>, audit?: Audit }> = ({
                                                                                               setStage, audit
                                                                                           }) => {
    const {saveFinding} = useContext(FindingContext) as FindingContextType;
    const [description, setDescription] = useState("");
    const [recommendation, setRecommendation] = useState("");
    const [title, setTitle] = useState("");
    const [classification, setClassification] = useState("");
    const [status, setStatus] = useState("");
    const [type, setType] = useState("");
    const [name, setName] = useState("");
    const [lineStart, setLineStart] = useState<number>(0);
    const [lineEnd, setLineEnd] = useState<number>(0);
    const [findings, setFindings] = useState<any>([]);

    const newFinding = () => {
        setFindings((prev: any) => [
            ...prev,
            {
                title: title,
                description: description,
                recommendation: recommendation,
                classification: classification,
                status: status,
                location: {
                    type: type,
                    name: name,
                    line_number: [
                        {
                            start: lineStart,
                            end: lineEnd,
                        },
                    ],
                },
            },
        ]);

        setDescription("");
        setRecommendation("");
        saveFinding(findings);
        reset();
    };

    const {control, handleSubmit, reset} = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        saveFinding(findings);
        setStage("Finalizing");
    };

    return (
        <Container css={{height: "100%", width: "100%", overflowY: "scroll"}}>
            <Row>
                <Text h6 size={22} color="black" css={{m: 0}}>
                    Findings
                </Text>
            </Row>
            <Spacer y={0.5}/>
            <hr/>
            <Spacer y={1}/>
            <Row css={{height: "100%", width: "100%"}}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    style={{
                        height: "60vh",
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                    }}
                >
                    <Grid.Container css={{width: "100%"}}>
                        <Grid>
                            <Controller
                                name="title"
                                control={control}
                                render={({field}) => (
                                    <Input
                                        required
                                        label="Title"
                                        initialValue={audit?.findings?.[0].title}
                                        placeholder={audit?.findings?.[0].title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid.Container>
                    <Spacer y={1}/>
                    <Text size={15}>Add a description</Text>
                    <Spacer y={1}/>
                    <Grid.Container css={{width: "100%"}}>
                        <Grid>
                            <WWEditor  setFunction={setDescription}/>
                        </Grid>
                    </Grid.Container>

                    <Spacer y={1}/>
                    <Text size={15}>Recommendation</Text>
                    <Spacer y={1}/>
                    <Grid.Container css={{width: "100%"}}>
                        <Grid>
                            <WWEditor setFunction={setRecommendation}/>
                        </Grid>
                    </Grid.Container>

                    <Spacer y={1.5}/>
                    <Grid.Container css={{width: "100%"}}>
                        <Grid css={{display: "flex", flexDirection: "column"}}>
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
                            <Spacer y={1}/>
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
                                defaultValue={audit?.findings[0].classification}
                                onChange={(e) => setClassification(e.target.value)}
                            >
                                <option value="CRITICAL">CRITICAL</option>
                                <option value="HIGH">HIGH</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="LOW">LOW</option>
                            </select>
                        </Grid>
                        <Spacer x={1}/>
                        <Grid css={{display: "flex", flexDirection: "column"}}>
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
                            <Spacer y={1}/>
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
                                defaultValue={audit?.findings[0].status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="FIXED">FIXED</option>
                                <option value="HIGH">TODO</option>
                            </select>
                        </Grid>
                    </Grid.Container>

                    <Spacer y={1.5}/>
                    <Text size={15}>Location</Text>
                    <Spacer y={1}/>

                    <Grid.Container css={{width: "100%"}}>
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
                                defaultValue={audit?.findings[0].location.type}
                                onChange={(e) => setType(e.target.value)}
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
                        <Spacer x={1}/>
                        <Grid>
                            <Controller
                                name="location.name"
                                control={control}
                                render={({field}) => (
                                    <Input
                                        required
                                        initialValue={audit?.findings[0].location.name}
                                        placeholder="Name"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid.Container>

                    <Spacer y={1.5}/>
                    <Text size={15}>Line Number</Text>
                    <Spacer y={1}/>

                    <Grid.Container css={{width: "100%"}}>
                        <Grid>
                            <Controller
                                name="location.start"
                                control={control}
                                render={({field}) => (
                                    <Input
                                        required
                                        initialValue={audit?.findings[0].location.line_number[0].start as any}
                                        placeholder="Start"
                                        type="number"
                                        onChange={(e) => setLineStart(Number(e.target.value))}
                                    />
                                )}
                            />
                        </Grid>
                        <Spacer x={1}/>
                        <Grid>
                            <Controller
                                name="location.end"
                                control={control}
                                render={({field}) => (
                                    <Input
                                        required
                                        initialValue={audit?.findings[0].location.line_number[0].end as any}
                                        placeholder="End"
                                        type="number"
                                        onChange={(e) => setLineEnd(Number(e.target.value))}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid.Container>
 <Text size={15}>Added Findings</Text>
                     <Grid.Container css={{width: "100%"}}>
                         <Grid>

                             {findings.map((findings: any, index: any) => {
                                return (
                                    <div key={index}>
                                        <br/>
                                        <h5>   title:</h5> {findings.title}
                                        <br/>
                                        <h5> description:</h5> {findings.description}
                                        <br/>
                                        <h5>recommendation:</h5>{findings.recommendation}
                                        <br/>
                                        <h5> classification: </h5>{findings.classification}
                                        <br/>
                                        <h5>status:</h5> {findings?.status}
                                        <br/>
                                        <h5>location: </h5>{`{type:${findings.location.type}, name:${findings.location.name} }`}
                                        <br/>
                                    </div>
                                );
                            })}

                        </Grid>
                    </Grid.Container>
                    <Spacer y={1.5}/>
                    <Grid.Container
                        css={{
                            display: "flex",
                            justifyContent: "flex-start",
                            paddingRight: "2.5vw",
                        }}
                    >
                        <Grid
                            css={{
                                display: "flex",
                                justifyContent: "end",
                                paddingRight: "1vw",
                            }}
                        >
                            <Button size="xs" onClick={newFinding}>
                                Add Finding
                            </Button>
                        </Grid>
                        <Grid
                            css={{
                                display: "flex",
                                justifyContent: "end",
                                paddingRight: "2vw",
                            }}
                        >
                            <Button size="xs" type="submit">
                                Next
                            </Button>
                        </Grid>
                    </Grid.Container>
                    <Spacer y={2}/>
                </form>
            </Row>
        </Container>
    );
};

export default Findings;
