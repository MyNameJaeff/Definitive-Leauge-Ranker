/* import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, set, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://leaugerater-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings);
const database = getDatabase(app);
 */

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
