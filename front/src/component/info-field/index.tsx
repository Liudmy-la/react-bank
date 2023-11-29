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
			className = "warn__field" 
			style={{...style}}
		>
			<span className = "warn__icon"></span>
			{children}
		</div>
	)
}