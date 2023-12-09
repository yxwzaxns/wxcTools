const cloud = require('wx-server-sdk')
const db = cloud.database({ throwOnNotFound: false })
const _ = db.command
const $ = db.command.aggregate

class DataBase {
  constructor(optins = {}){
    this._table = optins.table
    this._useTable = this._table
  }

  setTable(table){
    this._table = table
    this.resetTable()
  }

  get collection(){
    return db.collection(this._useTable)
  }

  getServerDate(args){
    return db.serverDate(args)
  }

  use(table){
    this._useTable = table
    return this
  }

  resetTable(){
    this._useTable = this._table
  }

  async exec(executor){
    try {
      return await executor()
    } catch (error) {
      console.log('db exec error:', error)
      throw error
    }finally {
      this.resetTable()
    }
  }

  async countBy(where){
    const { total } = await this.exec(()=>this.collection
      .where(where)
      .count())
    return total
  }

  async queryBy(where, field = {}, order = {}, limit = 1000, skip = 0){
    let executor = this.collection
      .where(where)

    if (field) {
      executor = executor.field(field)
    }

    if(order){
      Object.keys(order)
        .map(key=>{
          executor = executor.orderBy(key, order[key])
        })
    }
    if(limit){
      executor = executor.limit(limit)
    }

    if (skip) {
      executor = executor.skip(skip)
    }
    const { data } = await this.exec(()=>executor.get()) 
    return data
  }

  async add(data){
    const { _id } = await this.exec(()=>this.collection
      .add({ data }))
    return _id
  }

  async deleteBy(where){
    if (!Object.keys(where).length) throw Error('where is empty')
    const { stats: { removed } } = await this.exec(()=>this.collection
      .where(where)
      .remove())
    return removed
  }

  async updateBy(where, data){
    const { stats: { updated } } = await this.exec(()=>this.collection
      .where(where)
      .update({ data }))
    return updated
  }

  async queryOne(where, field = {}, order = {}){
    const items = await this.queryBy(where, field, order, 1)
    return items[0]
  }

  async queryOneById(id){
    return this.queryOne({
      _id: id
    })
  }

  async deleteById(id){
    return this.deleteBy({
      _id: id
    })
  }

  async updateById(id, data){
    return this.updateBy({
      _id: id
    }, data)
  }
}

module.exports = {
    _,
    $,
    DataBase
}