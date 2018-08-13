const db = require('./db');
const Puppy = db.models.puppy;

const puppies = [{
  name: 'Taylor',
  image: 'https://designerdoginfo.files.wordpress.com/2013/01/puggle-puppy-4.jpg?w=584',
  DOB: '2015-02-13',
}, {
  name: 'Reggie',
  image: 'http://images.shape.mdpcdn.com/sites/shape.com/files/styles/slide/public/puppy-2_0.jpg',
  DOB: '2012-05-27',
}, {
  name: 'Christian',
  image: 'https://www.askideas.com/media/19/Papillon-Puppy-Looking.jpg',
  DOB: '2008-12-23',
}, {
  name: 'Jessie',
  image: 'http://www.101dogbreeds.com/wp-content/uploads/2015/10/Chi-Spaniel-Puppy-Pictures.jpg',
  DOB: '2018-01-02',
}, {
  name: 'Pandora',
  image: 'http://4.bp.blogspot.com/-3JeIxWBU7bY/UKjIt8lVpCI/AAAAAAAABx8/YM8piSOwczs/s1600/Schipperke-Puppy.jpg',
  DOB: '2013-09-21',
}];

const seed = async () => {
  try {
    await db.sync({ force: true });
    const pups = await Promise.all(puppies.map(puppy => Puppy.create(puppy)));
    console.log('Seeding complete');
  } catch (err) {
    console.error('Seeding failed:', err);
  }
  db.close();
};

seed();
