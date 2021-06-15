import React, { useState } from 'react';
import './Style.css';

function Contact() {
  const [ID, setID] = useState("0");

    //POST delete a user from DB
    const delUser = async () =>{
      fetch('/users', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ID: ID
        })
      }).then(response =>{
        if(response.ok){
          return response.json();
        }
      }).then(data => console.log(data));
    }

    return (
      <main>
          <h2>Delete a user.</h2>
          <form>
            <label>
              ID:
              <input type="text" placeholder="ID" onChange={(e) => setID(e.target.value)}/>
            </label>
            <input title="Submit" type="button" onClick={delUser}/>
          </form>
      </main>
    );
  }
  
  export default Contact;