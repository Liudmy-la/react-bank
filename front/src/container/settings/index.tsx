import "./index.css";

import React, { useReducer, useState } from 'react';
import Page from "../../component/page";
import Column from "../../component/column";
import Button from "../../component/button";
import Input from "../../component/input";
import Opthead from "../../component/option-heading";
import Divider from "../../component/divider";
import Infofield from "../../component/info-field";

import {validate, initialState, SET, reducer } from '../../util/form';

interface ChildProps {
	children: React.ReactNode;
}
  
export default function Component({children}: ChildProps):React.ReactElement {	
	const [state, dispatch] = useReducer(reducer, initialState);
	const [activeForm, setActiveForm] = useState('');

	const handleMailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const errorMessage = validate(e.target.value, 'email');
		dispatch({ type: SET.SET_EMAIL, payload: e.target.value });
		dispatch({ type: SET.SET_MESSAGE_E, payload: errorMessage });
	}

	const handlePassConfInput = (e: React.ChangeEvent<HTMLInputElement>) =>  {		
		const errorMessage = validate(e.target.value);
		dispatch({ type: SET.SET_PASSWORD, payload: e.target.value });
		dispatch({ type: SET.SET_MESSAGE_P, payload: errorMessage });
	}

	const handlePassOldInput = (e: React.ChangeEvent<HTMLInputElement>) =>  {		
		const errorMessage = validate(e.target.value);
		dispatch({ type: SET.SET_PASSWORD_OLD, payload: e.target.value });
		dispatch({ type: SET.SET_MESSAGE_PASS_OLD, payload: errorMessage });
	}

	const handlePassNewInput = (e: React.ChangeEvent<HTMLInputElement>) =>  {		
		const errorMessage = validate(e.target.value,'password');
		dispatch({ type: SET.SET_PASSWORD_NEW, payload: e.target.value });
		dispatch({ type: SET.SET_MESSAGE_PASS_NEW, payload: errorMessage });
	}

	const handleNewEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setActiveForm('email');
		
		const { email, password } = state;

			const emailError = validate(email, 'email');
			const passwordError = validate(password);

			if (!email || emailError || !password || passwordError) {
				dispatch({ type: SET.SET_MESSAGE_DATA, payload: `Enter the correct data!` });
			}
		
		const id = JSON.parse(window.localStorage.sessionAuth).user.userId

		const convertData = JSON.stringify({currentData:password, typeNewData:'email', newData:email, customerId:id})

		try {
			const res = await fetch('http://localhost:4000/settings', {
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
			} else if (!res.ok && data.field === 'password') {
				dispatch({ type: SET.SET_MESSAGE_P, payload: data.message });
				return;
			} else if (res.ok) {	
				const move = window.confirm("Are You Sure?")
				if (move) {
					window.location.assign("/balance");
				}
			}
		} catch(err: any) {
			console.error(`Fetching error`, err.message)
		}
	}

	const handleNewPassSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setActiveForm('password');

		const { passwordOld, passwordNew } = state;

			const passOldError = validate(passwordOld);
			const passNewError = validate(passwordNew, 'password');

			if (!passwordOld || passOldError || !passwordNew || passNewError) {
				dispatch({ type: SET.SET_MESSAGE_DATA, payload: `Enter the correct data!` });
			}
		
		
		const id = JSON.parse(window.localStorage.sessionAuth).user.userId
		const convertData = JSON.stringify({currentData:passwordOld, typeNewData:'password', newData:passwordNew, customerId:id})

		try {
			const res = await fetch('http://localhost:4000/settings', {
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
			} else if (!res.ok && data.field === 'password') {
				dispatch({ type: SET.SET_MESSAGE_P, payload: data.message });
				return;
			} else if (res.ok){	
				const move = window.confirm("Are You Sure?")
				if (move) {
					window.location.assign("/balance");
				}
			}
		} catch(err: any) {
			console.error(err.message)
		}
	}

	const handleLogoutClick = () => {
		const move = window.confirm("Are You Sure?")

		if (move) {
			window.localStorage.clear();
			window.location.href = '/';
		}
	}
	const handlePassVisibility = () => {
		dispatch({ type: SET.TOGGLE_VISIBILITY });
	};

	return (
		<Page>			
			<Column className="column--20 settings-box">  						
				<Opthead  backTo="/balance" title="Settings"></Opthead>

				<form method="POST" onSubmit={handleNewEmailSubmit}>
					<Column className="column--12">
						<div className="subtitle">Change email</div>
							<Input
								onInput={handleMailInput}
								label="NEW Email"
								message={state.messageE}
								placeholder="Enter your NEW Email address"
								type="email"
								value={state.email}
							></Input>
							<Input
								onInput={handlePassConfInput}
								label="Current Password"
								className="appear"
								message={state.messageP}
								placeholder="* * * * * * * *"
								type="password"
								value={state.password}
							
								showPassword={state.showPassword}
								onPassVisibility={handlePassVisibility}
							></Input>

						<Button
							type="submit"
							className="button button--primary button--outline"
						>
							Save New Email
						</Button>

						{
							activeForm === 'email' && (						
								<Infofield
										className={`field--warn ${state.messageData}disabled`}
									>
										{state.messageData}
								</Infofield>
							)
						}
					</Column>
				</form>

				<Divider/>

				<form method="POST" onSubmit={handleNewPassSubmit}>
					<Column className="column--12">
						<div className="subtitle">Change password</div>
							<Input
								onInput={handlePassOldInput}
						 		label="Current Password"
								className="appear"
								message={state.messagePO}
								placeholder = "* * * * * * * *"
								type="password"
								value={state.passwordOld}
							
								showPassword={state.showPassword}
								onPassVisibility={handlePassVisibility}
							></Input>
							<Input
								onInput={handlePassNewInput}
								label="NEW password"
								className="appear"
								message={state.messagePN}
								placeholder="Enter your NEW password"
								type="password"
								value={state.passwordNew}
							
								showPassword={state.showPassword}
								onPassVisibility={handlePassVisibility}
							></Input>
						
						<Button
							type="submit"
							className="button button--primary button--outline"
						>
								Save New Password
						</Button>
					
						{
							activeForm === 'password' && (						
								<Infofield
										className={`field--warn ${state.messageData}disabled`}
									>
										{state.messageData}
								</Infofield>
							)
						}
					</Column>
				</form>

				<Divider/>
				
				<Button 
					onClick={handleLogoutClick}
					className="button button--primary button--outline button--alarm"
				>
					Log OUT
				</Button>
				
			</Column>
		</Page>
	  )
  }