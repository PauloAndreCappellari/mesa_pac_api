'use strict'
const Database = use('Database')
const { route } = require("@adonisjs/framework/src/Route/Manager")
const Request = use('request');

var haversine = use('./HaversineController');

class PlaceController {

    async listAll ({ request, response, view }) {
        console.log('PlaceController.listAll')
        
        
        return await Database.table('places').orderBy('name', 'asc')
    }

    async listByUser ({ request, response, params }) {
        console.log('PlaceController.listByUser')
        return await Database.table('places').where('user_id', params.user_id).orderBy('name', 'asc')
        
    }

    async listById ({ request, response, params }) {
        console.log('PlaceController.listById')
        return await Database.table('places').where('id', params.id)
        
    }

    async insert ({ request, response }) {
        console.log('PlaceController.insert')
        return await Database.table('places').insert({
            'user_id': request.input('user_id'),
            'name': request.input('name'),
            'description': request.input('description'),
            'lat': request.input('lat'),
            'lng': request.input('lng'),
            'address': request.input('address')
        })
        
    }

    async deleteById({ request, response, params }) {
        console.log('PlaceController.deleteById')
        return await Database.table('places').where('id', params.id).delete()
        
    }
    
    async deleteAll({ request, response }) {
        console.log('PlaceController.deleteAll')
        return await Database.table('places').delete()
        
    }

}

module.exports = PlaceController