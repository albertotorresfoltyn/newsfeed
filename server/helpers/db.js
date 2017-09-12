export default class Generic {
  constructor(db, collection) {
    this.collection = collection;
    //this.db = db;
    this.mongoClient = require('mongodb').MongoClient;
    this.ObjectID = require('mongodb').ObjectID;
    this.db = db;
  }

  async getConnection(){
    if (this.connection == null) {
      this.connection = await this.mongoClient.connect('mongodb://127.0.0.1:27017/'+this.db);
    }
    return this.connection;
  }

  async create(object) {
    const entityName = this.collection;
    const connection = await this.getConnection();
    let entity = connection.collection(entityName);
    let obj = object;
    try {
      obj = await entity.insert(obj)
    } catch (e) {
      return null;
    };
    return obj;
  }

  async read(object) {
    const entityName = this.collection;
    const connection = await this.getConnection();
    let entity = connection.collection(entityName);
    const obj = object;
    let result = null;
    try {
      result = await entity.find(obj)
    } catch (e) {
      console.log(e)
      return null;
    };
    return result;
  }

  async update(_id, values){
    const entityName = this.collection;
    const connection = await this.getConnection();
    let entity = connection.collection(entityName);
    let result = null;
    try {
      result = await entity.update({_id:require('mongodb').ObjectID(_id)} ,{ $set: values },{upsert:true});
    } catch (e) {
      console.log(e)
      return null;
    };
    return result;
  }

  async delete(_id){
    const entityName = this.collection;
    const connection = await this.getConnection();
    let entity = connection.collection(entityName);
    let result = null;
    try {
      result = await entity.deleteOne({_id:require('mongodb').ObjectID(_id)})
    } catch (e) {
      console.log(e);
      return null;
    };
    return result;
  }
}