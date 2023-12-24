import "./index.css";

import React, { useState } from 'react';
import Page from "../../component/page";
import Column from "../../component/column";
import Button from "../../component/button";
import Input from "../../component/input";
import Opthead from "../../component/option-heading";
import Divider from "../../component/divider";

import {
	REG_EXP_EMAIL,
	REG_EXP_PASSWORD,
	FIELD_ERROR
} from '../../util/form';

interface ChildProps {
	children: React.ReactNode;
}
  
export default function Component({children}: ChildProps):React.ReactElement {
	const [email, setEmail] = useState<string>('');
	const [passwordConf, setPasswordConf] = useState<string>('');
	const [passwordOld, setPasswordOld] = useState<string>('');
	const [passwordNew, setPasswordNew] = useState<string>('');
	const [messageE, setMessageE] = useState<string>('');
	const [messagePC, setMessagePC] = useState<string>('');
	const [messagePO, setMessagePO] = useState<string>('');
	const [messagePN, setMessagePN] = useState<string>('');
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const validate = (type: string, value: string) => {
		if (String(value).trim().length < 1) {
			return FIELD_ERROR.IS_EMPTY
		}
	
		if (String(value).trim().length > 30) {
		  return FIELD_ERROR.IS_BIG
		}
	
		if (type === 'email' && !REG_EXP_EMAIL.test(String(value))) {
			return FIELD_ERROR.EMAIL;
		}
	  
		if (type === 'password' && !REG_EXP_PASSWORD.test(String(value))) {
			return FIELD_ERROR.PASSWORD;
		}

		return '';
	};

	const handleMailInput = (e: any) => {
		const errorMessage = validate('email', e.target.value);
		e.target.message = setMessageE(errorMessage);
		e.target.style.borderColor = errorMessage ? 'rgb(217, 43, 73)' : '';
		setEmail(e.target.value);
	}

	const handlePassConfInput = (e:any) =>  {		
		const errorMessage = validate('password', e.target.value);
		e.target.message = setMessagePC(errorMessage);
		e.target.style.borderColor = errorMessage ? 'rgb(217, 43, 73)' : '';
		setPasswordConf(e.target.value);
	}

	const handlePassOldInput = (e:any) =>  {		
		const errorMessage = validate('password', e.target.value);
		e.target.message = setMessagePO(errorMessage);
		e.target.style.borderColor = errorMessage ? 'rgb(217, 43, 73)' : '';
		setPasswordOld(e.target.value);
	}

	const handlePassNewInput = (e:any) =>  {		
		const errorMessage = validate('password', e.target.value);
		e.target.message = setMessagePN(errorMessage);
		e.target.style.borderColor = errorMessage ? 'rgb(217, 43, 73)' : '';
		setPasswordNew(e.target.value);
	}

	const handleNewEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const emailError = validate('email', email);
		const passwordError = validate('password', passwordConf);

		if (emailError || passwordError) {
			setMessagePC(passwordError)
			setMessageE('Please fix the error before submitting.');
			return;
		}
		
		const id = JSON.parse(window.localStorage.sessionAuth).user.userId

		const convertData = JSON.stringify({currentData:passwordConf, typeNewData:'email', newData:email, customerId:id})

		try {
			const res = await fetch('http://localhost:4000/settings', {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: convertData,
			})

			const data = await res.json()

			if (!res.ok) {
				if (data.field) {
					setMessagePC(data.message);
				} 
				return;
			}
					
			const move = window.confirm("Are You Sure?")
			if (move) {
				window.location.assign("/balance");
			}
			
		} catch(err: any) {
			console.error(`Fetching error`, err.message)
		}
	}

	const handleNewPassSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const passOldError = validate('password', passwordOld);
		const passNewError = validate('password', passwordNew);

		if (passOldError || passNewError) {
			setMessagePO(passOldError);
			setMessagePN('Please fix the errors before submitting.');
			return;
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

			if (!res.ok) {
				if (data.field) {
					setMessagePO(data.message);
				} 
				return;
			}
					
			const move = window.confirm("Are You Sure?")
			if (move) {
				window.location.assign("/balance");
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
		setShowPassword((prevShowPassword) => !prevShowPassword);
	};

	return (
		<Page>			
			<Column className="column--20">  						
				<Opthead  backTo="/balance" title="Settings"></Opthead>

				<form method="POST" onSubmit={handleNewEmailSubmit}>
					<Column className="column--12">
						<div className="subtitle">Change email</div>
							<Input
								onInput={handleMailInput}
								label="NEW Email"
								message={messageE}
								placeholder="Enter your NEW Email address"
								type="email"
								value={email}
							></Input>
							<Input
								onInput={handlePassConfInput}
								label="Current Password"
								className="appear"
								message={messagePC}
								placeholder="* * * * * * * *"
								type="password"
								value={passwordConf}
							
								showPassword={showPassword}
								onPassVisibility={handlePassVisibility}
							></Input>

						<Button
							type="submit"
							className="button button--primary button--outline"
						>
							Save New Email
						</Button>
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
								message={messagePO}
								placeholder = "* * * * * * * *"
								type="password"
								value={passwordOld}
							
								showPassword={showPassword}
								onPassVisibility={handlePassVisibility}
							></Input>
							<Input
								onInput={handlePassNewInput}
								label="NEW password"
								className="appear"
								message={messagePN}
								placeholder="Enter your NEW password"
								type="password"
								value={passwordNew}
							
								showPassword={showPassword}
								onPassVisibility={handlePassVisibility}
							></Input>
						
						<Button
							type="submit"
							className="button button--primary button--outline"
						>
								Save New Password
						</Button>
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