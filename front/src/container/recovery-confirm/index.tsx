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
		<Page className="" >			
			<Column className="column--20">  						
				<Heading  backTo="/recovery" title="Recover password" comment="Write the code you received"></Heading>

				<form>
					<Column className="column--20"> 
						 <Input label = "Code" message = "" placeholder = "Enter the received code"></Input>
						 <Input label = "New password" className="appear" message = "" placeholder = "* * * * * * * *"></Input>

						<Button className="button button--primary">Restore password</Button>	
					</Column>
				</form>			
			</Column>
		</Page>
	  )
  }