


function getData(url){
    fetch(url)
    .then(res => res.json())
    .then(data => {
        createClassList(data.class);
        let banTeam1 =[];
        let banTeam2 =[];

        for(let i = 0; i < data.class.length; i++){
            let idClass = document.getElementById(i+1);

            idClass.addEventListener("click", ()=>{
                removeSelected(data.class);
                idClass.classList.add("selected");
                
            })
        }
        document.getElementById("btnSubmitClass").addEventListener("click",()=> banClass(banTeam1,banTeam2,data.class))
    })
}


function createClassList(data){
    data.forEach(element => {
        let div = document.createElement("div");
        let div2 = document.createElement("div");
        let img = document.createElement("img");
        let h2 = document.createElement("h2");
        
        div.id = element.id;
        div.classList.add("listClass__class");
        img.classList.add("listClass__class--img");
        h2.classList.add("listClass__class--name");
        
        
        img.src = element.url;
        h2.textContent = element.name;
        
        div.appendChild(div2);
        div.appendChild(img);
        div.appendChild(h2);

        document.getElementById("listClass").appendChild(div);
        
    });
}


function removeSelected(data){
    for(let i=0; i<data.length; i++){
        document.getElementById(i+1).classList.remove("selected");
    }
}
function resetBanStyle(data){
    for(let i=1; i<data.length+1; i++){
        document.getElementById(i).classList.remove("classBan");
    }
}
function banClass(arr1,arr2,data){
    resetBanStyle(data);
    if(arr1.length<=arr2.length){

        arr2.forEach(element =>{
            console.log(document.getElementById(element));
            if(document.getElementById(element)){
                document.getElementById(element).classList.add("classBan");
            }
        })
        arr1.push(document.querySelector(".selected").getAttribute("id")) 
    }else{
        arr1.forEach(element =>{
            if(document.getElementById(element)){
                document.getElementById(element).classList.add("classBan");
            }
        })
        arr2.push(document.querySelector(".selected").getAttribute("id"))
    }



    for(let i=1;i<arr1.length+1;i++){
        document.getElementById(`team1Emplacement${i}`).src = data[arr1[i-1]-1].url;
    }
    for(let i=1;i<arr2.length+1;i++){
        document.getElementById(`team2Emplacement${i}`).src = data[arr2[i-1]-1].url;
    }
    removeSelected(data)

    console.log(arr1,arr2);
}




getData("json/class.json");

