import React from 'react';
import "./index.css";
import { Link } from 'react-router-dom';

interface ChildProps {
	backTo: string;
}

export default function Component({backTo}:ChildProps):React.ReactElement {
	return (
		<Link to={backTo}>
			<div className="back"></div>
		</Link>
		
	) 
}