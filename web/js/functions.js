//functions.js
let data = {
    "preguntes": [
      {
        "id": 1,
        "pregunta": "Quin senyal indica que has de cedir el pas?",
        "respostes": [
          "Senyal de stop",
          "Senyal de cedir el pas",
          "Senyal de prohibició"
        ],
        "resposta_correcta": 1,
        "imatge": "senyal_cedir_el_pas.jpg"
      },
      {
        "id": 2,
        "pregunta": "Què significa una línia continua al centre de la carretera?",
        "respostes": [
          "Es permet avançar",
          "Està prohibit avançar",
          "Només es permet avançar per motocicletes"
        ],
        "resposta_correcta": 1,
        "imatge": "linia_continua.jpg"
      },
      {
        "id": 3,
        "pregunta": "Quina és la velocitat màxima per a cotxes en autopistes?",
        "respostes": [
          "100 km/h",
          "120 km/h",
          "130 km/h"
        ],
        "resposta_correcta": 1,
        "imatge": "autopista.jpg"
      },
      {
        "id": 4,
        "pregunta": "Què indica el senyal de triangle amb un cérvol?",
        "respostes": [
          "Perill de pas de vianants",
          "Perill d'animals salvatges",
          "Perill de corbes pronunciades"
        ],
        "resposta_correcta": 1,
        "imatge": "senyal_cervol.jpg"
      },
      {
        "id": 5,
        "pregunta": "Com es diu el dispositiu que redueix la velocitat en una intersecció?",
        "respostes": [
          "Cinturó de seguretat",
          "ABS",
          "Retenció"
        ],
        "resposta_correcta": 2,
        "imatge": "abs.jpg"
      },
      {
        "id": 6,
        "pregunta": "Quin vehicle té prioritat en una rotonda?",
        "respostes": [
          "El vehicle que està dins de la rotonda",
          "El vehicle que s'incorpora a la rotonda",
          "Els vianants"
        ],
        "resposta_correcta": 0,
        "imatge": "rotonda.jpg"
      },
      {
        "id": 7,
        "pregunta": "Quin color té el senyal d'obligació?",
        "respostes": [
          "Vermell",
          "Blau",
          "Groc"
        ],
        "resposta_correcta": 1,
        "imatge": "senyal_obligacio.jpg"
      },
      {
        "id": 8,
        "pregunta": "Quina funció té l'indicador de llum verda al tauler del vehicle?",
        "respostes": [
          "Indica les llums de carretera",
          "Indica les llums curtes",
          "Indica les llums antiboira"
        ],
        "resposta_correcta": 1,
        "imatge": "llums_vehicles.jpg"
      },
      {
        "id": 9,
        "pregunta": "Quin tipus de vehicles tenen prioritat en carreteres amb pendents pronunciades?",
        "respostes": [
          "Vehicles que baixen",
          "Vehicles que pugen",
          "Vehicles d'emergència"
        ],
        "resposta_correcta": 1,
        "imatge": "pendent.jpg"
      },
      {
        "id": 10,
        "pregunta": "Quin és el límit legal d'alcohol per a conductors novells?",
        "respostes": [
          "0.3 g/l",
          "0.5 g/l",
          "0.0 g/l"
        ],
        "resposta_correcta": 0,
        "imatge": "alcohol.jpg"
      },
      {
        "id": 11,
        "pregunta": "Quan és obligatori fer servir les llums antiboira?",
        "respostes": [
          "En condicions de visibilitat reduïda",
          "De nit en ciutat",
          "En zones rurals"
        ],
        "resposta_correcta": 0,
        "imatge": "antiboira.jpg"
      },
      {
        "id": 12,
        "pregunta": "Com es diu el sistema que evita el bloqueig de les rodes en frenades brusques?",
        "respostes": [
          "ESP",
          "ABS",
          "Airbag"
        ],
        "resposta_correcta": 1,
        "imatge": "abs.jpg"
      },
      {
        "id": 13,
        "pregunta": "Què significa un senyal de prohibició amb una moto?",
        "respostes": [
          "Prohibició de circular motocicletes",
          "Prohibició d'aparcament per a motos",
          "Prohibició de passar per la vorera"
        ],
        "resposta_correcta": 0,
        "imatge": "prohibicio_moto.jpg"
      },
      {
        "id": 14,
        "pregunta": "Què has de fer si veus un senyal de pas de vianants?",
        "respostes": [
          "Reduir la velocitat",
          "Augmentar la velocitat",
          "Tocar el clàxon"
        ],
        "resposta_correcta": 0,
        "imatge": "pas_vianants.jpg"
      },
      {
        "id": 15,
        "pregunta": "Quin vehicle pot utilitzar el carril bus?",
        "respostes": [
          "Els autobusos",
          "Els taxis",
          "Els camions"
        ],
        "resposta_correcta": 0,
        "imatge": "carril_bus.jpg"
      },
      {
        "id": 16,
        "pregunta": "Quin senyal indica un perill imminent?",
        "respostes": [
          "Senyal triangular",
          "Senyal rodó",
          "Senyal rectangular"
        ],
        "resposta_correcta": 0,
        "imatge": "perill.jpg"
      },
      {
        "id": 17,
        "pregunta": "Què significa una línia discontinua?",
        "respostes": [
          "Es pot avançar",
          "Està prohibit avançar",
          "Només per a emergències"
        ],
        "resposta_correcta": 0,
        "imatge": "linia_discontinua.jpg"
      },
      {
        "id": 18,
        "pregunta": "Quan és necessari utilitzar el cinturó de seguretat?",
        "respostes": [
          "Només en carreteres",
          "Sempre",
          "Només en trajectes llargs"
        ],
        "resposta_correcta": 1,
        "imatge": "cinturo_seguretat.jpg"
      },
      {
        "id": 19,
        "pregunta": "Quina és la velocitat màxima en zones urbanes?",
        "respostes": [
          "30 km/h",
          "50 km/h",
          "70 km/h"
        ],
        "resposta_correcta": 1,
        "imatge": "zona_urbana.jpg"
      },
      {
        "id": 20,
        "pregunta": "Què significa una senyal de prohibit aparcar?",
        "respostes": [
          "No es pot aparcar",
          "Es pot aparcar en horaris determinats",
          "Es pot aparcar però no estacionar"
        ],
        "resposta_correcta": 0,
        "imatge": "prohibit_aparcar.jpg"
      },
      {
        "id": 21,
        "pregunta": "Què has de fer en cas d'un accident de trànsit?",
        "respostes": [
          "Abandonar el lloc ràpidament",
          "Esperar a la policia",
          "Donar auxili als ferits"
        ],
        "resposta_correcta": 2,
        "imatge": "accident.jpg"
      },
      {
        "id": 22,
        "pregunta": "Què significa una rllum taronja intermitent al semàfo?",
        "respostes": [
          "Cedir el pas",
          "Aturar-se completament",
          "Circular amb precaució"
        ],
        "resposta_correcta": 2,
        "imatge": "llum_taronja.jpg"
      },
      {
        "id": 23,
        "pregunta": "Quan es pot avançar per la dreta?",
        "respostes": [
          "En carreteres de dos sentits",
          "Quan el vehicle de davant gira a l'esquerra",
          "Sempre que hi hagi espai"
        ],
        "resposta_correcta": 1,
        "imatge": "avancar_dreta.jpg"
      },
      {
        "id": 24,
        "pregunta": "Quin senyal indica que no es pot girar a l'esquerra?",
        "respostes": [
          "Senyal de prohibició amb una fletxa cap a l'esquerra",
          "Senyal de direcció obligatòria",
          "Senyal de direcció prohibida"
        ],
        "resposta_correcta": 0,
        "imatge": "girar_esquerra.jpg"
      },
      {
        "id": 25,
        "pregunta": "Quina és la funció dels retrovisors?",
        "respostes": [
          "Veure el que passa darrere",
          "Reduir la velocitat",
          "Veure l'angle mort"
        ],
        "resposta_correcta": 0,
        "imatge": "retrovisors.jpg"
      },
      {
        "id": 26,
        "pregunta": "Què has de fer si veus un vehicle d'emergència amb les llums enceses?",
        "respostes": [
          "Continuar la marxa",
          "Aturar-te immediatament",
          "Cedir el pas"
        ],
        "resposta_correcta": 2,
        "imatge": "emergencia.jpg"
      },
      {
        "id": 27,
        "pregunta": "Com s'ha de circular en una carretera mullada?",
        "respostes": [
          "A major velocitat",
          "A menor velocitat",
          "Sense canviar la velocitat"
        ],
        "resposta_correcta": 1,
        "imatge": "carretera_mullada.jpg"
      },
      {
        "id": 28,
        "pregunta": "Quin tipus de rodes s'han d'utilitzar a l'hivern?",
        "respostes": [
          "Rodes d'estiu",
          "Rodes tot temps",
          "Rodes d'hivern"
        ],
        "resposta_correcta": 2,
        "imatge": "rodes_hivern.jpg"
      },
      {
        "id": 29,
        "pregunta": "Com has de circular en una zona residencial?",
        "respostes": [
          "A major velocitat",
          "A velocitat reduïda",
          "Com en una zona urbana"
        ],
        "resposta_correcta": 1,
        "imatge": "zona_residencial.jpg"
      },
      {
        "id": 30,
        "pregunta": "Què indica una llum blava al tauler del vehicle?",
        "respostes": [
          "Llums de carretera enceses",
          "Llums curtes enceses",
          "Llums d'estacionament enceses"
        ],
        "resposta_correcta": 0,
        "imatge": "llum_blava.jpg"
      }
    ]
}
for (let index = 0; index < data.preguntes.length; index++) {
  let pregunta = data.preguntes[index].pregunta;
  let respostes = data.preguntes[index].respostes;
  
  document.write(`<div class="pregunta">${pregunta}</div><br>`);

  document.write(`<br><img src="img/${data.preguntes[index].imatge}" class="question-image">`);

  document.write(`<div class="respuestas">`);
  for (let i = 0; i < respostes.length; i++) {
      let respuesta = respostes[i];
      document.write(`<button class="respuesta" onclick="mostrarSeleccion('${respuesta}')">${respuesta}</button>`);
  }
  
  document.write(`</div>`); // Cerrar el div de respuestas
  document.write("<br><br>");
}

function mostrarSeleccion(opcion) {
  alert(`Has pulsado la opción: ${opcion}`);
}
