import React, {useEffect} from 'react'
import { Dialog } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import Slide from '@mui/material/Slide';

import Divider from '@mui/material/Divider';
import Midtrans from './Midtrans'

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
  });

export default function Payment(props) {
	const [scroll, setScroll] = React.useState('paper');



  	return (
		<Dialog
			fullScreen
			open={props.open}
		
			TransitionComponent={Transition}
		>
			<DialogTitle>Pembayaran</DialogTitle>
			<DialogContent>
				<Midtrans clientKey={process.env.REACT_APP_DATA_CLIENT_KEY} token={props.token}>
					<button>Bayar</button>
				</Midtrans>
				
			</DialogContent>
      	</Dialog>
  	)
}
