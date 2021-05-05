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
        console.log('UserController.new')
        return await Database.table('users').insert({
            'username': request.input('username'),
            'email': request.input('email'),
            'password': await Hash.make(request.input('password')),
            'lat': request.input('lat'),
            'lng': request.input('lng'),
        })

    }

    async logout ({auth, request, response }) {
      console.log('UserController.logout')
      return await auth.logout()
  }



}

module.exports = UserController
