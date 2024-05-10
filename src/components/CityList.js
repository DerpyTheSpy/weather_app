import React from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';

const CityList = ({ onCitySelect }) => {
  const [country, setCountry] = React.useState('');
  const [state, setState] = React.useState('');
  const [city, setCity] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onCitySelect(`${country}, ${state} ${city}`);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="country">Country</Label>
        <Input
          type="select"
          name="country"
          value={country}
          onChange={(event) => setCountry(event.target.value)}
        >
          <option value="">Select a country</option>
          <option value="Canada">Canada</option>
          {/* Add more countries here */}
        </Input>
      </FormGroup>
      {country && (
        <FormGroup>
          <Label for="state">State/Province</Label>
          <Input
            type="select"
            name="state"
            value={state}
            onChange={(event) => setState(event.target.value)}
          >
            <option value="">Select a state/province</option>
            <option value="Ontario">Ontario</option>
            {/* Add more states/provinces here */}
          </Input>
        </FormGroup>
      )}
      {country && state && (
        <FormGroup>
          <Label for="city">City</Label>
          <Input
            type="text"
            name="city"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
        </FormGroup>
      )}
      <Button type="submit">Select City</Button>
    </Form>
  );
};

export default CityList;