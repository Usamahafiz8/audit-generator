// context/todoContext.tsx
import * as React from "react";
import { CommitHash as CommitHashType } from "../types/types";
import {CommitHashContextType} from '../types/context.types'


interface Props {
  children: React.ReactNode;
}

export const CommitHashContext = React.createContext<CommitHashContextType | null>(null);

const CommitHashProvider: React.FC<Props> = ({ children }) => {
  const [commitHash, setCommitHash] = React.useState<CommitHashType[] | undefined>();
  const saveCommitHash = (commitHash: CommitHashType[]) => {
    setCommitHash(commitHash);
  };
  return (
    <CommitHashContext.Provider value={{ commitHash, saveCommitHash }}>
      {children}
    </CommitHashContext.Provider>
  );
};

export default CommitHashProvider;
