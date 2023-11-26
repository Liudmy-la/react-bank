import React from 'react';
import "./index.css";

interface ComponentProps {
	children?: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
}

export default function Component({children, className = "", style = {}}:ComponentProps):React.ReactElement {
	return (
		<div 
			className="line"
			style={{...style}}
		>
			
		</div>
	)
}