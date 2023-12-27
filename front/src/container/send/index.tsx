import "./index.css";

import React, { useReducer } from 'react';

import Page from "../../component/page";
import Column from "../../component/column";
import Button from "../../component/button";
import Input from "../../component/input";
import Opthead from "../../component/option-heading";
import Infofield from "../../component/info-field";

import {validate, initialState, SET, reducer } from '../../util/form';

interface ChildProps {
	children?: React.ReactNode;
}
  
export default function Component({children}: ChildProps):React.ReactElement {
	const [state, dispatch] = useReducer(reducer, initialState);

	const handleSumInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const errorMessage = validate(e.target.value);
		dispatch({ type: SET.SET_AMOUNT, payload: e.target.value });
		dispatch({ type: SET.SET_MESSAGE_SUM, payload: errorMessage });
	}

	const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const errorMessage = validate(e.target.value);
		dispatch({ type: SET.SET_SOURCE, payload: e.target.value });
		dispatch({ type: SET.SET_MESSAGE_SOURCE, payload: errorMessage });
	}
	
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const { amount, source } = state;
		if (!amount || !source) {
			dispatch({ type: SET.SET_MESSAGE_DATA, payload: 'Fill in all fields!' });
			return;
		}  

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

			if (!res.ok && data.field === 'data') {				
				dispatch({ type: SET.SET_MESSAGE_DATA, payload: data.message });
				return;
			} else if (res.ok) {
				const move = window.confirm("Are You Sure?")

				if (move) {
					window.location.assign(`http://localhost:3000/transaction/${data.newTransaction.transactionId}`);
				}
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
						 	label="Email or Username"
							message={state.messageE} 
							placeholder="Enter the recipient" 
							type="text" 
							value={state.source}
							style={{ borderColor: state.messageE ? 'rgb(217, 43, 73)' : '' }} 
						></Input>
						 <Input
						 	onInput={handleSumInput}
						 	label="Sum" 
							message={state.messageSum} 
							placeholder="Enter amount" 
							type="number" 
							value={state.amount}
							style={{ borderColor: state.messageSum ? 'rgb(217, 43, 73)' : '' }} 
						></Input>

						<Button 
							type="submit"
							className="button button--primary"
						>
							Send
						</Button>

						<Infofield
								className={`field--warn ${state.messageData}disabled`}
							>
								{state.messageData}
						</Infofield>

					</Column>
				</form>
			</Column>
			<div className="action-image"></div>
		</Page>
	  )
  }