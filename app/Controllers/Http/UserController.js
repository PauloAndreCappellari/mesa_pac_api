'use strict'

class UserController {
    async login ({ auth, request, response }) {
        console.log('entrou..')
        const { email, password } = request.all()
        return await auth.attempt(email, password)
        /*
        console.log('antes do try')
        
        try {
            await auth.check()
          } catch (error) {
            console.log('caiu no catch...')
            esponse.redirect('welcome')
          }
          console.log('depois do try...')
        
        return response.redirect('/')
          */
    }

    show ({ auth, params }) {
        if (auth.user.id !== Number(params.id)) {
          return "You cannot see someone else's profile"
        }
        return auth.user
    }

    async new ({auth, request, response }) {
        console.log('UserController.new')
        await Database.table('users').insert({
            'username': request.input('username'),
            'email': request.input('email'),
            'password': await Hash.make(request.input('password'))
        })
        await auth.attempt(request.input('email'), request.input('password'))
        return response.redirect('/')
    }

    async logout ({auth, request, response }) {
      console.log('UserController.logout')
      return await auth.logout()
  }



}

module.exports = UserController
