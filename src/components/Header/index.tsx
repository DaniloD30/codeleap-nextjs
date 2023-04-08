import { addUserName } from "../../redux/slices/users";
import { useAppDispatch } from "../../redux/store/hook";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import Image from "next/image";
import codeLeapImg from "../../assets/codeleap_logo_black 1.png";

export default function Header() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(addUserName(""));
    router.push("/");
  };
  return (
    <Box
      sx={{
        bgcolor: "#7695EC",
        height: "80px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          marginLeft: "37px",
          fontStyle: "normal",
          fontWeight: "700",
          fontSize: "22px",
          lineHeight: "26px",
          color: "#FFFFFF",
        }}
      >
        CodeLeap Network
      </Typography>
      <Box sx={{ marginRight: "25px" }}>
        {codeLeapImg ? (
          <Image src={codeLeapImg} alt="home" height={75} />
        ) : null}
      </Box>

      <Button
        onClick={() => {
          handleLogout();
        }}
        sx={{
          color: "#FFFFFF",
          marginRight: "15px",
          width: "120px",
          height: "32px",
          backgroundColor: "#3c69e5",
          borderRadius: "8px",
          fontWeight: "700",
          fontSize: "16px",
          lineHeight: "19px",
          "&:hover": {
            backgroundColor: "rgb(144 151 170)",
          },
        }}
      >
        Logout
      </Button>
    </Box>
  );
}
