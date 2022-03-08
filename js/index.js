//***FETCH DATA FROM USGS WEBSITE
//** API DOCUMENTATION CAN BE FOUND AT https://earthquake.usgs.gov/fdsnws/event/1/ */
//NO API KEY REQUIRED//

const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

async function fetchAsync () {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  }
  fetchAsync()
      .then(data => {
        recentEarthQuakeCard(data.features);
        tableData(data.features);
        sevenDayGreatest(data.features);
      }).catch((e)=>{
       console.error(e);
        });

//*** 7 DAY HIGHTEST MAGNITUDE */  
function sevenDayGreatest(data){
  const findNumber = data.map(p => p.properties);
  console.log(findNumber)

const findGreatest = findNumber.map(a => a.mag);

 const greatest = Math.max(...findGreatest);
 const findLocation = findNumber.filter(a => a.mag === greatest);
 const location = findLocation.map(a => a.place);

 document.getElementById("earnings").innerHTML = ` 
                                                  <div class="text-xs font-weight-bold  text-uppercase mb-1 "> 7 Day Highest Magnitude</div>
                                                   <div class="h5 mb-0 font-weight-bold text-info">${greatest} Magnitude</div>`;
 document.getElementById("location").innerHTML = `
                                                  <div class="text-xs font-weight-bold  text-uppercase mb-1 "> 7 Day Highest Location</div>
                                                  <div class="h5 mb-0 font-weight-bold text-info">${location}</div>`;
}      


//***RECENT EARTHQUAKE CARD ****/

   function recentEarthQuakeCard(data){
     const features = data.map(p => p.properties);
     const greaterThanTwo = features.filter(m => m.mag >= 2.5);
     // contains lastest 6 earthquakes that were greater than 2.5
     const recentReports = [];
     for(let i =0; i<=5; i++){
       recentReports.push(greaterThanTwo[i]);
     }
      recentReports.forEach((result) => {
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
     const listItem = document.getElementById("earthquakeList");
     listItem.innerHTML += content;
    })
  }
//*** END OF CARD */

//******ALL WEEKLY EARTHQUAKES TABLE */

  function tableData(data) {
    const allProperties = data.map(a => a.properties);
        let tab = 
          `<thead>
          <tr>
            <th>Location</th>
            <th>Time</th>
            <th>Magnitude</th>
           </tr>
           </thead>
           
           `;
      
        // Loop to access all rows 
         for (let r of allProperties) {
           let convertTime = new Date(r.time);
           tab += `
           <tbody>
        <tr> 
         <td>${r.place} </td>
         <td>${convertTime}</td>
         <td>${r.mag} </td> 
         </tr>
         </tbody>`;
       
        }
        document.getElementById("table-container").innerHTML = tab;
        }

 //******END TABLE */

  ///****FUNCTION USED TO FIND OUT HOW MUCH TIME HAS PASSED SINCE EVENT OCCURED */
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
 
 