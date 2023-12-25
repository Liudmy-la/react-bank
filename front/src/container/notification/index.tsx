import "./index.css";

import React, { useEffect, useState } from 'react';
import Page from "../../component/page";
import Column from "../../component/column";
import Opthead from "../../component/option-heading";
import Listitem from "../../component/list-item";
import Infofield from "../../component/info-field";

interface ChildProps {
	children: React.ReactNode;
}
  
export default function Component({children}: ChildProps):React.ReactElement {
	const [data, setData] = useState<any[] | null[]>([]);

	const getData = async () => {
		try {
		  const res = await fetch('http://localhost:4000/notifications');
		  if (!res.ok) {
			throw new Error(`Error fetching data`);
		  }

		  const data = await res.json();
		  setData(data);
		} catch (error) {			
			  console.error('Error fetching data from the server.');
		}
	};

	useEffect(() => {	
		getData();
	  }, []);

	const formatTimeDifference = (startTime: number, endTime: number): string => {
		const timeDifference = endTime - startTime;
		const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
		const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
	
		if (days < 1) {
			if (hours < 1) {
				return `${minutes} min`;
			}
			return `${hours} h ${minutes} min`;
		} else {
			return `${days} d ${hours} h ${minutes} min`;
		}	
	};

	const handleItemClick = (id:number) => async () => {
		try {
			const res = await fetch(`http://localhost:4000/notifications/update?id=${id}`);
			if (!res.ok) {
				throw new Error('Error updating ifUnread.');
			}
		
			getData();
			} catch (error) {
			  console.error('Error handling item click:', error);
			}
	}

	  return (
		<Page className="actions" style = {{}}>
			<Column className="column--20" style = {{}}>  						
				<Opthead  backTo="/balance" className="" style = {{}} title="Notifications"></Opthead>
				<Column className="column--12">
					<Column className="column--12 note-list">
						{data?.length !== 0
							? data
							.slice() 
							.sort((a, b) => b.notificationId - a.notificationId)
							.map((note) => (
								<React.Fragment key={note.notificationId}>
									<Listitem		
										onItemClick={handleItemClick(note.notificationId)}						
										className={note.action === `notification` ? `notification` : `warn`}
										style={{
											...(note.ifUnread === false ? {} : { border: `8px solid rgba(217, 43, 73, 0.5)`, borderRadius: `50%` }),
										  }}
										itemtitle={`New ${note.action.toUpperCase()} by ${note.name}`}
										info=''
										details={formatTimeDifference(note.date, new Date().getTime())}
										noteInfo={note.info}
									></Listitem>
								</React.Fragment>
							))
							: <Infofield> You have no notifications yet.</Infofield>
						}
					</Column>
					
				</Column>		
			</Column>	
		</Page>
	  )
  }