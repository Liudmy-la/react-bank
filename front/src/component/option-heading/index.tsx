import "./index.css";

import React from 'react';
import Back from "../../component/back-button"; 

interface ChildProps {
	className?: string;
	style?: React.CSSProperties;
	title: string;
	backTo: string;
}

export default function Component({className = "", style = {}, title = '', backTo}:ChildProps):React.ReactElement {
	return (
		<div className="head__option">
			<Back backTo={backTo} />
			<div className="title" style={{...style}}>{title}</div>
		</div>
	) 
}