'use strict'

class RatingController {

    async listAll ({ request, response }) {
        console.log('RatingController.listAll()')
        return await Database.table('ratings')
        
    }

    async listByUser ({ request, response, params }) {
        console.log('RatingController.listByUser()')
        return await Database.table('ratings').where('user_id', params.user_id)
        
    }

    async listById ({ request, response, params }) {
        console.log('RatingController.listById()')
        return await Database.table('ratings').where('id', params.id)
        
    }

    async listByPlace ({ request, response, params }) {
        console.log('RatingController.listByPlace()')
        return await Database.table('ratings').where('id', params.place_id)
        
    }

    async insert ({ request, response }) {
        console.log('RatingController.insert')
        return await Database.table('ratings').insert({
            'user_id': request.input('user_id'),
            'place_id': request.input('place_id'),
            'rating': request.input('rating'),
            'description': request.input('description')
        })
        
    }

    async deleteById({ request, response, params }) {
        console.log('RatingController.deleteById()')
        return await Database.table('ratings').where('id', params.id).delete()
        
    }
    
    async deleteAll({ request, response }) {
        console.log('RatingController.deleteAll()')
        return await Database.table('ratings').delete()
        
    }

}




}

module.exports = RatingController
