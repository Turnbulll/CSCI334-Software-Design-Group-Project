import React from 'react'

class Patients extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      userType: "",
      list: []
    };

  }

  loadData(){

    {/* NEED TO IMPLEMENT FUNCTIONALITY TO GET BACKEND HERE*/}

    {/* Fore each prescription push it to the list*/}

    this.state.list.push({
      id: 0,
      Email: 'vgislason@yahoo.com',
      FirstName: 'Vanessa',
      LastName: 'twice a day',
      Score: 2})

    this.state.list.push({
      id: 1,
      Email: 'randyBonckles@yahoo.com',
      FirstName: 'Randy',
      LastName: 'bonckles',
      Score: 1})
    
  }

  componentDidMount = () =>{
    
    console.log(this.state.list)
  }

  searchPrescription(){

    //inspired by https://www.w3schools.com/howto/howto_js_filter_lists.asp
    var input, filter, ul, listData, li ,txtValue;

    //get all elements from the page
    input = document.getElementById('prescriptionSearch');
    filter = input.value.toUpperCase();
    ul = document.getElementById("prescriptionList");
    li = ul.getElementsByTagName("li");

    //for each list item of the list
    for (var i = 1; i < li.length; i++){
      
      //get all div elements inside list element
      var divs = li[i].getElementsByTagName("div");
      for (var j = 0; j < divs.length - 1 ; j++){
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
  
  render(){
  return (
    <div className='main'>
      <h1>Doctors list of patients</h1>

      {this.loadData()}

      <input type="text" id="prescriptionSearch" className='searchBox' onKeyUp={this.searchPrescription} placeholder="Search prescriptions..."></input>
      <br/>

      <ul className='prescriptionList' id="prescriptionList">
        
          <li className="prescriptionListItem">
              <div>ID</div>
              <div>Email</div>
              <div>First Name</div>
              <div>Last Name</div>
              <div>Score</div>
          </li>

        {this.state.list.map(item => (
            <li key={item.id} className="prescriptionListItem">
              <div>{item.id}</div>
              <div>{item.Email}</div>
              <div>{item.FirstName}</div>
              <div>{item.LastName}</div>
              <div>{item.Score}</div>
           </li>
          ))}
      </ul>

    </div>
  )}
}

export default Patients
