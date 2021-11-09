const express = require('express')
const asyncHandler = require('express-async-handler');
const { Checkin } = require('../../db/models');
const router = express.Router();

router.post('/', asyncHandler(async (req, res, next)=> {
    const {userId, strainId, text} = req.body
    const checkin = await Checkin.create({userId, strainId, text})

    return res.json({checkin})
}))

router.get('/', asyncHandler(async(req, res)=> {
    let checkins = await Checkin.findAll()
    res.json(checkins)
}))

module.exports = router;