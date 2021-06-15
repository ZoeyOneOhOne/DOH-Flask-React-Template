import React, { useState, useEffect } from 'react';
import './Style.css';
import {useLocation} from 'react-router-dom';

function UserEdit() {
  //Using useLocation to get data passed from previous route
  const location = useLocation();
  const [Name, setName] = useState("Name");
  const [Age, setAge] = useState("0");
  const [user, setUser] = useState(null);

  //Get the user id that was passed from the previous page
  useEffect(() => {
     //Get the user info that we need
    async function getUser() {
      fetch('user', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ID: location.state.idNumber //Use the location state variable we difined on the about page
        })
      }).then(response =>{
        if(response.ok){
          return response.json();
        }
      }).then(data => setUser(data));
    }
    getUser();
 }, [location]);
 
  //PATCH an existing user
  const editUser = async () =>{
    fetch('users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Name: Name,
        Age: Age,
      })
    }).then(response =>{
      if(response.ok){
        return response.json();
      }
    }).then(data => console.log(data));
  }

  //NEED TO NAVIGATE BACK TO THE USER LIST AFTER EDIT


  if(!user){
    return (
      <main>
        <p>Loading...</p>
      </main>
    )
  }else{
    return (
      <main>
          <h2>Edit existing user.</h2>
          <form>
            <label>
              Name:
              <input type="text" placeholder={user.Name} onChange={(e) => setName(e.target.value)}/>
            </label>
            <br></br>
            <label>
              Age:
              <input type="number" placeholder={user.Age} onChange={(e) => setAge(e.target.value)}/>
            </label>
            <button onClick={editUser}>Submit</button>
          </form>
      </main>
    );
  }
    
  }
  
  export default UserEdit;