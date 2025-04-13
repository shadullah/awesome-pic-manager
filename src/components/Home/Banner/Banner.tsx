import { Box, Stack, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";

interface Post {
  _id: string;
  imgPost: string;
  caption: string;
}

const Banner = ({ posts }: { posts: Post[] }) => {
  const { data: session } = useSession();
  return (
    <div>
      <Box sx={{ textAlign: "center", my: "30px" }}>
        <Stack direction="row" sx={{ justifyContent: "center", mb: "10px" }}>
          <Typography variant="h6">Hello, </Typography>
          <Typography
            variant="h6"
            sx={{ color: "cyan", textTransform: "uppercase", ml: 1 }}
          >
            {session?.user?.name}
          </Typography>
        </Stack>
        <Typography variant="h5" sx={{ fontStyle: "italic" }}>
          {posts.length > 0 ? (
            <>You have total {posts.length} Posts.</>
          ) : (
            <>Your Gallery is empty now.</>
          )}
        </Typography>
      </Box>
    </div>
  );
};

export default Banner;
