import React from 'react'

export default function VRadio(props) {
  	return (
			<div className="vcheckbox">
				<input type="radio" name={props.name} value={props.value} id={props.id}/>
				<label for={props.id}>{props.label}</label>
			</div>
  	)
}
