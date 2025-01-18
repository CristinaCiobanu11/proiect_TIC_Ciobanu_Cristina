const express = require('express');
const db = require('../db/database');
const router = express.Router();

//Extragerea sporturilor
router.get('/', async (req, res) => {
    try {
        //
    } catch (error) {
        //
    }
});

//Extragerea unui sport pe baza de id
router.get('/:id', async (req, res) => {
    try {
        //
    } catch (error) {
        //
    }
});

// Exemplu: Adaugă un sport
router.post('/', async (req, res) => {
    try {
        const { sportName, sportBudget, startDate, teamName, students } = req.body;
        const newSport = {
            sportName,
            sportBudget,
            startDate,
            teamName,
            students: students || [],
        };
        const docRef = await db.collection('SPORTS').add(newSport);
        res.status(201).send({ id: docRef.id });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//Editarea unui anumit sport
router.put('/:id', async (req, res) => {
    try {
        //
    } catch (error) {
        //
    }
});

//Stergerea unui anumit sport
router.delete('/:id', async (req, res) => {
    try {
        //
    } catch (error) {
        //
    }
});

module.exports = router;
