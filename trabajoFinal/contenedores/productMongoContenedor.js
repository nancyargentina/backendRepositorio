const  mongoose = require("mongoose")

class MongoClass {
    constructor(collection) {
        this.collection = collection;
    }
    async getAll() {
        return await this.collection.find({});
    }
    async getById(id) {
        return await this.collection.findById(id);
    }
    async create(obj) {
        //const newDocument= new this.collection(obj)
        //newDocument.save()
        return await new this.collection(obj).save();
    }
    async update(id, obj) {
        return await this.collection.updateOne({ _id: id }, { $set: obj });
    }
    async delete(id) {
        return await this.collection.deleteOne({ _id: id });
    }
}
module.exports= MongoClass