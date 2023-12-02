import React from 'react';
import "./index.css";

import Column from "../../component/column";
import Back from "../../component/back-button"; 

interface ChildProps {
	className?: string;
	style?: React.CSSProperties;
	title: string;
	comment?: string;
	backTo: string;
}

export default function Component({className = "", style = {}, title = '', comment = '', backTo}:ChildProps):React.ReactElement {
	return (
		<Column className = "column--grid grid--heading">
			<Back backTo={backTo}/>
			<div className="title" style={{...style}}>{title}</div>
			<div className="comment" style={{...style}}>{comment}</div>
		</Column> 
	) 
}