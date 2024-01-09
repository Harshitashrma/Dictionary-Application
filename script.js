const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
let searchBtn=document.querySelector("#search-btn");
let result=document.querySelector(".result");
const sound = document.getElementById("sound");

searchBtn.addEventListener("click",async ()=>{
    let input = document.getElementById("textinput").value.trim();

    if (input.length === 0) {
        result.innerHTML = `<h3 class="error">Please enter a word</h3>`;
        return;
    }
    try{
        const response = await fetch(`${url}${input}`);
        const data = await response.json();

       if(data.length>0)
       {
        result.innerHTML=`<div class="word">
        <h3>${input}</h3>
        <button id="soundBtn">
        <i class="ri-volume-up-line"></i>
                    </button>
    </div>

    <div class="details">
        <p>${data[0].meanings[0].partOfSpeech}</p>
        <p>/${data[0].phonetic}/</p>
    </div>
    <p class="word-meaning">${data[0].meanings[0].definitions[0].definition}</p>
    <p class="word-example">${data[0].meanings[0].definitions[0].example ||""}</p>`
    const soundBtn = document.getElementById("soundBtn");
            soundBtn.addEventListener("click", () => {
                const audioSrc = data[0]?.phonetics[0]?.audio || "";
                if (audioSrc) {
                    const audio = new Audio(`https:${audioSrc}`);
                    audio.play();
                }
            });
        }
       else {
        result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
    }
    }
    catch (error) {
        result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
    }
})
function playSound() {
    sound.play();
}
