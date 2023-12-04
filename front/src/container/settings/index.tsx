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
		<Page>			
			<Column className="column--20">  						
				<Opthead  backTo="/balance" title="Settings"></Opthead>

				<form>
					<Column className="column--12">
						<div className="subtitle">Change email</div>
						 <Input label = "Email" message = "" placeholder = "example@mail.com"></Input>
						 <Input label = "Password" className="appear" message = "" placeholder = "* * * * * * * *"></Input>

						<Button className="button button--primary button--outline">Save Email</Button>
					</Column>
				</form>

				<Divider/>

				<form>
					<Column className="column--12">
						<div className="subtitle">Change password</div>
						 <Input label = "Old Password" className="appear" message = "" placeholder = "* * * * * * * *"></Input>
						 <Input label = "New password" className="appear" message = "" placeholder = "* * * * * * * *"></Input>
						
						<Button className="button button--primary button--outline">Save Password</Button>
					</Column>
				</form>

				<Divider/>
				
				<Button onClick={onClick} className="button button--primary button--outline button--alarm">Log out</Button>
				
			</Column>
		</Page>
	  )
  }