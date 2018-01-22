export default model => ({
    async findAll({ conditions = null, fields = null, limit, skip, sort }) {
        const builder = model.find(conditions, fields);

        limit && builder.limit(limit);
        skip && builder.skip(skip);
        sort && builder.sort(sort);

        const result = await builder.exec();
        return result;
    },
    async findById(id, fields) {
        const result = await model.findById(id, fields).exec();
        return result;
    },
    async deleteById(id) {
        const result = await model.findByIdAndRemove(id).exec();
        return result;
    },
    async replaceById(id, newDoc) {
        await model.findByIdAndRemove(id).exec();
        const result = await model.create(newDoc);
        return result;
    },
    async updateById(id, newDoc) {
        const result = await model.findByIdAndUpdate(id, newDoc, { new: true }).exec();
        return result;
    },
    async create(newDoc) {
        const result = await model.create(newDoc);
        return result;
    }
});
