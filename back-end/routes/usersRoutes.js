const express = require('express');
const db = require('../db/database');
const router = express.Router();

//login
//signup


// Ruta POST pentru login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validare input
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    // Găsește utilizatorul în baza de date
    const snapshot = await db.collection('users').where('email', '==', email).get();

    if (snapshot.empty) {
      // Utilizatorul nu există
      return res.status(401).json({ success: false, message: 'User email does not exist in the database.' });
    }

    // Obține datele utilizatorului
    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();

    // Compară parola cu hash-ul stocat
    //const isPasswordValid = await bcrypt.compare(password, userData.password);

    if(password===userData.password){
    isPasswordValid=true;
    }else isPasswordValid=false;
    

    if (!isPasswordValid) {
      // Parola este incorectă            
      return res.status(401).json({ success: false, message: 'Invalid password.' });
    }

    // Login reușit
    return res.status(200).json({ success: true, message: 'Login successful.' });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ success: false, message: 'An error occurred during login.' });
  }

});






// Ruta POST pentru login
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Validare input
    if (!name) {
      return res.status(400).json({ success: false, message: 'Username is required.' });
    }

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    if (!password) {
      return res.status(400).json({ success: false, message: 'Password is required.' });
    }

    // Găsește utilizatorul în baza de date
    const snapshot = await db.collection('users').where('email', '==', email).get();

    if (!snapshot.empty) {
      // Utilizatorul nu există
      return res.status(401).json({ success: false, message: 'User with this email already exists in the database.' });
    }

   
    await db.collection('users').add({
      name: name,
      email: email,
      password: password
    });

    // Login reușit
    return res.status(201).json({ success: true, message: 'User created successfully.' });
  } catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).json({ success: false, message: 'An error occurred during login.' });
  }

});










module.exports = router;
