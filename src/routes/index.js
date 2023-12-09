const express = require('express');
const router = express.Router();
const fs = require('fs');

const json_pacientes = fs.readFileSync('src/pacientes.json', 'utf-8');
let pacientes = JSON.parse(json_pacientes);

router.get('/', (req, res) => {
    res.render('index.ejs', {pacientes});
})

router.get('/new-entry', (req, res) => {
    res.render('new-entry');
})

function determinarEnfermedad(newPaciente){
    let ira = 0;
    let iranl = 0;
    let irang = 0;
    let ivu = 0;
    let ig = 0;

    for(let key in newPaciente){
        if(key.startsWith('p') && newPaciente[key] === "si"){
            if(key === 'p1' || key === 'p2' || key === 'p3' || key === 'p4' || key === 'p5' || key === 'p6' || key === 'p7' || key === 'p8' || key === 'p9'){
                ira++;
            } else if(key === 'p10'){
                iranl += 12345;
            } else if(key === 'p11'){
                irang += 54321;
            } else if(key === 'p12' || key === 'p13' || key === 'p14' || key === 'p15' || key === 'p16' || key === 'p17' || key === 'p18' || key === 'p19' || key === 'p20'){
                ivu++;
                if(key === 'p17' || key === 'p20'){
                    ig++;
                }
            } else if(key === 'p22' || key === 'p23' || key === 'p24' || key === 'p25' || key === 'p26' || key === 'p27' || key === 'p28' || key === 'p29'){
                ig++;
            }
        }
    }

    const puntuacionEnfermedades = [ira, iranl, irang, ivu, ig];

    let maximo = puntuacionEnfermedades[0];
    let indice = 0;
    let enfermedadPaciente;

    for(let i = 0; i < puntuacionEnfermedades.length; i++){
        if (maximo < puntuacionEnfermedades[i]) {
            maximo = puntuacionEnfermedades[i];
            indice = i;
        }
    }

    if(indice == 0){
        enfermedadPaciente = "Infeccion Respiratoria Aguda";
    } else if(indice == 1){
        enfermedadPaciente = "Infeccion Respiratoria Aguda con Neumonia Leve"
    } else if(indice == 2){
        enfermedadPaciente = "Infeccion Respiratoria Aguda con Neumonia Grave"
    } else if(indice == 3){
        enfermedadPaciente = "Infeccion Vias Urinarias"
    } else if(indice == 4){
        enfermedadPaciente = "Infeccion Gastrointestinal"
    }

    return enfermedadPaciente;
}

var fecha = new Date();

router.post('/new-entry', (req, res) => {
    const {nombre, apellido, email, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19, p20, p21, p22, p23, p24, p25, p26, p27, p28, p29} = req.body;
    var newPaciente = {
        nombre,
        apellido,
        email, 
        p1, 
        p2, 
        p3, 
        p4, 
        p5, 
        p6, 
        p7, 
        p8, 
        p9, 
        p10, 
        p11, 
        p12, 
        p13, 
        p14, 
        p15, 
        p16, 
        p17, 
        p18, 
        p19, 
        p20, 
        p21, 
        p22, 
        p23, 
        p24, 
        p25, 
        p26, 
        p27, 
        p28, 
        p29
    };

    function actualizarNewPaciente(nombre, apellido, email, fecha, enfermedad){
    newPaciente = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        fecha: fecha.getDate() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getFullYear(),
        enfermedad: determinarEnfermedad(newPaciente)
    };

    return newPaciente;
}

    let enfermedad = determinarEnfermedad(newPaciente);

    newPaciente = actualizarNewPaciente(nombre, apellido, email, fecha, enfermedad);

    pacientes.push(newPaciente);

    const json_pacientes = JSON.stringify(pacientes);
    fs.writeFileSync('src/pacientes.json', json_pacientes, 'utf-8');

    res.redirect('#resultados')
});

module.exports = router;