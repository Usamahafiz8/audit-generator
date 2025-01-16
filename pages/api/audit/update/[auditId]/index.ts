import type { NextApiRequest, NextApiResponse } from "next";
import { Audit } from "../../../../../types/types";
const MongoClient = require("mongodb").MongoClient;
import NextCors from "nextjs-cors";

const auditHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  //Create MongoDB Connection
  const client = await MongoClient.connect(
    `mongodb+srv://admin:mypassword@nextmeetup.iag8fbb.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  );
  const db = client.db("safepress_db");
  const collection = db.collection("Audit");
  const ObjectId = require("mongodb").ObjectId;

  const request = {
    id: req.query.auditId as string,
    data: req.body as Audit,
    method: req.method,
  };

  const _id: string = request.id;
  const data: object = request.data;
  const auditObj: Audit = request.data;

  if (request.method == "PATCH") {
    try {
      const updateById = await collection.findOneAndUpdate(
        { _id: ObjectId(_id) },
        {
          $set: {
            client_name: auditObj.client_name,
            version: auditObj.version,
            custom_audit_id: auditObj.custom_audit_id,
            start_date: auditObj.start_date,
            end_date: auditObj.end_date,
            type_of_smart_contract: auditObj.type_of_smart_contract,
            scope: auditObj.scope,
            commit_hashes: auditObj.commit_hashes,
            findings: auditObj.findings,
          },
        },
        { new: true }
      );
      if (updateById) {
        res.status(200).send("Updated Successfully !");
        res.end();
      } else {
        res.status(404).send("Couldn't Find!");
      }
    } catch (e) {
      res.status(404).send("Could Not Update");
      res.status(404).send(e);
    }
  }
};

export default auditHandler;
