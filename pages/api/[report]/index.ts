import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import cover from "./cover";
import CRSR from "./code_review_security_report";
import vulnerabilityClassification from "./vulnerability_classification";
import finding from "./finding";
import individualFinding from "./individual_finding";
import executive_summary from "./executive_summary";
import disclaimer from "./disclaimer";
import NextCors from 'nextjs-cors';

const puppeteer = require("puppeteer");
const PDFMerger = require("pdf-merger-js");
const MongoClient = require("mongodb").MongoClient;

var merger = new PDFMerger();

const generatePDF = async (req: NextApiRequest, res: NextApiResponse) => {

  console.log("error cors")

  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
 });


  const aid = req.query;

  const request = {
    method: req.method,
  };

  //Create MongoDB Connection
  console.log("error mongo")
  const client = await MongoClient.connect(`mongodb+srv://admin:mypassword@nextmeetup.iag8fbb.mongodb.net/?retryWrites=true&w=majority`,{ useNewUrlParser: true });
  const db = client.db("safepress_db");
  const collection = db.collection("Audit");
  const ObjectId = require("mongodb").ObjectId;

  // GET
  if (request.method == "GET") {
    console.log("error get")
    try {
      const findById = await collection.findOne({ _id: ObjectId(aid.report) });
      if (findById) {
        var fileArray = [
          cover(findById),
          CRSR(findById),
          vulnerabilityClassification,
          finding(findById),
          individualFinding(findById),
          executive_summary(findById),
          disclaimer,
        ];

        try {
          // Create a browser instance
          console.log("error browser")
          const browser = await puppeteer.launch({
            args: [
              "--allow-file-access-from-files",
              "--enable-local-file-accesses",
            ],
          });

          // Create a new page
          const page = await browser.newPage();

          // Read HTML Template

          let index = 0;

          for (let x of fileArray) {
            console.log("error fileArray")
            await page.setContent(x, { waitUntil: "domcontentloaded" });

            await page.emulateMediaType("screen");

            let pdf = await page.pdf({
              path: `./pdf_report/${index}.pdf`,
              margin: { top: "0px", right: "0px", bottom: "0px", left: "0px" },
              printBackground: true,
              padding: 0,
              format: "A4",
            });
            index++;
          }

          await merger.add(
            path.resolve(__dirname, `../../../../pdf_report/0.pdf`)
          );

          await merger.add(
            path.resolve(__dirname, `../../../../pdf_report/1.pdf`)
          );

          await merger.add(
            path.resolve(__dirname, `../../../../pdf_report/2.pdf`)
          );

          await merger.add(
            path.resolve(__dirname, `../../../../pdf_report/3.pdf`)
          );

          await merger.add(
            path.resolve(__dirname, `../../../../pdf_report/4.pdf`)
          );

          await merger.add(
            path.resolve(__dirname, `../../../../pdf_report/5.pdf`)
          );

          await merger.add(
            path.resolve(__dirname, `../../../../pdf_report/6.pdf`)
          );

          await merger.save("./pdf_report/report.pdf");

          const mergedPdf = fs.readFileSync("./pdf_report/report.pdf")
          res.setHeader('Content-Type', 'application/pdf')

          await browser.close();

          res.status(200).send(mergedPdf);
        } catch (e: any) {
          console.error(e.response.data);
          res.status(404).send("Could not generate report!");
        } finally {
          fs.readdir("./pdf_report/", (err, files) => {
            if (err) throw err;
            console.log(err!)
            for (const file of files) {
                console.log(file + ' : File Deleted Successfully.');
                fs.unlinkSync("./pdf_report/"+file);
            }
            
          });
        }
      }
    } catch (e) {
      res.status(404).send("Not Found!");
    }
  }
};

export default generatePDF;
