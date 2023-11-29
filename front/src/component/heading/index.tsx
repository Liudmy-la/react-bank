import React from 'react';
import "./index.css";

import Column from "../../component/column";

interface ChildProps {
	className: string;
	style?: React.CSSProperties;
	title: string;
	comment?: string;
}

export default function Component({className = "", style = {}, title = '', comment = ''}:ChildProps):React.ReactElement {
	return (
		<Column className = "column--12">
			<div className={className}></div>
			<div className="title" style={{...style}}>{title}</div>
			<div className="comment" style={{...style}}>{comment}</div>
		</Column>
	) 
}