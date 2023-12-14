import "./index.css";

import React, { useState } from 'react';
import Page from "../../component/page";
import Heading from "../../component/heading";
import Column from "../../component/column";
import Button from "../../component/button";
import Input from "../../component/input";

import {
	FIELD_ERROR
} from '../../util/form';
import { getTokenSession, saveSession } from "../../util/session";

interface ChildProps {
	children: React.ReactNode;
}
  
export default function Component({children}: ChildProps):React.ReactElement {
	const [code, setCode] = useState('')
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
		
		setCode(e.target.value)
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const convertData = () => {
			return JSON.stringify({code, token: getTokenSession()})
		}		

		try {
			const res = await fetch('http://localhost:4000/signup-confirm', {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: convertData(),
			})

			const data = await res.json()

			if (res.ok) {		
				saveSession(data.session)		
				window.location.assign("/balance")
			}
		} catch(err: any) {
			console.error(err.message)
		}
	}

	  return (
		<Page>			
			<Column className="column--20">  						
				<Heading backTo="/signup" title="Confirm account" comment="Write the code you received"></Heading>

				<form method="POST" onSubmit={handleSubmit}>
					<Column className="column--20"> 
						<Input
						onInput={handleCodeInput}
							label="Code"
							placeholder="Enter the received code"
							message={message}
							type="text"
							value={code}
						></Input>

						<Button
							type="submit"
							className="button button--primary"
						>
							Confirm
						</Button>		
					</Column>
				</form>		
			</Column>
		</Page>
	  )
  }