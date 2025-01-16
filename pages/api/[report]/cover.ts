import { Audit } from "../../../types/types";
import fs from "fs";
import path from "path";

const cover = (audit: Audit) => {
  return `<!DOCTYPE html>
    <html lang="en-US">
      <head>
        <meta charset="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <style>
          body {
            height: 297mm;
            width: 210mm;
            font-family: "Manrope", sans-serif;
            padding:0 !important;
          }
    
          .container {
            height: 100%;
            width: 100%;
            background-color: white;
            display: flex;
            justify-content: space-evenly;
            align-items: flex-start;
            flex-direction: column;
            padding: 0 !important;
          }
    
          h1 {
            font-weight: 700;
          }
    
          .vectorSection {
            display: flex;
            justify-content: space-between;
            width: 100%;
            height: 60%;
          }
    
          .logoSection img{
            padding-left:70px;
            transform: translate(0,100px);
          }
    
          .vectorSection  img{
            max-width: 100%;
            max-height: 100%;
          }
    
          .vectorRight {
            transform: translate(0,150px);
          }
    
          .heading h1,h3 {
            padding-left: 70px;
          }
    
          .heading h3 {
            font-weight: 300;
          }
    
          footer {
            width: 85%;
            display: flex;
            justify-content: space-between;
            opacity: 0.7;
          }
    
          footer h4 {
            padding-left: 70px;
            font-weight: 300;
          }
    
        </style>
        <title>XP Network</title>
      </head>
      <body>
        <div class="container">
          <section class="logoSection">
            <img src="data:image/svg+xml;base64,${fs
              .readFileSync(
                path.resolve(
                  __dirname,
                  "../../../../pages/api/[report]/assets/logo.svg"
                )
              )
              .toString("base64")}" alt="Safepress Logo" />
          </section>
          <section class="vectorSection">
            <img src="data:image/png;base64,${fs
              .readFileSync(
                path.resolve(
                  __dirname,
                  "../../../../pages/api/[report]/assets/vLeft.png"
                )
              )
              .toString("base64")}" alt="vector"  />
            <img class="vectorRight" src="data:image/png;base64,${fs
              .readFileSync(
                path.resolve(
                  __dirname,
                  "../../../../pages/api/[report]/assets/vRight.png"
                )
              )
              .toString("base64")}" alt="vector" />
          </section>
          <section class="heading">
            <h1>Smart Contract Audit</h1>
            <h3>Solana Endpoint of the Multi-Chain NFT Bridge</h3>
          </section>
    
          <footer>
            <h4><b>CUSTOMER:</b> ${audit.client_name}</h4>
            <h4><b>Date:</b> Nov ${audit.start_date}</h4>
          </footer>
        </div>
      </body>
    </html>
    `;
};
export default cover;
