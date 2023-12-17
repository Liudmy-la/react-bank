import "./index.css";

import React, { useState } from 'react';
import Page from "../../component/page";
import Heading from "../../component/heading";
import Column from "../../component/column";
import Button from "../../component/button";
import Input from "../../component/input";

import {
	REG_EXP_PASSWORD,
	FIELD_ERROR
} from '../../util/form';
  
interface ChildProps {
	children: React.ReactNode;
}
  
export default function Component({children}: ChildProps):React.ReactElement {
	const [code, setCode] = useState('')	
	const [password, setPassword] = useState('')
	const [messageC, setMessageC] = useState('')
	const [messageP, setMessageP] = useState('')

	const validate = (type: string, value: string) => {
		if (String(value).length < 1) {
			return FIELD_ERROR.IS_EMPTY
		}
	
		if (String(value).length > 20) {
		  return FIELD_ERROR.IS_BIG
		}
		
		if (type === password) {
			if (!REG_EXP_PASSWORD.test(String(value)))
				return FIELD_ERROR.PASSWORD
		}
	};

	const handleCodeInput = (e: any) => {
		if (!!validate(e.target.type, e.target.value)) {
			e.target.message = setMessageC(validate(e.target.type, e.target.value) || '')
			e.target.style.borderColor ='rgb(217, 43, 73)'
		}
		
		setCode(e.target.value)
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
			return JSON.stringify({code, password})
		}		

		try {
			const res = await fetch('http://localhost:4000/recovery-confirm', {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: convertData(),
			})

			const data = await res.json()
			if (!res.ok && data.field) {
				setMessageC(data.message); 
				return;
			}

			window.location.assign("/signin")
			
		} catch(err: any) {
			console.error(err.message)
		}
	}
	
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
							message={messageC}
							placeholder="Enter the received code"
							type="text"
							value={code}
						></Input>

						<Input						
							onInput={handlePassInput}
							label="New password"
							className="appear"
							message={messageP}
							placeholder="Enter NEW Password"
							type="password"
							value={password}
						></Input>

						<Button
							type="submit"
							className="button button--primary"
						>
							Restore password
						</Button>	
					</Column>
				</form>			
			</Column>
		</Page>
	  )
  }