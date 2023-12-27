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

	const handleCodeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const errorMessage = validate(e.target.value);
		dispatch({ type: SET.SET_CODE, payload: e.target.value });
		dispatch({ type: SET.SET_MESSAGE_CODE, payload: errorMessage });
	}

	const handlePassInput = (e:any) =>  {		
		const errorMessage = validate(e.target.value,'password');
		dispatch({ type: SET.SET_PASSWORD, payload: e.target.value });
		dispatch({ type: SET.SET_MESSAGE_P, payload: errorMessage });
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		
		const { code, password } = state;

		const codeError = validate(code);
		const passwordError = validate(password, 'password');

		if (codeError || passwordError) {
			dispatch({ type: SET.SET_MESSAGE_DATA, payload: 'Please fix the errors before submitting.' });
			return;
		}

		const convertData = JSON.stringify({code, password, getInfo:window.navigator.userAgent})
		
		try {
			const res = await fetch('http://localhost:4000/recovery-confirm', {
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
				window.location.assign("/signin")
			}
		} catch(err: any) {
			console.error(err.message)
		}
	}

	const handlePassVisibility = () => {
		dispatch({ type: SET.TOGGLE_VISIBILITY });
	};
	
	return (
		<Page>			
			<Column className="column--20">  						
				<Heading
					backTo="/recovery"
					title="Recover password"
					comment="Write the code you received"
				></Heading>

				<form method="POST" onSubmit={handleSubmit}>
					<Column className="column--20"> 
						<Input
							onInput={handleCodeInput}
						 	label="Code"
							message={state.messageCode}
							placeholder="Enter the received code"
							type="text"
							value={state.code}
							style={{ borderColor: state.messageCode ? 'rgb(217, 43, 73)' : '' }} 
						></Input>

						<Input						
							onInput={handlePassInput}
							label="New password"
							message={state.messageP}
							placeholder="Enter NEW Password"
							type="password"
							value={state.password}
							style={{ borderColor: state.messageP ? 'rgb(217, 43, 73)' : '' }} 
							
							showPassword={state.showPassword}
							onPassVisibility={handlePassVisibility}
						></Input>

						<Button
							type="submit"
							className="button button--primary"
						>
							Restore password
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