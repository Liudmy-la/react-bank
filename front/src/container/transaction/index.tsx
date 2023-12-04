import "./index.css";

import React from 'react';
import Page from "../../component/page";
import Column from "../../component/column";
import Opthead from "../../component/option-heading";
import Divider from "../../component/divider";

interface ChildProps {
	children: React.ReactNode;
	transactionId: any;
}
  
export default function Component({children, transactionId}: ChildProps):React.ReactElement {
	  return (
		<Page className="actions" style = {{}}>
			<Column className="column--20" style = {{}}>  						
				<Opthead  backTo="/balance" className="" style = {{}} title={`Transaction: ${transactionId}`}></Opthead>

				<div className="amount-title">$100.20</div>

				<div className="info__card">
					<Column className="column--16">
						<div className="info__line">
							<div>Date</div>
							<div>25 May, 15:20</div>
						</div>
						<Divider />
						<div className="info__line">
							<div>Address</div>
							<div>user123@mail.com</div>
						</div>
						<Divider />
						<div className="info__line">
							<div>Type</div>
							<div>Recive</div>
						</div>
					</Column>	
				</div>	
			</Column>	
			<div className="action-image"></div>
		</Page>
	  )
  }