const socket = io();
let username = "";

function setUsername(){
  const u = document.getElementById("username").value;
  if(u){
    username = u;
    document.getElementById("login").style.display="none";
    document.getElementById("chat").style.display="flex";
  }
}

function sendMessage(){
  const input = document.getElementById("input");
  if(input.value){
    const now = new Date();
    socket.emit("chat",{
      name: username,
      text: input.value,
      time: now.toLocaleDateString("id-ID")+" • "+
            now.toLocaleTimeString("id-ID",{hour:'2-digit',minute:'2-digit'})
    });
    input.value="";
  }
}

function addEmoji(e){
  document.getElementById("input").value += e;
}

socket.on("chat", msg=>{
  const li = document.createElement("li");
  li.innerHTML = `<div class="username">${msg.name}</div>
                  <div>${msg.text}</div>
                  <div class="time">${msg.time}</div>`;
  li.className = msg.name===username?"me":"other";
  document.getElementById("messages").appendChild(li);
});