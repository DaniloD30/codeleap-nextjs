import { Box } from "@mui/system";
import { Button, Grid, Typography } from "@mui/material";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/redux/store/hook";
import {addUserName} from "../redux/slices/users";
const schema = Yup.object().shape({
  value: Yup.string().trim().required("*"),
});

export default function Signup() {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      value: "",
    },
    validationSchema: schema,
    onSubmit: ({ value }) => {
      dispatch(addUserName(value));
      router.push("/main-screen");
    },
  });

  const { errors, values, handleChange, handleSubmit } = formik;

  const disabledButton = () => {
    return errors.value !== undefined || values.value === "";
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: "#DDDDDD",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          container
          sx={{
            width: "500px",
            height: "205px",
            background: "#FFFFFF",
            border: "1px solid #CCCCCC",
            borderRadius: "16px",
          }}
        >
          <Grid item xs={12} sx={{ marginTop: "24px", marginLeft: "24px" }}>
            <Typography
              sx={{
                fontStyle: "normal",
                fontWeight: "700",
                fontSize: "22px",
                lineHeight: "26px",
              }}
            >
              Welcome to CodeLeap network!
            </Typography>
            <Box
              sx={{
                marginTop: "24px",
                display: "flex",
                alignItems: "baseline",
              }}
            >
              <Typography
                sx={{
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "16px",
                  lineHeight: "19px",
                }}
              >
                Please enter your username{" "}
              </Typography>
              {errors.value && (
                <Typography
                  sx={{
                    marginLeft: "3px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    fontSize: "16px",
                    lineHeight: "19px",
                    color: "rgb(255 0 0)",
                  }}
                >
                  {errors.value}
                </Typography>
              )}
            </Box>
            <Box sx={{ marginTop: "8px" }}>
              <input
                value={values.value}
                name="value"
                id="value"
                onChange={handleChange}
                style={{
                  width: "452px",
                  height: "32px",
                  background: "#FFFFFF",
                  border: "1px solid #777777",
                  borderRadius: "8px",
                  padding: 3,
                }}
                placeholder="John doe"
                maxLength={256}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                marginTop: "16px",
                marginRight: "17px",
              }}
            >
              <Button
                type="submit"
                onClick={() => {
                  handleSubmit();
                }}
                disabled={disabledButton()}
                sx={{
                  color: "#FFFFFF",
                  width: "111px",
                  height: "32px",
                  backgroundColor: disabledButton()
                    ? "rgb(144 151 170)"
                    : "#7695EC",
                  borderRadius: "8px",
                  fontWeight: "700",
                  fontSize: "16px",
                  lineHeight: "19px",
                  "&:hover": {
                    backgroundColor: "#3c69e5",
                  },
                }}
              >
                ENTER
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
