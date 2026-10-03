const tracksContainer = document.querySelector("#tracksContainer")

async function fetchData() {
    const data = await fetch('https://kitek.ktkv.dev/static/spotify.json')
    const json = await data.json()
    console.log(json)
   let totalMs = 0;
json.forEach(item => totalMs += item.track.duration_ms);
const msTMS = totalMs
            const minTMS = Math.floor(msTMS / 60000)
            const secTMS = Math.floor((msTMS % 60000) / 1000)
            let formatTMS;
            if (secTMS < 10)
            {
                formatTMS = "0" + secTMS;
            }
            else
            {
                formatTMS = secTMS;
            }
            const answer2 = minTMS + ":" + formatTMS;
const statsDiv = document.querySelector("#statsContainer");
statsDiv.innerHTML = `
    <p><strong>Треков:</strong> ${json.length}</p>
    <p><strong>Общая длительность:</strong> ${answer2}</p>
`;


    const html = json.map((item) => 
        {
             

            
            const ms = item.track.duration_ms
            const min = Math.floor(ms / 60000)
            const sec = Math.floor((ms % 60000) / 1000)
            let formatSec;
            if (sec < 10)
            {
                formatSec = "0" + sec;
            }
            else
            {
                formatSec = sec;
            }
            const answer = min + ":" + formatSec;
            
            return `
            <li class="track-item">
                
                <div class="track-number">${item.track.track_number}</div>
                <div class="track-main">
                    <img src=${item.track.album.images[0].url} alt="${item.track.name}"
                        class="album-art" loading="lazy" />
                    <div class="track-info">
                        <div class="track-name">${item.track.name}</div>
                        <div class="track-artists">${item.track.album.artists.map(artist => artist.name).join(', ')}
</div>
                        <div class="track-album">${item.track.album.name}</div>
                    </div>
                </div>
                <div class="track-meta">
                    <div class="duration">${answer}</div>
                    <div class="popularity">♪ ${item.track.popularity}</div>
                </div>
            </li>
    `; }).join("");

    tracksContainer.innerHTML = html
}

fetchData()
