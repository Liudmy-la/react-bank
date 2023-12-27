import "./index.css";

import React, { useReducer } from 'react';
import Page from "../../component/page";
import Heading from "../../component/heading";
import Column from "../../component/column";
import Button from "../../component/button";
import Input from "../../component/input";
import Infofield from "../../component/info-field";

import {validate, initialState, SET, reducer } from '../../util/form';
import { getTokenSession, saveSession } from "../../util/session";

interface ChildProps {
	children: React.ReactNode;
}
  
export default function Component({children}: ChildProps):React.ReactElement {
	const [state, dispatch] = useReducer(reducer, initialState);

	const handleCodeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const errorMessage = validate(e.target.value);
		dispatch({ type: SET.SET_CODE, payload: e.target.value });
		dispatch({ type: SET.SET_MESSAGE_CODE, payload: errorMessage });
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const { code } = state;

		if (!code) {			
			dispatch({ type: SET.SET_MESSAGE_CODE, payload: `Enter your code!` });
			return;
		}

		const convertData = JSON.stringify({code, token: getTokenSession(), getInfo:window.navigator.userAgent})
			
		try {
			const res = await fetch('http://localhost:4000/signup-confirm', {
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
				saveSession(data.session)		
				window.location.assign("/balance")
			}
		} catch(err: any) {
			console.error(err.message)
		}
	}

	  return (
		<Page>			
			<Column className="column--20">  						
				<Heading backTo="/signup" title="Confirm account" comment="Write the code you received"></Heading>

				<form method="POST" onSubmit={handleSubmit}>
					<Column className="column--20"> 
						<Input
						onInput={handleCodeInput}
							label="Code"
							placeholder="Enter the received code"
							message={state.messageCode}
							type="text"
							value={state.code}
							style={{ borderColor: state.messageCode ? 'rgb(217, 43, 73)' : '' }} 
							></Input>

						<Button
							type="submit"
							className="button button--primary"
						>
							Confirm
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