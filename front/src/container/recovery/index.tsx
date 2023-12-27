import "./index.css";

import React, { useReducer } from 'react';
import Page from "../../component/page";
import Heading from "../../component/heading";
import Column from "../../component/column";
import Button from "../../component/button";
import Input from "../../component/input";
import Infofield from "../../component/info-field";

import {validate, initialState, SET, reducer } from '../../util/form';

interface ChildProps {
	children: React.ReactNode;	
}
  
export default function Component({children}: ChildProps):React.ReactElement {
	const [state, dispatch] = useReducer(reducer, initialState);

	const handleMailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const errorMessage = validate(e.target.value, 'email');
		dispatch({ type: SET.SET_EMAIL, payload: e.target.value });
		dispatch({ type: SET.SET_MESSAGE_E, payload: errorMessage });
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const { email } = state;
		const convertData = JSON.stringify({email})

		try {
			const res = await fetch('http://localhost:4000/recovery', {
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
			} else if (!res.ok && data.field === 'email') {
				dispatch({ type: SET.SET_MESSAGE_E, payload: data.message });
				return;
			} else if (res.ok) {
				window.location.assign("/recovery-confirm");
			}
		} catch(err: any) {
			console.error(err.message)
		}
	}
	
	return (
		<Page>			
			<Column className="column--20">  						
				<Heading
					backTo="/signin"
					title="Recover password"
					comment="Recover with your email"
				></Heading>

				<form method="POST" onSubmit={handleSubmit}>
					<Column className="column--20"> 
						<Input
							onInput={handleMailInput}
							label="Email"
							message={state.messageE}
							placeholder="Enter your Email"
							type="email"
							value={state.email}
							style={{ borderColor: state.messageE ? 'rgb(217, 43, 73)' : '' }} 
						/>
						
						<Button
							type="submit"
							className="button button--primary"
						>
							Send code
						</Button>

						<Infofield
								className={`field--warn ${state.messageData}disabled`}
							>
								{state.messageData}
						</Infofield>

					</Column>
				</form>
			</Column>
		</Page>
	  )
  }