import React from 'react';
import "./index.css";

interface ChildProps {
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;	
	onClick?: () => void;
	type?: 'button' | 'submit' | 'reset' | undefined;
}

export default function Component({
	children, 
	className, 
	style = {}, 
	onClick,
	type = 'button'
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