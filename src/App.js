import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import RegistrationForm from './components/RegistrationForm';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RegistrationForm />
    </LocalizationProvider>
  );
}

export default App;
