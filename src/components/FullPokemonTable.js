import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import PokemonTable from './PokemonTable'

const types = [
  'Normal',
  'Fire',
  'Water',
  'Grass',
  'Electric',
  'Ice',
  'Fighting',
  'Poison',
  'Ground',
  'Flying',
  'Psychic',
  'Bug',
  'Rock',
  'Ghost',
  'Dark',
  'Dragon',
  'Steel',
  'Fairy',
]

export default function FullPokemonTable({data}) {
  const [searchedType, setSearchedType] = React.useState(null);
  
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ mb: 2, p: 2 }}>

        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}
        >
        
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Pokemon
          </Typography>
              
          
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={types}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Type" />}
            onChange={(event, values) => {
              setSearchedType(values)
            }}
          />
        </Toolbar>

        <PokemonTable data={data} type={searchedType}/>
      </Paper>
    </Box>
  );
}