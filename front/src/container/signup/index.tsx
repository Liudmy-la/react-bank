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
	const [email, setEmail] = useState('')	
	const [password, setPassword] = useState('')
	const [messageE, setMessageE] = useState('')
	const [messageP, setMessageP] = useState('')

	const validate = (type: string, value: string) => {
		if (String(value).length < 1) {
			return FIELD_ERROR.IS_EMPTY
		}
	
		if (String(value).length > 20) {
		  return FIELD_ERROR.IS_BIG
		}
	
		if (type === email) {
			if (!REG_EXP_EMAIL.test(String(value)))
				return FIELD_ERROR.EMAIL
		}
	
		if (type === password) {
			if (!REG_EXP_PASSWORD.test(String(value)))
				return FIELD_ERROR.PASSWORD
		}
	};
		
	const handleMailInput = (e: any) => {
		if (!!validate(e.target.type, e.target.value)) {
			e.target.message = setMessageE(validate(e.target.type, e.target.value) || '')
			e.target.style.borderColor ='rgb(217, 43, 73)'
		}
		
		setEmail(e.target.value)
	}

	const handlePassInput = (e:any) =>  {
		if (!!validate(e.target.type, e.target.value)) {
			e.target.message = setMessageP(validate(e.target.type, e.target.value) || '')
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
			const res = await fetch('http://localhost:4000/signup', {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: convertData(),
			})

			const data = await res.json()

			if (res.ok) {		
				saveSession(data.session)		
				window.location.assign("/signup-confirm")
			}
		} catch(err: any) {
			console.error(err.message)
		}
	}

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
							className="disappear"
							message={messageP}
							placeholder="Enter Your Password"
							type="password"
							value={password}
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

						<Infofield className="infofield field--warn disabled">
							A user with the same name is already exist
						</Infofield>
					</Column>
				</form>
			</Column>
		</Page>
	  )
  }

