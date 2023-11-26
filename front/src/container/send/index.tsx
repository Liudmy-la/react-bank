import "./index.css";

import React from 'react';
import Page from "../../component/page";
import Column from "../../component/column";
import Button from "../../component/button";
import Input from "../../component/input";
import Opthead from "../../component/option-heading";

interface ChildProps {
	children: React.ReactNode;
}
  
export default function Component({children}: ChildProps):React.ReactElement {
	  return (
		<Page className="" style = {{}}>			
			<Column className="column--20" style = {{}}>  			
				<Opthead className="" style = {{}} title="Send"></Opthead>			

				<Input label = "Email" message = "" placeholder = "example@mail.com"></Input>
				<Input label = "Sum" message = "" placeholder = "Enter amount"></Input>

				<Button className="button button--primary">Send</Button>				
			</Column>
			<div className="overlay-image"></div>
		</Page>
	  )
  }