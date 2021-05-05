'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})


Route
.post('login', 'UserController.login')
.middleware('guest')
.as('login')


Route
.get('users/:id', 'UserController.show')
.middleware('auth')

Route
.get('logout', 'UserController.logout')
.middleware('auth')

Route.post('/user/new', 'UserController.new')


//
//rotas para os serviços de Locais (places)
//

//lista todos os locais cadastrados, por ordem alfabetica de nome
Route.get('/places', 'PlaceController.listAll').middleware('auth')

//lista todos os locais cadastrados pelo usuário logado, por ordem alfabetica de nome
Route.get('/places/user/:user_id', 'PlaceController.listByUser').middleware('auth')

//lista um local cadastrado por id
Route.get('/places/:id', 'PlaceController.listById').middleware('auth')

//ordena a lista de locais por proximidade
Route.post('/places/sort', 'HaversineController.sort').middleware('auth')

//insere novo local
Route.post('/places/new','PlaceController.insert').middleware('auth')

//exlui todos os locais
Route.post('/places/delete/all', 'PlaceController.deleteAll').middleware('auth')

//exclui um local por id
Route.post('/places/delete/:id','PlaceController.deleteById').middleware('auth')


//
//rotas para os serviços de Avaliação (ratings)
//

//lista todas as avaliações cadastradas
Route.get('/rating', 'RatingController.listAll').middleware('auth')

//lista todas as avaliações cadastradas pelo usuário logado
Route.get('/rating/user/:user_id', 'RatingController.listByUser').middleware('auth')

//lista uma avaliação cadastrada por id
Route.get('/rating/:id', 'RatingController.listById').middleware('auth')

//lista todas as avaliações cadastradas para um local especifico
Route.get('/rating/place/:place_id', 'RatingController.listByPlace').middleware('auth')

//insere nova avaliação
Route.post('/rating/new','RatingController.insert').middleware('auth')

//exclui uma avaliação por id
Route.post('/rating/delete/:id','RatingController.deleteById').middleware('auth')

//exclui todas as avaliações
Route.post('/rating/delete/all','RatingController.deleteAll').middleware('auth')

//
//rota para o serviço Kahn
//

Route.post('/kahn', 'KahnController.sort').middleware('auth')


//
//rota para o serviço Haversine
//

Route.post('/haversine', 'HaversineController.sort').middleware('auth')