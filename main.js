let activityTypes = ["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"];

console.log(axios);
activityTypes.forEach(type => {
    let option = document.createElement("option")
    option.value = type;
    option.innerHTML = type;
    document.querySelector("#typeDropdown").append(option);
    
})

let getData = async (url) => {

    let participants = document.querySelector("[name='participants']:checked").value;
    let activityType = document.querySelector("#typeDropdown");

    let parameters = {
        participants: participants,
        type: activityType.value,
    }

    if(document.querySelector("#free").checked){
        parameters.price = "0.0";
    }

    let response = await axios.get(url, {
        params: parameters
    });
    return response.data
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