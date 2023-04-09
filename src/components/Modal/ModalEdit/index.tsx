import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { api } from "../../../services/api";
import {queryClient} from "../../../services/queryClient";
import { AlertColor, Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMutation } from "react-query";
import * as Yup from "yup";
import Toast from "../../../components/Toast";

type Props = {
  idContent: number;
  title: string;
  content: string;
  open: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

type Content = {
  title: string;
  content: string;
};

const schema = Yup.object().shape({
  title: Yup.string().trim().required("*"),
  content: Yup.string().trim().required("*"),
});

export default function ModalEdit({
  idContent,
  title,
  content,
  open,
  onClose,
}: Props) {
  const [openToast, setOpenToast] = React.useState(false);
  const [type, setType] = React.useState<AlertColor>("success");
  const [message, setMessage] = React.useState("");

  const updatePost = useMutation(
    async (data: Content) => {
      await api.patch(`/${idContent}/`, {
        ...data,
      });
    },
    {
      onSuccess: () => {
        setType("success");
        setMessage("Post edited successfully!");
        setOpenToast(true);
        setTimeout(() => {
          onClose(false);
        }, 1000);
        setTimeout(() => {
          queryClient.invalidateQueries("posts");
        }, 3000);
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
      updatePost.isLoading
    );
  };

  const formik = useFormik({
    initialValues: {
      title: title,
      content: content,
    },
    validationSchema: schema,
    onSubmit: async ({}) => {
      await updatePost.mutateAsync(values);
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
      <div>
        <Dialog
          open={open}
          onClose={onClose}
          fullWidth={true}
          maxWidth="md"
          sx={{ border: "1px solid #999999", borderRadius: "16px" }}
        >
          <Box
            sx={{
              bgcolor: "#FFFFFF",
              height: "334px",
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
                  Edit item
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
                      width: "812px",
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
                  <textarea
                    value={values.content}
                    name="content"
                    id="content"
                    onChange={handleChange}
                    style={{
                      width: "812px",
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
                    marginTop: "24px",
                    marginRight: "17px",
                  }}
                >
                  <Button
                    type="submit"
                    onClick={() => {
                      onClose(false);
                    }}
                    disabled={updatePost.isLoading}
                    sx={{
                      color: "#000000",
                      marginRight: "16px",
                      width: "120px",
                      height: "32px",
                      backgroundColor: updatePost.isLoading
                        ? "#e8e8e8"
                        : "#FFFFFF",
                      borderRadius: "8px",
                      fontWeight: "700",
                      fontSize: "16px",
                      lineHeight: "19px",
                      border: "1px solid #000000",
                      "&:hover": {
                        backgroundColor: "#e8e8e8",
                      },
                    }}
                  >
                    Cancel
                  </Button>
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
                      backgroundColor: disabledButton() ? "#e8e8e8" : "#47B960",
                      borderRadius: "8px",
                      fontWeight: "700",
                      fontSize: "16px",
                      lineHeight: "19px",
                      "&:hover": {
                        backgroundColor: "#277738",
                      },
                    }}
                  >
                    Save
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Dialog>
      </div>
    </>
  );
}
