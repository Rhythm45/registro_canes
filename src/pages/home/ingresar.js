firebase.initializeApp({
    apiKey: "AIzaSyCr42ComYB8aMNGYWDs0nJKMYICJHza76U",
    authDomain: "prueba-25fd7.firebaseapp.com",
    projectId: "prueba-25fd7",
  });



var db = firebase.firestore();
//ingresar datos
function agregarDatos(){

var raza = document.getElementById("txt_raza").value;
var cantidad = document.getElementById("txt_cantidad").value;
var fecha = document.getElementById("txt_fecha").value;

/* esto se toma de firebase/firestore store agregar y administrar datos
*/



db.collection("Canes").add({
    raza: raza,
    cantidad: cantidad,
    fecha: fecha
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    
    document.getElementById("txt_raza").value = '';
    document.getElementById("txt_cantidad").value = '';
    document.getElementById("txt_fecha").value = '';
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});



}
//leer datos
var tabla = document.getElementById('tabla');
db.collection("Canes").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        tabla.innerHTML += `
        <tr>
        
        <td>${doc.data().raza}</td>
        <td>${doc.data().cantidad}</td>
        <td>${doc.data().fecha}</td>
        <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().raza}','${doc.data().cantidad}','${doc.data().fecha}')">Modificar</button></td>
        </tr>
      `
        

       
    });
});

//borrar datos
function eliminar(id){
db.collection("Canes").doc(id).delete().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
});

}

//modificar
function editar(id,raza,cantidad,fecha){


    document.getElementById('txt_raza').value = raza;
    document.getElementById('txt_cantidad').value = cantidad;
    document.getElementById('txt_fecha').value = fecha;
    var boton = document.getElementById('boton');
    boton.innerHTML = 'Modificar';

    boton.onclick = function(){

        var washingtonRef = db.collection("Canes").doc(id);

            // Set the "capital" field of the city 'DC'


            var raza = document.getElementById('txt_raza').value;
            var cantidad = document.getElementById('txt_cantidad').value;
            var fecha = document.getElementById('txt_fecha').value;


            return washingtonRef.update({
                raza: raza,
                cantidad: cantidad,
                fecha: fecha
            })
            .then(function() {
                console.log("Document successfully updated!");
                boton.innerHTML = 'Ingresar';
                boton.onclick = agregarDatos;

                document.getElementById('txt_raza').value = '';
                document.getElementById('txt_cantidad').value = '';
                document.getElementById('txt_fecha').value = '';
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });


    }


}