
import "./index.css";

import React from 'react';
import Page from "../../component/page";

export default function Component():React.ReactElement {
	return (
		<Page>
			<div className="error">
				<div className="error-text">Can't find this way</div>
				<div  className="back-home">Back to the Main Page</div>
			</div>
			
			<div className="error-image"></div>
		</Page>
	)
}