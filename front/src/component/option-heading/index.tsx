import React from 'react';
import "./index.css";

interface ComponentProps {
	className?: string;
	style?: React.CSSProperties;
	title: string;
}

export default function Component({className = "", style = {}, title = ''}:ComponentProps):React.ReactElement {
	return (
		<div className="head__block">
			<div className='back'></div>
			<div className="title" style={{...style}}>{title}</div>
		</div>
	) 
}