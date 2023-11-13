const printSpecific = async (whatChamp) => {
    let call = await fetch(`http://ddragon.leagueoflegends.com/cdn/13.20.1/data/en_US/champion/${whatChamp[0]}.json`);
    let data = await call.json();
    data = data.data;
    $(`#mainDiv>div`).html("");
    let skinList = data[Object.keys(data)[0]].skins;
    skinList.map(skin => {
        let skinName = ((((skin.name).replace(/ /g, "")).replace("(", "")).replace(")", ""));
        $(`#mainDiv>div`).append(`<div id="${skinName}" class="skinDiv"></div>`);
        $(`#${skinName}`).append(`<div></div>`);
        let skinImg = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${whatChamp[0]}_${skin.num}.jpg`;
        $(`#${skinName}>div`).append(`<img src="${skinImg}" class="splashArt" onError="this.onError=null;this.src='https://static.wikia.nocookie.net/gmod/images/9/99/The_Missing_textures.png/revision/latest?cb=20210208200840';this.classList='missingImg'">`);
        let element = `<div>
        <select id="${whatChamp+skinName}rating" class="form-select a" onchange="updateScore(this.id)">
            <option value="1" selected>1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select></div>`;
        $(`#${skinName}>div`).append(element);
        $(`#${skinName}`).append(`<h4>${skin.name}</h4>`);
    })
    Object.entries(localStorage).map(item => {
        $(`#${item[0]}`).prop("disabled", true);
        $(`#${item[0]}`).val(item[1]);
    });
}
