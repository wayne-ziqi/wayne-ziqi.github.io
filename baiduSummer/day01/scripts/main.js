let heading1 = document.querySelector("h1");
heading1.textContent = "hello world test file";

document.getElementById("button1").onclick = function(){
    document.querySelector("p").style = "color: red";
}

// $("#button1").get(0).onclick = function(){
//     document.querySelector("p").style = "color: red";
// }

document.getElementById("button2").onclick = function(){
    document.querySelector("p").style = "color: aqua";
}