import React from 'react';
import "./index.css";

interface ChildProps {
	children: any;
	className?: string;
	style?: React.CSSProperties;
}

export default function Component({children, className = "", style = {}}:ChildProps):React.ReactElement {
	return (
		<div 
			className={className} 
			style={{...style}}
		>
			<span className = "warn__icon"></span>
			{children}
		</div>
	)
}