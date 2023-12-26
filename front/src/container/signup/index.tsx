import "./index.css";

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Page from "../../component/page";
import Heading from "../../component/heading";
import Column from "../../component/column";
import Button from "../../component/button";
import Input from "../../component/input";
import Infofield from "../../component/info-field";

import {
	REG_EXP_EMAIL,
	REG_EXP_PASSWORD,
	FIELD_ERROR
} from '../../util/form';
  
import { saveSession } from '../../util/session';

interface ChildProps {
	children: React.ReactNode;
};
  
export default function Component ({children}: ChildProps):React.ReactElement {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [messageE, setMessageE] = useState<string>('');
	const [messageP, setMessageP] = useState<string>('');
	const [messageD, setMessageD] = useState<string>('');	
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

	const handlePassInput = (e:any) =>  {		
		const errorMessage = validate('password', e.target.value);
		e.target.message = setMessageP(errorMessage);
		e.target.style.borderColor = errorMessage ? 'rgb(217, 43, 73)' : '';
		setPassword(e.target.value);
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const emailError = validate('email', email);
		const passwordError = validate('password', password);

		if (emailError || passwordError) {
			setMessageE(emailError);
			setMessageP(passwordError);
			setMessageD('Please fix the errors before submitting.');
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

			if (!res.ok) {
				if (data.field) {
					setMessageP(data.message);
				} 
				return;
			}
					
			saveSession(data.initSession);
			window.location.assign("/signup-confirm");
			
			
		} catch(err: any) {
			console.error(err.message)
		}
	}

	const handlePassVisibility = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
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
							message={messageE}
							type="email"
							value={email}
						></Input>
						<Input
							onInput={handlePassInput}
							label="Password"
							message={messageP}
							placeholder="Enter Your Password"
							type="password"
							value={password}
							
							showPassword={showPassword}
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
								className={`field--warn ${messageD}disabled`}
							>
								{messageD}
						</Infofield>
												
						{/* <Infofield
								className={`field--warn ${state.messageD}disabled`}
							>
								{state.messageD}
						</Infofield> */}

					</Column>
				</form>
			</Column>
		</Page>
	  )
  }