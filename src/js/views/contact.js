import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/index.css";
import { Link } from "react-router-dom";
import { ContactCard } from "../component/contactCard.js";
import { ModalDelete } from "../component/modalDelete.js";

export const Contact = () => {

	const [state,setState] = useState({
		show: "none"
	})

	const { store, actions } = useContext(Context)

	useEffect(() => {
		actions.getAllContacts()
	}, [])

	return (
		<div>
			<div className="boton-contact">
				<Link to="/addcontact">
					
					<button className="btn btn-success">Add new contact</button>
				</Link>
			</div>
			{
				store.contacts && store.contacts.length > 0 && store.contacts.map((contact) => {
					return (
						
						<div key={contact.id}>
							<ContactCard contact={contact} setModal={setState}/> 
							<ModalDelete setModal={setState}stateModal={state}contact={contact}/>
						</div>
					)
				})
			}
		</div>
	);
};