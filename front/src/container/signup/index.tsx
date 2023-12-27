import "./index.css"; 

import React, { useReducer } from 'react';
import { Link } from 'react-router-dom';

import Page from "../../component/page";
import Heading from "../../component/heading";
import Column from "../../component/column";
import Button from "../../component/button";
import Input from "../../component/input";
import Infofield from "../../component/info-field";
  
import { saveSession } from '../../util/session';
import {validate, initialState, SET, reducer } from '../../util/form';

interface ChildProps {
	children: React.ReactNode;
};
  
export default function Component ({children}: ChildProps):React.ReactElement {
	const [state, dispatch] = useReducer(reducer, initialState);
	
	const handleMailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const errorMessage = validate(e.target.value, 'email');
		dispatch({ type: SET.SET_EMAIL, payload: e.target.value });
		dispatch({ type: SET.SET_MESSAGE_E, payload: errorMessage });
	}

	const handlePassInput = (e: React.ChangeEvent<HTMLInputElement>) =>  {		
		const errorMessage = validate(e.target.value,'password');
		dispatch({ type: SET.SET_PASSWORD, payload: e.target.value });
		dispatch({ type: SET.SET_MESSAGE_P, payload: errorMessage });
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		const { email, password } = state;

		const emailError = validate(email, 'email');
		const passwordError = validate(password, 'password');

		if (emailError || passwordError) {
			dispatch({ type: SET.SET_MESSAGE_DATA, payload: 'Please fix the errors before submitting.' });
			return;
		}
		const convertData = JSON.stringify({email, password})

		try {
			const res = await fetch('http://localhost:4000/signup', {
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
			} else if (!res.ok && data.field === 'password') {
				dispatch({ type: SET.SET_MESSAGE_P, payload: data.message });
				return;
			} else if (res.ok) {					
				saveSession(data.initSession);
				window.location.assign("/signup-confirm");
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
				<Heading  backTo="/" title="Sign up" comment="Choose a registration method"></Heading>

				<form method="POST" onSubmit={handleSubmit}>
					<Column className="column--20"> 
						<Input
							onInput={handleMailInput}
							label="Email"
							placeholder="Enter Your Email"							
							message={state.messageE}
							type="email"
							value={state.email}
							style={{ borderColor: state.messageE ? 'rgb(217, 43, 73)' : '' }} 
						></Input>
						<Input
							onInput={handlePassInput}
							label="Password"
							message={state.messageP}
							placeholder="Enter Your Password"
							type="password"
							value={state.password}
							style={{ borderColor: state.messageP ? 'rgb(217, 43, 73)' : '' }} 

							showPassword={state.showPassword}
							onPassVisibility={handlePassVisibility}
						></Input>

						<div>
							Already have an account? 
							<Link to="/signin"> Sign In</Link>
						</div>

						<Button
							type="submit"
							className="button button--primary"
						>
							Continue
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