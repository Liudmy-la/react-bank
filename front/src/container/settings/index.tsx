import "./index.css";

import React from 'react';
import Page from "../../component/page";
import Column from "../../component/column";
import Button from "../../component/button";
import Input from "../../component/input";
import Opthead from "../../component/option-heading";
import Divider from "../../component/divider";
import { useNavigate } from "react-router-dom";

interface ChildProps {
	children: React.ReactNode;
}
  
export default function Component({children}: ChildProps):React.ReactElement {
	const navigate = useNavigate();
	const onClick = () => {
		navigate("/");
	}

	  return (
		<Page className="" style = {{}}>			
			<Column className="column--20" style = {{}}>  						
				<Opthead backTo="balance" className="" style = {{}} title="Settings"></Opthead>

				<Column className="column--12">
					<div className="subtitle">Change email</div>
					<Input label = "Email" message = "" placeholder = "example@mail.com"></Input>
					<Input label = "Password" className="appear" message = "" placeholder = "* * * * * * * *"></Input>

					<Button className="button button--primary button--outline">Save Email</Button>
				</Column>

				<Divider/>

				<Column className="column--12">
					<div className="subtitle">Change password</div>
					<Input label = "Old Password" className="appear" message = "" placeholder = "* * * * * * * *"></Input>
					<Input label = "New password" className="appear" message = "" placeholder = "* * * * * * * *"></Input>
					
					<Button className="button button--primary button--outline">Save Password</Button>
				</Column>

				<Divider/>
				
				<Button onClick={onClick} className="button button--primary button--outline button--alarm">Log out</Button>
				
			</Column>
		</Page>
	  )
  }