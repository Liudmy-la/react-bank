import "./index.css";

import React from 'react';
import Page from "../../component/page";
import Column from "../../component/column";
import Input from "../../component/input";
import Opthead from "../../component/option-heading";
import Divider from "../../component/divider";
import Listitem from "../../component/divider";

interface ChildProps {
	children: React.ReactNode;
}
  
export default function Component({children}: ChildProps):React.ReactElement {
	  return (
		<Page className="" style = {{}}>			
			<Column className="column--20" style = {{}}>  						
				<Opthead className="" style = {{}} title="Settings"></Opthead>

				<Column className="column--12">
					<div className="subtitle">Receive amount</div>
					<Input label = "" message = "" placeholder = " $ "></Input>
				</Column>

				<Divider/>

				<Column className="column--12">
					<div className="subtitle">Payment system</div>
					<Listitem></Listitem>
					<Listitem></Listitem>
				</Column>				
				
			</Column>
		</Page>
	  )
  }