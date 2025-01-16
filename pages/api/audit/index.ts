import type { NextApiRequest, NextApiResponse } from "next";
const MongoClient = require("mongodb").MongoClient;
import { CreateAuditDto } from "../../../interfaces/createAudit";
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

  const request = {
    data: req.body,
    method: req.method,
    id: req.query._id,
  };

  const data: any = request.data;
  const auditId: any = request.id;
  // try {
  //   const newAudit = await collection.insertOne(data);
  // } catch (e: any) {
  //   console.log(e);
  // }

  // Audit Controller

  // 1:
  // Method = POST
  // Params = (Actor)
  // Functionality = Create Audit
  if (request.method == "POST") {
    console.log("create request");

    try {
      const newAudit = await collection
        .insertOne(data)
        .then(() => {
          res.status(200).json(data);
        })
        .catch((e: any) => {
          res.send(e);
          console.log(e);
        });
    } catch (e: any) {
      res.status(404).send(e);
      console.log(e);
    }
  }

  if (request.method == "GET") {
    try {
      const findAll = await collection.find().toArray();
      res.status(200).json(findAll);
    } catch (e) {
      res.status(404).send("Not Found!");
    }
  }
};

export default auditHandler;
