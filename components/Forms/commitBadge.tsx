import react, { SetStateAction, Dispatch } from "react";
import { Badge, Grid, Spacer, Text } from "@nextui-org/react";
import { CommitHash } from "../../types/types";

const CommitBadge: React.FC<{
  commitHash: CommitHash[];
  setCommitHash: Dispatch<SetStateAction<CommitHash[]>>;
}> = ({ commitHash, setCommitHash }) => {
  const removeHashCommit = (label: string, value: string) => {
    const filtered = commitHash.filter(
      (cHash: CommitHash) => cHash.label !== label && cHash.value !== value
    );
    setCommitHash(filtered);
  };

  return (
    <Grid.Container gap={0}>
      {commitHash.map((ch, index) => {
        return (
          <Grid key={index}>
            <Badge
              size='xs'
              color="secondary"
              onClick={() => removeHashCommit(ch.label, ch.value)}
              css={{ cursor: "pointer", padding:'1vh', height:'4vh !important' }}
            >
              <Text color="white" size={13}>
                <b>{ch.label}</b> : {ch.value}
              </Text>
              <Spacer x={0.3} />{" "}
              <Text  color="f1f3f5" size={13}><b>X</b></Text>
            </Badge>
          </Grid>
        );
      })}
    </Grid.Container>
  );
};

export default CommitBadge;
