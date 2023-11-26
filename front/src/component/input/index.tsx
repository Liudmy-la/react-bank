import React from 'react';
import "./index.css";
import Column from "../../component/column";

interface ComponentProps {
	children?: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
	label?: string;
	message?: string;
	placeholder?: string;
}

export default function Component({children, className = "", style = {}, label = "", message = "", placeholder = ""}:ComponentProps):React.ReactElement {
	return (
		<>
			<Column className = "column--8">
				<div className = "label" style={{...style}}>{label}</div>
				<div className="input-container">
					<input className = "input" style={{...style}} placeholder={placeholder}></input>
					<span className={className}></span>
				</div>
				<div className = "message" style={{...style}}>{message}</div>
			</Column>
			{/* {children} */}
		</>
	)
}