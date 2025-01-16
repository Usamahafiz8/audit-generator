import { Scope, CommitHash, Finding } from "./types";

export type BasicInfoType = {
  client_name: string;
  start_date: string;
  type_of_smart_contract: string;
  end_date?: string;
};

export type BasicInfoContextType = {
  basicInfo: BasicInfoType | undefined;
  saveBasicInfo: (basicInfo: BasicInfoType) => void;
};

export type ScopeContextType = {
    scope: Scope | undefined;
    saveScope: (scope : Scope) => void;
}

export type CommitHashContextType = {
  commitHash: CommitHash[] | undefined;
  saveCommitHash : (commitHash : CommitHash[]) => void;
}

export type FindingContextType = {
  finding: Finding[] |undefined;
  saveFinding: (finding : Finding[]) => void;
}
