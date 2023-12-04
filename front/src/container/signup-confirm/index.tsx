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
				<Heading  backTo="/signup" title="Confirm account" comment="Write the code you received"></Heading>

				<form>
					<Column className="column--20"> 
						 <Input label = "Code" message = "" placeholder = "Enter the received code"></Input>
						<Button className="button button--primary">Confirm</Button>		
					</Column>
				</form>		
			</Column>
		</Page>
	  )
  }