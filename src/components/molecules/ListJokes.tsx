import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useJokeData, IJokeData} from "@/contexts";

export default function ControlledAccordions() {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const {data} = useJokeData();
  console.log({data})
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const renderList = (jokes: IJokeData[]) => {
    return jokes.map(joke => (
      <Accordion key={joke.id} expanded={expanded === `panel${joke.id}`} onChange={handleChange(`panel${joke.id}`)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel-content"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            {joke.type}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            {joke.type === "twopart" && joke.setup }
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {joke.type === "twopart" ? joke.delivery : joke.joke}
          </Typography>
        </AccordionDetails>
      </Accordion>
    ))
  }

  console.log({data})
  return data ? <>{renderList(data.jokes)}</> : null;
}
