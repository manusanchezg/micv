var database = firebase.database()

database.ref ('InfoPersonal').once('value',(data)=>{
    
    var datos = data.val()
    $(".nombre").val(datos.Nombre)
    $(".apellido").val(datos.Apellido)
    $(".hobbies").val(datos.Hobbies) 
    $(".nacimiento").val(datos.Nacimiento)

})
$(".saveInfo").click(()=>{
    var nombre =$(".nombre").val()
    var apellido =$(".apellido").val()
    var hobbies =$(".hobbies").val()
    var nacimiento=$(".nacimiento").val()
    
    database.ref("InfoPersonal").update({
        "Nombre":nombre,
        "Apellido":apellido,
        "Hobbies":hobbies,
        "Nacimiento":nacimiento,
    })
})

/**
database.ref("/referencia").set()  -> sobreescribe la referencia
database.ref("/referencia").update() -> actualiza los elementos definidos
database.ref("/referencia").remove() -> elimina todos los datos de la referencia
 * 
 * 
 * 
 * 
 *  {trabajo1:{empresa:1},trabajo2:{empresa:2}}
 */

database.ref('Experiencia').on('value',(datos)=>{
    var info = datos.val()
    var htmltext= ""
    for( var i in info ){
    var elem = info[i]
    htmltext+= `<div>
                    <div> Empresa:${elem.Empresa}</div><div> Desde:${elem.desde}</div>
                    <div> Hasta:${elem.hasta}</div>
                    <div> Cargo:${elem.cargo}</div>
                    <button type='button' class='btn btn-outline-primary' onclick= 'rellenarFormulario("${elem.id}","${elem.Empresa}","${elem.desde}","${elem.hasta}","${elem.cargo}")'>Editar</button>
                    <button type='button' class='btn btn-outline-primary' onclick='borrarElemento("${elem.id}")' > Borrar</button>
</div>`
    }
        $(".experiencia").html(htmltext)
})
function rellenarFormulario(key,Empresa,desde,hasta,cargo){
     $('.empresa').val(Empresa)
     $('.desde').val(desde)
     $('.hasta').val(hasta)
     $('.cargo').val(cargo)
     $('.btnGuardar').fadeOut()
     $('.btnEditar').fadeIn()
     $('.btnEditar').attr('firebaseid', key)
}
$(".btnEditar").click(()=>{
    var id=$(".btnEditar").attr("firebaseid")
    var empresa=$('.empresa').val()
    var desde=$('.desde').val()
    var hasta=$('.hasta').val()
    var cargo=$(".cargo").val()
    database.ref('Experiencia/'+id).update({"Empresa":empresa,"desde":desde,"hasta":hasta,"id":id,"cargo":cargo})
})
$(".btnGuardar").click(()=>{
    var empresa=$('.empresa').val()
    var desde=$('.desde').val()
    var hasta=$('.hasta').val()
    var cargo=$(".cargo").val()
    var id = database.ref("experiencia").push().key
    database.ref('Experiencia/'+id).set({"Empresa":empresa,"desde":desde,"hasta":hasta,"id":id,"cargo":cargo})
})

$(".btnCancelar").click(()=>{
    $(".btnEditar").attr('firebaseid','')
 
    $(".btnGuardar").fadeIn()
    $(".btnEditar").fadeOut()
     
    $(".empresa").val('')
    $(".desde").val('')
    $(".hasta").val('')
    $(".cargo").val('')
 
 })
function borrarElemento(id){
    database.ref('Experiencia/'+id).set({})
}
