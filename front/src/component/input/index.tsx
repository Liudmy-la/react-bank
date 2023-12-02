import React from 'react';
import "./index.css";
import Column from "../../component/column";

interface ChildProps {
	children?: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;

	action?: any;
	onClick?: any;
	type?: any;

	label?: string;
	message?: string;
	placeholder?: string;
}

export default function Component({children, className = "", style = {}, type, onClick, label = "", message = "", placeholder = ""}:ChildProps):React.ReactElement {
	return (
		<>
			<Column className = "column--8">
				<div className = "label" style={{...style}}>{label}</div>
				<div className="input-container">
					<input className="input" type={type} style={{...style}} placeholder={placeholder}></input>
					<span className={className}></span>
				</div>
				<div className = "message" style={{...style}}>{message}</div>
			</Column>
			{/* {children} */}
		</>
	)
}