import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

export default function Invite({ token, setToken, email, setEmail }) {
    const params = useParams();
    const [open, setOpen] = useState(false);
    const [formInput, setFormInput] = useState({ documentId: "" });
    const [response, setResponse ] = useState(null);
    console.log(params);
    async function inviteUser() {
        const data = {
            documentId: formInput.documentId,
            email: email,
            permission: true,
        }
        let requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }
        let response = await fetch('https://jsramverk-editor-rilr20a.azurewebsites.net/docs/invite', requestOptions)
        console.log(response);
        setResponse(response)
        setOpen(true);
        setTimeout(() => setOpen(false), 5000);
    }
    return (
        <div className='container'>
            {!token ?
                <p>you need to be logged in to see this page</p>
                :
                <div>
                    <h1>You receive invite codes in emails</h1>
                    <div className='form'>
                        <div className='input'>
                            <label for="invitecode">Invite Code</label>
                            <input className='invitecode' id="invitecode" placeholder='invite code' name="invitecode" onChange={(e) => { setFormInput({ ...formInput, documentId: e.target.value }) }} ></input>
                        </div>
                        <div className='input-button'>
                            <button className='register' onClick={inviteUser}>Gain Access</button>
                        </div>
                    {open ? <p>Jag tror det gick bra status code: {response.status}</p> : <></>}
                    </div>
        </div>
            }
        </div >
    )
}
