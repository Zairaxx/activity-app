let activityTypes = ["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"];

activityTypes.forEach(type => {
    let option = document.createElement("option")
    option.value = type;
    option.innerHTML = type;
    document.querySelector("#typeDropdown").append(option);
    
})

let getData = async (url) => {

    let participants = document.querySelector("[name='participants']:checked");
    console.log(participants);
    let queries = "?";

    if(participants !== null) {
        queries+= `participants=${participants.value}`
    }

    let activityType = document.querySelector("#typeDropdown");

    if(activityType.value !== "all"){
        if(queries === "?"){
            queries+=`type=${activityType.value}`    
        } else {
            queries+=`&type=${activityType.value}`
        }
    }

    if(document.querySelector("#free").checked){
        if(queries === "?"){
            queries+="price=0.0";
        } else {
            queries+="&price=0.0";
        }
    }

    let response = await fetch(url + queries);
    let data = await response.json();
    return data;
}

let renderActivity = async () => {
    let activityObj = await getData("http://www.boredapi.com/api/activity/");
    console.log(activityObj);

    let {activity,price,participants,type} = activityObj

    document.querySelector("#activity-container").innerHTML =
    `
        <p>Activity: ${activity}</p>
        <p>Price: ${price}</p>
        <p>Participants: ${participants}</p>
        <p>type: ${type}</p>
    `
}

renderActivity();

document.querySelector("#getActivity").addEventListener("click",() => {
    renderActivity();    
})