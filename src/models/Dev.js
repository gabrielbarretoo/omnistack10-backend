const mongosse = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const DevSchema = new mongosse.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dshphere'
    }
});

module.exports = mongosse.model('Dev', DevSchema);