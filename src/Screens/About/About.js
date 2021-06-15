import React, { useState, Button } from 'react';
import './Style.css';
import {withRouter} from 'react-router-dom';
import { Map, Scene } from '@esri/react-arcgis';

function About() {
  const [zoom, setZoom] = useState(4);

  const zoomIn = async() =>{
    setZoom(zoom + 1);
  }
  const zoomOut = async() =>{
    setZoom(zoom - 1);
  }

  return (
    <div>
        <h1>ARC GIS page.</h1>
        {/* <div className='zoomButtons'>
          <Button onclick={zoomIn} title="+"></Button>
          <Button onclick={zoomOut} title="-"></Button>
        </div> */}
        {/*Using arcgis Scene*/}
        <div className="map">
          <Scene 
          mapProperties={{ basemap: 'national-geographic' }} //OPTIONS: https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html
          viewProperties={{
            center: [-80.6531, 38.3307], //Craigsville WV
            zoom: zoom
          }}
          />
        </div>
    </div>
  );
}

export default withRouter(About);
