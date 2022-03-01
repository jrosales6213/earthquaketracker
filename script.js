
const url = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson";

async function fetchAsync () {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  }

  fetchAsync()
      .then(data => {
        topThreeCard(data.features);
        tableData(data.features);
      });

   function topThreeCard(earthquake){
     const features = earthquake.map(e => e.properties);
     const magnitudeGreater = features.filter(m => m.mag >= 2.5);

     // contains lastest 5 earthquakes that were greater than 2.5
     const recentReports = [];
     for(let i =0; i<=4; i++){
       recentReports.push(magnitudeGreater[i]);
     }
  
  const listItem = document.getElementById("earthquakeList");

    recentReports.forEach((result, idx) => {
      const checkDate = new Date(result.time);
      const passingTime = timeSince(checkDate);

      const content = `
                   <a href="${result.url}" target="_blank" class=" list-group-item list-group-item-action flex-column align-items-start ">
                   <div class="d-flex w-100 justify-content-between">
                   <h5 class="mb-1">${result.title}</h5>
                   </div>
                   <p class="mb-1">${passingTime}</p>
                   </a>
                   `;
     listItem.innerHTML += content;
    })
  }

  // table render all recent earthquakes

 


  function tableData(data) {
    const allProperties = data.map(a => a.properties);
    const tryFunction = convertToDate(allProperties);
    console.log(tryFunction)
        let tab = 
          `<thead>
          <tr>
            <th>Location</th>
            <th>Time</th>
            <th>Magnitude</th>
           </tr>
           </thead>
           
           `
      
        // Loop to access all rows 
         for (let r of allProperties) {
           tab += `
           <tbody>
        <tr> 
         <td>${r.place} </td>
         <td>${tryFunction} </td>
         <td>${r.mag} </td> 
         </tr>
         </tbody>`;
       
        }
        document.getElementById("table-container").innerHTML = tab;
        }
 // convert to current date
  function convertToDate(dateList){
  const testingAgain =  dateList.forEach((result) => {
     let what =  new Date(result.time).toDateString();
     console.log(what)
   })
  
  console.log(testingAgain);
  }
  // used to find out how much time has passed since event. 
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 }
  ];
  
  function timeSince(date) {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    const interval = intervals.find(i => i.seconds < seconds);
    const count = Math.floor(seconds / interval.seconds);
    return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
  }
 

  //// Google maps