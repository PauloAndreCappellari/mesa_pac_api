'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PlaceSchema extends Schema {
  up () {
    this.create('places', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('name', 80).notNullable().unique().index()
      table.string('description', 255).notNullable()
      table.string('lat', 255).notNullable()
      table.string('lng', 255).notNullable()
      table.string('address', 255).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('places')
  }
}

module.exports = PlaceSchema
