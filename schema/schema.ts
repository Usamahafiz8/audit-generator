import mongoose, { Schema } from 'mongoose';

const AuditorSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const ScopeSchema = new Schema(
  {
    repository_link: {
      type: String,
      required: true,
    },
    documentation: {
      type: [String],
    },
    tests_status: {
      type: String,
      enum: ['FAILING', 'PASSING', 'NO_TESTS'],
      required: true,
    },
    auditors: {
      type: [AuditorSchema],
      required: true,
    },
    reviewed_by: {
      type: [AuditorSchema],
      required: true,
    },
    smart_contract_audited: {
      type: [String],
      required: true,
    },
  },
  {
    _id: false,
  },
);

const CommitHashSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const FindingsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  recommendation: {
    type: String,
  },
  classification: {
    type: String,
    enum: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'],
    required: true,
  },
  status: {
    type: String,
    enum: ['TODO', 'FIXED'],
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['FUNCTION', 'VARIABLE', 'GENERAL'],
      required: true,
    },
    name: {
      type: String,
    },
    line_number: {
      start: {
        type: Number,
        required: true,
      },
      end: {
        type: Number,
      },
    },
  },
});

const AuditSchema = new Schema({
  version: {
    type: String,
    required: true,
  },
  custom_audit_id: {
    type: String,
    required: true,
  },
  client_name: {
    type: String,
    required: true,
  },
  start_date: {
    type: Date,
    require: true,
  },
  end_date: {
    type: Date,
  },
  type_of_smart_contract: {
    type: String,
    enum: ['BRIDGE'],
  },
  scope: {
    type: ScopeSchema,
    required: true,
  },
  commit_hashes: {
    type: [CommitHashSchema],
    required: true,
  },
  findings: {
    type: [FindingsSchema],
    required: true,
  },
});

// AuditSchema.index(
//   { version: 1, client_name: 1, custom_audit_id: 1 },
//   { unique: true },
// );

export default AuditSchema