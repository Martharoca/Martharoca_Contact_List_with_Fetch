const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: { // ESTADOS globales
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			contacts: [],
			contact: {},
			contactToDelete: {}
		},
		actions: { // FUNCIONES globales
			seeContact: (contact) => {
				setStore({
					contact: contact
				})
			},
			createContact: (contact) => {
				fetch("https://playground.4geeks.com/contact/agendas/marta992/contacts", {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"name": contact.name,
						"phone": contact.phone,
						"email": contact.email,
						"address": contact.address
					})
				})
					.then((response) => response.json())
					.then((data) => {
						if (data.ok) {
							getActions().getAllContacts()
						}
					})
					.catch((error) => console.log(error))
			},
			createUser:  () => {
				fetch('https://playground.4geeks.com/contact/agendas/marta992', {
					method: 'POST',
					body: JSON.stringify(""),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then((response) => response.json())
					.then((data) => console.log(data))
					.catch((error) => console.log(error))
			},
			getAllContacts: () => {
				fetch('https://playground.4geeks.com/contact/agendas/marta992/contacts',{
					method: 'GET',
				})
				.then((response) => {
					console.log(response);
					if (response.status === 404) {
							getActions().createUser()
						}
					return response.json()
				})
				.then((data) => setStore({ contacts: data.contacts }))
				.catch((error) => console.log(error))
			},
			setContactToDelete: (contact) => {
			setStore({contactToDelete:contact})
			},
			deleteContact: (id) => {
			 	fetch('https://playground.4geeks.com/contact/agendas/marta992/contacts/${id}', {
			 		method: 'DELETE',
			 		headers: {
			 		"Content-Type": "application/json"
			 		}
			 	})
			 	.then((response) => {
			 		setStore({contacts: getStore().contacts.filter((contact)=> contact.id !== id)	
					});
				})
			 	.then((data) => {
			 	getAllContacts();
			 	console.log(data);})
			 	.catch((error)=> {
			 		console.log(error)})
			 	},
			 //},
			editContact:  (fullName, email, address, phone, id) => {
				fetch('https://playground.4geeks.com/contact/agendas/marta992/contacts/'+id, {
					method:'PUT',
					body: JSON.stringify(
						{
							"name": fullName,
							"email": email,
							"address": address,
							"phone": phone
						}
					),
					headers: {
						"Content-Type": "application/json"
					}
				})
				.then((response)=> {
					return response.json()
				})
				.then((data)=> {
					console.log(data);
				})
				.catch((error)=>{
					console.log(error)}
				)
		}
	}
	};
};

export default getState;
