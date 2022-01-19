const pokemonData = require('./pokemonData');
const Sequelize = require('sequelize');
const { forEach } = require('./pokemonData');
const sequelize = new Sequelize('mysql://root:1234@localhost/sql_intro');
// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     })

// sequelize
// .query("INSERT INTO pokemon VALUES(null, 'Google', 'Tech', 10000,500)")
// .then(function ([result]) {
//     console.log(result)
// })

// addPokemonType = async () => {
//   let obj = {};
//   for (let i in pokemonData) {
//     obj[pokemonData[i].type] = 'value';
//   }
//   for (let i in obj) {
//     await sequelize.query(`INSERT INTO pokemon_type  VALUES(null, '${i}')`);
//   }
// };

// addPokemonType();
// addTown = async () => {
//   let obj = {};
//   for (let p of pokemonData) {
//     for (let j of p.ownedBy) {
//       obj[j.town] = 'value';
//     }
//   }
//   console.log(obj);
//   for (let i in obj) {
//     console.log(i);
//     await sequelize.query(`INSERT INTO town VALUES(null, '${i}')`);
//   }
// };
// addTown();

// addTrainer = async () => {
//   let obj = {};
//   let arr = [];
//   let counter = 0;
//   for (let p of pokemonData) {
//     for (let j of p.ownedBy) {
//       obj[j.name] = j.town;
//     }
//   }
//   for (let i in obj) {
//     console.log(obj[i]);
//     let data = await sequelize.query(
//       `SELECT id FROM town WHERE name = '${obj[i]}'`
//     );
//     //  console.log(data[0][0].id)
//     arr.push(data[0][0].id);
//   }
//   for (let i in obj) {
//     await sequelize.query(
//       `INSERT INTO trainer VALUES(null, '${i}', ${arr[counter]})`
//     );
//     counter++;
//   }
// };
// addTrainer()

// addPokemon = async () => {
//   for (let p of pokemonData) {
//     let data = await sequelize.query(
//       `SELECT id FROM pokemon_type WHERE name = '${p.type}' `
//     );
//     await sequelize.query(`INSERT INTO pokemon
//     VALUES(${p.id}, '${p.name}', ${data[0][0].id} , ${p.height}, ${p.weight})`);
//   }
// };
// addPokemon();

// addPokemonTrainer = async () => {
//   let results = [];
//   let pokemonIdData = await sequelize.query(`SELECT id FROM pokemon`);
//   let pokemonId = pokemonIdData[0];
//   console.log(pokemonId);
//   for (let p of pokemonData) {
//     if (pokemonId[p.id]) {
//       for (let i in p.ownedBy) {
//         let data = await sequelize.query(
//           `SELECT id FROM trainer WHERE name ='${p.ownedBy[i].name}'`
//         );
//         results.push(...data[0]);
//       }
//       console.log(results);
//       for (let i in results) {
//         await sequelize.query(
//           `INSERT INTO pokemon_trainer VALUES(${p.id}, ${results[i].id} )`
//         );
//       }
//       results = [];
//     }
//   }
// };
// addPokemonTrainer();

// findMax = async () => {
//   let results = await sequelize.query(
//     'SELECT name, weight FROM pokemon WHERE weight=(SELECT MAX(weight) FROM pokemon)'
//   );
//   console.log(results[0]);
// };

// findMax();

// findType = async (type) => {
//   let results =
//     await sequelize.query(`SELECT pokemon.name FROM pokemon, pokemon_type WHERE pokemon.type = pokemon_type.id
//     AND pokemon_type.name = '${type}'`);
//   let res = results[0].map((r) => r.name);
//   console.log(res);
// };
// findType('grass');

// findOwner = async (name) => {
//   let results =
//     await sequelize.query(`SELECT trainer.name FROM trainer, pokemon_trainer, pokemon WHERE pokemon_trainer.t_id = trainer.id
//     AND pokemon_trainer.p_id = pokemon.id AND pokemon.name = '${name}'`);
//   let res = results[0].map((r) => r.name);
//   console.log(res);
// };
// findOwner('gengar');

// findPokemons = async (trainer) => {
//   let results =
//     await sequelize.query(`SELECT pokemon.name FROM pokemon, pokemon_trainer, trainer WHERE pokemon_trainer.t_id = trainer.id
//     AND pokemon_trainer.p_id = pokemon.id AND trainer.name = '${trainer}'`);
//   let res = results[0].map((r) => r.name);
//   console.log(res);
// };
// findPokemons('Loga');

// findPokemons = async () => {
//   let mostOwned =
//     await sequelize.query(`SELECT p.name, COUNT(pt.t_id) AS owner_count FROM pokemon AS p, pokemon_trainer AS pt, trainer AS t
//         WHERE  pt.p_id = p.id AND t.id = pt.t_id
//         GROUP BY p.name`);
//   console.log(mostOwned[0]);

//   mostOwned[0].sort((a, b) => b.owner_count - a.owner_count);
//   console.log(mostOwned[0]);
//   let maxOwners = mostOwned[0][0].owner_count;
//   console.log(maxOwners);

//   let indexNotMax = mostOwned[0].findIndex(
//     (mo) => mo.owner_count !== maxOwners
//   );
//   console.log('index', indexNotMax);
//   mostOwned[0].splice(indexNotMax);

//   let namesMostOwned = [];
//   mostOwned[0].forEach((mo) => namesMostOwned.push(mo.name));
//   console.log(namesMostOwned);
//   return namesMostOwned;
// };

// findPokemons();

findPokemons = async () => {
  let countTId = await sequelize.query(`SELECT COUNT(*) FROM trainer`);

  for (let i in countTId[0]) {
    console.log(countTId[0][i].id);
  }
  console.log(countTId);
  console.log(countTId[0][0]);
  for (let p of pokemonData) {
    let pokemonId = await sequelize.query(
      `SELECT id FROM pokemon WHERE name = '${p.name}' `
    );
    console.log(pokemonId[0][0].id);
  }
  for (let p of pokemonData) {
    for (let j of p.ownedBy) {
      let trainerId = await sequelize.query(
        `SELECT id FROM trainer WHERE name = '${j.name}' `
      );
      console.log(trainerId[0][0].id);
    }
    let data = await sequelize.query(
      `SELECT id FROM pokemon_type WHERE name = '${p.type}' `
    );
    await sequelize.query(`INSERT INTO pokemon
            VALUES(${p.id}, '${p.name}', ${data[0][0].id} , ${p.height}, ${p.weight})`);
    // await sequelize.query(`INSERT INTO pokemon VALUES(${p.id}, '${p.name}', ${p.type} , ${p.height}, ${p.weight})`)
  }
};
findPokemons();
