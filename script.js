
const url = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson";

async function fetchAsync () {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  }

  fetchAsync()
      .then(data => topThreeCard(data.features));

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