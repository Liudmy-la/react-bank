import "./index.css";

import React, { useState, useCallback } from 'react';

import Page from "../../component/page";
import Column from "../../component/column";
import Button from "../../component/button";
import Input from "../../component/input";
import Opthead from "../../component/option-heading";

interface ChildProps {
	children: React.ReactNode;
	onCreate?: any;
	placeholder?: any;
	button?: any;
	transactionId?: any;
	value?: any;
	type?:any;
	amount?:any;
	recipient?:any;
}
  
export default function Component({
	children, 
	onCreate, 
	amount,
	recipient,
	transactionId = null
}: ChildProps):React.ReactElement {
	
	// const [amount, setAmount] = useState("");
	// const [recipient, setRecipient] = useState("");

	const convertData = JSON.stringify({
		amount,
		recipient,
		transactionId,
	});

	const sendData = useCallback(async () => {
		try {
			const res = await fetch(`http://localhost:4000/transaction${transactionId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: convertData,
			});

			const data = await res.json();

			if (res.ok) {
				if (onCreate) onCreate();				
				return data;

				} else {
					console.error('Error:', data.message);
       				throw new Error(data.message);
				}

		} catch (error: any) {
			console.error('Fetch Error:', error.message);
      		throw new Error('Failed to send data.');
		}
	}, [convertData, onCreate, transactionId]);


	const handleSubmit = useCallback(() => {
		if (amount.length === 0 || recipient.length === 0) return null;
		return sendData();
	}, [sendData, amount, recipient])

	return (
		<Page>			
			<Column className="column--20">  			
				<Opthead  backTo="/balance" title="Send"></Opthead>			
				<form>
					<Column className="column--20"> 
						 <Input 
						 	label="Email" 
							message="" 
							placeholder="Enter the recipient's email" 
							type="email" 
							value={recipient}
							// action={setRecipient}
						></Input>
						 <Input 
						 	label="Sum" 
							message="" 
							placeholder="Enter amount" 
							type="text" 
							value={amount}
							// action={setAmount}
						></Input>

						<Button 
							onClick={() => handleSubmit()} 
							className="button button--primary"
						>Send</Button>
					{/* {newTransaction ? <Location to={`/transaction/${newTransaction.transactionId}`} /> : <Infofield error />}		 */}

					</Column>
				</form>
			</Column>
			<div className="action-image"></div>
		</Page>
	  )
  }