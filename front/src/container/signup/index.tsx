import "./index.css";

import React from 'react';
import { Link } from 'react-router-dom';
import Page from "../../component/page";
import Heading from "../../component/heading";
import Column from "../../component/column";
import Button from "../../component/button";
import Input from "../../component/input";
import Infofield from "../../component/info-field";

interface ChildProps {
	children: React.ReactNode;
	
	action?: any;
	onClick?: any;
	type?: any;
} 
  
export default function Component({children, action}: ChildProps):React.ReactElement {
	  return (
		<Page className="" style = {{}}>			
			<Column className="column--20" style = {{}}>  						
				<Heading backTo="" title="Sign up" comment="Choose a registration method"></Heading>

				<Input action="signupForm.change" label="Email" type="email" placeholder="Put Your Email" message = ""></Input>
				<Input action="signupForm.change" label="Password" className="disappear" message = "" placeholder="Put Your Password"></Input>

				<div>
					Already have an account? 
					<Link to="/signin"> Sign In</Link>
				</div>
				<Button onClick="signupForm.submit()" type="button" className="button button--primary" >Continue</Button>

				<Infofield className="infofield field--warn">A user with the same name is already exist</Infofield>
				
			</Column>
		</Page>
	  )
  }