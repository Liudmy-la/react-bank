import React from 'react';
import "./index.css";

interface ChildProps {
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
}

export default function Component({children, className = "", style = {}}:ChildProps):React.ReactElement {
	return (
		<div 
			className={`page ${className}`}
			style={{...style}}
		>
			{children}
		</div>
	)
}