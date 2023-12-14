import "./index.css";

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Page from "../../component/page";
import Column from "../../component/column";
import Listitem from "../../component/list-item";

interface ChildProps {
	children?: React.ReactNode;
}

interface Data {
	balance: number; 
	list: any[]; 
	notifications: string;
  }
  
export default function Component({children}: ChildProps):React.ReactElement {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(`/transaction:{{transactionId}}`);
	}

	const [data, setData] = useState<Data | null>(null)

	useEffect (() => {
		fetch ('/balance', {method: 'GET'})
			.then((response) => response.json())
			.then((json) => setData(json as Data))
			.catch((error) => console.error('Error fetching data:', error));
	}, [])

	return (
		<Page className="">
			<Column className="column--20">  						
				<div className="head__block">
					<Link to="/settings">
						<div className='icon-button sett'></div>
					</Link>
					<div className="wallet">Main wallet</div>
					<Link to="/notifications">
						<div className='icon-button nott'></div>
					</Link>
				</div>

				<div className="amount-title--white">
				{data ? data.balance : 'Calculating ...'}
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
					<Listitem onClick={handleClick} className = "stripe" itemtitle = 'Stripe' info='200' details='12:20'></Listitem>
					<Listitem onClick={handleClick} className = "owner" itemtitle = 'Oleg V.' info='300' details='12:50'></Listitem>
					<Listitem onClick={handleClick} className = "coinbase" itemtitle = 'Coinbase' info='400' details='05:15'></Listitem>
				</Column>	
				
			</Column>				
			<div className="main-image--short"></div>
			
		</Page>
	  )
  }