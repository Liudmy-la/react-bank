import React from 'react';
import "./index.css";

interface ChildProps {
	onItemClick?: any;
	className?: string;
	style?: React.CSSProperties;
	itemtitle: string;
	details?: string;
	info?: string;
}

export default function Component({
	className = "", 
	style = {}, 
	itemtitle = '', 
	info, 
	details, 
	onItemClick
}:ChildProps):React.ReactElement {
	
	return (		
		<div className="info__block" onClick={onItemClick}>			
			<div className={`icon ${className}`}></div>
			<div className="inner__block">
				<div className="title__block">
					<div className="item-title">{itemtitle}</div>
					{details 
						? <div className="details">{details}</div>
						: null
					}
				</div>
				<div className="info" style={{...style}}>{info}</div>
			</div>			
		</div>
	) 
}
