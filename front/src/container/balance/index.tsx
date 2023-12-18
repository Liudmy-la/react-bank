import "./index.css";

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Page from "../../component/page";
import Column from "../../component/column";
import Listitem from "../../component/list-item";
import Infofield from "../../component/info-field";

interface ChildProps {
	children?: React.ReactNode;
}

interface Data {
	balance: number | string; 
	list: any[] | null[]; 
	notifications: string;
  }
  
export default function Component({children}: ChildProps):React.ReactElement {
	const [data, setData] = useState<Data | null>(null);	

	useEffect(() => {
		const fetchData = async () => {
		  try {
			const res = await fetch('http://localhost:4000/balance');
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
		<Page>
			<Column className="column--20">  						
				<div className="head__block">
					<Link to="/settings">
						<div className='icon-button sett'></div>
					</Link>
					<div className="wallet">Main wallet</div>
					<Link to="/notifications">
						<div className='icon-button nott'>{`+${data?.notifications}` || ' 0'}</div>
					</Link>
				</div>

				<div className="amount-title--white">
				{`$ ${data?.balance}` || 'Calculating ...'}
				</div>

				<div className="actions__block">
					<Link to="/receive">
						<div className="icon-button button--main receive"></div>
					</Link>
					<Link to="/send">
						<div className="icon-button button--main send"></div>
					</Link>
				</div>
				
				<Column className="column--1">

					{data?.list.length !== 0
						? data?.list.map((trans) => (
							<Listitem
								key={trans.id}
								onItemClick={
									async (transactionId: number) => {
										await fetch(`http://localhost:4000/transaction?id=${trans.id}`);
										window.location.assign(`/transaction?id=${trans.id}`);
									}
								}
								className={trans.type === 'send' ? `owner ${trans.source}` : trans.source}
								itemtitle={trans.source.toUpperCase()}
								info={trans.type === 'send' ? `- $ ${trans.amount}` : `+ $ ${trans.amount}`}
								details={trans.date}
							></Listitem>
							
						))
						: <Infofield> You have no completed transactions yet.</Infofield>
					}
					
				</Column>	
				
			</Column>				
			<div className="main-image--short"></div>
			
		</Page>
	  )
  }