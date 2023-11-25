import "./index.css";

import React from 'react';
import Page from "../../component/page";
import Heading from "../../component/heading";
import Column from "../../component/column";
import Button from "../../component/button";

interface ChildProps {
	children: React.ReactNode;
  }
  
  export default function Component({children}: ChildProps):React.ReactElement {
	  return (
		<Page>
	  		<div className="start-page">
				<Heading>{children}</Heading>
				<Column>{children}
					<Button>Sign Up</Button>					
					<Button>Sign In</Button>
				</Column>
			</div>
		</Page>
	  )
  }