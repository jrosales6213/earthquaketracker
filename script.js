
const eartquakeList = document.getElementById("earthquake-list");

const url = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson";

async function fetchAsync () {
    // await response of fetch call
    let response = await fetch(url);
    // only proceed once promise is resolved
    let data = await response.json();
    // only proceed once second promise is resolved
    return data;
  }
  
  // trigger async function
  // log response or catch error of fetch promise
  fetchAsync()
      .then(data => {
          let features = data.features.map(f => f.properties);
          return features;
      })
      .then(features => {
          let earthquakes = features.map(a => a.place);

          let earthquakeData = features.map(a => {
              let date = new Date(a.time);
           return date;
          });
        
        //   console.log(earthquakeData)

    //       let convertToDate = function(string){
    //           for (let i =0 ; i < string.length; i++){
    //               let whatIsThat = new Date (string[i]);
                
                  
    //           }
    //         //   let newStuff = new Date(string);
    //         //   console.log(newStuff)
    //           return;
    //       }
        
    //    convertToDate(earthquakeData);
  
          // convert ISO date into 'real' date
        //   let earthquakeTime = earthquakeData;
        //   console.log(earthquakeTime)
        
     
            //  let coolNewDate = new Date (earthquakeTime[i]);
            //  console.log(coolNewDate)
            let recentEarthQuake =   `
               <ul>
              <li>${earthquakeData[0] +" "+ earthquakes[0]}</li>
              <li>${earthquakes[1]}</li>
              <li>${earthquakes[2]}</li>
              <li>${earthquakes[3]}</li>
              <li>${earthquakes[4]}</li>
         
              
               </ul>
             `
          eartquakeList.innerHTML = recentEarthQuake;
      
        //   for (let i=0; i < 5; i++){
        //       let newDate = earthquakeTime[i];
        //       let date = new Date(newDate)
        //   }
        //   let date = new Date(earthquakeData);
        //   console.log(date);
         
        //   let recentEarthQuake =   `
        //        <ul>
        //       <li>${earthquakes[0]}</li>
        //       <li>${earthquakes[1]}</li>
        //       <li>${earthquakes[2]}</li>
        //       <li>${earthquakes[3]}</li>
        //       <li>${earthquakes[4]}</li>
        //       <li>${earthquakeTime[0]}</li>
              
        //        </ul>
        //      `
        //   eartquakeList.innerHTML = recentEarthQuake;
          }
      
      )
 
      
// eartquakeList.innerHTML = 
//     `
//     <ul>
//     <li>Location</li>
//     <li>Location</li>
//     <li>Location</li>
//     <li>Location</li>
//     <li>Location</li>
//     <li>Location</li>
//     <li>Location</li>
//     <li>Location</li>
//     </ul>
//     `

    // function show(data) {
    //     // Loop to access all rows 
    //     for (let r of data) {
    //         let tab = 
    //     `<ul> 
    //     <td>${r[1]} </td>
    //     <td>${r[2]} </td>
    //     <td>${r[3]} </td>
    //     <td>${r[4]} </td>
    //     <td>${r[5]} </td>      
    //     </ul>`;
        
    //     }
    //     // Setting innerHTML as tab variable
    //     eartquakeList.innerHTML = tab;
    //     }