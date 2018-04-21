'use strict'

class PostController {
  async index({ view }) {
    return view.render('posts.index', {
      title: 'Posts'
    })
  }
}

module.exports = PostController
