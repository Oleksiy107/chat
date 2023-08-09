const messageArea = document.getElementById('messageArea');
const btnHidden = document.getElementById('connectChat');
const box = document.getElementById('hidden');
const socket = io();
const form = document.getElementById('form');
const myname = document.getElementById('myname');
const message = document.getElementById('message');
const send = document.getElementById('sendMessage')

function checkName(){
   if( myname.value.trim() === ''){
    alert("Name must be filled out");
    return
   }
   box.style.display = 'none';
   form.style.display = 'block';
}
btnHidden.addEventListener('click', checkName)
form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (message.value) {
        socket.emit('send name', myname.value);
        socket.emit('send message', message.value);
        message.value = '';
    }
});
function formatDate(date) {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
}

socket.on('send name', (username) => {
    const nameWithDateMessage = document.createElement('p');   
    nameWithDateMessage.id = 'messageName'
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    nameWithDateMessage.textContent = `${formattedDate} - ${username}:`;
    
    messageArea.appendChild(nameWithDateMessage);
  
});

        socket.on('send message', (chat) => {
             nameWithDateMessage = document.createElement('span');
             nameWithDateMessage.textContent = chat;
            messageArea.appendChild(nameWithDateMessage);
        })
        socket.emit('send message', send.value); 
    
// send.addEventListener('click',(checkMessage))
