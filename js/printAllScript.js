const printAllSkins = async () => {
    const champList = await getChamps();
    champList.map(champ => {
        let champName = Object.keys(champ);
        $(`#mainDiv`).append(`<div id="${champName}" class="champDiv"><p>${champName}<img src='https://ddragon.leagueoflegends.com/cdn/12.4.1/img/champion/${champName}.png' class="champIcon" onError="this.onError=null;this.src='https://static.wikia.nocookie.net/gmod/images/9/99/The_Missing_textures.png/revision/latest?cb=20210208200840';"></p></div>`);
        $(`#${champName}`).append("<div></div>");
        let skinList = champ[champName].skins;
        skinList.map(skin => {
            let skinImg = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champName}_${skin.num}.jpg`;
            $(`#${champName}>div`).append(`<img src="${skinImg}" class="splashArt" onError="this.onError=null;this.src='https://static.wikia.nocookie.net/gmod/images/9/99/The_Missing_textures.png/revision/latest?cb=20210208200840';this.classList='missingImg'">`);
            $(`#${champName}>div`).append(`<h4>${skin.name}</h4>`);
        })
    })
}

printAllSkins();