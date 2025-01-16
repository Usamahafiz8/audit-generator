import {
    ETestsStatus,
    EFindingLocationType,
    EClassification,
    EFindingStatus,
    EExecutiveSummary,
    ETypeOfSmartContract,
  } from '../types/audit.enum';
  
  interface Auditor {
    first_name: string;
  
    last_name: string;
  }
  
  interface CommitHash {
    label: string;
  
    value: string;
  }
  



  interface Scope {
    repository_link: string;
  
    documentation: string[];
  
    tests_status: ETestsStatus;
  
    auditors: Auditor[];
  
    reviewed_by: Auditor;
  
    smart_contract_audited: string[];
  }
  
  interface FindingLocationLineNumber {
    start: number;
  
    end: number;
  }

  
  interface Location {
    type: EFindingLocationType;
  
    name: string;
  
    line_number: FindingLocationLineNumber[];
  }
  


  interface Finding {
    title: string;
  
    description: string;
  
    recommendation: string;
  
    classification: EClassification;
  
    status: EFindingStatus;
  
    location: Location[];
  }
  
// {
//     "version" : 1,
//     "custom_audit_id" : "audit_v1",
//     "executive_summary": "NOT_SECURE",
//     "client_name" : "name123",
//     "start_date" : 2/10/2021,
//     "end_date": 2/10/2021,
//     type_of_smart_contract: "BRIDGE",
//     scope: {
//         "repository_link":  "example-link",
      
//         "documentation": ["Apple","Banana","candy"],
      
//         "tests_status": "FAILING",
      
//         "auditors": [{"first_name":"saim", "last_name" : "sheikh"}],
      
//         "reviewed_by": {"first_name" : "saim", "last_name":"sheikh"},
      
//         "smart_contract_audited": ["yes","no"],
//     };
//     commit_hashes: [{"label":'myLabel',"value":"myVal"}];
//     findings: {
//         title: "myTitle";
      
//         description: "myDesc";
      
//         recommendation: "myRecommendation";
      
//         classification: "CRITICAL";
      
//         status: "TODO";
      
//         location: {{
//             type: "FUNCTION";
          
//             name: "myName";
          
//             line_number: [{"start":10, "end":20}];
//         }};  
//     }
// }

  export interface CreateAuditDto {
    version: number;
  
    custom_audit_id: string;
  
    executive_summary: EExecutiveSummary;
  
    client_name: string;
  
    start_date: Date;
  
    end_date: Date;
  
    type_of_smart_contract: ETypeOfSmartContract;
  
    scope: Scope;
  
    commit_hashes: CommitHash[];
  
    findings: Finding[];
  }