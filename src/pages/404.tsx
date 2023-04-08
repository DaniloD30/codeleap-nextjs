import { FC } from "react";
import Image from "next/image";
import Head from "next/head";
import codeLeapImg from "../assets/codeleap_logo_black 1.png";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

const NotFound: FC = () => {
  return (
    <>
      <Head>
        <title>404 | CodeLeap</title>
      </Head>
      <Box>
        <div
          style={{
            backgroundColor: "#DDDDDD",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: 'column',
          }}
        >
          <Image src={codeLeapImg} alt="error" />

          <Typography
            sx={{
              fontWeight: "700",
              fontStyle: "normal",
              fontSize: "22px",
              lineHeight: "26px",
              color: "#000000",
            }}
          >
            404 Not Found | CodeLeap
          </Typography>
        </div>
      </Box>
    </>
  );
};

export default NotFound;
