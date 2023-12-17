import "./index.css";

import React, { useState } from 'react';
import Page from "../../component/page";
import Heading from "../../component/heading";
import Column from "../../component/column";
import Button from "../../component/button";
import Input from "../../component/input";

import {FIELD_ERROR} from '../../util/form';

interface ChildProps {
	children: React.ReactNode;	
}
  
export default function Component({children}: ChildProps):React.ReactElement {
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')

	const validate = (value: string) => {
		if (String(value).length < 1) {
			return FIELD_ERROR.IS_EMPTY
		}
	}

	const handleCodeInput = (e: any) => {
		if (!!validate(e.target.value)) {
			e.target.message = setMessage(validate(e.target.value) || '')
			e.target.style.borderColor ='rgb(217, 43, 73)'
		}
		
		setEmail(e.target.value)
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const convertData = () => {
			return JSON.stringify({email})
		}		

		try {
			const res = await fetch('http://localhost:4000/recovery', {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: convertData(),
			})

			const data = await res.json()
			if (!res.ok && data.field) {
				setMessage(data.message); 
				return;
			}
		
			window.location.assign("/recovery-confirm");
			
		} catch(err: any) {
			console.error(err.message)
		}
	}
	
	return (
		<Page>			
			<Column className="column--20">  						
				<Heading
					backTo="/signin"
					title="Recover password"
					comment="Recover with your email"
				></Heading>

				<form method="POST" onSubmit={handleSubmit}>
					<Column className="column--20"> 
						<Input
							onInput={handleCodeInput}
							label="Email"
							message={message}
							placeholder="example@mail.com"
							type="text"
							value={email}
						/>
						
						<Button
							type="submit"
							className="button button--primary"
						>
							Send code
						</Button>

					</Column>
				</form>
			</Column>
		</Page>
	  )
  }