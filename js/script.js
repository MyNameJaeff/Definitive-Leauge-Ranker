/* import {printSpecific, updateScore} from "./printSpecific.js"; */
const reset = () => {
    localStorage.setItem("firstTime", true);
    localStorage.clear();    
}
const app = initializeApp(appSettings);
const database = getDatabase(app);

//reset();
const getChampList = async () => {
  let req = await fetch(
    "http://ddragon.leagueoflegends.com/cdn/13.20.1/data/en_US/champion.json"
  );
  let data = await req.json();
  return data.data;
};
const getChamps = async () => {
  const champs = await getChampList();
  const champList = [];
  for (const key of Object.entries(champs)) {
    let call = await fetch(
      `http://ddragon.leagueoflegends.com/cdn/13.20.1/data/en_US/champion/${key[0]}.json`
    );
    let data = await call.json();
    champList.push(data.data);
  }
  return champList;
};
const addToList = async () => {
  const champList = await getChamps();
  champList.map((champ) => {
    let champName = Object.keys(champ);
    let element = $(
      `<li id="item-${champName}" ><p class="dropdown-item" class="test">${champName}</p></li>`
    );
    element.click(() => printSpecific(champName));
    $(`#dropdown-menu`).append(element);
  });
};
const updateScore = async (skin) => {
  let value = $(`#${skin}`).val();
  let ratedChamp = { name: skin, value: value };
  $(`#${skin}`).prop("disabled", true);
  localStorage.setItem(skin, value);
};


addToList();
//     const champList = await getChamps();
//     champList.map(champ => {
//         let champName = Object.keys(champ);
//         let element = $(`<li id="item-${champName}" ><p class="dropdown-item" class="test">${champName}</p></li>`);
//         element.click(() => printSpecific(champName));
//         $(`#dropdown-menu`).append(element);
//         //console.log(champName);
//         if(localStorage.getItem("firstTime") == "true"){
//             localStorage.setItem(champName, 0);
//         }
//     })
//     localStorage.setItem("firstTime", false);
//     console.log(localStorage);
//     getScores("Aatrox");
// }
const getScores = async (whatPrint) => {
    await(printSpecific([whatPrint]));
    Object.keys(localStorage).map((skin) => {
        $(`#${skin}`).val(localStorage[skin]);
        $(`#${skin}`).prop("disabled", true);
        $(`#${whatPrint}Total`).html(localStorage.getItem(whatPrint));
    })
}

addToList();
//printSpecific(["Aatrox"]);