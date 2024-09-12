const db = require('./models/index.js');

const seedData = [
  {
    digits: 'DFA',
    fotoUrl: '',
    workType: 'WFO',
    positionTitle: null,
    lat: 0.0,
    lon: 0.0,
    company: 'NTX',
    isLogin: true,
    dovote: true,
    dosurvey: true,
    dofeedback: false,
    fullname: 'M. Daffa Quraisy',
    cuurentLeave: 0,
  },
  {
    digits: 'HTA',
    fotoUrl: '',
    workType: 'WFH',
    positionTitle: null,
    lat: 0.0,
    lon: 0.0,
    company: 'NTX',
    isLogin: true,
    dovote: true,
    dosurvey: true,
    dofeedback: false,
    fullname: 'R. Hernanta Subagya',
    cuurentLeave: 0,
  },
  {
    digits: 'HFW',
    fotoUrl: '',
    workType: 'WFO',
    positionTitle: null,
    lat: 0.0,
    lon: 0.0,
    company: 'NTX',
    isLogin: true,
    dovote: true,
    dosurvey: false,
    dofeedback: false,
    fullname: 'Hafidz Wibowo',
    cuurentLeave: 0,
  },
];

const surveySeedData = [
    {
      values: [100, 100, 90, 90, 100],
      createdAt: new Date('2022-12-22 08:56:50.696+07'),
      updatedAt: new Date('2022-12-22 08:56:50.696+07'),
      userId: 1,
    },
    {
      values: [90, 100, 100, 80, 90],
      createdAt: new Date('2022-12-22 09:08:50.908+07'),
      updatedAt: new Date('2022-12-22 09:08:50.908+07'),
      userId: 2,
    },
    {
      values: [80, 80, 80, 80, 80],
      createdAt: new Date('2022-12-22 21:05:32.317+07'),
      updatedAt: new Date('2022-12-22 21:05:32.317+07'),
      userId: 3,
    },
  ];

const seed = async () => {
  try {
    await db.sequelize.sync({ force: true });
    await db.user.bulkCreate(seedData);
    await db.survey.bulkCreate(surveySeedData);
    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    db.sequelize.close();
  }
};

seed();
