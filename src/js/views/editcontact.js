import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const EditContact = () => {

    const { store, actions } = useContext(Context)
    const [contact, setContact] = useState(store.contact)
    const handleChange = (event) => {
        console.log(event);
        setContact({ ...contact, [event.target.name]: event.target.value })
    }
    const navigate = useNavigate()
    console.log(store.contact);

    function handleSubmit(e) {
        e.preventDefault()
        const config = {
            method: 'PUT',
            body: JSON.stringify(contact),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(`https://playground.4geeks.com/contact/agendas/marta992/contacts/${contact.id}`, config)
            .then((response) => response.json())
            .then((data) => {
                actions.getAllContacts()
                navigate("/")
            })
            .catch((error) => console.log(error))
    }

    return (
        <div className="form">
            <h1 className="title">Add a new contact</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputName" className="form-label"> Full name</label>
                    <input type="text" name="name" className="form-control" id="exampleInputName" aria-describedby="nameHelp" placeholder="Full name" value={contact.name} onChange={(e) => handleChange(e)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={contact.email} onChange={(e) => handleChange(e)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPhone" className="form-label">Phone</label>
                    <input type="phone" name="phone" className="form-control" id="exampleInputPhone" placeholder="Enter phone" value={contact.phone} onChange={(e) => handleChange(e)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputAddress" className="form-label">Address</label>
                    <input type="text" name="address" className="form-control" id="exampleInputAddress" aria-describedby="addressHelp" placeholder="Enter address" value={contact.address} onChange={(e) => handleChange(e)} />
                </div>
                <button type="submit" className="save btn btn-primary">save</button>

            </form>
            <Link to="/">
                <span className="mb-0 h5">or get back to contacts</span>
            </Link>
        </div>
    );
};