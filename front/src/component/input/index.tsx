import React, { ChangeEvent } from 'react';
import "./index.css";
import Column from "../../component/column";

interface ChildProps {
	children?: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
	
	type?: any;
	action?: (name: string, value: string) => void;

	label?: string;
	message?: string;
	placeholder?: string;
	value?: string;
}

export default function Component({
	children, 
	action, 
	className = "", 
	style = {}, 
	type, 
	label = "", 
	message = "", 
	placeholder = "",
	value
}:ChildProps):React.ReactElement {
	const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
		if (action) {
			action(e.target.name, e.target.value);
		}
	};
	
	return (
		<>
			<Column className="column--8">
				<div className="label" style={{...style}}>{label}</div>
				<div className="input-container">
					<input
						onChange={handleInput}
						className="input"
						type={type}
						style={{...style}}
						placeholder={placeholder}
						value={value}
					/>
					<span className={className}></span>
				</div>
				<div className="message" style={{...style}}>{message}</div>
			</Column>
			{/* {children} */}
		</>
	)
}