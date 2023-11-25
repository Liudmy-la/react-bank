import React from 'react';
import "./index.css";

interface ChildProps {
  children: React.ReactNode;
}

export default function Component({children}: ChildProps):React.ReactElement {
	return (
		<Component>			
			<div className="page">{children}</div>
			<div className="image"></div>
		</Component>
		)
}