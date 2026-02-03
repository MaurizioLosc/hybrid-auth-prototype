const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model')

const router = express.Router();

router.post('/request-otp', async (req, res) => {
    const { email } = req.body
    const otp = Math.floor(100000 + Math.random() * 900000); // to genarate otp as password

    const user = await User.findOne({ email })
    if (!user) user = User.create({ email, role: 'ADMIN' });

    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;
    await user.save();
    
    console.log("OTP is: ", otp)
    return res.json({ result: otp })
})

router.post('/verify-otp', async(req, res) => {
    const { email, otp } = req.body
    const user = await User.findOne({ email })

    if(!user || user.otp !== otp || user.otpExpiry > Date.now()){
        return res.status(401).json({ error: "Invaild OTP" })
    }

    
})