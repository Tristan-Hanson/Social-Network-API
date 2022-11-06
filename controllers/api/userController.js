const router = require('express').Router();
const { User } = require('../../models');

router.get('/', async (req, res) =>{
  try{
    const profile = await User.find()
    res.json(profile);
  }catch(err){
    res.json(err).status(400)
  }
})

module.exports = router;
