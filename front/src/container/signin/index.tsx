import "./index.css";

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Page from "../../component/page";
import Heading from "../../component/heading";
import Column from "../../component/column";
import Button from "../../component/button";
import Input from "../../component/input";

import { saveSession } from "../../util/session";
import {FIELD_ERROR} from '../../util/form';

interface ChildProps {
	children: React.ReactNode;
}
  
export default function Component({children}: ChildProps):React.ReactElement {
	const [email, setEmail] = useState<string>('')	
	const [password, setPassword] = useState<string>('');
	const [messageE, setMessageE] = useState<string>('');
	const [messageP, setMessageP] = useState<string>('');
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const validate = (value: string) => {
		if (String(value).length < 1) {
			return FIELD_ERROR.IS_EMPTY
		}
	}
	
	const handleMailInput = (e: any) => { 
		if (!!validate(e.target.value)) {
			e.target.message = setMessageE(validate(e.target.value) || '')
			e.target.style.borderColor ='rgb(217, 43, 73)'
		}

		setEmail(e.target.value)
	}

	const handlePassInput = (e:any) => {
		if (!!validate(e.target.value)) {
			e.target.message = setMessageP(validate(e.target.value) || '')
			e.target.style.borderColor ='rgb(217, 43, 73)'
		}

		setPassword(e.target.value)
	}
	
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const convertData = () => {
			return JSON.stringify({email, password})
		}

		try {
			const res = await fetch('http://localhost:4000/signin', {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: convertData(),
				});
				
			const data = await res.json()
			if (!res.ok && data.field === 'email') {
				setMessageE(data.message); 
				return;
			} else if (!res.ok && data.field === 'password') {
				setMessageP(data.message); 
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
		setShowPassword((prevShowPassword) => !prevShowPassword);
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
							message={messageE}
							placeholder="Enter Your Email"
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
					</Column>
				</form>
			
			</Column>
		</Page>
	  )
  }