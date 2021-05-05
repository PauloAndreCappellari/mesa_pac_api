'use strict'

class HaversineController {
    deg2rad(deg) {
        return deg * (Math.PI / 180);
    }

    async sort ({ request, response, auth }) {
        console.log('HaversineController.sort()')

        const places = JSON.parse(request.input('places'));
        console.log(places);
        const startPoint = auth.user;
        console.log('user: ' + startPoint.lat);

        var auxDist = [];
        
        for (const place of places){

                var R = 6.371;
                
                var dLon = this.deg2rad(parseFloat(place.lng) - parseFloat(startPoint.lng));
                var dLat = this.deg2rad(parseFloat(place.lat) - parseFloat(startPoint.lat));
                var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this.deg2rad(place.lat)) * Math.cos(this.deg2rad(startPoint.lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                var distance = R * c * 1000;
                
                auxDist.push({"place_id": place.id,"distance":distance});
        }

        const sorted = auxDist.sort(function(a, b) {
            return parseFloat(a.distance) - parseFloat(b.distance);
        });

        return response.send("{\"sorted\":" + JSON.stringify(sorted)+ "}");
    }

}

module.exports = HaversineController