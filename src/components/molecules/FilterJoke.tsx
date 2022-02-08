import {
  Autocomplete,
  Box, Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  SxProps,
  TextField,
  Theme
} from "@mui/material";
import React, {useState} from "react";
import axios from "@/utils";
import qs from "qs";
import {useJokeData} from "@/contexts";

interface Props {
  sx?: SxProps<Theme> | undefined;
}

function FilterJoke({sx}: Props) {
  const options = ['Programming', 'Misc', 'Dark', 'Pun', 'Spooky', 'Christmas'];
  const {setData} = useJokeData();
  const [type, setType] = useState<{ single: boolean, twopart: boolean }>({
    single: true,
    twopart: true,
  });
  const [category, setCategory] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(5);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await axios.get(`joke/${category === null ? "Any" : category}`, {
      params: {
        ...(type.single && !(type.single === type.twopart) && {type: "single"}),
        ...(type.twopart && !(type.single === type.twopart) && {type: "twopart"}),
        amount,
      },
      paramsSerializer: params => {
        return qs.stringify(params);
      },
    });
    setData(res.data);
  }

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
      <FormGroup sx={{gap: 2, ...sx}}>
        <InputLabel sx={{textAlign: 'center'}}>Filter Joke</InputLabel>
        <Box sx={{display: 'flex', justifyContent: 'center', gap: 4}}>
          <Box>
            <FormControlLabel
              control={<Checkbox defaultChecked/>}
              label="Single"
              onChange={(event, checked) => setType(prevType => ({...prevType, single: checked}))}
            />
            <FormControlLabel
              control={<Checkbox defaultChecked/>}
              label="Two Part"
              onChange={(event, checked) => setType(prevType => ({...prevType, twopart: checked}))}
            />
          </Box>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={options}
            sx={{width: 500}}
            value={category}
            onChange={(e, value) => setCategory(value)}
            renderInput={(params) => <TextField {...params} label="Categories"/>}
          />
          <FormControl sx={{width: 100}}>
            <InputLabel id="demo-simple-select-label">Joke</InputLabel>
            <Select
              labelId="amount-label"
              id="amount"
              value={amount}
              label="Amount"
              onChange={(e) => setAmount(e.target.value as number)}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <Button type="submit" sx={{paddingRight: 4, paddingLeft: 4}}>
            Let&apos;s Joke!!
          </Button>
        </Box>
      </FormGroup>
    </Box>
  );
}

export default FilterJoke;