import "./index.css";

import React from 'react';
import Page from "../../component/page";
import Heading from "../../component/heading";
import Column from "../../component/column";
import Button from "../../component/button";
import Input from "../../component/input";
import Infofield from "../../component/info-field";

interface ChildProps {
	children: React.ReactNode;
}
  
export default function Component({children}: ChildProps):React.ReactElement {
	  return (
		<Page className="" style = {{}}>			
			<Column className="column--20" style = {{}}>  						
				<Heading className="back" style = {{}} title="Sign up" comment="Choose a registration method"></Heading>

				<Input label = "Email" message = "" placeholder = "example@mail.com"></Input>
				<Input label = "Password" className="disappear" message = "" placeholder = "* * * * * * * *"></Input>

				<div className="">
					Already have an account?
					<span className="link"> Sign In</span>
				</div>
				<Button className="button button--primary">Continue</Button>

				<Infofield>A user with the same name is already exist</Infofield>
				
			</Column>
		</Page>
	  )
  }