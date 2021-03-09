let num = 0
let parent_div = document.getElementById("main-container")
let search_container = document.getElementById("search")
let num2=0

let search = document.createElement("input")
let button = document.createElement("input")
button.type = "button"
search_container.appendChild(search)
search_container.appendChild(button)
button.value = "Search"
button.classList.add("button")
search.classList.add("button")
search.style.width = "500px"




function getAnime() {
    let ending_themes = document.createElement("p")
    let div = document.createElement("div")
    let p = document.createElement("p")
    let p2 = document.createElement("p")
    let image = document.createElement("img")
    let themes = document.createElement("p")
    let time_duration = document.createElement("p")

    parent_div.appendChild(div)
    div.classList.add("class")

    div.appendChild(image)
    div.appendChild(themes)
    div.appendChild(ending_themes)
    div.appendChild(p2)
    div.appendChild(time_duration)
    div.appendChild(p)


    p2.classList.add("p")
    num = num + 1
    fetch("https://api.jikan.moe/v3/anime/" + num).then(response => {
        return response.json()
    }).then(blob => {
        
        console.log(blob)
        p2.innerHTML = blob.title
        image.src = blob.image_url
        console.log(blob.image_url)
        themes.innerHTML = "Opening Themes: " + blob.opening_themes + "\n"
        time_duration.innerHTML = "Total episodes:" + blob.episodes
        ending_themes.innerHTML = "Ending Themes: " + blob.ending_themes + "\n"
        p.innerHTML = blob.synopsis
        //    time_duration.innerHTML = blob.prop.from.day + "/" + blob.prop.from.month + "/" + blob.prop.from.year + "-" + + blob.prop.to.day + "/" + blob.prop.to.month + "/" + blob.prop.to.year
        if (p.innerHTML == "undefined") {
            document.body.removeChild(div)
        }
        if (time_duration.innerHTML.includes("null")) {
            console.log("null")
            time_duration.innerHTML = "Total Episodes: OnGoing"
        }
    }).catch(() => {
        num = num + 1
        parent_div.removeChild(div)
    })
}

var interval = setInterval(getAnime, 100)


button.addEventListener("click", () => {

fetchAnimeOnClick();
})

search.addEventListener("change" , ()=>{
    fetchAnimeOnClick()
})

function fetchAnimeOnClick(){
    num2 = 0
    if (search.value.length != 0) {

        if(button.value == "Refresh"){
            while (parent_div.firstChild) {
                console.log("first child")
                parent_div.removeChild(parent_div.firstElementChild)
            }
        }

       

        while (parent_div.firstChild) {
            console.log("first child")
            parent_div.removeChild(parent_div.firstElementChild)
        }


        console.log("not Empty")
        clearInterval(interval)
        button.value = "Refresh"
        
        fetch('https://api.jikan.moe/v3/search/anime?q=' + search.value + '&page=1' + search.value + "&page=1").then(response => {
            return response.json()
        }).then(blob => {
            while(num2<50){
                console.log(blob.results[num2].type)
                console.log(blob)
                console.log(blob.results[num2].image_url)
                let ending_themes = document.createElement("p")
                let div = document.createElement("div")
                let p = document.createElement("p")
                let p2 = document.createElement("p")
                let type = document.createElement("p")
                let image = document.createElement("img")
                let themes = document.createElement("p")
                let time_duration = document.createElement("p")
    
                parent_div.appendChild(div)
                div.classList.add("class")
    
                div.appendChild(image)
                div.appendChild(themes)
                div.appendChild(ending_themes)
                div.appendChild(p2)
                div.appendChild(type)
                div.appendChild(time_duration)
                div.appendChild(p)
                
                p2.classList.add("p")
                console.log(blob.results)
                image.src = blob.results[num2].image_url
                type.innerText = "Type: " + blob.results[num2].type
                p2.innerHTML = blob.results[num2].title
                themes.innerHTML = "Rated: " + blob.results[num2].rated
                time_duration.innerHTML = "Total episodes:" + blob.results[num2].episodes
                p.innerHTML = blob.results[num2].synopsis
                //    time_duration.innerHTML = blob.prop.from.day + "/" + blob.prop.from.month + "/" + blob.prop.from.year + "-" + + blob.prop.to.day + "/" + blob.prop.to.month + "/" + blob.prop.to.year
                if (p.innerHTML == "undefined") {
                    document.body.removeChild(div)
                }
                if (time_duration.innerHTML == "null") {
                    time_duration.innerHTML = "OnGoing"
                }
    
    
                num2++
            }
            
            // console.log("Searched Url Is " + blob.result.image_url)
        })

    } else {
        window.location.reload()
    }
}

