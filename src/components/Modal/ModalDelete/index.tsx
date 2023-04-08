import * as React from "react";
import Dialog from "@mui/material/Dialog";
import {api} from "../../../services/api";
import {queryClient} from "../../../services/queryClient";
import { AlertColor, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useMutation } from "react-query";
import Toast from "../../../components/Toast";

type Props = {
  id: number;
  open: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ModalDelete({ open, onClose, id }: Props) {
  const [openToast, setOpenToast] = React.useState(false);
  const [type, setType] = React.useState<AlertColor>("success");
  const [message, setMessage] = React.useState("");

  const deletePost = useMutation(
    async (id: number) => {
      await api.delete(`/${id}/`);
    },
    {
      onSuccess: () => {
        setType("success");
        setMessage("Post deleted successfully!");

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

  const handleDeletePost = async () => await deletePost.mutateAsync(id);

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
          sx={{
            border: "1px solid #999999",
            borderRadius: "16px",
            height: "200px",
          }}
        >
          <Box sx={{ marginTop: "24px", marginLeft: "24px" }}>
            <Typography
              sx={{
                fontWeight: "700",
                fontStyle: "normal",
                fontSize: "22px",
                lineHeight: "26px",
                color: "#000000",
              }}
            >
              Are you sure you want to delete this item?
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              marginRight: "24px",
            }}
          >
            <Button
              type="submit"
              onClick={() => {
                onClose(false);
              }}
              disabled={deletePost.isLoading}
              sx={{
                color: "#000000",
                marginRight: "16px",
                width: "120px",
                height: "32px",
                backgroundColor: deletePost.isLoading ? "#e8e8e8" : "#FFFFFF",
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
                handleDeletePost();
              }}
              disabled={deletePost.isLoading}
              sx={{
                color: "#FFFFFF",
                width: "120px",
                height: "32px",
                backgroundColor: "#FF5151",
                borderRadius: "8px",
                fontWeight: "700",
                fontSize: "16px",
                lineHeight: "19px",
                marginBottom: "24px",
                "&:hover": {
                  backgroundColor: "#cb3636",
                },
              }}
            >
              Delete
            </Button>
          </Box>
        </Dialog>
      </div>
    </>
  );
}
