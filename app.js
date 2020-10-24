const express=require('express');
const Nexmo=require('nexmo')
const ejs=require('ejs')
const bodyParser=require('body-parser');
const socketio=require('socket.io')

//Init Nexmo
const nexmo=new Nexmo({
    apiKey:'816c8107',
    apiSecret:'wUTje5sTo9KnJAGY',
},{debug:true});

//Init app
const app=express();

//template engine setup
app.set('view engine','html');
app.engine('html',ejs.renderFile);

//public folder setup
app.use(express.static(__dirname+'/public'));

//bodyParser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//Index route
app.get('/',(req,res)=>{
    res.render('index')
})


//receive data from form
app.post('/',(req,res)=>{
    // res.send(req.body);
    // console.log(req.body);
    const number=req.body.number;
    const text=req.body.text;
    const from="A1 Broadband"
    nexmo.message.sendSms(from,number,text ,{type:'unicode'},
    (err,response)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(response);
            const data={
                id:response.messages[0]['message-id'],
                number:response.messages[0]['to']
            }
            io.emit('smsStatus',data)
        }
    }
  )
 }
)

// define port
const port=3000

//define server
const server=app.listen(port,()=>{console.log(`server started on ${port}`)});


//Connect socket.io
const io=socketio(server);
io.on('connection',(socket)=>{
    console.log("connected");
    io.on('disconnect',()=>{
        console.log('Disconnected');
    })
})