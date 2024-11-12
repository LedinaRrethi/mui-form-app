import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  FormControl,
  Autocomplete,
  Typography,
  Snackbar,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const countries = ['United States', 'Canada', 'Australia'];

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    dateOfBirth: null,
    country: '',
    phone: '',
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleDateChange = (newValue) => {
    setFormData((prevData) => ({
      ...prevData,
      dateOfBirth: newValue,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.terms) newErrors.terms = 'You must accept the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        dateOfBirth: null,
        country: '',
        phone: '',
        terms: false,
      });
      setErrors({});
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: '500px', mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>

      <TextField
        fullWidth
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        error={!!errors.name}
        helperText={errors.name}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        error={!!errors.email}
        helperText={errors.email}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleInputChange}
        error={!!errors.password}
        helperText={errors.password}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
        margin="normal"
      />

      <FormControl component="fieldset" margin="normal" error={!!errors.gender}>
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup row name="gender" value={formData.gender} onChange={handleInputChange}>
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>
      {errors.gender && <Typography color="error">{errors.gender}</Typography>}

      <DatePicker
        label="Date of Birth"
        value={formData.dateOfBirth}
        onChange={handleDateChange}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            margin="normal"
            error={!!errors.dateOfBirth}
            helperText={errors.dateOfBirth}
          />
        )}
      />

      <Autocomplete
        options={countries}
        getOptionLabel={(option) => option}
        onChange={(event, newValue) => setFormData({ ...formData, country: newValue })}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Country"
            margin="normal"
            fullWidth
            error={!!errors.country}
            helperText={errors.country}
          />
        )}
      />

      <TextField
        fullWidth
        label="Phone Number"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleInputChange}
        error={!!errors.phone}
        helperText={errors.phone}
        margin="normal"
      />

      <FormControlLabel
        control={<Checkbox checked={formData.terms} onChange={handleInputChange} name="terms" />}
        label="I agree to the terms and conditions"
      />
      {errors.terms && <Typography color="error">{errors.terms}</Typography>}

      <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
        Register
      </Button>

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
        message="Registration successful"
      />
    </Box>
  );
}
