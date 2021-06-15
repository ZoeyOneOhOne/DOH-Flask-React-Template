import React, { Fragment, useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import './Style.css';
import centerPic from "../../Assets/transportation.png";
import logo from "../../Assets/WVDOT.png";
import road from "../../Assets/shitrd.jpg"
import EXIF from 'exif-js'

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [fullData, setFullData] = useState([]);

    //Fetch all forms from database
    useEffect(() =>{
      setIsLoading(true);
      fetch('http://127.0.0.1:5000/forms').then(response =>{
        if(response.ok){
          return response.json();
        }
        getExif();
      }).then(data => setFullData(data)).then(setIsLoading(false));
    }, []);

    function getExif() {
      var img1 = road;
      EXIF.getData(img1, function() {
        var allMetaData = EXIF.getAllTags(this);
        var allMetaDataSpan = document.getElementById("allMetaDataSpan");
        console.log("All data: " + allMetaData, allMetaDataSpan);
      })}
  //The actual view
  if (isLoading) {
    return (
      <Fragment className="flex-container">
        <center>
          <img src={logo} alt="Logo" className="logo"/>
          <h1>Loading...</h1>
        </center>
      </Fragment>
    );
  } else{
  return (
    <Fragment>
      <center>
      <img src={centerPic} alt="bigLogo"/>
        <h1>Active Jobs</h1>
        <br></br>
        <div>
           {fullData.map(data => <div key={data.ID}> <Card className="cards">
           <Card.Title>{data.ID}</Card.Title>
            <Card.Img variant="top" src={data.Path} className="cardImage" />
            <Card.Text>
                {data.Comments}
              </Card.Text>
            <Card.Body>
            <div className="lables">
                <Card.Text className="lableItem">Road</Card.Text>
                <Card.Text className="lableItem">Mile Marker</Card.Text>
            </div>
            <div className="lables">
                <Card.Text>{data.RoadName}</Card.Text>
                <Card.Text>{data.MileMarker}</Card.Text>
            </div>
            <div className="lables">
                <Card.Text className="lableItem">Name</Card.Text>
                <Card.Text className="lableItem">Phone</Card.Text>
                <Card.Text className="lableItem">Email</Card.Text>
            </div>
            <div className="lables">
                <Card.Text>{data.Name}</Card.Text>
                <Card.Text>{data.Phone}</Card.Text>
                <Card.Text>{data.Email}</Card.Text>
            </div>
              <Button variant="primary">Work</Button>
            </Card.Body>
          </Card> 
         <br></br>
          </div>)}  
       </div>
       
      </center>
    </Fragment>
  );
}
}

export default Home;
