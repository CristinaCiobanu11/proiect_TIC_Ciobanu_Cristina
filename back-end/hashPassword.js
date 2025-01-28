const bcrypt = require('bcrypt');

async function generateHash() {
  const password = 'blabla'; // Parola pe care vrei să o hash-uiești
  const saltRounds = 10; // Numărul de iterații (cost factor)

  try {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log('Hash generat:', hash);
  } catch (error) {
    console.error('Eroare la generarea hash-ului:', error);
  }
}

generateHash();
