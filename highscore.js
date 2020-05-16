$(document).ready(function() {

    function createHighScoreList(){
        console.log("grab high score")
        const highScore = JSON.parse(window.localStorage.getItem("highScore")) || []
         highScore.map(({score,name})=>{
            const listEl = document.createElement("li")
            listEl.classList.add("list-group-item")
            listEl.innerHTML = `${name} - ${score}`
            document.getElementById("highScoreList").appendChild(listEl)


         })
        
    }
    createHighScoreList()
});
