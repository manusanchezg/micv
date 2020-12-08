var db = firebase.database()

db.ref('InfoPersonal').once('value',(datos)=>{
    var info = datos.val()
    console.log(info)
    $('.nombre').text(info.Nombre)
    $('.apellido').text(info.Apellido)
    $('.titulo').text(info.Titulo)
    $('.hobbies').text(info.Hobbies)
    $('.nacimiento').text(info.Nacimiento)
})
db.ref('Experiencia').once('value',(datos)=>{
    var info = datos.val()
    var htmltext = "<h1> Experiencia Laboral <h1>"
   
    for(var i in info){
        var elem = info[i]
        htmltext += `<div class='expdiv'> Empresa: ${elem.Empresa}</div><div class='expdiv'>${elem.desde}-${elem.hasta}</div>`
        $(".experiencia").html(htmltext)
    }
})

db.ref('Contacto').once('value',(datos)=>{
    var info = datos.val()
    var htmltext = "<h1> Contacto <h1>"
   
    for(var i in info){
        var elem = info[i]
        htmltext += `<a onclick='window.location' target='_new' href='' class='contacto badge badge-dark' style= 'display: inline-block; margin: 10px;'>${elem.id}</a>`
    }
    $("#Contacto").html(htmltext)
})

/*$('.C').hover(function(){
                      $(this).addClass("prueba")
                       }, function() {
                           $(this).removeClass('prueba')
                       })*/
$(".Boton1").click(function(){
    $(".card").slideToggle(1000)
})

/*$("#enviar").click(function(){
    $(".card").slideToggle(1000)
    
    $('#mail').val()
    var email= $('#mail').val()
    var contacto=  $('#nombre').val()
    var consulta= $('#consulta').val()
    var nuevoHtml="<p>"+email+"</p><p>"+contacto+"</p><p>"+consulta+"</p>"
    $('.datos').html(nuevoHtml)
})*/
function rellenarimg1(){
    var src = 'f5199442-5323-42fc-9134-f50bef3e4241.JPG'
    var nuevohtml = '<img src= "f5199442-5323-42fc-9134-f50bef3e4241.JPG" style="width:200px" style="height:300px">'
    
    $('#img1').html(nuevohtml)
}
rellenarimg1()

$("#enviar").click(()=>{
    $(".card").slideToggle(1000)
    var id = db.ref("Consulta").push().key
    var nombre=$('#nombre').val()
    var mail=$('#mail').val()
    var consulta=$('#consulta').val()
    db.ref('Consulta/'+id).set({"nombre":nombre,"mail":mail,"consulta":consulta,"id":id,})
})