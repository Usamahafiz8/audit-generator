const puppeteer = require("puppeteer");
import fs from "fs";
import path from "path";
// import { Audit } from "../../../types/types";

const executive_summary = (audit: any) => {
  return `<!DOCTYPE html>
  <html lang="en-US">
    <head>
      <meta charset="utf-8" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <style>
        body {
          height: 297mm;
          width: 210mm;
          font-family: "Manrope", sans-serif;
        }
  
        .container {
          height: 100%;
          width: 100%;
          background-color: white;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-direction: column;
          box-sizing: border-box;
          padding-left: 20px;
          padding-right: 20px;
        }
  
        header {
          display: flex;
          max-width: 95%;
          width: 100%;
          justify-content: space-between;
          border-bottom: 0.5px solid #d2d1d1;
        }
  
        header img {
          transform: translate(-65px, 0px) scale(0.5, 0.5);
        }
  
        .infoSection {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          flex-direction: column;
          width: 95%;
        }
  
        .basicInfo h1 {
          font-size: 20px;
        }
  
        .basicInfo p {
          font-size: 14px;
        }
  
        h1 {
          font-weight: 600;
        }
  
        .columnSection {
          margin-top: 25px;
          display: flex;
        }
  
        .columnSection div {
          width: 40%;
          height: 5vh;
          border-left-width: 1px;
        }
  
        .columnSection p {
          font-size: 16px;
        }
  
        .cardSection {
          width: 95%;
          padding-top: 10px;
        }
  
        .card {
          width: 100%;
          justify-content: space-evenly;
          align-items: center;
          height: 7vh;
          border-radius: 5px;
          background-color: #efefef;
          display: flex;
        }
  
        .card .executiveSummary  {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 21.5%;
          font-weight: 400;
          padding: 10px;
          border-radius: 5px;
          font-size: 12px;
        }
  
        .card .active {
          background-color: #ffffff;
        }
  
        .card .inactive {
          background-color: #ffffff;
          opacity: 0.7;
        }
  
        .inactive .classificationBall {
          width: 12px;
          height: 12px;
          background-color: #E5E5E5;
          border-radius: 50%;
          margin-right: 5px;
        }
  
          .active .classificationBall {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin-right: 5px;
          background-color: #6BA64F;
        }
  
      </style>
      <title>XP Network</title>
    </head>
    <body>
      <div class="container">
        <header>
          <img src="data:image/svg+xml;base64,${fs
            .readFileSync(
              path.resolve(
                __dirname,
                "../../../../pages/api/[report]/assets/logo.svg"
              )
            )
            .toString("base64")}" alt="Safepress Logo" />
          <h4>www.safepress.com</h4>
        </header>
        <hr />
  
        <section class="infoSection">
          <section class="basicInfo">
            <h1>Executive Summary</h1>
            <p>Based on the audit findings the Client's contracts are: ${
              audit.executive_summary
            }</p>
          </section>
        </section>
  
        <section class="cardSection">
          <div class="card">
            <div class="executiveSummary ${
              audit.executive_summary == "NOT_SECURE" ? "active" : "inactive"
            }">
              <div class="classificationBall"></div>
              Not Secure
            </div>
            <div class="executiveSummary ${
              audit.executive_summary == "INSUFFICIENTLY_SECURED"
                ? "active"
                : "inactive"
            }">
              <div class="classificationBall"></div>
              Insufficiently Secured
            </div>
            <div class="executiveSummary ${
              audit.executive_summary == "SECURED" ? "active" : "inactive"
            }">
              <div class="classificationBall"></div>
              Secured
            </div>
            <div class="executiveSummary ${
              audit.executive_summary == "WELL_SECURED" ? "active" : "inactive"
            } ">
              <div class="classificationBall"></div>
              Well Secured
            </div>
          </div>
        </section>
  
        
      </div>
    </body>
  </html>
  `;
};

export default executive_summary;
