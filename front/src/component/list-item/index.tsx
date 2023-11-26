import React from 'react';
import "./index.css";

import Column from "../../component/column";

interface ComponentProps {
	className?: string;
	style?: React.CSSProperties;
	title: string;
	details?: string;
	info?: any;
}

export default function Component({className = "", style = {}, title = '', info = '', details}:ComponentProps):React.ReactElement {
	return (
		<div className="info__block">
			<div className={`icon ${className}`}></div>
			<div className="inner__block">
				<Column className="column--8">
					<div className="title" style={{...style}}>{title}</div>
					<div className="details">{details}</div>
				</Column>
				<div className="info">{info}</div>
			</div>
		</div>
	) 
}