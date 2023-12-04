import "./index.css";

import React from 'react';
import Page from "../../component/page";
import Column from "../../component/column";
import Input from "../../component/input";
import Opthead from "../../component/option-heading";
import Divider from "../../component/divider";
import Listitem from "../../component/list-item";

interface ChildProps {
	children: React.ReactNode;
}
  
export default function Component({children}: ChildProps):React.ReactElement {
	  return (
		<Page className="actions">			
			<Column className="column--20">  						
				<Opthead  backTo="/balance" title="Receive"></Opthead>
				
				<form>
					<Column className="column--20"> 

						<Column className="column--8">
							<div className="subtitle">Receive amount</div>
							 <Input
							 	label = "" 
								message = "" 
								placeholder = " $ "
							></Input>
						</Column>

						<Divider/>

						<Column className="column--12">
							<div className="subtitle">Payment system</div>
							<Listitem
								className="stripe" 
								style = {{backgroundImage: `url("../../../svg/group-icons-1.svg")`, width:'160px', height:'20px', zIndex: '2'}} 
								itemtitle='Stripe' 
								info=''
							></Listitem>
							<Listitem 
								className="coinbase" 
								style = {{backgroundImage: `url("../../../svg/group-icons-2.svg")`, width:'160px', height:'20px', zIndex: '2'}} 
								itemtitle='Coinbase' 
								info=''
							></Listitem>
						{/* {newTransaction ? <Location to={`/transaction/${newTransaction.id}`} /> : <Infofield error />}		 */}
						</Column>				
				
						</Column>
				</form>
			</Column>
			<div className="action-image"></div>
		</Page>
	  )
  }
