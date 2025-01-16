const puppeteer = require("puppeteer");
import fs from "fs";
import path from "path";
import { Audit } from "../../../types/types";
import finding from "./finding";

const individualFinding = (audit: Audit) => {
  return `<!DOCTYPE html>
<html>
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
        transform: translate(-130px, 0px) scale(0.3, 0.3);
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

      .heading h3 {
        font-weight: 300;
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

      .classificationSection {
        margin-top: 10px;
        display: flex;
        width: 100%;
      }

      .classificationSection .columnSection {
        display: flex;
        flex-direction: column;
        height: 5vh;
        width: 100%;
        margin-left: 10px;
      }

      .classificationSection .columnSection div {
        width: 100%;
        border-left-width: 1px;
        display: flex;
        padding-left: 25px;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
      }

      .classificationSection .graphSection {
        width: 20%;
        border-left-width: 1px;
        display: flex;
        padding-left: 15px;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
      }

      .classificationSection b {
        font-size: 24px;
        display: block;

        margin-bottom: 10px;
      }

      .classificationSection p {
        opacity: 1;
        font-weight: 600;
        color: black;
      }

      .critical {
        border-left: 1px solid #ce5858;
      }

      .critical b {
        color: #ce5858;
      }

      .high {
        border-left: 1px solid #ea7c2d;
      }

      .high b {
        color: #ea7c2d;
      }

      .medium {
        border-left: 1px solid #cea921;
      }

      .medium b {
        color: #cea921;
      }

      .low {
        border-left: 1px solid #6ba64f;
      }

      .low b {
        color: #6ba64f;
      }

      .chart-container {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        margin-top: 20px;
      }

      .chart {
        padding: 10px;
      }

      .pie-chart {
        position: relative;
        font-size: 2em;
        border-radius: 50%;
      }
      .pie-chart--donut:after {
        position: absolute;
        left: 50%;
        top: 50%;
        border-radius: 50%;
        background: #fcfcfc;
        transform: translate(-50%, -50%);
        content: "";
      }

      .pie-chart__value {
        position: absolute;
        top: 50%;
        left: 50%;
        font-weight: 700;
        transform: translate(-50%, -50%);
      }

      [data-chart="5"] .pie-chart {
        width: 80px;
        height: 80px;
        background-color: #f2f2f2;
        background: conic-gradient(
          #ce5858 180deg,
          #ea7c2d 0deg,
          #ce5858 180deg,
          #cea921 0deg,
          #ce5858 180deg,
          #ce5858 180deg,
          #6ba64f -180deg
        );
      }
      [data-chart="5"] .pie-chart--donut:after {
        width: 53.3333333333px;
        height: 53.3333333333px;
      }
      [data-chart="5"] .pie-chart__value {
        font-size: 13.3333333333px;
      }

      .cardSection {
        width: 95%;
        padding-top: 10px;
      }

      .card {
        width: 100%;
        justify-content: start;
        align-items: center;
        height: 7vh;
        border-radius: 10px;
        background-color: #efefef;
        display: flex;
      }

      .card .contract {
        font-weight: 400;
        width: 8%;
        padding-left: 20px;
        padding-right: 0px;
      }

      .card .location {
        display: flex;
        justify-content: start;
        align-items: center;
        width: 50%;
        font-size: 15px;
        padding-left: 10px;
      }

      .card .location p {
        padding-left: 12px;
        font-size:12px;
      }

      .card .location .function {
        font-family: "Roboto Mono";
        font-style: normal;
        font-weight: 600;
        opacity: 0.6;
        background-color: #b4b7bd;
        padding: 5px;
        margin-left: 5px;
        border-radius: 5px;
      }

      .card .classification {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        width: 13%;
        font-weight: 600;
        background-color: #eadfb7;
        padding: 5px;
        border-radius: 5px;
        font-size: 14px;
      }

      .classificationBall {
        width: 12px;
        height: 12px;
        background-color: #cea921;
        border-radius: 50%;
      }

      .todoIcon {
        width: 12px;
        height: 12px;
      }

      .card .status {
        width: 13%;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        background-color: #d7e8e3;
        padding: 5px;
        border-radius: 5px;
        font-size: 14px;
        margin-left: 10px;
      }
    </style>
    <title>XP Network</title>
  </head>
  ${audit.findings.map((finding, key) => {
    return `
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
          .toString("base64")}" />
        <h4>www.safepress.com</h4>
      </header>
      <hr />

      <section class="infoSection">
        <section class="basicInfo">
          <h1>Findings : <b>${audit.client_name}-0${key+1}</b></h1>
          <p>${finding.title}</p>
        </section>
      </section>

      <section class="cardSection">
        <div class="card">
          <div class="contract">${audit.commit_hashes[key].label}</div>
          |
          <div class="location">
            <p>${finding.location.type}</p>
            <p class="function">${finding.location.name}</p>
            <p>Lines ${finding.location.line_number[0].start}-${
      finding.location.line_number[0].end
    }</p>
          </div>
          <div class="classification">
            <div class="classificationBall"></div>
            ${finding.classification}
          </div>
          <div class="status">
            <img
              class="todoIcon"
              src="data:image/png;base64,${fs
                .readFileSync(
                  path.resolve(
                    __dirname,
                    "../../../../pages/api/[report]/assets/todo_icon_fixed.png"
                  )
                )
                .toString("base64")}"
              alt="fixed"
            />${finding.status}
          </div>
        </div>
      </section>

      <section class="infoSection">
        <section class="basicInfo">
          <h1>Description</h1>
          <p>
            ${finding.description}
          </p>
        </section>
      </section>

      <section class="infoSection">
        <section class="basicInfo">
          <h1>Recommendation</h1>
          <p>
            ${finding.recommendation}
          </p>
        </section>
      </section>

    </div>
  </body>`;
  })}
  
</html>
`;
};

export default individualFinding;
