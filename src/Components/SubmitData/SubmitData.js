import { Form, Button, Row, Col } from 'react-bootstrap';
import '../../App.css';

export default function SubmitData ({formData, setSolarData}) {

  const panelOptions = ["Standard", "Premium", "Thin film"];
  const arrayOptions = ["Fixed - Open Rack", "Fixed - Roof Mounted", "1-Axis", "1-Axis Backtracking", "2-Axis"];
        
  let keyValArray = [];
    const keyValue = (input) => Object.entries(input).forEach(([key,value]) => {
        keyValArray.push(key + ": " + value);
      })
      
      keyValue(formData);
      const dataElements = keyValArray.map((str, i) => {
          return (
             (str !== undefined) ? <p key= {i}>{str}</p>: <p></p>
          )
      });


    const getSolarData = async () => {
      try {
        let updatedUrl = `https://developer.nrel.gov/api/pvwatts/v6.json?api_key=DEMO_KEY&lat=`
        + formData.latitude + `&lon=` + formData.longitude 
        + `&system_capacity=`+ formData.size 
        + `&azimuth=` + formData.azimuth 
        + `&tilt=` + formData.tilt 
        + `&array_type=` + formData.arrayTypeIndex 
        + `&module_type=` + formData.moduleTypeIndex 
        + `&losses=` + formData.systemLosses;

        const res = await fetch(updatedUrl);
        const data = await res.json();
        setSolarData(data);
      
      } catch (err) {
        console.log(err);
      }
    };

  




    return (
    <div id="submit-data" className="slide">
      <h1> Data Summary</h1>
      <Form id="data-summary-form">
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formLat">
            <Form.Label>Latitude</Form.Label>
            <Form.Control type="number" placeholder={formData.latitude} readOnly/>
          </Form.Group>

          <Form.Group as={Col} controlId="formLong">
            <Form.Label>Longitude</Form.Label>
            <Form.Control type="number" placeholder= {formData.longitude} readOnly/>
          </Form.Group>
        </Row>
        <Row className="mb-3">

          <Form.Group as={Col} controlId="arrayType">
            <Form.Label>Array Type</Form.Label>
            <Form.Control type="text" placeholder={arrayOptions[formData.arrayTypeIndex]} readOnly/>
          </Form.Group>

          <Form.Group as={Col} controlId="moduleType">
            <Form.Label>Module Type</Form.Label>
            <Form.Control type="text" placeholder= {panelOptions[formData.moduleTypeIndex]} readOnly/>
          </Form.Group>
        </Row>
        <Row className="mb-3">
        <Form.Group as={Col} controlId="numPanels">
            <Form.Label>Number of Panels</Form.Label>
            <Form.Control type="number" placeholder={formData.size} />
          </Form.Group>

          <Form.Group as={Col} controlId="systemLosses">
            <Form.Label>System Losses</Form.Label>
            <Form.Control type="number" placeholder= {formData.systemLosses} />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="tilt">
            <Form.Label>Tilt</Form.Label>
            <Form.Control type="number" placeholder={formData.tilt} />
          </Form.Group>

          <Form.Group as={Col} controlId="azimuth">
            <Form.Label>Azimuth</Form.Label>
            <Form.Control type="number" placeholder= {formData.azimuth} />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="price">
            <Form.Label>Local Electricity Price ($ / kwh)</Form.Label>
            <Form.Control type="number" placeholder={formData.price} />
          </Form.Group>
        </Row>
        <Button onClick={getSolarData}>Submit Data</Button>
      </Form>
 
      

      
    </div>
    );

    
}