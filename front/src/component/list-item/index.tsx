import React from 'react';
import "./index.css";

interface ChildProps {
	onClick?: () => void;
	className?: string;
	style?: React.CSSProperties;
	itemtitle: string;
	details?: string;
	info?: any;
}

export default function Component({className = "", style = {}, itemtitle = '', info, details, onClick}:ChildProps):React.ReactElement {
	return (		
		<div className="info__block" onClick={onClick}>			
			<div className={`icon ${className}`}></div>
			<div className="inner__block">
				<div className="title__block">
					<div className="item-title">{itemtitle}</div>
					<div className="details">{details}</div>
				</div>
				<div className="info" style={{...style}}>{info}</div>
			</div>			
		</div>
	) 
}