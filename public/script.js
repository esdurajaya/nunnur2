const firebaseConfig = {
  apiKey: "AIzaSyCKclix8_WYlVcTahkq4aUxP8m2sJ-3rFA",
  authDomain: "studio-3410504777-deb98.firebaseapp.com",
  projectId: "studio-3410504777-deb98",
  storageBucket: "studio-3410504777-deb98.firebasestorage.app",
  messagingSenderId: "292119707666",
  appId: "1:292119707666:web:8f525f7347b9020b5218cb"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

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
