const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const members = require('../../member');

router.get('/', (req, res) => res.json(members));

router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(404).json({
            msg: `no member with the id ${req.params.id}`
        });
    }
});

router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    };
    if (!newMember.name || !newMember.email) {
        return res.status(400).json({
            msg: 'please include name or email'
        });
    }
    members.push(newMember);
    // res.json(members);
    res.redirect('/');
});

// update 
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        const updMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updMember.name ? updMember.name : req.params.name;
                member.email = updMember.email ? updMember.email : req.params.email;
                res.json({
                    msg: 'member updated',
                    member
                });
            }
        });
    } else {
        res.status(404).json({
            msg: `no member with the id ${req.params.id}`
        });
    }
});

//delete 
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        res.json({
            msg: 'member deleted',
            members: members.filter(member => member.id !== parseInt(req.params.id))
        });
        members.splice(found, 1);
    } else {
        res.status(404).json({
            msg: `no member with the id ${req.params.id}`
        });
    }
});

module.exports = router;