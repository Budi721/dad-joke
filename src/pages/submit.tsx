import {createTheme, ThemeProvider} from '@mui/material/styles';
import {EmojiEmotions} from "@mui/icons-material";
import {
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  Box,
  Grid,
  Typography, Alert,
} from "@mui/material";
import React, {useState} from "react";
import {Copyright} from "@/components/atoms";
import axios from "@/utils"

const theme = createTheme();

export default function SubmitJokePage() {
  const [category, setCategory] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [flags, setFlags] = useState({
    "nsfw": false,
    "religious": false,
    "political": false,
    "racist": false,
    "sexist": false,
    "explicit": false
  });
  const [message, setMessage] = useState<string>('');
  /** Handle form submission **/
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const form = {
      "formatVersion": 3,
      category,
      type,
      ...(type === "single" && {joke: data.get('joke')}),
      ...(type === "twopart" && {setup: data.get('setup')}),
      ...(type === "twopart" && {delivery: data.get('delivery')}),
      flags,
      "lang": "en"
    }

    axios.post("submit", form)
      .then((res) => setMessage(res.data.message))
      .catch((err) => setMessage(err.data.additionalInfo))
      .finally(() => setTimeout(() => {
        setMessage("")
      }, 3000))
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{height: '100vh'}}>
        <CssBaseline/>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{m: 1, bgcolor: 'primary.main'}}>
              <EmojiEmotions/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Submit Dad Joke
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="category"
                  id="category"
                  value={category}
                  label="Category"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <MenuItem value={'Progamming'}>Progamming</MenuItem>
                  <MenuItem value={'Misc'}>Misc</MenuItem>
                  <MenuItem value={'Dark'}>Dark</MenuItem>
                  <MenuItem value={'Pun'}>Pun</MenuItem>
                  <MenuItem value={'Spooky'}>Spooky</MenuItem>
                  <MenuItem value={'Christmas'}>Christmas</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel id="type-label">Type</InputLabel>
                <Select
                  labelId="type"
                  id="type"
                  value={type}
                  label="Type"
                  onChange={(e) => setType(e.target.value)}
                >
                  <MenuItem value={'single'}>Single</MenuItem>
                  <MenuItem value={'twopart'}>Two Part</MenuItem>
                </Select>
              </FormControl>

              <TextField
                margin="normal"
                required
                fullWidth
                id={type === "twopart" ? "setup" : "joke"}
                label={type === "twopart" ? "Setup" : "Joke"}
                name={type === "twopart" ? "setup" : "joke"}
                type="text"
              />

              {type === "twopart" && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="delivery"
                  label="Delivery"
                  type="text"
                  id="delivery"
                />
              )}

              <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                <FormControlLabel
                  control={<Checkbox/>}
                  onChange={(e, checked) => setFlags(prevFlag => ({
                    ...prevFlag,
                    "nsfw": checked,
                  }))}
                  label="NSFW"
                />
                <FormControlLabel
                  control={<Checkbox/>}
                  onChange={(e, checked) => setFlags(prevFlag => ({
                    ...prevFlag,
                    "religious": checked,
                  }))}
                  label="Religious"
                />
                <FormControlLabel
                  control={<Checkbox/>}
                  onChange={(e, checked) => setFlags(prevFlag => ({
                    ...prevFlag,
                    "political": checked,
                  }))}
                  label="Political"
                />
                <FormControlLabel
                  control={<Checkbox/>}
                  onChange={(e, checked) => setFlags(prevFlag => ({
                    ...prevFlag,
                    "racist": checked,
                  }))}
                  label="Racist"
                />
                <FormControlLabel
                  control={<Checkbox/>}
                  onChange={(e, checked) => setFlags(prevFlag => ({
                    ...prevFlag,
                    "sexist": checked,
                  }))}
                  label="Sexist"
                />
                <FormControlLabel
                  control={<Checkbox/>}
                  onChange={(e, checked) => setFlags(prevFlag => ({
                    ...prevFlag,
                    "explicit": checked,
                  }))}
                  label="Explicit"
                />
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
              >
                Submit Joke
              </Button>
              {message !== "" && (
                <Alert severity="info">{message}</Alert>
              )}
              <Copyright sx={{mt: 5}}/>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}