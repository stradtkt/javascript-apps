'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.on('/').render('home')

Route.get('/posts', 'PostController.index')

// Route.get('/test', () => 'Hello World')

// Route.get('/test2', () => {
//   return 'Hello there';
// })
// Route.get('/test/:id', function({params}) {
//   return `This is the id ${params.id}`;
// })
