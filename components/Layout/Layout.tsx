import type { NextPage } from "next";
import { Box } from "./Box";
import { Navbar} from "@nextui-org/react";
import Image from "next/image";
import Logo from "./logo.png";
import Link from "next/link"

export const Layout = ({ children }: any) => {
  return (
    <Box
      css={{
        maxW: "100%",
      }}
    >
      <Navbar
        variant="static"
        css={{ justifyContent: "center", caretColor: "transparent" }}
      >
        <Navbar.Brand>
          <Link href={"/"}>
          <Image
            src={Logo}
            alt="logo"
            style={{ transform: "scale(0.5,0.5)", cursor: "pointer" }}
          />
            </Link>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs" css={{ marginLeft: "3vw" }}>
          <Link
            href="audit/new"
          >
            New Audit
          </Link>
          <Link  href="/">
            Audits
          </Link>
        </Navbar.Content>
      </Navbar>
      {children}
    </Box>
  );
};
