// Create a new date instance dynamically with JS
let d = new Date();
//for some reason the month is 1 month before the current month so I had to add +1
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();
//variables of our api url
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ",&appid=09a2802bc4360f118441669478638f10&units=imperial";

//callback function to the effent listener added in generate button which kickstarts all our operations
const retrieveData = () => {
  let zipcode = document.querySelector("#zip").value;
  let feelings = document.querySelector("#feelings").value;
  
  //calling the getData function which uses fetch to get weather data form the api
  getData(zipcode).then((data)=> {
    //storing returned data into a new object to easily use it later
    const weatherInfo = {
      temp: data.main.temp,
      city: data.name,
      date: newDate,
      feeling: feelings
    };
    console.log(weatherInfo);
    
    //calling the postData function to post weather data to our server after getting it form api
    postData("/add", weatherInfo);

    //calling the updateDOM function to update the UI
    updateDOM();
  });

}

document.querySelector("#generate").addEventListener('click', retrieveData);

//asynchronous function to get data form api in JSON format
const getData= async (zip)=> {
  try {
    const res = await fetch(baseURL+zip+apiKey);
    const data = await res.json();
    console.log(data);
  return data;
  } 
  catch (error) {
    console.log(error);
  }
}

console.log(newDate);

//asynchronous function to post data to our server
const postData = async (url = '', newInfo = {}) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newInfo),
  });

  try {
    const newData = await res.json();
    console.log(newData);
    return newData;
  } 
  catch (error) {
    console.log(error);
  }
};

//asynchronous fucntion which updates the UI with our new data posted then requested from the server
const updateDOM = async () => {
  
  //getting data from the server using fetch
  const res = await fetch("/all");
  try {
    //selecting the elements we want to update in the DOM then update them using innerHTML
    const resData = await res.json();
    console.log(resData)
    document.querySelector('#date').innerHTML = "Date: " + resData.date;
    document.querySelector('#city').innerHTML = "City: " + resData.city;
    document.querySelector('#temp').innerHTML = "Temperature: " + resData.temp + "&degF";
    document.querySelector('#content').innerHTML = "You are feeling: " + resData.feeling;
  } 
  catch (error) {
    console.log(error);
  }
};
