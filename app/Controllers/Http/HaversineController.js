'use strict'

class HaversineController {

    async sort ({ request, response, auth }) {
        console.log('HaversineController.sort()')

        const places = JSON.parse(request.input('places'));
        const startPoint = auth.user;


        var auxDist = [];
        
        for (const i = 0; i < places.length; i++){

                var R = 6.371;
                
                var dLon = this.deg2rad(parseFloat(places[i].lng) - parseFloat(startPoint.lng));
                var dLat = this.deg2rad(parseFloat(places[i].lat) - parseFloat(startPoint.lat));
                var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this.deg2rad(places[i].latat)) * Math.cos(this.deg2rad(startPoint.lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                distance = R * c * 1000;
                
                auxDist.push(distance);
        }

        return response.send("{\"sorted\":" + JSON.stringify(auxDist) + "}");
    }

}

module.exports = HaversineController
