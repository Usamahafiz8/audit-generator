import {Badge, Card, Grid, Spacer, Text} from "@nextui-org/react";
// import Router from "next/router";
import Link from "next/link"
import React from "react";


const AuditCard: React.FC<{ audit: any; key: number }> = ({audit, key}) => {

    return (
        <Link href={`/audit/${audit._id}`}>
            <Card
                key={key}
                // onClick={() => {
                //     Router.push(`/audit/${audit._id}`);
                // }}
                isPressable
                isHoverable
                variant="flat"
                css={{mw: "1200px", margin: "20px", marginLeft: "0px"}}
            >
                <Card.Body
                    css={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        paddingLeft: "20px",
                        justifyContent: "space-between",
                    }}
                >
                    <Grid
                        css={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Badge color="primary">V{audit.version}</Badge>
                        <Spacer x={1}/>
                        <Text
                            h4
                            color="black"
                            size={22}
                            css={{marginTop: "5px", justifyContent: "center"}}
                        >
                            {audit.client_name}
                        </Text>
                        <Spacer x={1}/>
                        <Text
                            color="gray"
                            size={16}
                            css={{
                                marginTop: "-1px",
                                justifyContent: "center",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            {audit.scope?.repository_link} <Spacer x={1}/> | <Spacer x={1}/>{" "}
                            {audit.scope?.auditors.map((auditor: any) => (
                                <>
                                    <>{auditor.first_name}</>
                                    <>{auditor.last_name}</>
                                </>
                            ))}
                        </Text>
                    </Grid>
                    <Grid
                        css={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Spacer x={1}/>
                        <Badge color="secondary" size="lg">
                            {audit.type_of_smart_contract}
                        </Badge>
                        <Spacer x={0.5}/>
                        <Badge color="error" size="lg">
                            {audit.scope?.tests_status}
                        </Badge>
                    </Grid>
                </Card.Body>
            </Card>
        </Link>
    );
};

export default AuditCard;
