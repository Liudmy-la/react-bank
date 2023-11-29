import "./index.css";

import React from 'react';
import Page from "../../component/page";
import Column from "../../component/column";
import Opthead from "../../component/option-heading";
import Listitem from "../../component/list-item";

interface ChildProps {
	children: React.ReactNode;
}
  
export default function Component({children}: ChildProps):React.ReactElement {
	  return (
		<Page className="actions" style = {{}}>
			<Column className="column--20" style = {{}}>  						
				<Opthead className="" style = {{}} title="Notifications"></Opthead>
				<Column className="column--12 notifications">
					<Listitem className="notification" style = {{}} itemtitle='New reward system' info='' details='10 min'></Listitem>
					<Listitem className="warn" style = {{}} itemtitle='New login' info=''details='15 min'></Listitem>
					
					<Listitem className="" style = {{}} itemtitle='New reward system' info='' details=''></Listitem>
					<Listitem className="" style = {{}} itemtitle='New login' info=''></Listitem>
				</Column>		
			</Column>	
		</Page>
	  )
  }