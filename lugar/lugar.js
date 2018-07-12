const axios = require('axios');

const getLugarLatLong = async(direccion) => {

    let encodedUrl = encodeURI(direccion);

    let respuesta = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedUrl}`);

    if (respuesta.data.status === 'ZERO_RESULTS') {
        throw new Error(`No hay resultados para la ciudad ${ direccion }`);
    }

    let location = respuesta.data.results[0];
    let coors = location.geometry.location;

    /*  console.log(`Direccion: ${location.formatted_address}`);
         console.log(`Latitud: ${coors.lat}`);
         console.log(`Longitud: ${coors.lng}`);
         //console.log(JSON.stringify(resp.data, undefined, 2));
         //console.log(resp.status); */

    return {
        direccion: location.formatted_address,
        lag: coors.lat,
        lng: coors.lng
    }
}

module.exports = {
    getLugarLatLong
}