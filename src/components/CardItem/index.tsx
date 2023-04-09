import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import iconEdit from "../../assets/edit.png";
import iconTrash from "../../assets/trash.png";
import Image from "next/image";
import { useAppSelector } from "../../redux/store/hook";
import { selectUserName } from "../../redux/slices/users";
import { Post } from "../../hooks/querys/usePosts";
import ModalEdit from "../../components/Modal/ModalEdit";
import ModalDelete from "../Modal/ModalDelete";

type Item = {
  post: Post;
};

export default function CardItem({ post }: Item) {
  const userNameState = useAppSelector(selectUserName);
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);

  const handleEdit = () => {
    setOpenModalEdit(true);
  };

  const handleDelete = () => {
    setOpenModalDelete(true);
  };

  return (
    <>
      <Box
        sx={{
          width: "752px",
          height: "316px",
          background: "#FFFFFF",
          border: "1px solid #999999",
          borderRadius: "16px",
          marginTop: "24px",
        }}
      >
        <Box
          sx={{
            bgcolor: "#7695EC",
            minHeight: "70px",
            width: "752px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          }}
        >
          <Grid
            container
            flexDirection="row"
            alignItems="center"
            display="flex"
            minHeight="70px"
          >
            <Grid item xs={9}>
              <Typography
                sx={{
                  overflowWrap: "break-word",

                  marginLeft: "37px",
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: "22px",
                  lineHeight: "26px",
                  color: "#FFFFFF",
                }}
              >
                {post.title}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              {userNameState === post.username ? (
                <Box>
                  <IconButton
                    sx={{ marginRight: "34px" }}
                    onClick={() => handleDelete()}
                  >
                    {iconTrash ? (
                      <Image src={iconTrash} alt="icon-delete" />
                    ) : null}
                  </IconButton>
                  <IconButton
                    sx={{ marginRight: "24px" }}
                    onClick={() => handleEdit()}
                  >
                    {iconEdit ? <Image src={iconEdit} alt="icon-edit" /> : null}
                  </IconButton>
                </Box>
              ) : null}
            </Grid>
          </Grid>
        </Box>
        <Grid container minHeight="70px" flexDirection="row">
          <Grid item xs={8} marginTop="24px" marginLeft="24px">
            <Typography
              sx={{
                fontStyle: "normal",
                fontWeight: "700",
                fontSize: "18px",
                overflowWrap: "break-word",
                lineHeight: "21px",
                color: "#777777",
              }}
            >
              {`@${post.username}`}
            </Typography>
          </Grid>
          <Grid item xs={3} marginTop="24px">
            <Typography
              sx={{
                fontStyle: "normal",
                fontWeight: "400",
                fontSize: "18px",
                lineHeight: "21px",
                color: "#777777",
              }}
            >
              {post.created_datetime}
            </Typography>
          </Grid>
          <Grid
            item
            sx={{ marginTop: "16px", maxHeight: "165px", overflowX: "auto" }}
          >
            <Typography
              sx={{
                fontStyle: "normal",
                fontWeight: "400",
                fontSize: "18px",
                lineHeight: "21px",
                color: "#000000",
                marginRight: "25px",
                marginLeft: "25px",
              }}
            >
              {post.content}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <ModalEdit
        idContent={post.id}
        title={post.title}
        content={post.content}
        open={openModalEdit}
        onClose={setOpenModalEdit}
      />

      <ModalDelete
        id={post.id}
        open={openModalDelete}
        onClose={setOpenModalDelete}
      />
    </>
  );
}
