import "./index.css";

import React from 'react';
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
}
  
export default function Component({children, className = "", style = {}, itemtitle = '', info = '', details = ''}: ChildProps):React.ReactElement {
	  return (
		<Page className="" style = {{}}>
			<Column className="column--20" style = {{}}>  						
				<div className="head__block">
					<div className='icon-button sett'></div>
					<div className="wallet" style={{...style}}>Main wallet</div>
					<div className='icon-button nott'></div>
				</div>

				<div className="amount-title--white">$100.20</div>

				<div className="actions__block">
					<div className="icon-button button--main receive"></div>
					<div className="icon-button button--main send"></div>
				</div>
				
				<Column className="column--1">
					<Listitem className = "stripe" style = {{}} itemtitle = 'Stripe' info='200' details='12:20'></Listitem>
					<Listitem className = "owner" style = {{}} itemtitle = 'Oleg V.' info='300' details='12:50'></Listitem>
					<Listitem className = "coinbase" style = {{}} itemtitle = 'Coinbase' info='400' details='05:15'></Listitem>
				</Column>	
				
			</Column>				
			<div className="main-image--short"></div>
			
		</Page>
	  )
  }