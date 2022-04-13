import React from 'react'
import Slider from "react-slick";
import {Link} from "react-router-dom"
import './Banner.css'

export default function Banner(props) {
	const settings = {
		dots: props.dots,
		infinite: props.infinite,
		speed: props.speed,
		slidesToShow: props.slidesToShow,
		slidesToScroll: props.slidesToScroll,
		autoplay: true,
		autoplaySpeed: 5000,
		arrows: false,
	};
  	
	return (
		<div>
			{props.data.length>0?(
				<Slider {...settings}>
					{props.data.map((data,index)=>(
						<div key={index}>
							<a href={data.ads_link} target="_blank">
								<img src={data.ads_image} />
							</a>
						</div>
					))}
					
				</Slider>
			):('')}
        	
     	</div>
  	)
}
