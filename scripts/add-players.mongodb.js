use('deptChart');

const players = [
  {
    firstName: 'Michael',
    lastName: 'Akingbade',
    group: ObjectId('68b05e38ebc62ae0be34d787'),
    number: '20',
    assignments: [
      {
        unit: 'OFFENSE',
        position: 'wideReceiver',
        string: 'stringFirst',
      },
    ],
    __v: 0,
    createdAt: ISODate('2025-09-01T04:01:24.743Z'),
    updatedAt: ISODate('2025-09-01T04:01:24.743Z'),
  },
  {
    firstName: 'Devin',
    lastName: 'Almeida Jr.',
    group: ObjectId('68b05e38ebc62ae0be34d787'),
    number: '54',
    assignments: [
      {
        unit: 'OFFENSE',
        position: 'rightTackle',
        string: 'stringThird',
      },
    ],
    __v: 0,
    createdAt: ISODate('2025-09-01T04:01:24.743Z'),
    updatedAt: ISODate('2025-09-01T04:01:24.743Z'),
  },
  {
    firstName: 'Ruben',
    lastName: 'Aquino',
    group: ObjectId('68b05e38ebc62ae0be34d787'),
    number: '01',
    assignments: [
      {
        unit: 'OFFENSE',
        position: 'runningback',
        string: 'stringFourth',
      },
    ],
    __v: 0,
    createdAt: ISODate('2025-09-01T04:01:24.743Z'),
    updatedAt: ISODate('2025-09-01T04:01:24.743Z'),
  },
  {
    firstName: 'Shane',
    lastName: 'Axelrod',
    group: ObjectId('68b05e38ebc62ae0be34d787'),
    number: '07',
    assignments: [
      {
        unit: 'OFFENSE',
        position: 'tightend',
        string: 'stringFirst',
      },
    ],
    __v: 0,
    createdAt: ISODate('2025-09-01T04:01:24.743Z'),
    updatedAt: ISODate('2025-09-01T04:01:24.743Z'),
  },
  {
    firstName: 'Kingston',
    lastName: 'Barrett',
    group: ObjectId('68b05e38ebc62ae0be34d787'),
    number: '27',
    assignments: [
      {
        unit: 'OFFENSE',
        position: 'wideReceiver',
        string: 'stringFourth',
      },
    ],
    __v: 0,
    createdAt: ISODate('2025-09-01T04:01:24.743Z'),
    updatedAt: ISODate('2025-09-01T04:01:24.743Z'),
  },
  {
    firstName: 'Javaris',
    lastName: 'Boyer',
    group: ObjectId('68b05e38ebc62ae0be34d787'),
    number: '45',
    assignments: [
      {
        unit: 'OFFENSE',
        position: 'leftGuard',
        string: 'stringSecond',
      },
    ],
    __v: 0,
    createdAt: ISODate('2025-09-01T04:01:24.743Z'),
    updatedAt: ISODate('2025-09-01T04:01:24.743Z'),
  },
  {
    firstName: 'Collin',
    lastName: 'Cabana',
    group: ObjectId('68b05e38ebc62ae0be34d787'),
    number: '55',
    assignments: [
      {
        unit: 'OFFENSE',
        position: 'runningback',
        string: 'stringFourth',
      },
    ],
    __v: 0,
    createdAt: ISODate('2025-09-01T04:01:24.743Z'),
    updatedAt: ISODate('2025-09-01T04:01:24.743Z'),
  },
  {
    firstName: 'Santana',
    lastName: 'Carr',
    group: ObjectId('68b05e38ebc62ae0be34d787'),
    number: '24',
    assignments: [
      {
        unit: 'OFFENSE',
        position: 'fullback',
        string: 'stringSecond',
      },
    ],
    __v: 0,
    createdAt: ISODate('2025-09-01T04:01:24.743Z'),
    updatedAt: ISODate('2025-09-01T04:01:24.743Z'),
  },
  {
    firstName: 'Ronin',
    lastName: 'Cuevas',
    group: ObjectId('68b05e38ebc62ae0be34d787'),
    number: '01',
    assignments: [
      {
        unit: 'OFFENSE',
        position: 'rightTackle',
        string: 'stringFirst',
      },
    ],
    __v: 0,
    createdAt: ISODate('2025-09-01T04:01:24.743Z'),
    updatedAt: ISODate('2025-09-01T04:01:24.743Z'),
  },
  {
    firstName: 'Lorenzo',
    lastName: 'DeAngelis',
    group: ObjectId('68b05e38ebc62ae0be34d787'),
    number: '02',
    assignments: [
      {
        unit: 'OFFENSE',
        position: 'runningback',
        string: 'stringFirst',
      },
    ],
    __v: 0,
    createdAt: ISODate('2025-09-01T04:01:24.743Z'),
    updatedAt: ISODate('2025-09-01T04:01:24.743Z'),
  },
  {
    firstName: 'David',
    lastName: 'Delomba',
    group: ObjectId('68b05e38ebc62ae0be34d787'),
    number: '55',
    assignments: [
      {
        unit: 'OFFENSE',
        position: 'rightGuard',
        string: 'stringThird',
      },
    ],
    __v: 0,
    createdAt: ISODate('2025-09-01T04:01:24.743Z'),
    updatedAt: ISODate('2025-09-01T04:01:24.743Z'),
  },
  {
    firstName: 'Joseph',
    lastName: 'Decosta Jr.',
    group: ObjectId('68b05e38ebc62ae0be34d787'),
    number: '34',
    assignments: [
      {
        unit: 'OFFENSE',
        position: 'quarterback',
        string: 'stringFirst',
      },
    ],
    __v: 0,
    createdAt: ISODate('2025-09-01T04:01:24.743Z'),
    updatedAt: ISODate('2025-09-01T04:01:24.743Z'),
  },
  {
    firstName: 'Lorenzo',
    lastName: 'DeAngelis',
    group: ObjectId('68b05e38ebc62ae0be34d787'),
    number: '02',
    assignments: [
      {
        unit: 'OFFENSE',
        position: 'runningback',
        string: 'stringFirst',
      },
    ],
    __v: 0,
    createdAt: ISODate('2025-09-01T04:01:24.743Z'),
    updatedAt: ISODate('2025-09-01T04:01:24.743Z'),
  },
];

db.players.drop();
db.players.insertMany(players);
