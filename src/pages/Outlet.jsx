import React from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const outlets = [
	{
		outlet: "Grogol",
		address: "Jalan balashkjahskh sdhskds d asbnd",
		images : [
			{
				path: "https://picsum.photos/200/200"
			},
			{
				path: "https://picsum.photos/id/1018/1000/600/"
			},
			{
				path: "https://picsum.photos/id/1018/1000/600/"
			}
		]
	},
	{
		outlet: "Kota Tua",
		address: "Jalan balashkjahskh sdhskds d asbnd",
		images : [
			{
				path: "https://picsum.photos/200/200"
			},
			{
				path: "https://picsum.photos/id/1018/1000/600/"
			},
			{
				path: "https://picsum.photos/id/1018/1000/600/"
			}
		]
	},
	{
		outlet: "semanggi",
		address: "Jalan balashkjahskh sdhskds d asbnd",
		images : [
			{
				path: "https://picsum.photos/200/200"
			},
			{
				path: "https://picsum.photos/id/1018/1000/600/"
			},
			{
				path: "https://picsum.photos/id/1018/1000/600/"
			}
		]
	}
]
export default function Outlet() {
  	return (
		<React.Fragment>
			{/* <div className="page-title">Outlet</div> */}
			<div className="container-2-column">
				{
					outlets.map((outlet,index)=>(
						<div className="item" key={index}>
							<img src={outlet.images[0].path} alt="" />
							<div className="item-title">{outlet.outlet}</div>
							<div className="item-desc">{outlet.address}</div>
						</div>
					))
				}
			</div>
			<Stack spacing={2}>
				<Pagination count={10} variant="outlined" shape="rounded" />
			</Stack>
		</React.Fragment>
  	)
}
