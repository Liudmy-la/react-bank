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
				<Heading className="back" style = {{}} title="Sign in" comment="Select login method"></Heading>

				<Input label = "Email" message = "" placeholder = "example@mail.com"></Input>
				<Input label = "Password" className="appear" style = {{borderColor: 'rgb(217, 43, 73)', color: 'rgb(217, 43, 73)'}} message = "Sorry, the password is not correct" placeholder = "* * * * * * * *"></Input>

				<div className="">
					Forgot your password?
					<span className="link"> Restore </span>
				</div>
				<Button className="button button--primary unavailable">Continue</Button>
			
			</Column>
		</Page>
	  )
  }