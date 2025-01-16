// context/todoContext.tsx
import * as React from "react";
import {ScopeContextType} from '../types/context.types'
import {Scope} from '../types/types';


interface Props {
  children: React.ReactNode;
}

export const ScopeContext = React.createContext<ScopeContextType | null>(null);

const ScopeProvider: React.FC<Props> = ({ children }) => {
  const [scope, setScope] = React.useState<Scope | undefined>();
  const saveScope = (scope: Scope) => {
    setScope(scope);
    // console.log(scope)
  };
  return (
    <ScopeContext.Provider value={{ scope, saveScope }}>
      {children}
    </ScopeContext.Provider>
  );
};

export default ScopeProvider;
