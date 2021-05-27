//MAKE CONNECTION
const socket = io();

//Query Dom
const message = document.querySelector('#message'),
      handle = document.querySelector('#handle'),
      btn = document.querySelector('#send'),
      output = document.querySelector('#output'),
      feedback = document.querySelector("#feedback");
//Emit events when someone send
btn.addEventListener('click',()=>{
    socket.emit('chat', {
        message:message.value,
        handle:handle.value
    });
    message.value = '';

})

message.addEventListener('keypress',(e)=>{
    socket.emit('typing',{handle:handle.value})
})

//listen for events
socket.on('chat',(data)=>{
    feedback.innerHTML = '';
    output.innerHTML += `<p ><strong><span class="primary-color">${data.handle}</span> : ${data.message}</strong></p>`;
})

socket.on('typing',(data)=>{
    feedback.innerHTML = `<p class="faded-color"><em> ${data.handle} is typing....</em></p>`
})