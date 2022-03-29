import React from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import VRadio from '../components/VRadio'
import '../components/VRadio.css'



export default function TestPage() {
  	return (
		<React.Fragment>
			<FormControl>
    			<FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
      				<RadioGroup
        				aria-labelledby="demo-radio-buttons-group-label"
        				defaultValue="female"
        				name="radio-buttons-group"
      				>
        				<VRadio
							name="aaaaa"
							value="a"
							id="a"
							label="ABCD"
						/>

						<VRadio
							name="aaaaa"
							value="b"
							id="b"
							label="EFGH"
						/>
						
      			</RadioGroup>
    		</FormControl>
		</React.Fragment>
  	)
}
