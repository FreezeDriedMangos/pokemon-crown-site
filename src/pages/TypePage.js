import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import {useParams} from "react-router-dom";

import PokemonTable from '../components/PokemonTable'

export default function TypePage(props) {
  console.log('==============')
  console.log(props)
  console.log('==============')

  const {type} = useParams()
  const {data} = props

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  console.log('TEST')

  return (
	<>
    <Divider/>

    <Box sx={{ width: '100%' }}>
      <Paper sx={{ mt: 2, mb: 2, p: 2 }}>
		    Type Synergies go here
      </Paper>
    </Box>

		<Divider/>

    <Box sx={{ width: '100%' }}>
      <Paper sx={{ mb: 2, p: 2 }}>
		    <PokemonTable type={type} data={data}/>
      </Paper>
    </Box>
	</>
  );
}