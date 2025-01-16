import React, { SetStateAction, Dispatch } from "react";
import { Badge, Grid, Spacer, Text } from "@nextui-org/react";
import { Auditor } from "../../types/types";

const NameBadge: React.FC<{
  auditor: Auditor[];
  setAuditors: Dispatch<SetStateAction<Auditor[]>>;
}> = ({ auditor, setAuditors }) => {
  const removeAuditor = (fname: string|undefined, lname: string|undefined) => {
    const filtered = auditor.filter(
      (auditor) => auditor.first_name !== fname && auditor.last_name !== lname
    );
    setAuditors(filtered);
  };

  return (
    <Grid.Container gap={0}>
      {auditor.map((auditor, index) => {
        return (
          <Grid key={index}>
            <Badge
              variant="bordered"
              color="secondary"
              onClick={() =>
                removeAuditor(auditor.first_name, auditor.last_name)
              }
              css={{cursor:'pointer'}}
            >
              <Text color="secondary" size={13}>
                {" "}
                {auditor.first_name} {auditor.last_name}{" "}
              </Text>{" "}
              <Spacer x={0.3} /> <Text color="gray" size={12}> X </Text>
            </Badge>
          </Grid>
        );
      })}
    </Grid.Container>
  );
};

export default NameBadge;
