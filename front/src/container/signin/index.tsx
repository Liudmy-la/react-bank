import "./index.css";

import React from 'react';
import { Link } from 'react-router-dom';
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
		<Page>			
			<Column className="column--20">  						
				<Heading  backTo="/"  title="Sign in" comment="Select login method"></Heading>

				<form>
					<Column className="column--20"> 
						 <Input label = "Email" message = "" placeholder = "example@mail.com"></Input>
						 <Input label = "Password" className="appear" message = "" placeholder = "* * * * * * * *"></Input>

						<div className="">
							Forgot your password?
							<Link to="/recovery"> Restore</Link>
						</div>
						<Button className="button button--primary">Continue</Button>
					</Column>
				</form>
			
			</Column>
		</Page>
	  )
  }