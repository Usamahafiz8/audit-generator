import react, { useState, Dispatch, SetStateAction, useEffect } from "react";
import BasicInfo from "./basicInfo";
import CommitHashes from "./commitHashes";
import Findings from "./findings";
import Scope from "./scope";
import WWEditor from "./wizywyg";
import BasicInfoProvider from "../../context/BasicInfoContext";
import ScopeProvider from "../../context/ScopeContext";
import CommitHashProvider from "../../context/CommitHashContext";
import FindingProvider from "../../context/FindingContext";
import Finalizing from "./finalizing";
import { Audit } from "../../types/types";
import { useRouter } from "next/router";
import axios from "axios";

const FormContainer: React.FC<{
  stage: string;
  setStage: Dispatch<SetStateAction<string>>;
}> = ({ stage, setStage }) => {
  const [audit, setAudit] = useState<Audit>();
  const { query } = useRouter();
  const auditId = query.updateId;
  const singleAuditInfo = async () => {
    await axios
      .get(`/api/audit/${auditId}`)
      .then((resp) => {
        setAudit(resp.data);
        console.log(resp.data,"this")
      })
      .catch((err) => {
      });
  };
  useEffect(() => {
    singleAuditInfo();
  }, [query]);

  return (
    <>
      <ScopeProvider>
        <BasicInfoProvider>
          <CommitHashProvider>
            <FindingProvider>
              {stage === "Basic Info" ? (
                <BasicInfo setStage={setStage} audit={audit} />
              ) : stage === "Scope" ? (
                <Scope setStage={setStage} audit={audit} />
              ) : stage === "Commit Hashes" ? (
                <CommitHashes setStage={setStage} audit={audit} />
              ) : stage === "Findings" ? (
                <Findings setStage={setStage} audit={audit} />
              ) : (
                <Finalizing setStage={setStage} audit={audit} />
              )}
            </FindingProvider>
          </CommitHashProvider>
        </BasicInfoProvider>
      </ScopeProvider>
    </>
  );
};

export default FormContainer;
