// context/todoContext.tsx
import * as React from "react";
import {BasicInfoType, BasicInfoContextType} from '../types/context.types'


interface Props {
  children: React.ReactNode;
}

export const BasicInfoContext = React.createContext<BasicInfoContextType | null>(null);

const BasicInfoProvider: React.FC<Props> = ({ children }) => {
  const [basicInfo, setBasicInfo] = React.useState<BasicInfoType | undefined>();
  const saveBasicInfo = (basicInfo: BasicInfoType) => {
    setBasicInfo(basicInfo);
  };
  return (
    <BasicInfoContext.Provider value={{ basicInfo, saveBasicInfo }}>
      {children}
    </BasicInfoContext.Provider>
  );
};

export default BasicInfoProvider;
