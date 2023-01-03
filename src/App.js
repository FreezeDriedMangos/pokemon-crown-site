import React, { Component } from 'react';
// import { hot } from 'react-hot-loader';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import TitleBar from './components/Titlebar'
import Table from './components/FullPokemonTable'
import PokemonPage from './pages/PokemonPage'
import TypePage from './pages/TypePage'
import NotFoundPage from './pages/NotFoundPage'

const themeOptions = createTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#272130',
      paper: '#3b3846',
    },
    primary: {
      main: '#57566e',
      dark: '#3b3846',
      light: '#656875',
      contrastText: '#fff',
    },
    secondary: {
      main: '#c4892d',
      dark: '#ba783a',
      light: '#ddb633',
      contrastText: '#3b3846',
    },
    
    text: {
      primary: '#aaaaaa',
    },
  },
});

class App extends Component {
  render() {
    const {data} = this.props
    
    return (
      <ThemeProvider theme={themeOptions}>
        <div className="App">
          <TitleBar/>

          <BrowserRouter>
            <Routes>
              <Route index element={<Table data={data}/>} />
              <Route path="/pokemon/:name" element={<PokemonPage data={data}/>} />
              <Route path="/type/:type" element={<TypePage data={data}/>} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </div>

      </ThemeProvider>
    );
  }
}



// export default hot(module)(App);
export default (App);
