import "./index.css";

import React from 'react';
import Page from "../../component/page";
import Heading from "../../component/heading";
import Column from "../../component/column";
import Button from "../../component/button";
import Input from "../../component/input";

interface ChildProps {
	children: React.ReactNode;
}
  
export default function Component({children}: ChildProps):React.ReactElement {
	  return (
		<Page className="" style = {{}}>			
			<Column className="column--20" style = {{}}>  						
				<Heading className="back" style = {{}} title="Confirm account" comment="Write the code you received"></Heading>

				<Input label = "Code" message = "" placeholder = "Enter the received code"></Input>

				<Button className="button button--primary">Confirm</Button>				
			</Column>
		</Page>
	  )
  }