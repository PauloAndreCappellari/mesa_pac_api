'use strict'

const { route } = require("@adonisjs/framework/src/Route/Manager")

const Database = use('Database')
const Hash = use('Hash')

class UserController {
    async login ({ auth, request, response }) {
        const { email, password } = request.all()
        return await auth.attempt(email, password)
    }

    show ({ auth, params }) {
        if (auth.user.id !== Number(params.id)) {
          return "You cannot see someone else's profile"
        }
        return auth.user
    }

    async new ({auth, request, response }) {
        return await Database.table('users').insert({
            'username': request.input('username'),
            'email': request.input('email'),
            'password': await Hash.make(request.input('password')),
            'lat': request.input('lat'),
            'lng': request.input('lng'),
        })
    }

    async logout ({auth, request, response }) {
      return await auth.logout()
    }

    async update ({auth, request, response }) {
        console.log('UserController.update')
        return await Database.table('users').update({
          'email': request.input('email'),
          'password': await Hash.make(request.input('password'))
        }).where('user_id', auth.user.id)
    }
}

module.exports = UserController
