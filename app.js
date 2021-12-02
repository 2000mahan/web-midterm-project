/* submitAction() is an event handler for the submit button in html form and is used to send a get request to https://api.genderize.io with a query string which is a name to be predicted */    
function submitAction() {  
/* event.preventDefault() is being used to stop the default browsers action to handle the submit action */
  event.preventDefault();
  /* getting the name value from the html form */
  let name = document.forms["myForm"]["name"].value;
  /* creating a regex for checking that the corresponding name to have only Alphabetical characters and spaces */
  let reg_expr = /^[a-z A-Z]+$/;
  /* checking if the name does not match the regex the alert and return false */
  if(reg_expr.test(name) == false) {
    /* event.preventDefault() is being used to stop the default browsers action to handle the submit action (remember in this case we have an invalid name thus do not send the request to the server)*/  
    event.preventDefault();
    /* alert is being used to show a message to the user and it opens a box with a message saying "Invalid name" */
    alert("Invalid name");
    /* return false :) */
    return false;
  }
  /* checking if the name length is more than 255 or the user has not enterd any names then alert and return false */
  if (name == "" || name.length > 255) {
    /* event.preventDefault() is being used to stop the default browsers action to handle the submit action (remember in this case we have an invalid name thus do not send the request to the server)*/  
    event.preventDefault();
    /* alert is being used to show a message to the user and it opens a box with a message saying "Invalid name" */
    alert("Invalid name");
    /* return false :) */
    return false;
  }
  else{
      /* event.preventDefault() is being used to stop the default browsers action to handle the submit action */
      event.preventDefault();
      /* fetch is being used to send a get request to the corresponding url with the name as a query string*/
      fetch(`https://api.genderize.io/?name=${name}`)
      /* fetch returns a promise thar tells us it was successful or not if successful then we have a json response that we need to parse*/
  .then(response => response.json())
     /* then we parse the json data and by document.getElementById("i1").innerHTML we show gender to the user in the prediction part and data.gender.charAt(0).toUpperCase() is being used to capitalize the first letter of male and female -> male -> Male female -> Female */
  .then((data) => document.getElementById("i1").innerHTML = data.gender.charAt(0).toUpperCase() + data.gender.slice(1) + '<br />' + data.probability );
  }
    /* then after pushing the submit button we check if there is a gender saved in localStorage for the corresponding name and if exists we show the gender in the Saved Answer part*/
      const res = localStorage.getItem(name);
    /* now we parse the result and then sohw the gender to the user if exists in Saved Answer part*/
      if(res){  
       let obj = JSON.parse(res);
       document.getElementById("i2").innerHTML = obj.gender;
      }
      else{
        /* no genders saved for the corresponding name*/
          document.getElementById("i2").innerHTML = ' ';
      }

}
/* saveAction() is an event handler for the save button in html form and is used to save a gender for a name in localStorage by selecting one of the male or female radio buttons for the corresponding name */  
function saveAction(){
    /* event.preventDefault() is being used to stop the default browsers action to handle the submit action */
    event.preventDefault()
/* getting the name value from the html form */
let name = document.forms["myForm"]["name"].value;
/* checking if the radio button correspondence to male is selected then save the gender of the name as a male*/
  if (document.getElementById("m").checked) {
    /* if a gender exists for the corresponding name we first delete that and then add the new gender for the name*/
      const res = localStorage.getItem(name);
    /* checking if a gender exists for the name */
      if(res){    
    /* removing the previous gender */
      localStorage.removeItem(name);
    /* creating the myObj object for saving in localStorage */      
      const myObj = {name: name, gender: "Male"};
    /* creating JSON object */
      const myJSON = JSON.stringify(myObj);
    /* saving the object to the localStorage */  
      localStorage.setItem(name, myJSON);
      }
    /* if there is no gender for the corresponding name */
      else{
    /* creating the myObj object for saving in localStorage */ 
      const myObj = {name: name, gender: "Male"};
    /* creating JSON object */
      const myJSON = JSON.stringify(myObj);
    /* saving the object to the localStorage */      
      localStorage.setItem(name, myJSON);
      }
    
  }
/* checking if the radio button correspondence to female is selected then save the gender of the name as a female*/
  if (document.getElementById("f").checked){
    /* if a gender exists for the corresponding name we first delete that and then add the new gender for the name*/
      const res = localStorage.getItem(name);
    /* checking if a gender exists for the name */
      if(res){
    /* removing the previous gender */
      localStorage.removeItem(name);   
    /* creating the myObj object for saving in localStorage */  
      const myObj = {name: name, gender: "Female"};
    /* creating JSON object */
      const myJSON = JSON.stringify(myObj);
    /* saving the object to the localStorage */    
      localStorage.setItem(name, myJSON);
      }
    /* if there is no gender for the corresponding name */
      else{
    /* creating the myObj object for saving in localStorage */ 
      const myObj = {name: name, gender: "Female"};
    /* creating JSON object */
      const myJSON = JSON.stringify(myObj);
    /* saving the object to the localStorage */      
      localStorage.setItem(name, myJSON);
      }

  }
}
/* clearAction() is an event handler for the clear button in html form and is used to clear a saved gender for a name in localStorage */ 
function clearAction(){
    /* event.preventDefault() is being used to stop the default browsers action to handle the submit action */
    event.preventDefault()
/* getting the name value from the html form */
let name = document.forms["myForm"]["name"].value;
/* if a gender exists for the corresponding name we first delete that and then add the new gender for the name*/
    const res = localStorage.getItem(name);
    /* checking if a gender exists for the name */
    if(res){
    /* removing the previous gender */
    localStorage.removeItem(name);  
    /* showing the result '' because we removed the gender for the corresponding name thus there is no gender to show*/  
    document.getElementById("i2").innerHTML = '';
    }

}
