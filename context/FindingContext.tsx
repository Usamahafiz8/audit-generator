// context/todoContext.tsx
import * as React from "react";
import {FindingContextType} from '../types/context.types'
import {Finding as FindingType} from '../types/types'


interface Props {
  children: React.ReactNode;
}

export const FindingContext = React.createContext<FindingContextType | null>(null);

const FindingProvider: React.FC<Props> = ({ children }) => {
  const [finding, setFinding] = React.useState<FindingType[] | undefined>();
  const saveFinding = (finding: FindingType[]) => {
    setFinding(finding);
  };
  return (
    <FindingContext.Provider value={{ finding, saveFinding }}>
      {children}
    </FindingContext.Provider>
  );
};

export default FindingProvider;
