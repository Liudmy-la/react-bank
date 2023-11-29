import React from 'react';
import "./index.css";

interface ChildProps {
	className?: string;
	style?: React.CSSProperties;
	title: string;
}

export default function Component({className = "", style = {}, title = ''}:ChildProps):React.ReactElement {
	return (
		<div className="head__block">
			<div className='back'></div>
			<div className="title" style={{...style}}>{title}</div>
		</div>
	) 
}