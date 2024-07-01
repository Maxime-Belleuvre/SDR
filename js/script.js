


function getData(url){
    fetch(url)
    .then(res => res.json())
    .then(data => {
        createClassList(data.class);
        let banTeam1 =[];
        let banTeam2 =[];
        let pick =[];

        for(let i = 0; i < data.class.length; i++){
            let idClass = document.getElementById(i+1); 
            idClass.addEventListener("click", ()=>{
                console.log(idClass.className);
                removeSelected(data.class);
                if (idClass.className != "listClass__class classBan") {
                    idClass.classList.add("selected");
                }else{
                    
                    document.getElementById("btnSumitClassAlerte").classList.add("active");
                }
                
                
            })
        }
        document.getElementById("btnSubmitClass").addEventListener("click",()=> banClass(banTeam1,banTeam2,pick,data.class))
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

function storeBan(arr){
    arr.push(document.querySelector(".selected").getAttribute("id"))
}
function storePick(arr){
    arr.push(document.querySelector(".selected").getAttribute("id"))
}




function displayOthersBan(arrDisplay,data){

    resetBanStyle(data);
    arrDisplay.forEach(element =>{
                    
        if(document.getElementById(element)){
            document.getElementById(element).classList.add("classBan");
            }
        })
}

function displaySelfBan(arr,data,numTeam){
    for(let i=1;i<arr.length+1;i++){
        document.getElementById(`team${numTeam}Emplacement${i}`).src = data[arr[i-1]-1].url;
    }
}

function banClass(arr1,arr2,pick,data){


    if(arr1.length >= 3 && arr2.length >= 3){       
        if(pick.length%2 === 0){
            storeBan(arr1)
            displayOthersBan(arr2,data);

        }else{
            storeBan(arr2)
            displayOthersBan(arr1,data)
        }
        storePick(pick);
        document.getElementById("playerSelect").textContent = `Au joueur ${pick.length+1} de PICK`;
        for(let i=1; i<pick.length+1; i++) {   
            document.getElementById(`player${i}Img`).src = data[pick[i-1]-1].url;
        }   
    }else{
        if(arr1.length<=arr2.length){
            storeBan(arr1)
            displayOthersBan(arr2,data)
            document.getElementById("playerSelect").textContent = "A l'équipe 1 de BAN"; 
        }else{
            document.getElementById("playerSelect").textContent = "A l'équipe 2 de BAN";
            storeBan(arr2)
            displayOthersBan(arr1,data)
        }

        if(arr2.length === 3){
        
            document.getElementById("playerSelect").textContent = `Au joueur 1 de PICK`;
            displayOthersBan(arr1,data)
        }

        displaySelfBan(arr1,data,2);
        displaySelfBan(arr2,data,1);

    }
    
    removeSelected(data)
    if(pick.length === 4){
        resetBanStyle(data)
        document.getElementById("playerSelect").textContent = "Début du combat";
        document.getElementById("playerSelect").classList.add("active");

    }
    document.getElementById("btnSumitClassAlerte").classList.remove("active");
}



getData("json/class.json");

