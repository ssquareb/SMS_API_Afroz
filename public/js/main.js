const numberInput=document.getElementById('number'),
    messageInput=document.getElementById('msg'),
    sendButton=document.getElementById('sendButton'),
    responseData=document.querySelector('.response')

sendButton.addEventListener('click', send, false);

const socket=io();
socket.on('smsStatus',(data)=>{
    responseData.innerHTML='<h5>Text message sent to :  '+ data.number +'</h5>';
})

function send(){
    const number=numberInput.value.replace(/\D/g,'')
    const msg=messageInput.value

    fetch('/',{
        method:'post',
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify({number:number, text:msg})
    })
    .then((res)=>{
        console.log(res);
    })
    .catch((err)=>{
        console.log(err);
    })
}
