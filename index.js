var database = firebase.database()

database.ref('presentacion').once('value',(datos)=>{
    var info = datos.val()
    $('.presentacion').text(info.hola)
    $('.presentacion').text(info.resumen)
  //  $('.presentacion').text(info.sobremi)
    console.log(info)
})

