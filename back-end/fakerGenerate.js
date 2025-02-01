const { faker } = require('@faker-js/faker');
const db = require('./db/database'); // Importă conexiunea Firestore



// Funcție principală pentru generarea datelor
async function generateFakerData() {
    try {


        const studentsCollectionRef=db.collection('students');
        const studentDocs = await studentsCollectionRef.get();
            if (!studentDocs.empty) {
                studentDocs.forEach(async (doc) => {
                await doc.ref.delete(); // Șterge fiecare document
                });
            }

        const sportsCollectionRef=db.collection('sports');
        const sportDocs = await sportsCollectionRef.get();
            if(!sportDocs.empty){
                sportDocs.forEach(async (doc)=>{
                await doc.ref.delete();
                });
            }


        for (let i=0; i<10; i++){
            const student=generateStudent();
            await studentsCollectionRef.add(student);

            const sport=generateSport();
            await sportsCollectionRef.add(sport);

        }
    } catch (error) {
      console.error('Error during data generation:', error);
    }
  }


  function generateStudent() {
    const student = {
      studentName: faker.person.fullName(),
      studentEmail: faker.internet.email(),
      studentPhoneNumber: faker.phone.number('+40 ### ### ###'),
      major: faker.helpers.arrayElement(['Computer Science', 'Mathematics', 'Physics', 'Literature', 'Sports']),
      enrollmentDate: faker.date.past(), // Data trecută
    };
  
    return {
      ...student // Convertim în format ISO
    };
  }


  
  
  function generateSport() {
    const sport = {
      sportName: faker.helpers.arrayElement(['Football', 'Basketball', 'Tennis', 'Volleyball']),
      sportBudget: parseFloat(faker.finance.amount(1000, 10000, 2)), // Convertim în număr
      teamName: faker.company.name(),
      students: [], // Listă de studenți goală
      addedOn: faker.date.past(), // Data trecută
    };
  
    return {
      ...sport
    };
  }


module.exports = generateFakerData;
