/* from https://ncoughlin.com/posts/react-dropdown/#using-state-to-manage-dropdown-selection
*/
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

export default function System({formData, setFormData}) {

  const [panelDropdown, setPanelDropdown] = useState("Select Panel Type");
  const [arrayDropdown, setArrayDropdown] = useState("Select Array Type");
  const [rateTypeDropdown, setRateTypeDropdown] = useState("Select Rate Type");
  
  const panelOptions = ["Standard", "Premium", "Thin film"];
  const arrayOptions = ["Fixed - Open Rack", "Fixed - Roof Mounted", "1-Axis", "1-Axis Backtracking", "2-Axis"];
  const rateTypeOptions = ["Residential", "Commercial"];

    const handleChange = (event)=> {
      setFormData({ ...formData, [event.target.name]: event.target.value});
      console.log(event.target.name + ": " + event.target.value);
    }

    const handleSelectPanel = (eventKey, event) => {
      setFormData({...formData, moduleTypeIndex: eventKey})
      setPanelDropdown(panelOptions[eventKey]);
      //console.log ("CHANGE TO: " + panelOptions[eventKey]);
    }

    const handleSelectArray = (eventKey, event) =>  {
      setFormData({ ...formData, arrayTypeIndex: eventKey });
      setArrayDropdown(arrayOptions[eventKey]);
      //console.log ("CHANGE TO: " + arrayOptions[eventKey]);
  }

  const handleSelectRateType = async (eventKey, event) =>  {
    //setFormData({ ...formData, rateTypeIndex: eventKey });
    const selectedRateType = rateTypeOptions[eventKey];
    setRateTypeDropdown(selectedRateType);
    const utilityPrice = await getElectricityPricing(selectedRateType.toLowerCase());
    setFormData({ ...formData, price : utilityPrice});
    console.log ("CHANGE TO: " + utilityPrice);
}

const getElectricityPricing = async (rateType) => {
  try {
    let updatedUrl = `https://developer.nrel.gov/api/utility_rates/v3.json?api_key=DEMO_KEY&lat=`
    + formData.latitude + `&lon=` + formData.longitude; 
    
    console.log (updatedUrl);

    const res = await fetch(updatedUrl);
    const data = await res.json();


    console.log ("PRICING DATA:" + data.outputs[rateType]); // Note--this is square bracket notation. 
    //setSolarData(data);
    return data.outputs[rateType];
  
  } catch (err) {
    console.log(err);
  }
};
    
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log (formData);
    }
 
    return (
        <div className="system slide">
          <h1>System Information</h1>
  
          <Form onSubmit={handleSubmit} id="system-info-form" >
          <p>Modify the inputs below to run the simulation</p>
            
            <label>
              DC System Size (kW):
            </label>
              <input 
                type = "text" 
                name="size" 
                value={formData.size} 
                onChange={handleChange}
                ></input>
            
            <br></br>
            <div className="label-and-dropdown">
              <label>
                Panel Type
              </label>
                <DropdownButton 
                  title= {panelDropdown}
                  id="dropdown-basic-button" 
                  >
                      <Dropdown.Item onSelect = {handleSelectPanel} eventKey="0">{panelOptions[0]}</Dropdown.Item>
                      <Dropdown.Item onSelect = {handleSelectPanel} eventKey="1">{panelOptions[1]}</Dropdown.Item>
                      <Dropdown.Item onSelect = {handleSelectPanel} eventKey="2">{panelOptions[2]}</Dropdown.Item>
                  </DropdownButton>
            </div>
              
            <div className="label-and-dropdown">
              <label> Array Type </label>
              <DropdownButton
                  title={arrayDropdown}
                  className="dropdown"  
                  >
                      <Dropdown.Item onSelect = {handleSelectArray} eventKey="0">{arrayOptions[0]}</Dropdown.Item>
                      <Dropdown.Item onSelect = {handleSelectArray} eventKey="1">{arrayOptions[1]}</Dropdown.Item>
                      <Dropdown.Item onSelect = {handleSelectArray} eventKey="2">{arrayOptions[2]}</Dropdown.Item>
                      <Dropdown.Item onSelect = {handleSelectArray} eventKey="3">{arrayOptions[3]}</Dropdown.Item>
                      <Dropdown.Item onSelect = {handleSelectArray} eventKey="4">{arrayOptions[4]}</Dropdown.Item>
              </DropdownButton>
            </div>


            <label>
              System Losses (%):
            </label>
              <input type="text" 
                name="systemLosses"
                value={formData.systemLosses}
                onChange={handleChange} 
              ></input>
            
            <br></br>

            <label>
              Tilt (degrees):
            </label>
              <input type="text" 
                name="tilt"
                value={formData.tilt}
                onChange={handleChange}
              ></input>
            
            <br></br>

            <label>
              Azimuth (degrees):
            </label>
              <input type="text" 
                name="azimuth"
                value={formData.azimuth}
                onChange={handleChange}
              ></input>


            
          <div id="electricity-rate-section">
            <h2>RETAIL ELECTRICITY RATE</h2>
            <div className = "explanatory-text">
              To automatically download an average annual retail electricity rate for your location, choose a rate type (residential or commercial). You can change the rate to use a different value by typing a different number.
            </div>
            <br/>
            <div className="label-and-dropdown">
              <label>Rate Type: </label>
              <DropdownButton className="dropdown" title = {rateTypeDropdown}>      
                <Dropdown.Item onSelect = {handleSelectRateType} eventKey="0">{rateTypeOptions[0]}</Dropdown.Item>
                <Dropdown.Item onSelect = {handleSelectRateType} eventKey="1">{rateTypeOptions[1]}</Dropdown.Item>
                <Dropdown.Item onSelect = {handleSelectRateType} eventKey="2">{rateTypeOptions[2]}</Dropdown.Item>
              </DropdownButton>
            </div>

              <label>Rate ($/kWh): </label>
              <input type="text" 
                name="price"
                value={formData.price}
                onChange={handleChange}
              ></input>  
          </div>
     

        </Form>
      </div>
    );
  }