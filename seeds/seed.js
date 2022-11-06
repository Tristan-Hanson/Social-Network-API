const connection = require('../config/connection')
const {User} = require('../models')

const user = [];
const username = 'Tristan';
const email = 'tristan@email.com';

connection.once('open', async () => {
    console.log('connected')
    user.push({
        username,
        email
    });
    
    await User.collection.insertMany(user);
    
    console.table(user);
    console.info('Seeding complete! 🌱');
})