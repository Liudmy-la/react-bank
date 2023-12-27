import "./index.css";

import React, { useReducer } from 'react';
import Page from "../../component/page";
import Column from "../../component/column";
import Input from "../../component/input";
import Opthead from "../../component/option-heading";
import Divider from "../../component/divider";
import Listitem from "../../component/list-item";
import Infofield from "../../component/info-field";

import {validate, initialState, SET, reducer } from '../../util/form';

interface ChildProps {
	children: React.ReactNode;
}
  
export default function Component({children}: ChildProps):React.ReactElement {
	const [state, dispatch] = useReducer(reducer, initialState);
	
	const handleSumInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const errorMessage = validate(e.target.value);
		dispatch({ type: SET.SET_AMOUNT, payload: e.target.value });
		dispatch({ type: SET.SET_MESSAGE_SUM, payload: errorMessage });
	}

	const handleItemClick = async (source: string) => {
	  
		const { amount } = state;
		if (!amount) {
			dispatch({ type: SET.SET_MESSAGE_SUM, payload: 'Enter the required amount.' });
			return;
		}

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
		<Page className="actions">			
			<Column className="column--20">  						
				<Opthead  backTo="/balance" title="Receive"></Opthead>				
					<Column className="column--20"> 
						<Column className="column--8">
							<div className="subtitle">Receive amount</div>							
							<Input
								onInput={handleSumInput}
								label="" 
								message={state.messageSum} 
								placeholder="Enter amount" 
								type="number" 
								value={state.amount}
								style={{ borderColor: state.messageSum ? 'rgb(217, 43, 73)' : '' }} 
							></Input>
						
							<Infofield
										className={`field--warn ${state.messageData}disabled`}
									>
										{state.messageData}
							</Infofield>
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
						</Column>	
					</Column>
			</Column>
			<div className="action-image"></div>
		</Page>
	  )
  }
