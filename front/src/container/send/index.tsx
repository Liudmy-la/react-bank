import "./index.css";

import React, { useState } from 'react';

import Page from "../../component/page";
import Column from "../../component/column";
import Button from "../../component/button";
import Input from "../../component/input";
import Opthead from "../../component/option-heading";
import Infofield from "../../component/info-field";

import {FIELD_ERROR} from '../../util/form';

interface ChildProps {
	children?: React.ReactNode;
}
  
export default function Component({children}: ChildProps):React.ReactElement {
	type Data = number | string

	const [amount, setAmount] = useState<Data>('');
	const [source, setSource] = useState<Data>('');
	const [messageE, setMessageE] = useState<string>('');
	const [messageS, setMessageS] = useState<string>('');
	const [messageD, setMessageD] = useState<string>('');	

	const validate = (value: string) => {
		if (String(value).length < 1) {
			return FIELD_ERROR.IS_EMPTY
		}
	}
	
	const handleSumInput = (e: any) => {
		if (!!validate(e.target.value)) {
			e.target.message = setMessageS(validate(e.target.value) || '')
			e.target.style.borderColor ='rgb(217, 43, 73)'
		}
		setAmount(e.target.value)
	}

	const handleEmailInput = (e:any) => {
		if (!!validate(e.target.value)) {
			e.target.message = setMessageE(validate(e.target.value) || '')
			e.target.style.borderColor ='rgb(217, 43, 73)'
		}
		setSource(e.target.value)
	} 
	
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const data = {amount, source, type: "send"};
		const convertData = JSON.stringify(data);

		try {
			const res = await fetch('http://localhost:4000/send', {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: convertData,
			})

			const data = await res.json()

			if (res.ok) {		
				const move = window.confirm("Are You Sure?")

				if (move) {
					window.location.assign(`http://localhost:3000/transaction/${data.newTransaction.transactionId}`);
				}
			} else {
				const errorData = data || {}; 
				setMessageD(errorData.message || 'An error occurred.');
			}
			
		} catch(err: any) {
			console.error(err.message)
		}
	}
	
	return (
		<Page>			
			<Column className="column--20">  			
				<Opthead  backTo="/balance" title="Send"></Opthead>			
				
				<form method="POST" onSubmit={handleSubmit}>
					<Column className="column--20"> 
						 <Input 
						 	onInput={handleEmailInput}
						 	label="Email"
							message={messageE} 
							placeholder="Enter the recipient's email" 
							type="email" 
							value={source}
						></Input>
						 <Input
						 	onInput={handleSumInput}
						 	label="Sum" 
							message={messageS} 
							placeholder="Enter amount" 
							type="number" 
							value={amount}
						></Input>

						<Button 
							type="submit"
							className="button button--primary"
						>
							Send
						</Button>

						<Infofield
								className={`field--warn ${messageD}disabled`}
							>
								{messageD}
						</Infofield>

					</Column>
				</form>
			</Column>
			<div className="action-image"></div>
		</Page>
	  )
  }