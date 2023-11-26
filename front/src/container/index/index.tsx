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
		<Page className="" style = {{}}>			
			<Column className="column--space" style = {{marginTop: '30%'}}>  						
				<Heading className="" style = {{color:'rgb(255, 254, 252)', fontSize: '1.8rem'}} title="Hello!" comment="Welcome to the bank app"></Heading>
				<Column className="column--12">
					<Button className="button button--primary">Sign Up</Button>					
					<Button className="button button--primary button--outline">Sign In</Button>
				</Column>
			</Column>				
			<div className="overlay-image"></div>
			<div className="top-image"></div>
		</Page>
	  )
  }