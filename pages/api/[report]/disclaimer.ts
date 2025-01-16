const puppeteer = require("puppeteer");
import fs from "fs";
import path from "path";

const disclaimer = `<!DOCTYPE html>
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

    </style>
    <title>XP Network</title>
  </head>
  <body>
    <div class="container">
      <header>
        <img src="data:image/svg+xml;base64,${
            fs.readFileSync(path.resolve(__dirname, "../../../../pages/api/[report]/assets/logo.svg")).toString('base64')
          }"  alt=""/>
        <h4>www.safepress.com</h4>
      </header>
      <hr />

      <section class="infoSection">
        <section class="basicInfo">
          <h1>Executive Summary</h1>
        </section>
      </section>

      <section class="infoSection">
        <section class="basicInfo">
          <h4>Safepress Disclaimer</h4>
          <p>
            The smart contracts given for audit have been analyzed by the best
            industry practices at the date of this report, with cybersecurity
            vulnerabilities and issues in smart contract source code, the
            details of which are disclosed in this report (Source Code); the
            Source Code compilation, deployment, and functionality (performing
            the intended functions). The audit makes no statements or warranties
            on the security of the code. It also cannot be considered a
            sufficient assessment regarding the utility and safety of the code,
            bug-free status, or any other contract statements. While we have
            done our best in conducting the analysis and producing this report,
            it is important to note that you should not rely on this report only
            — we recommend proceeding with several independent audits and a
            public bug bounty program to ensure the security of smart contracts.
          </p>
        </section>
      </section>

      <section class="infoSection">
        <section class="basicInfo">
          <h4>Technical Disclaimer</h4>
          <p>
            Smart contracts are deployed and executed on a blockchain platform.
            The platform, its programming language, and other software related
            to the smart contract can have vulnerabilities that can lead to
            hacks. Thus, the audit cannot guarantee the explicit security of the
            audited smart contracts.
          </p>
        </section>
      </section>
    </div>
  </body>
</html>
`

export default disclaimer;