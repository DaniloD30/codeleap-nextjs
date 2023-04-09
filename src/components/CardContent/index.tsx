/* eslint-disable react/no-unescaped-entities */
import { selectUserName } from "../../redux/slices/users";
import { useAppSelector } from "../../redux/store/hook";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { AlertColor, Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import * as Yup from "yup";
import Toast from "../Toast";

type Content = {
  title: string;
  content: string;
};

const schema = Yup.object().shape({
  title: Yup.string().trim().required("*"),
  content: Yup.string().trim().required("*"),
});

export default function CardContent() {
  const userName = useAppSelector(selectUserName);
  const router = useRouter();
  const [openToast, setOpenToast] = useState(false);
  const [type, setType] = useState<AlertColor>("success");
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (userName === "") {
      router.push("/");
    }
  }, [userName, router]);

  const createPost = useMutation(
    async (data: Content) => {
      await api.post("/", {
        username: userName,
        ...data,
      });
    },
    {
      onSuccess: () => {
        setType("success");
        setMessage("Post created successfully!");
        queryClient.invalidateQueries("posts");
        setOpenToast(true);
      },
      onError: () => {
        setType("error");
        setMessage("Error");
        setOpenToast(true);
      },
    }
  );

  const disabledButton = () => {
    return (
      errors.title !== undefined ||
      errors.content !== undefined ||
      values.content === "" ||
      values.title === "" ||
      createPost.isLoading
    );
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    validationSchema: schema,
    onSubmit: async ({}) => {
      await createPost.mutateAsync(values);
    },
  });

  const { errors, values, handleChange, handleSubmit } = formik;

  return (
    <>
      <Toast
        type={type}
        open={openToast}
        handleClose={setOpenToast}
        message={message}
      />
      <Box
        sx={{
          bgcolor: "#FFFFFF",
          height: "334px",
          width: "752px",
          border: "1px solid #999999",
          borderRadius: "16px",
          marginTop: "24px",
        }}
      >
        <Grid container>
          <Grid item xs={12} sx={{ marginTop: "24px", marginLeft: "24px" }}>
            <Typography
              sx={{
                fontWeight: "700",
                fontStyle: "normal",
                fontSize: "22px",
                lineHeight: "26px",
                color: "#000000",
              }}
            >
              What's on your mind?
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
                  color: "#000000",
                }}
              >
                Title
              </Typography>
              {/* {errors.value && (
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
              )} */}
            </Box>
            <Box sx={{ marginTop: "8px" }}>
              <input
                value={values.title}
                name="title"
                id="title"
                onChange={handleChange}
                style={{
                  width: "704px",
                  height: "32px",
                  background: "#FFFFFF", 
                  border: "1px solid #777777", 
                  borderRadius: "8px", 
                  padding: 3,
                }}
                placeholder="Title"
                maxLength={256}
              />
            </Box>
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
                  color: "#000000",
                }}
              >
                Content
              </Typography>
              
            </Box>
            <Box sx={{ marginTop: "8px" }}>
              <textarea
                value={values.content}
                name="content"
                id="content"
                onChange={handleChange}
                style={{
                  width: "704px",
                  minHeight: "74px",
                  background: "#FFFFFF", 
                  border: "1px solid #777777", 
                  borderRadius: "8px", 
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                marginTop: "15px",
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
                  width: "120px",
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
                Create
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
