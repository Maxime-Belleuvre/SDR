


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
                removeSelected(data.class);
                idClass.classList.add("selected");
                
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
function banClass(arr1,arr2,pick,data){


    
    if(arr1.length >= 3 && arr2.length >= 3){
        console.log("coucou");
        
        
        if(pick.length === 0 || pick.length === 3){
            console.log("coucou");
            resetBanStyle(data);
            arr2.push(document.querySelector(".selected").getAttribute("id"))
                arr1.forEach(element =>{
                    
                if(document.getElementById(element)){
                    document.getElementById(element).classList.add("classBan");
                    }
                })
                
        }else if(pick.length === 1){
            console.log("aurevoir");
            resetBanStyle(data);
            arr1.push(document.querySelector(".selected").getAttribute("id"))
                arr1.forEach(element =>{
  
                if(document.getElementById(element)){
                    document.getElementById(element).classList.add("classBan");
                    }
                })
                
        }else{
            resetBanStyle(data);
            arr1.push(document.querySelector(".selected").getAttribute("id"))
            arr2.forEach(element =>{
                    
                if(document.getElementById(element)){
                    document.getElementById(element).classList.add("classBan");
                    }
                })
           
        }
        pick.push(document.querySelector(".selected").getAttribute("id"))
        document.getElementById("playerSelect").textContent = `Au joueur ${pick.length+1} de PICK`;
        for(let i=1; i<pick.length+1; i++) {   
            document.getElementById(`player${i}Img`).src = data[pick[i-1]-1].url;
           
 
        }
        
    }
    

    if( arr1.length < 4 && arr2.length < 4){

        if(arr1.length<=arr2.length){
            resetBanStyle(data);
            document.getElementById("playerSelect").textContent = "A l'équipe 2 de BAN";
            arr2.forEach(element =>{
                if(document.getElementById(element)){
                    document.getElementById(element).classList.add("classBan");
                }
            })
            arr1.push(document.querySelector(".selected").getAttribute("id")) 
        }else{
            document.getElementById("playerSelect").textContent = "A l'équipe 1 de BAN";
            
            resetBanStyle(data);
            arr1.forEach(element =>{
                if(document.getElementById(element)){
                    document.getElementById(element).classList.add("classBan");
                }
            })
            arr2.push(document.querySelector(".selected").getAttribute("id"))
        }
    
    if(arr2.length === 3){
        resetBanStyle(data);
        document.getElementById("playerSelect").textContent = `Au joueur 1 de PICK`;
        arr2.forEach(element =>{
                    
            if(document.getElementById(element)){
                document.getElementById(element).classList.add("classBan");
                }
            })
    }







        for(let i=1;i<arr1.length+1;i++){
            document.getElementById(`team1Emplacement${i}`).src = data[arr1[i-1]-1].url;
        }
        for(let i=1;i<arr2.length+1;i++){
            document.getElementById(`team2Emplacement${i}`).src = data[arr2[i-1]-1].url;
        }
    }
    

    removeSelected(data)
    if(pick.length === 4){
        document.getElementById("playerSelect").textContent = "Début du combat";
    }
}




getData("json/class.json");

