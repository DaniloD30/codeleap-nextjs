import Header from "../../components/Header";
import CardItem from "../../components/CardItem";
import CardContent from "../../components/CardContent";
import { Post, usePosts } from "../../hooks/querys/usePosts";
import { Skeleton, Stack, TablePagination } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

export default function MainScreen() {
  const [page, setPage] = useState<number>(2);
  const [rowPerPage, setRowsPerPage] = useState<number>(10);

  const { data, isLoading } = usePosts(page, rowPerPage);

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CardContent />
        {isLoading ? (
          <Stack spacing={1} sx={{ marginTop: "30px" }}>
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={752}
              height={150}
            />
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={752}
              height={150}
            />
          </Stack>
        ) : (
          data?.posts.map((item) => (
            <Box key={item.id}>
              <CardItem post={item} />
            </Box>
          ))
        )}

        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          page={page}
          count={data?.total_count || 0}
          component="div"
          onPageChange={(_, page) => setPage(page)}
          rowsPerPage={rowPerPage}
          onRowsPerPageChange={(event) => {
            setPage(1);
            setRowsPerPage(+event.target.value);
          }}
        />
      </Box>
    </>
  );
}
