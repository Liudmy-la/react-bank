import "./index.css";

import React, { useState } from 'react';
import Page from "../../component/page";
import Column from "../../component/column";
import Input from "../../component/input";
import Opthead from "../../component/option-heading";
import Divider from "../../component/divider";
import Listitem from "../../component/list-item";

import {FIELD_ERROR} from '../../util/form';

interface ChildProps {
	children: React.ReactNode;
}
  
export default function Component({children}: ChildProps):React.ReactElement {
	type Data = number | string | null

	const [amount, setAmount] = useState<Data>('')	
	const [message, setMessage] = useState('')

	const validate = (value: string) => {
		if (String(value).length < 1) {
			return FIELD_ERROR.IS_EMPTY
		}
	}
	
	const handleSumInput = (e: any) => {
		if (!!validate(e.target.value)) {
			e.target.message = setMessage(validate(e.target.value) || '')
			e.target.style.borderColor ='rgb(217, 43, 73)'
		}
		setAmount(e.target.value)
	}

	const handleItemClick = async (source: string) => {
	  
		const data = {amount, source, type: "receive"};
		const convertData = JSON.stringify(data);

		try {
			const res = await fetch('http://localhost:4000/receive', {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: convertData,
			})

			const data = await res.json()

			if (res.ok) {		
				// window.location.assign(`/transaction/${data.newTransaction.transactionId}`);
				window.location.assign(`/transaction`);
			}
			
		} catch(err: any) {
			console.error(err.message)
		}
	}

	  return (
		<Page className="actions">			
			<Column className="column--20">  						
				<Opthead  backTo="/balance" title="Receive"></Opthead>				
					<Column className="column--20"> 
						<Column className="column--8">
							<div className="subtitle">Receive amount</div>							
							<Input
								onInput={handleSumInput}
								label="" 
								message={message} 
								placeholder="Enter amount" 
								type="number" 
								value={amount}
							></Input>
						</Column>

						<Divider/>

						<Column className="column--12">
							<div className="subtitle">Payment system</div>
							<Listitem
								className="stripe" 
								style = {{backgroundImage: `url("../../../svg/group-icons-1.svg")`, width:'160px', height:'20px', zIndex: '2'}} 
								itemtitle='Stripe'
								onItemClick={() => handleItemClick('Stripe')}
								info=''
							></Listitem>
							<Listitem 
								className="coinbase" 
								style = {{backgroundImage: `url("../../../svg/group-icons-2.svg")`, width:'160px', height:'20px', zIndex: '2'}} 
								itemtitle='Coinbase'
								onItemClick={() => handleItemClick('Coinbase')}
								info=''
							></Listitem>
						{/* {newTransaction ? <Location to={`/transaction/${newTransaction.id}`} /> : <Infofield error />}		 */}
						</Column>				
				
						</Column>
			</Column>
			<div className="action-image"></div>
		</Page>
	  )
  }
