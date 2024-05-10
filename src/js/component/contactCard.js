import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import {faLocationDot, faPhone, faEnvelope} from "@fortawesome/free-solid-svg-icons";
import "../../styles/index.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ModalDelete } from "../component/modalDelete.js";


export const ContactCard = ({ contact, setModal }) => {

	const { store, actions } = useContext(Context)


	const navigate = useNavigate()

	return (
		<>
		<div className="card m-3">
			<div className="card-body m-0">
				<div className="edit-button">
					<span className="edit me-5" onClick={() => {actions.seeContact(contact)
						navigate("/editcontact")}}><i className="fas fa-pen"/></span>
					<span className="delete" onClick={() => {actions.setContactToDelete(contact)
					setModal({show:"block"})}}><i className="fas fa-trash"/></span>
				</div>
				<img src="https://picsum.photos/200" alt="random-img" />
				<div className="description">
					<h4 className="card-title">{contact?.name}</h4>
					<h6 className="location-text mb-2 text-body-secondary"><i className="fas fa-map-marker-alt" /> {contact?.address}</h6>
					<h6 className="phone-text"><i className="fas fa-phone" /> {contact?.phone}</h6>
					<h6 className="email-text"><i className="fas fa-envelope" /> {contact?.email}</h6>
				</div>
			</div>
		</div>	
	</>
	);
};