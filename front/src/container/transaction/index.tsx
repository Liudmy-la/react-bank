import "./index.css";

import React, { useState, useEffect } from 'react';
import Page from "../../component/page";
import Column from "../../component/column";
import Opthead from "../../component/option-heading";
import Divider from "../../component/divider";

interface ChildProps {
	children: React.ReactNode;
	id?: number;
}

interface TransactionInfo {
	transactionId: number;
	amount: number;
	date: string;
	source: string;
	type: string;
  }
  
export default function Component({children, id}: ChildProps):React.ReactElement {
	const [data, setData] = useState<TransactionInfo | null>(null);
	
	const getData = async () => {
		try {
		  const res = await fetch(`http://localhost:4000/transaction?id=${id}`);

		  if (!res.ok) {
			throw new Error(`Error fetching data`);
		  }

		  const result = await res.json();
		  setData(result.info);
		} catch (error) {			
			  console.error('Error fetching data from the server:', error);
		}
	  };

	useEffect(() => {	
		getData();
	  }, []);

	
	  return (
		<Page className="actions">
			<Column className="column--20">  						
				<Opthead  backTo="/balance" title={`Transaction: ${data?.transactionId}`}></Opthead>

				<div className="amount-title">
					{data?.type === 'send' ? `- $ ${data?.amount}` : `+ $ ${data?.amount}`}
				</div>

				<div className="info__card">
					<Column className="column--16">
						<div className="info__line">
							<div>Date: </div>
							<div>{data?.date}</div>
						</div>
						<Divider />
						<div className="info__line">
							<div>Source: </div>
							<div>{data?.source.toUpperCase()}</div>
						</div>
						<Divider />
						<div className="info__line">
							<div>Type: </div>
							<div>{data?.type}</div>
						</div>
					</Column>	
				</div>	
			</Column>	
			<div className="action-image"></div>
		</Page>
	  )
  }