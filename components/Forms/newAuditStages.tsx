import react from "react";
import { Col, Container, Row, Text } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";

const options: string[] = [
  "Basic Info",
  "Scope",
  "Commit Hashes",
  "Findings",
  "Finalizing",
];

const NewAuditStages: React.FC<{ stage: string }> = ({ stage }) => {

  return (
    <Col>
    <>
      {options.map((option: string, key : number) => {
       return <>
        <Text key={key} h6 size={16} color={option == stage ? 'blue' : 'gray'} css={{ m: 0 }}>
          {option}
        </Text>
        <Spacer y={1} />
      </>
      })}
    </>
    </Col>
  );
};

export default NewAuditStages;
