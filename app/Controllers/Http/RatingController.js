'use strict'

const Database = use('Database')

class RatingController {

    async listAll ({ request, response }) {
        return await Database.table('ratings')
    }

    async listByUser ({ request, response, params }) {
        return await Database.table('ratings').where('user_id', params.user_id)
    }

    async listById ({ request, response, params }) {
        return await Database.table('ratings').where('id', params.id)
    }

    async listByPlace ({ request, response, params }) {
        return await Database.table('ratings').where('id', params.place_id)
    }

    async insert ({ request, response }) {
        return await Database.table('ratings').insert({
            'user_id': request.input('user_id'),
            'place_id': request.input('place_id'),
            'rating': request.input('rating'),
            'description': request.input('description')
        })
    }

    async deleteById({ request, response, params }) {
        return await Database.table('ratings').where('id', params.id).delete()
    }
    
    async deleteAll({ request, response }) {
        return await Database.table('ratings').delete()
    }
}

module.exports = RatingController
