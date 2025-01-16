import {EClassification, EFindingLocationType, EFindingStatus, ETestsStatus} from "./audit.enum";

export type Auditor = {
    first_name?: string;
    last_name?: string;
};

export type CommitHash = {
    label?: string;
    value?: string;
};

export type Scope = {
    repository_link: string,
    documentation: [string]
    tests_status: ETestsStatus
    auditors: [Auditor]
    reviewed_by: [
        { first_name?: string, last_name?: string }]
    smart_contract_audited: [string]
}


export type Finding = {
    title: string;
    description: string;
    recommendation: string;
    classification: EClassification;
    status: EFindingStatus;
    location: {
        type: EFindingLocationType;
        name: string;
        line_number: [{
            start?: number;
            end?: number;
        }];
    };
};

export type Audit = {
    version: string,
    custom_audit_id: string,
    client_name: string,
    start_date: string,
    end_date: string
    type_of_smart_contract: string,
    scope: Scope
    commit_hashes: [CommitHash]
    findings: [Finding]
};
