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
			<Heading backTo="recovery" style = {{}} title="Recover password" comment="Write the code you received"></Heading>

				<Input label = "Code" message = "" placeholder = "Enter the received code"></Input>
				<Input label = "New password" className="appear" message = "" placeholder = "* * * * * * * *"></Input>

				<Button className="button button--primary">Restore password</Button>				
			</Column>
		</Page>
	  )
  }