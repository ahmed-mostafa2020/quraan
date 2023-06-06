import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


export default function RadioButtonsGroup({ data,setAnswer1, setAnswer2, setQuestion1, setQuestion2 }) {


  const items = data.data;
  const form1 = items[0];
  const form2 = items[1];
  setQuestion1(form1.id);
  setQuestion2(form2.id);

  return (
    <>
      { data ? <FormControl className='radio-group'  >

        <FormLabel id="َquestion1" className='radio-label'>{form1.title}</FormLabel>

        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group1"
          className='radio-options'
        >
          {form1.answers.map((answer, index) => {
            return (
              <FormControlLabel value={answer} control={<Radio className='radio-div' />} label={answer} key={index}
              onChange={(event) => setAnswer1(event.target.value)} className='option'/>
            )
          })}
        </RadioGroup>
      </FormControl> : ''}
      { data ? <FormControl className='radio-group'  >

        <FormLabel id="َquestion2" className='radio-label'>{form2.title}</FormLabel>

        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group2"
          className='radio-options'
        >
          {form2.answers.map((answer, index) => {
            return (
              <FormControlLabel value={answer} control={<Radio className='radio-div'/>} label={answer} key={index}
              onChange={(event) => setAnswer2(event.target.value)} className='option'/>
            )
          })}
        </RadioGroup>
      </FormControl> : ''}
    </>
  );
}