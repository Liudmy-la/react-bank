import "./index.css";

import React, { useState, useEffect } from 'react';
import Page from "../../component/page";
import Column from "../../component/column";
import Opthead from "../../component/option-heading";
import Divider from "../../component/divider";

interface ChildProps {
	children: React.ReactNode;
}
  
export default function Component({children}: ChildProps):React.ReactElement {
	const [data, setData] = useState<Record<string, any> | null>(null);

	useEffect(() => {
		const fetchData = async () => {
		  try {
			const res = await fetch('http://localhost:4000/transaction');
			if (!res.ok) {
			  throw new Error(`Error fetching data`);
			}

			const data = await res.json();
			setData(data);
		  } catch (error) {			
				console.error('Error fetching data from the server.');
		  }
		};
	
		fetchData();
	  }, []);

	
	  return (
		<Page className="actions">
			<Column className="column--20">  						
				<Opthead  backTo="/balance" title={`Transaction: ${data?.info.transactionId}`}></Opthead>

				<div className="amount-title">
					{data?.info.type === 'send' ? `- $ ${data?.info.amount}` : `+ $ ${data?.info.amount}`}
				</div>

				<div className="info__card">
					<Column className="column--16">
						<div className="info__line">
							<div>Date: </div>
							<div>{data?.info.date}</div>
						</div>
						<Divider />
						<div className="info__line">
							<div>Source: </div>
							<div>{data?.info.source.toUpperCase()}</div>
						</div>
						<Divider />
						<div className="info__line">
							<div>Type: </div>
							<div>{data?.info.type}</div>
						</div>
					</Column>	
				</div>	
			</Column>	
			<div className="action-image"></div>
		</Page>
	  )
  }