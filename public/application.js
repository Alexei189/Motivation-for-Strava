
const stravaBut= document.querySelector(".strava");
stravaBut.addEventListener('submit', async(event)=>{
  event.preventDefault()
  console.log('111')

  async function tmp() {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer b080c11509996831962a68b840c36ff724322fa6"
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(
    "https://www.strava.com/api/v3/athletes/51487616/stats",
    requestOptions
  );

  const result = await response.json();
  //console.log (result.recent_run_totals.distance)

  kkal = result.recent_run_totals.distance * 0.2;
  console.log(kkal)

  const kkalShow = document.querySelector("#wind");
  kkalShow.innerText = `${kkal}`;
}
tmp();
})
var kkal;


const kkalInput = document.querySelector("#getFood");
if(kkalInput){ kkalInput.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log(kkal);
  const response = await fetch("/food/foodmarket", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ kkal }),
  });
  const result = await response.text();
  console.log(result);
  document.body.insertAdjacentHTML('beforeend',result)
})}


