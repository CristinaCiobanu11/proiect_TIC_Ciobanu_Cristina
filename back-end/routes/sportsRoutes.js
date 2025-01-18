const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Funcții pentru colecția SPORTS (serviciu integrat)
const SportsService = {
  async addSport(sport) {
    const docRef = await db.collection('sports').add(sport);
    return docRef.id;
  },

  async getSports() {
    const snapshot = await db.collection('sports').get();
    const sports = [];
    snapshot.forEach((doc) => {
      sports.push({ id: doc.id, ...doc.data() });
    });
    return sports;
  },

  async getSportById(id) {
    const doc = await db.collection('sports').doc(id).get();
    if (!doc.exists) {
      throw new Error('Sport not found');
    }
    const sportData = doc.data();
    return { id: doc.id, ...sportData, startDate: sportData?.startDate?.toDate() };
  },

  async updateSport(id, sport) {
    await db.collection('sports').doc(id).update(sport);
  },

  async deleteSport(id) {
    await db.collection('sports').doc(id).delete();
  },
};

// Rute pentru operații pe colecția SPORTS

// Adaugă un sport
router.post('/', async (req, res) => {
  try {
    const sportId = await SportsService.addSport(req.body);
    res.status(201).send({ id: sportId });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Obține lista de sporturi
router.get('/', async (req, res) => {
  try {
    const sports = await SportsService.getSports();
    res.status(200).send(sports);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Obține un sport specific după ID
router.get('/:id', async (req, res) => {
  try {
    const sportId = req.params.id;
    const sport = await SportsService.getSportById(sportId);
    res.status(200).send(sport);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

// Actualizează un sport existent
router.put('/:id', async (req, res) => {
  try {
    const sportId = req.params.id;
    const sport = req.body;
    await SportsService.updateSport(sportId, sport);
    res.status(200).send({ message: 'Sport updated successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Șterge un sport existent
router.delete('/:id', async (req, res) => {
  try {
    const sportId = req.params.id;
    await SportsService.deleteSport(sportId);
    res.status(200).send({ message: 'Sport deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
