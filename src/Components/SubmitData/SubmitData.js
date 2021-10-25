import { Form, Button } from 'react-bootstrap';
import '../../App.css';

export default function SubmitData ({formData, setFormData, setSolarData}) {

  const panelOptions = ["Standard", "Premium", "Thin film"];
  const arrayOptions = ["Fixed - Open Rack", "Fixed - Roof Mounted", "1-Axis", "1-Axis Backtracking", "2-Axis"];
        
  // const handleChange = (event)=> {
  //   setFormData({ ...formData, [event.target.name]: event.target.value});
  //   console.log(event.target.name + ": " + event.target.value);
  // }

    // const dataElements = keyValArray.map((str, i) => {
  //     return (
  //        (str !== undefined) ? <p key= {i}>{str}</p>: <p></p>
  //     )
  // });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log (formData);
  }

  let keyValArray = [];
    const keyValue = (input) => Object.entries(input).forEach(([key,value]) => {
        keyValArray.push(key + ": " + value);
      })
      
      keyValue(formData);

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

        ('carousel').carousel('next');
      
      } catch (err) {
        console.log(err);
      }
    };

    return (
    <div id="submit-data" className="slide">
      <h1> Data Summary</h1>
      <Form id="data-summary-form" onSubmit={handleSubmit}>
          <Form.Group controlId="formLat">
            <label>Latitude</label>
            <input type="number" 
                name="latitude"
                placeholder={formData.latitude}
                readOnly
              ></input>
          </Form.Group>

          <Form.Group controlId="formLong">
            <label>Longitude</label>
            <input type="number" 
            placeholder= {formData.longitude}
             readOnly
            ></input>
          </Form.Group>

          <Form.Group controlId="arrayType">
            <label>Array Type</label>
            <input type="text" 
            placeholder={arrayOptions[formData.arrayTypeIndex]}
             readOnly
            ></input>
          </Form.Group>

          <Form.Group controlId="moduleType">
            <label>Module Type</label>
            <input type="text" 
            placeholder={panelOptions[formData.moduleTypeIndex]}
             readOnly
            ></input>
          </Form.Group>

          <Form.Group controlId="size">
            <label>Size</label>
            <input type="number" 
            placeholder={ formData.size }
             readOnly
            ></input>
          </Form.Group>

          <Form.Group controlId="losses">
            <label>System Losses</label>
            <input type="number" 
            placeholder={ formData.systemLosses }
             readOnly
            ></input>
          </Form.Group>

          <Form.Group controlId="tilt">
            <label>Tilt</label>
            <input type="number" 
            placeholder={ formData.tilt }
             readOnly
            ></input>
          </Form.Group>

          <Form.Group controlId="azimuth">
            <label>Azimuth</label>
            <input type="number" 
            placeholder={ formData.azimuth }
             readOnly
            ></input>
          </Form.Group>

          <Form.Group controlId="price">
            <label>Price ($ / kWh)</label>
            <input type="number" 
            placeholder={ formData.price }
             readOnly
            ></input>
          </Form.Group>


        <Button onClick={getSolarData}>Submit Data</Button>
      </Form>
 
      

      
    </div>
    );

    
}