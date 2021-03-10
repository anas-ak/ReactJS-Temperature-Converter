import logo from './logo.svg';

import React, { useState } from 'react';
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./themes.js";
import Calculator from './Calculator';
import './App.css';

const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`;

function App() {

  const [theme, setTheme] = useState("light");

  const themeToggler = () => {
    theme === "light" ? setTheme('dark') : setTheme('light');
  };

  return (
    <ThemeProvider theme = {theme === "light" ? lightTheme : darkTheme}>

      <GlobalStyles />
      <StyledApp>
        <div className="App">
         <h3>Celsius - Fahrenheit Converter</h3>
         <Calculator />
         <button onClick= {() => themeToggler()}>Change Theme</button>
        </div>
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
