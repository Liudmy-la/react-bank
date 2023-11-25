import React from 'react';
import "./index.css";

interface ChildProps {
  children: React.ReactNode;
}

export default function Component({children}: ChildProps):React.ReactElement {
	return (
		<div className="heading">
			<div className="title">Hello! {children}</div>
			<div className="comment">Welcome to the bank app {children}</div>
		</div>
	) 
}