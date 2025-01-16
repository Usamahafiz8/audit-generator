import { Audit } from "../../../types/types";
import fs from "fs";
import path from "path";

var CRSR = (audit: Audit) => {
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
        font-size: 24px;
      }

      h1 {
        font-weight: 900;
      }

      .heading h3 {
        font-weight: 300;
      }

      .infoCard {
        width: 95%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        background-color: #e6e8ee;
        padding: 5px;
        border-radius: 10px;
      }

      .infoCard p {
        font-size: 12px;
        margin-left: 20px;
        padding-right: 20px;
      }

      .infoCard img {
        margin-left: 10px;
      }

      .columnSection {
        margin-top: 25px;
        display: flex;
      }
      
      .columnSection div {
        width: 40%;
        height: 12vh;
        border-left: 4px solid #0B45D6;
        border-left-width: 1px;
        padding-left: 15px;
      }

      .columnSection p {
        font-size: 13px;
      }

      .scope {
        margin-top: 10px;
      }

      .scope .columnSection div {
       display: flex;
       flex-direction: column;
       height: 37vh;
       width: 100%;
      }

      .scope b {
        opacity: 0.7;
      }

      .scope p {
        opacity: 1;
        font-weight: 600;
        color: black;
      }

      .commitHash {
        padding-top: 50px;
      }

      .commitHash .columnSection div {
       display: flex;
       flex-direction: column;
       height: 18vh;
       width: 100%;
      }

      .commitHash b {
        opacity: 0.7;
      }

      .commitHash p {
        opacity: 1;
        font-weight: 600;
        color: black;
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
          <h1>Code Review and security report</h1>
          <div class="infoCard">
            <img src="data:image/svg+xml;base64,${fs
              .readFileSync(
                path.resolve(
                  __dirname,
                  "../../../../pages/api/[report]/assets/info.svg"
                )
              )
              .toString("base64")}" height="22" width="22" />
            <p>
              <b>Important:</b> This document likely contains critical
              information about the Client’s software and hardware systems,
              security susceptibilities, descriptions of possible exploits and
              attack vectors. The document shall remain undisclosed until any
              significant vulnerabilities are remedied.
            </p>
          </div>
          <div class="columnSection">
            <div>
              <p><b>CUSTOMER:</b> ${audit.client_name}</p>
              <p><b>TYPE, SUBTYPE</b> ${audit.type_of_smart_contract}</p>
            </div>
            <div>
              <p><b>Start Date:</b> ${audit.start_date}</p>
              <p><b>End Date:</b> ${audit.end_date}</p>
            </div>
          </div>
        </section>
        <section class="scope">
          <h1>Scope</h1>
          <div class="columnSection">
            <div>
              <p><b>REPOSITORY:</b>  ${audit.scope.repository_link}}</p>
              <p><b>DOCUMENTATION:</b>  ${audit.scope.documentation}</p>
              <p><b>TESTS:</b>  ${audit.scope.tests_status}</p>
              <p><b>AUDITORS:</b>  ${audit.scope.auditors.map(
                (auditor) => `${auditor.first_name} ${auditor.last_name},`
              )} </p>
              <p><b>REVIEW & APPROVAL:</b>  ${audit.scope.reviewed_by.map(
                (reviewer) => `${reviewer.first_name} ${reviewer.last_name},`
              )}</p>
              <p><b>SMART CONTRACT AUDITED:</b>${
                audit.scope.smart_contract_audited
              }</p>
            </div>
          </div>
        </section>

        <section class="commitHash">
            <h1>Commit Hashes</h1>
            <div class="columnSection">
              <div>
              ${audit.commit_hashes.map((ch, key) => { return (
                `<p key=${key}><b>${ch.label}: </b>${ch.value}</p>`
              )})}
              </div>
            </div>
          </section>
    </div>
  </body>
</html>
    `;
};
export default CRSR;
