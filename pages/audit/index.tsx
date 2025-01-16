import { useEffect, useState } from "react";
import axios from "axios";
import AuditCard from "../../components/UI/auditCard";
import { Container, Grid, Text } from "@nextui-org/react";

const Audit: React.FC = () => {
  const [audits, setAudits] = useState<any[]>([]);

  const getAudits = async () =>
    axios
      .get("/api/audit/")
      .then((resp) => {
        setAudits(resp.data);
      })
      .catch((e) => {
        console.log(e);
      });

  useEffect(() => {
    getAudits()
    console.log(audits);
    
  }, []);

  return (
    <Container css={{width:'90%', transform:'scale(0.9,0.9)'}}>
        <Text h2 >Audits</Text>
        < hr />
      <Container css={{height:'70vh', overflowY:'scroll', overflowX:'hidden', paddingLeft:'0'}}>
      {audits.map((audit, key) => {
        return <AuditCard audit={audit} key={key} />;
      })}
      </Container>
    </Container>
  );
};

export default Audit;
