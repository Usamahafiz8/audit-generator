import type { NextApiRequest, NextApiResponse } from "next";
import { Audit } from "../../../../types/types";
const MongoClient = require("mongodb").MongoClient;
import NextCors from 'nextjs-cors';

const auditHandler = async (req: NextApiRequest, res: NextApiResponse) => {

  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
 });

  //Create MongoDB Connection
  const client = await MongoClient.connect(`mongodb+srv://admin:mypassword@nextmeetup.iag8fbb.mongodb.net/?retryWrites=true&w=majority`,{ useNewUrlParser: true });
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
  const auditObj : Audit = request.data;

  // GET
  if (request.method == "GET") {
    try {
      const findById = await collection.findOne({ _id: ObjectId(_id) });
      if (findById) res.status(200).json(findById);
    } catch (e) {
      res.status(404).send("Not Found!");
    }
  }

  // UPDATE
  if (request.method == "PATCH") {
    try {
      console.log(data)
      const updateById = await collection.updateOne(
        { _id: ObjectId(_id) },
        { $set: { findings : auditObj.findings } }
      );
      if (updateById) {res.status(200).send("Updated Successfully!")
    res.end()}
      else{ res.status(404).send("Couldn't Find!")}
    } catch (e) {
      res.status(404).send("Could Not Update");
    }
  }

  // DELETE
  if (request.method == "DELETE" && _id ) {
    try {
      const deleteById = await collection.deletetOne({ _id: ObjectId(_id) });
      if (deleteById) res.status(200).send("Deleted Successfully!");
    } catch (e: any) {
      res.status(400).send("Not Found!");
    }
  }
};

export default auditHandler;
