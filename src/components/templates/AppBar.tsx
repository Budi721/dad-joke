import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {EmojiEmotions} from "@mui/icons-material";
import {useRouter} from "next/router";

export default function ButtonAppBar() {
  const router = useRouter();

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{mr: 2}}
            onClick={() => router.push("/")}
          >
            <EmojiEmotions/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            Dad Joke
          </Typography>
            <Button
              onClick={() => router.push("/submit")}
              color="inherit"
            >
              Submit Your Own Joke
            </Button>

        </Toolbar>
      </AppBar>
    </Box>
  );
}
