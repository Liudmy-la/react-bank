import React from 'react';
import "./index.css";

interface ChildProps {
  children: React.ReactNode;
}

export default function Component({children}: ChildProps):React.ReactElement {
	return <div className="column">{children}</div>
}