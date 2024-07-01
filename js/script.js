


function getData(url){
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data.class);
        createClassList(data.class);
        let banTeam1 =[];
        let banTeam2 =[];

        for(let i = 0; i < data.class.length; i++){
            let idClass = document.getElementById(i+1);
            console.log(idClass)
            idClass.addEventListener("click", ()=>{
                removeSelected(data.class);
                idClass.classList.add("selected");
                
            })
            /* document.getElementById(`${i}`).addEventListener("click",() => document.getElementById(`${i}`).classList.add("selected")); */
        }
        
    })
}


function createClassList(data){
    for(let i=0; i<data.length; i++){
        let div = document.createElement("div");
        let img = document.createElement("img");
        let h2 = document.createElement("h2");
        
        div.id = i+1;
        div.classList.add("listClass__class");
        img.classList.add("listClass__class--img");
        h2.classList.add("listClass__class--name");
        
        
        img.src = data[i].url;
        h2.textContent = data[i].name;
        

        div.appendChild(img);
        div.appendChild(h2);

        document.getElementById("listClass").appendChild(div);
  
    };
}


function removeSelected(data){
    for(let i=0; i<data.length; i++){
        document.getElementById(i+1).classList.remove("selected");
    }
}

function banClass(arr){

}
getData("SDR/json/class.json");

