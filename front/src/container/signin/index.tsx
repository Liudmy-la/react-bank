import "./index.css";

import React, { useReducer } from 'react';
import { Link } from 'react-router-dom';

import Page from "../../component/page";
import Heading from "../../component/heading";
import Column from "../../component/column";
import Button from "../../component/button";
import Input from "../../component/input";
import Infofield from "../../component/info-field";

import { saveSession } from "../../util/session";
import {validate, initialState, SET, reducer } from '../../util/form';

interface ChildProps {
	children: React.ReactNode;
}

export default function Component({children}: ChildProps):React.ReactElement {
	const [state, dispatch] = useReducer(reducer, initialState);
	
	const handleMailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const errorMessage = validate(e.target.value);
		dispatch({ type: SET.SET_EMAIL, payload: e.target.value });
		dispatch({ type: SET.SET_MESSAGE_E, payload: errorMessage });
	  };
	
	  const handlePassInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const errorMessage = validate(e.target.value);
		dispatch({ type: SET.SET_PASSWORD, payload: e.target.value });
		dispatch({ type: SET.SET_MESSAGE_P, payload: errorMessage });
	  };
	
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const { email, password } = state;
		const convertData = JSON.stringify({email, password, getInfo:window.navigator.userAgent})
		
		try {
			const res = await fetch('http://localhost:4000/signin', {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: convertData,
				});
				
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
				saveSession(data.session);
				window.location.assign("/balance");
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
				<Heading  backTo="/"  title="Sign in" comment="Select login method"></Heading>

				<form method="POST" onSubmit={handleSubmit}>
					<Column className="column--20"> 
						<Input
							onInput={handleMailInput}
						 	label="Email"
							message={state.messageE}
							placeholder="Enter Your Email"
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

						<div className="">
							Forgot your password?
							<Link to="/recovery"> Restore</Link>
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