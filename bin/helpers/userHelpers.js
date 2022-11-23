const { Pool } = require("pg");

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

const addUser = (user) => {
  const values = [
    user.username,
    user.email,
    user.hashedPassword,
    user.fullName,
  ];

  const queryString = `
  INSERT INTO users (username, email, hashed_password, full_name)
  VALUES ($1, $2, $3, $4)
  RETURNING *;
  `;

  return pool
    .query(queryString, values)
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getUserID = (username, email) => {
  const queryString = `
    SELECT id
    FROM users
    WHERE username = $1 OR email = $2;
  `;
  const values = [username, email]
  let data = null;

  pool.query(queryString, values)
    .then((result) => {
      data = result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });

  //return queried data
  return data;
};

const getUserObject = (username, email) => {
  const queryString = `
    SELECT *
    FROM users
    WHERE username = $1 OR email = $2;
  `;
  const values = [username, email]
  let data = null;

  pool.query(queryString, values)
    .then((result) => {
      data = result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });

  //return queried data
  return data;
};

const getUserObjectWithID = (username, email) => {
  const queryString = `
    SELECT *
    FROM users
    WHERE username = $1 OR email = $2; // CHANGED TO CORRECT SYNTAX $ETC
  `;
  const values = [username, email]
  let data = null;

  pool.query(queryString, values)
    .then((result) => {
      data = result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });

  //return queried data
  return data;
};






//WHAT IS THIS? IS THIS ERIC'S?
const displayUserInfo = (infoObject) => {
  //add user data to page HTML
  $("div.user-info-section").prepend(`
  ${data.username},
  ${data.email}`);
};

const getFavorites = (username) => {
  let favorites = null;
  const queryString = `SELECT * FROM favorites
  JOIN users ON favorites.user_id=users.id
  JOIN listings ON listings.id = listings_id
  WHERE username='$1'`;

  pool.query(queryString, username)
    .then((req, res) => {
      //has to return object of listings that are user favorites so currently wrong
      favorites = res.rows;
    });
  return favorites;
};

module.exports = {
  addUser,
  getUserID,
  getUserObject,
  getUserObjectWithID,
  displayUserInfo,
  getFavorites
};