import React from 'react'
import { getUser } from '../App'

class TreatmentPlan extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
			user: null,
            currentPrescriptions: []
		};

    
	}

    loadPrescriptions = () =>{
        //get the user
        var user = getUser();
        //console.log(user);
        
        //get the prescriptions
        var prescriptions = user.prescriptions;
        var currentTreatments = [];
        
        //for each item in prescriptions
        for (var i = 0; i < prescriptions.length; i++){
            //if its not expired/finished
              if (prescriptions[i].repeats > 0){
                    //create a new medical intervention with script details
                  var medicalIntervention = {
                      type: "medicine",
                      name: prescriptions[i].medicine,
                      date: "date",
                      dosage: prescriptions[i].dosage
                  }
                  //push to array
                  currentTreatments.push(medicalIntervention);
              }
        }
  
        //set the state
        this.setState({user: user,
                        currentPrescriptions: currentTreatments});
    }
  componentDidMount = () =>{
      this.setState({user: getUser()})
      this.loadPrescriptions();
  }
  //text searches list
  search(){

    //inspired by https://www.w3schools.com/howto/howto_js_filter_lists.asp
    var input, filter, ul, listData, li ,txtValue;

    //get all elements from the page
    input = document.getElementById('searchBar');
    filter = input.value.toUpperCase();
    ul = document.getElementById("treatmentList");
    li = ul.getElementsByTagName("li");

    //for each list item of the list
    for (var i = 1; i < li.length; i++){
      
      //get all div elements inside list element
      var divs = li[i].getElementsByTagName("div");
 
      for (var j = 0; j < divs.length - 1; j++){
        //get the data from the div
        listData = divs[j];
        //add the text inside th div to the text value
        txtValue += listData.textContent || listData.innerText;
      }
      
      
      //make the text value uppercase for comparison
      if (txtValue.toUpperCase().indexOf(filter) > -1){
        //if its not found hide the element
          li[i].style.display ="";
      }else{
        //if the substring is found show it
          li[i].style.display ="none";
      }

      //reset the text value
      txtValue = "";
      
    }

    
  }


  render(){return (

    <div className='main'>
      <h2>Search Treatment Plan</h2>
      <div className='almostFullScrollDiv'>

        <input type="text" id="searchBar" className='searchBox' onKeyUp={this.search} placeholder="Search treatment plan..."></input>

          <div className='treatmentPlan'>


              <ul className='treatmentPlan' id="treatmentList">

                  <li className='treatmentPlanItem'>
                      <div></div>
                      <div>Type</div>
                      <div>Name</div>
                      <div>Date</div>
                      <div>Dosage (if Applicable)</div>
                  </li>

                  {this.state.currentPrescriptions.map((item, index) => (
                   <li key={item.prescriptionId} className="treatmentPlanItem">
                      <div>{index + 1}</div>
                      <div>{item.type}</div>
                      <div>{item.name}</div>
                      <div>{item.date}</div>
                      <div>{item.dosage}</div>
                  </li>
              ))}
              </ul> 
          </div>
      </div>
   </div>

  )}
}

export default TreatmentPlan
