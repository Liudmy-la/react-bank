import React from 'react';
import "./index.css";

interface ChildProps {
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;	
	onClick?: () => void;
	type?: any;
}

export default function Component({
	children, 
	className, 
	style = {}, 
	onClick,
	type
}:ChildProps):React.ReactElement {
	return (		
		<button
			type={type}
			className={className}
			style={{...style}}
			onClick={onClick}
		>
			{children}
		</button>		
	) 
}