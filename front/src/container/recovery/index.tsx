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
		<Page>			
			<Column className="column--20">  						
				<Heading  backTo="/signin" title="Recover password" comment="Choose a recovery method"></Heading>

				<form>
					<Column className="column--20"> 
						 <Input label = "Email" message = "" placeholder = "example@mail.com"></Input>
						<Button className="button button--primary">Send code</Button>
					</Column>
				</form>
			</Column>
		</Page>
	  )
  }