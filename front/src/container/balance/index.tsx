import "./index.css";

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Page from "../../component/page";
import Column from "../../component/column";
import Listitem from "../../component/list-item";

interface ChildProps {
	children?: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
	itemtitle?: string;
	details?: string;
	info?: any;
	transactionId?: number | string;
}
  
export default function Component({children, className = "", style = {}, itemtitle = '', info = '', details = '', transactionId='transactionId'}: ChildProps):React.ReactElement {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/transaction/${transactionId}`);
	}

	return (
		<Page className="" style = {{}}>
			<Column className="column--20" style = {{}}>  						
				<div className="head__block">
					<Link to="/settings">
						<div className='icon-button sett'></div>
					</Link>
					<div className="wallet" style={{...style}}>Main wallet</div>
					<Link to="/notifications">
						<div className='icon-button nott'></div>
					</Link>
				</div>

				<div className="amount-title--white">$100.20</div>

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