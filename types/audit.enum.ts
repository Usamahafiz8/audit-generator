export enum EExecutiveSummary {
  NOT_SECURE = "NOT_SECURE",
  INSUFFICIENTLY_SECURED = "INSUFFICIENTLY_SECURED",
  SECURED = "SECURED",
  WELL_SECURED = "WELL_SECURED",
}

export enum ETypeOfSmartContract {
  BRIDGE = "BRIDGE",
}

export enum ETestsStatus {
  FAILING = "FAILING",
  PASSING = "PASSING",
  NO_TESTS = "NO_TESTS",
}

export enum EClassification {
  CRITICAL = "CRITICAL",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}

export enum EFindingStatus {
  TODO = "TODO",
  FIXED = "FIXED",
}

export enum EFindingLocationType {
  FUNCTION = "FUNCTION",
  VARIABLE = "VARIABLE",
  GENERAL = "GENERAL",
}
