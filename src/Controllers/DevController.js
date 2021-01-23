const Dev = require('../models/Dev');
const axios = require('axios');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async store(req, res){
        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username });

        if(!dev){

            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, avatar_url, bio } = apiResponse.data;
    
            const techsArray = parseStringAsArray(techs);
    
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
                index: '2dshphere'
            };

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })

        }        
        

        return res.json(dev);
    },
    async index(req, res){

        const devs = await Dev.find();

        return res.json(devs);
        
    },
    async update(req, res){

        const { github_username, avatar_url, name, techs, bio, latitude, longitude } = req.body;

        const techsArray = parseStringAsArray(techs);

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],

        };

        try {

            const dev = await Dev.findOneAndUpdate(
              {github_username},
              {$set: { 
                        name,
                        avatar_url,
                        techs: techsArray,
                        bio,
                        location
                    }},
              {upsert: true}, function(err,doc) {
                  if (err) { throw err; }
                  else { console.log("Updated"); }
              });
    
              
              return res.json(dev);
    
        } catch (err){
            return res.json({error: 'Registration failed'})
        }
    },
    async destroy(req, res){

        const { github_username } = req.body;

        try{

            const dev = await Dev.findOneAndDelete({
                github_username
            });
    
            return res.json(dev);

        } catch (err){
            return res.json({error: 'Registration failed'})
        }
    }
}
