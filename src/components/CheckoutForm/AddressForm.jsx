import React, { useState, useEffect } from "react";
import {
  InputLabel,
  SelectMenuItem,
  Button,
  Grid,
  Typography,
  MenuItem,
  Select,
} from "@material-ui/core";

import { Link } from "react-router-dom";

import FormInput from "./FormInput";

import { commerce } from "../../lib/commerce";

import styles from "./styles/AddressForm.module.css";

import { useForm, FormProvider } from "react-hook-form";

const AddressForm = ({ checkoutToken, next }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setshippingSubdivisions] = useState([]);
  const [shippingSubdivision, setshippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  // const classes = useStyles();

  const methods = useForm();

  //Get all countries from object and map them to a 2 dimension array
  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  //Get all subdivisions from object and map them to a 2 dimension array
  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({
      id: code,
      label: name,
    })
  );

  //Get all shipping options
  const options = shippingOptions.map((sO) => ({
    id: sO.id,
    label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
  }));

  //Retrieve all available countries that we can ship to
  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );

    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  //Retrieve all available subdivisions (states, counties, etc) in the selected country
  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setshippingSubdivisions(subdivisions);
    setshippingSubdivision(Object.keys(subdivisions)[0]);
  };

  //Retrieve all available shipping options based on selected country
  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region }
    );

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  //Get shipping countries
  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  //Get shipping subdivisions if a country is selected
  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  //Get shipping options if a shipping subdivision is selected
  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [shippingSubdivision]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            next({
              ...data,
              shippingCountry,
              shippingSubdivision,
              shippingOption,
            })
          )}
        >
          <Grid container spaceing={3}>
            <FormInput required name="firstName" label="First Name" />
            <FormInput required name="lastName" label="Last Name" />
            <FormInput required name="address1" label="Address" />
            <FormInput required name="city" label="City" />
            <FormInput required name="zipCode" label="Zip/Postal Code" />
            <FormInput name="email" label="Email" />

            {/* Custom component to select shipping country */}
            <Grid item xs={12} sm={6}>
              <InputLabel className={styles.inputLabel}>
                Shipping Country
              </InputLabel>
              <Select
                className={styles.select}
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            {/* Custom component to select shipping subdivisions */}
            <Grid item xs={12} sm={6}>
              <InputLabel className={styles.inputLabel}>
                Shipping State
              </InputLabel>
              <Select
                className={styles.select}
                value={shippingSubdivision}
                fullWidth
                onChange={(e) => setshippingSubdivision(e.target.value)}
              >
                {subdivisions.map((subdivision) => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            {/* Custom component to select shipping options */}
            <Grid item xs={12} sm={6}>
              <InputLabel className={styles.inputLabel}>
                Shipping Options
              </InputLabel>
              <Select
                className={styles.select}
                value={shippingOption}
                fullWidth
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} to="/cart" variant="outlined">
              Back to Cart
            </Button>
            <Button variant="contained" type="submit" color="primary">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
