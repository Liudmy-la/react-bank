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
	
	const getData = async () => {
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

	useEffect(() => {	
		getData();
	  }, []);

	const handleItemClick = (id:number) => async () => {
			await fetch(`http://localhost:4000/transaction?id=${id}`);

			window.location.assign(`http://localhost:3000/transaction/${id}`);
	}

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
							<React.Fragment key={trans.id}>
								<Listitem
									onItemClick={handleItemClick(trans.id)}
									
									className={trans.type === 'send' ? `owner ${trans.source}` : trans.source}
									itemtitle={trans.source.toUpperCase()}
									info={trans.type === 'send' ? `- $ ${trans.amount}` : `+ $ ${trans.amount}`}
									details={trans.date}
								></Listitem>
							</React.Fragment>
						))
						: <Infofield> You have no completed transactions yet.</Infofield>
					}
					
				</Column>	
				
			</Column>				
			<div className="main-image--short"></div>
			
		</Page>
	  )
  }