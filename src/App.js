import './App.css';
import React, {useEffect} from 'react';
import styled, { ThemeProvider } from 'styled-components';
import NoSsr from '@material-ui/core/NoSsr';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { palette, spacing, typography } from '@material-ui/system';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import axios from 'axios'

const Box = styled.div`${palette}${spacing}${typography}`;
const theme = createMuiTheme();
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function App() {
  let errors = []
  const classes = useStyles();
  const [originValue, setOriginValue] = React.useState('1');
  const [cylinderValue, setCylinderValue] = React.useState('3');
  const [year, setYear] = React.useState(70);
  const [horsepower, setHorsePower] = React.useState(45)
  const [displacement, setDisplacement] = React.useState(65)
  const [weight, setWeight] = React.useState(1600)
  const [acceleration, setAcceleration] = React.useState(5)


  //useEffect to ping our app
  useEffect(() => {
    axios.get('https://mpg-flask.herokuapp.com/ping')
        .then(response => console.log(response));
  }, [])

  //handling all changes to dom
  const handleOriginChange = (event) => {
    setOriginValue(event.target.value);
  };


  const handleCylinderChange = (event) => {
    setCylinderValue(event.target.value);
  };


  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handlePowerChange = (event) => {
    setHorsePower(event.target.value);
  };

  const handleDisplacementChange = (event) => {
    setDisplacement(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };
  const handleAccelerationChange = (event) => {
    setAcceleration(event.target.value);
  };
  
  //handling all input validation for text fields
  const powerValidation = powerValue => {
    if(powerValue === null) {
      return 'Horsepower needs to be filled'
    }
    if(isNaN(powerValue)) {
      return 'Horsepower has to be a number'
    }
    if(powerValue < 45 || powerValue > 230) {
      return 'Horsepower has to be in the specified Range'
    }
    return null
  }

  const displacementValidation = displacementValue => {
    if(displacementValue === null) {
      return 'Displacement needs to be filled'
    }
    if(isNaN(displacementValue)) {
      return 'Displacement has to be a number'
    }
    if(displacementValue < 65 || displacementValue > 455) {
      return 'Displacement has to be in the specified Range'
    }
    return null
  }

  const weightValidation = weightValue => {
    if(weightValue === null) {
      return 'Weight needs to be filled'
    }
    if(isNaN(weightValue)) {
      return 'Weight has to be a number'
    }
    if(weightValue < 1600 || weightValue > 5200) {
      return 'Weight has to be in the specified Range'
    }
    return null
  }

  const accelerationValidation = accelerationValue => {
    if(accelerationValue === null) {
      return 'Acceleration needs to be filled'
    }
    if(isNaN(accelerationValue)) {
      return 'Acceleration has to be a number'
    }
    if(accelerationValue < 5 || accelerationValue > 25) {
      return 'Acceleration has to be in the specified Range'
    }
    return null
  }

  const validate = (hp, acc, dis, wght) => {
    if(powerValidation(hp) != null) {
      errors.push(powerValidation(hp))
    }
    if(displacementValidation(dis)){
      errors.push(displacementValidation(dis))
    }
    if(weightValidation(wght)){
      errors.push(weightValidation(wght))
    }
    if(accelerationValidation(acc)){
      errors.push(accelerationValidation(acc))
    }
    
    return errors
  }

  //handling submit function
  const handleSubmit = (event) => {
    event.preventDefault()
    validate(horsepower, acceleration, displacement, weight)
    //if there are errors send alert else submit to axios
    if(errors.length > 0) {
      alert(errors)
      setHorsePower(45)
      setDisplacement(65)
      setWeight(1600)
      setAcceleration(5)

    }else{
    //   let vehicle_config = {
    //     'Cylinders': [4, 6, 8,4, 6, 8],
    //     'Displacement': [155.0, 160.0, 165.5,160.0, 165.5,155.0],
    //     'Horsepower': [93.0, 130.0, 98.0, 93.0, 130.0, 98.0 ],
    //     'Weight': [2500.0, 3150.0, 2600.0, 2500.0, 3150.0, 2600.0],
    //     'Acceleration': [15.0, 14.0, 16.0,14.0, 16.0,15.0 ],
    //     'Model Year': [81, 80, 78, 80, 78, 81],
    //     'Origin': [3, 2, 1, 3, 2, 1]
    // }

    let vehicle_config = {
      'Cylinders': [parseFloat(cylinderValue), 4, 6, 8],
      'Displacement': [parseFloat(displacement), 155.0, 160.0, 165.5],
      'Horsepower': [parseFloat(horsepower), 93.0, 130.0, 98.0],
      'Weight': [parseFloat(weight), 2500.0, 3150.0, 2600.0],
      'Acceleration': [parseFloat(acceleration), 15.0, 14.0, 16.0],
      'Model Year': [parseInt(year), 81, 80, 78],
      'Origin': [parseInt(originValue), 3, 2, 1]
  }

      axios.post('https://mpg-flask.herokuapp.com/predict', vehicle_config)
      .then(response =>{
        let final_prediction = response.data.mpg_prediction[0].toPrecision(4)
        alert(`Your vehicle is predicted to get ${final_prediction} mpg`)
      });
    }
  }

  return (
    <NoSsr>
      <ThemeProvider theme={theme}>
        <Box
          color="primary.main"
          bgcolor="background.paper"
          fontFamily="h6.fontFamily"
          fontSize={{ xs: 'h6.fontSize', sm: 'h5.fontSize', md: 'h3.fontSize' }}
          display="flex"
          p={{ xs: 1, sm: 2, md: 3 }}
        >
           <div
              style={{
                  position: 'absolute', 
                  left: '50%', 
                  top: '100%',
                  transform: 'translate(-50%, -50%)'
              }}>
              
            <Box m="3rem" bgcolor="background.paper" p={1}>
              <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                <label htmlFor="my-input">Horsepower</label>
                <TextField value={horsepower} onChange={handlePowerChange} id="outlined-basic" label="Horsepower Between 45-230" variant="outlined" />
                <label htmlFor="my-input">Displacement</label>
                <TextField value={displacement} onChange={handleDisplacementChange} id="outlined-basic" label="Displacement Between 65-455" variant="outlined" />
                <label htmlFor="my-input">Weight</label>
                <TextField value={weight} onChange={handleWeightChange} id="outlined-basic" label="Weight Between 1600-5200" variant="outlined" />
                <label htmlFor="my-input">Acceleration</label>
                <TextField value={acceleration} onChange={handleAccelerationChange} id="outlined-basic" label="Acceleration Between 5-25" variant="outlined" />
                <label htmlFor="my-input">Country of Origin</label>
                <RadioGroup aria-label="Origin" name="origin" value={originValue} onChange={handleOriginChange}>
                  <FormControlLabel value="1" control={<Radio />} label="India" />
                  <FormControlLabel value="2" control={<Radio />} label="USA" />
                  <FormControlLabel value="3" control={<Radio />} label="Germany" />
              </RadioGroup>
              <label htmlFor="my-input">Cylinders</label>
                <RadioGroup aria-label="Cylinders" name="cylinders" value={cylinderValue} onChange={handleCylinderChange}>
                  <FormControlLabel value="3" control={<Radio />} label="3 Cylinders" />
                  <FormControlLabel value="4" control={<Radio />} label="4 Cylinders" />
                  <FormControlLabel value="5" control={<Radio />} label="5 Cylinders" />
                  <FormControlLabel value="6" control={<Radio />} label="6 Cylinders" />
                  <FormControlLabel value="8" control={<Radio />} label="8 Cylinders" />
              </RadioGroup>
              <label htmlFor="my-input">Year of Origin</label>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={year}
                onChange={handleYearChange}
              >
                <MenuItem value={70}>1970</MenuItem>
                <MenuItem value={71}>1971</MenuItem>
                <MenuItem value={72}>1972</MenuItem>
                <MenuItem value={73}>1973</MenuItem>
                <MenuItem value={74}>1974</MenuItem>
                <MenuItem value={75}>1975</MenuItem>
                <MenuItem value={76}>1976</MenuItem>
                <MenuItem value={77}>1977</MenuItem>
                <MenuItem value={78}>1978</MenuItem>
                <MenuItem value={79}>1979</MenuItem>
                <MenuItem value={80}>1980</MenuItem>
                <MenuItem value={81}>1981</MenuItem>
                <MenuItem value={82}>1982</MenuItem>
              </Select>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
              </form>
            </Box>
          </div>
        </Box>
      </ThemeProvider>
    </NoSsr>
  );
}

export default App;
