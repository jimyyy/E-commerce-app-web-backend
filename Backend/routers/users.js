const express = require("express");
const User = require("../models/user");
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
const Contact = require("../models/contact");



router.post('/register', async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: await bcrypt.hash(req.body.password,salt),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country
    })


    user = await user.save();

    if (!user)
        return res.status(500).send('the user cannot be created')

    res.send(user);
})


router.get(`/`, async (req, res) => {
    const userList = await User.find().select('-passwordHash');

    if (!userList) { res.status(500).json({ success: false }) }
    res.status(200).send(userList);
})


router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).select('-passwordHash');

    if (!user) { res.status(500).json({ success: false, message: 'the user with the given id is not found' }) }
    res.status(200).send(user);

})


router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    const secret = process.env.secret;
    if (!user) {
        return res.status(400).send("wrong Email");

    }

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {

        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin
            },
            secret,
            {
                expiresIn: '1d'
            }
        )
        res.status(200).send({ user: user.email, token: token })
    } else {
        res.status(400).send('Password is wrong')
    }


})

router.get(`/get/count`, async (req, res) => {

    let userCount = await User.countDocuments({});
    if (!userCount) {
        res.status(500).json({ success: false })
    }
    res.send({
        userCount: userCount
    });
})


router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id).then(user => {
        if (user) {
            res.status(200).json({ success: true, message: 'the user is deleted with succesfully' })
        } else {
            return res.status(404).json({ success: false, message: 'deleted failed' })
        }
    }).catch(err => {
        return res.status(400).json({ success: false, error: err })

    })
})

router.put('/:id',async(req,res)=>{
    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            city:req.body.city,
            country:req.body.country,
            zip:req.body.zip,
            apartment:req.body.apartment,
            street:req.body.street,
            isAdmin:req.body.isAdmin
           
         
         
        }
    )

    if(!user)
    return res.status(500).send('the user cannot be find')

    res.status(200).send(user);
})

router.post('/contact', async (req, res) => {
   
    let contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
   
    })


    contact = await contact.save();

    if (!contact)
        return res.status(500).send('the contact cannot be created')

    res.send(contact);
})

router.get(`/get/contact`, async (req, res) => {
    const contactList = await Contact.find();

    if (!contactList) { res.status(500).json({ success: false }) }
    res.status(200).send(contactList);
})

router.delete('/contact/:id', (req, res) => {
    Contact.findByIdAndRemove(req.params.id).then(contact => {
        if (contact) {
            res.status(200).json({ success: true, message: 'the user is deleted with succesfully' })
        } else {
            return res.status(404).json({ success: false, message: 'deleted failed' })
        }
    }).catch(err => {
        return res.status(400).json({ success: false, error: err })

    })
})






































module.exports = router;