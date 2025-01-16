// import React, { SetStateAction, Dispatch } from "react";
// import { Badge, Grid, Spacer, Text } from "@nextui-org/react";
// //@ts-ignore
// import {finding} from "../../pages/api/[report]/finding";
//
// const FindingsBadge: React.FC<{
//   finding:any
//   setFindings: any;
// }> = ({ finding:any, setFindings }) => {
//   const removeFindings = (des: string) => {
//     const filtered = finding.filter(
//       (finding:any) => finding.description !== des
//     );
//     setFindings(filtered);
//   };
//
//   return (
//     <Grid.Container gap={0}>
//       {finding.map((finding: any, index:any) => {
//         return (
//           <Grid key={index}>
//             <Badge
//               variant="bordered"
//               color="secondary"
//               onClick={() =>
//                 removeFindings(finding.description)
//               }
//               css={{cursor:'pointer'}}
//             >
//               <Text color="secondary" size={13}>
//                 {" "}
//                 {finding.description} {" "}
//               </Text>{" "}
//               <Spacer x={0.3} /> <Text color="gray" size={12}> X </Text>
//             </Badge>
//           </Grid>
//         );
//       })}
//     </Grid.Container>
//   );
// };
//
// export default FindingsBadge;
