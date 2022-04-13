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


const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export function Categories(props) {
	return (
		
		<Dialog
			// fullScreen
			open={props.open}
			onClose={()=>props.onClose()}
			TransitionComponent={Transition}
			fullWidth
		>
			<AppBar sx={{ position: 'relative' }}>
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						onClick={()=>props.onClose()}
						aria-label="close"
					>
						<CloseIcon />
					</IconButton>
					<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
						Kategori 
					</Typography>
					
				</Toolbar>
			</AppBar>

			<List>
				{props.data.map((category,index)=>(
					<React.Fragment key={index}>

					
						<ListItem button>
							<ListItemText primary={category} onClick={()=>props.onClick(index)}/>
						</ListItem>
						<Divider />
						</React.Fragment>
				))}
				
				
				
			</List>
				
		</Dialog>

		)
	}
