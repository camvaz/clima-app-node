const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');

const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Direccion de la ciudad para obtener su clima',
        demand: true
    }
}).argv

let getInfo = async(direccion) => {
    try {
        let coors = await lugar.getLugarLatLong(direccion);
        let temp = await clima.getClima(coors.lag, coors.lng);

        return `El clima en ${coors.direccion} es de ${temp}`;
    } catch (e) {
        return `No se pudo encontrar el clima en ${direccion}`;
    }
}

getInfo(argv.direccion)
    .then(msg => console.log(msg))
    .catch(e => console.log(e));



/* lugar.getLugarLatLong(argv.direccion)
    .then(resp => { console.log(resp); })
    .catch(e => console.log(e));

clima.getClima(9.9280694, -84.0907246)
    .then(temp => console.log(temp))
    .catch(err => console.log(err)); */

//console.log(argv.direccion);

/* let encodedUrl = encodeURI(argv.direccion);

axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedUrl}`)
    .then(resp => {
        let location = resp.data.results[0];
        let coors = location.geometry.location

        console.log(`Direccion: ${location.formatted_address}`);
        console.log(`Latitud: ${coors.lat}`);
        console.log(`Longitud: ${coors.lng}`);
        //console.log(JSON.stringify(resp.data, undefined, 2));
        //console.log(resp.status);
    })
    .catch(e => console.log('ERROR!!', e)); */