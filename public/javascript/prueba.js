function visualizar(nombre,edad, sede ){
        Swal.fire({
            icon: 'info',
            title: 'Detalles del empleado',
            text : "Nombre: " + nombre + " Edad: " + edad + " Sede: " + sede, 
            showConfirmButton: false,
            timer: 5000
            })
}