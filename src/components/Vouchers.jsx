import React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ListItemIcon from '@mui/material/ListItemIcon';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function Vouchers(props) {
	
	const handleSelectVoucher = (code) => {
		props.onSelectedVoucher(code)
	}

  	return (
		<Dialog
			// fullScreen
			open={props.open}
			onClose={props.onClose}
			TransitionComponent={Transition}
			fullWidth
      	>
			<AppBar sx={{ position: 'relative' }}>
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						onClick={props.onClose}
						aria-label="close"
					>
						<CloseIcon />
					</IconButton>
					<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
						Voucher
					</Typography>
					
				</Toolbar>
			</AppBar> 

			<List> 
				{props.vouchers.map((voucher,index)=>(
					<React.Fragment key={index}>

					
						<ListItem button>
							<ListItemIcon>
            					<LocalOfferIcon />
          					</ListItemIcon>
							
							<ListItemText 
								primary={
									<Typography
											sx={{ display: 'block',fontWeight: "bold",fontSize: "1rem" }}
											component="div"
											variant="body2"
											color="text.primary"

										>
											{voucher.voucher_name}
										</Typography>
									
								} 
								secondary={
									<React.Fragment>
										<Typography
											sx={{ display: 'block' }}
											component="span"
											variant="body2"
											color="text.primary"
										>
											Kode voucher: {voucher.voucher_code}
										</Typography>
										<Typography
											sx={{ display: 'block' }}
											component="span"
											variant="body2"
											color="text.primary"
										>
											Mininum order: {voucher.voucher_minimum_order}
										</Typography>
										<Typography
											sx={{ display: 'block' }}
											component="span"
											variant="body2"
											color="text.primary"
										>
											Discount: {voucher.voucher_discount_percentage}%
										</Typography>
										<Typography
											sx={{ display: 'block' }}
											component="span"
											variant="body2"
											color="text.primary"
										>
											Maximum discount: {voucher.voucher_discount_maximum_amount}
										</Typography>
										{/* <div>Kode voucher: {voucher.voucher_code}</div>
										<div>Mininum order: {voucher.voucher_minimum_order}</div>
										<div>Discount: {voucher.voucher_discount_percentage}%</div>
										<div>Maximum discount: {voucher.voucher_discount_maximum_amount}</div> */}
									</React.Fragment>
								}
								onClick={()=>handleSelectVoucher(voucher.voucher_code)}
							/>
						</ListItem>
						<Divider />
						</React.Fragment>
				))}
				
				
				
			</List>
				  
		</Dialog>
  	)
}
