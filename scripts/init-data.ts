// eslint-disable-next-line @typescript-eslint/no-var-requires
const neo4j = require('neo4j-driver');

const movies = [
    {
      name: "Inception",
      year: 2010,
      genres: ["Action", "Sci-Fi", "Thriller"],
      director: "Christopher Nolan",
      duration: 148,
    },
    {
      name: "The Godfather",
      year: 1972,
      genres: ["Crime", "Drama"],
      director: "Francis Ford Coppola",
      duration: 175,
    },
    {
      name: "The Dark Knight",
      year: 2008,
      genres: ["Action", "Crime", "Drama"],
      director: "Christopher Nolan",
      duration: 152,
    },
    {
      name: "Pulp Fiction",
      year: 1994,
      genres: ["Crime", "Drama"],
      director: "Quentin Tarantino",
      duration: 154,
    },
    {
      name: "Forrest Gump",
      year: 1994,
      genres: ["Drama", "Romance"],
      director: "Robert Zemeckis",
      duration: 142,
    },
    {
      name: "The Matrix",
      year: 1999,
      genres: ["Action", "Sci-Fi"],
      director: "Lana Wachowski, Lilly Wachowski",
      duration: 136,
    },
    {
      name: "Interstellar",
      year: 2014,
      genres: ["Adventure", "Drama", "Sci-Fi"],
      director: "Christopher Nolan",
      duration: 169,
    },
    {
      name: "Fight Club",
      year: 1999,
      genres: ["Drama"],
      director: "David Fincher",
      duration: 139,
    },
    {
      name: "Parasite",
      year: 2019,
      genres: ["Drama", "Thriller"],
      director: "Bong Joon Ho",
      duration: 132,
    },
    {
      name: "The Lord of the Rings: The Fellowship of the Ring",
      year: 2001,
      genres: ["Adventure", "Drama", "Fantasy"],
      director: "Peter Jackson",
      duration: 178,
    },
  ];
  const users = [
    {
        email: 'john.doe@facebook.com',
        name: 'John Doe',
        age: 28,
        gender: 'Male',
        facebookUrl: 'https://www.facebook.com/john.doe'
    },
    {
        email: 'jane.smith@facebook.com',
        name: 'Jane Smith',
        age: 32,
        gender: 'Female',
        facebookUrl: 'https://www.facebook.com/jane.smith'
    },
    {
        email: 'alice.jones@facebook.com',
        name: 'Alice Jones',
        age: 24,
        gender: 'Female',
        facebookUrl: 'https://www.facebook.com/alice.jones'
    },
    {
        email: 'michael.brown@facebook.com',
        name: 'Michael Brown',
        age: 30,
        gender: 'Male',
        facebookUrl: 'https://www.facebook.com/michael.brown'
    },
    {
        email: 'emily.wilson@facebook.com',
        name: 'Emily Wilson',
        age: 26,
        gender: 'Female',
        facebookUrl: 'https://www.facebook.com/emily.wilson'
    },
    {
        email: 'robert.taylor@facebook.com',
        name: 'Robert Taylor',
        age: 35,
        gender: 'Male',
        facebookUrl: 'https://www.facebook.com/robert.taylor'
    },
    {
        email: 'olivia.martinez@facebook.com',
        name: 'Olivia Martinez',
        age: 29,
        gender: 'Female',
        facebookUrl: 'https://www.facebook.com/olivia.martinez'
    },
    {
        email: 'david.johnson@facebook.com',
        name: 'David Johnson',
        age: 40,
        gender: 'Male',
        facebookUrl: 'https://www.facebook.com/david.johnson'
    },
    {
        email: 'linda.lee@facebook.com',
        name: 'Linda Lee',
        age: 23,
        gender: 'Female',
        facebookUrl: 'https://www.facebook.com/linda.lee'
    },
    {
        email: 'jason.kim@facebook.com',
        name: 'Jason Kim',
        age: 33,
        gender: 'Male',
        facebookUrl: 'https://www.facebook.com/jason.kim'
    }
];

  
async function deleteData(session) {
  console.log(`************* Starting Reset DB *************`);
  const query = 'MATCH (n) DETACH DELETE n';
  await session.run(query);
  console.log('**** DB dropped! ****');
  return session;
}

async function finish(session) {
  console.log('**** Finish resetting DB ****');
  await session.close();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return process.exit(0);
}
async function initData(session){
    //Create movies
    for (const movie of movies) {
          const query = `
            CREATE (m:Movie {title: $name, name: $name, year: $year, director: $director, duration: $duration, genre:$genre})
            RETURN m
          `;
          const params = {
            name: movie.name,
            year: movie.year,
            director: movie.director,
            duration: movie.duration,
            genre: movie.genres,
          };
  
          const result = await session.run(query, params);
          console.log(`Movie created: ${result.records[0].get('m').properties.title}`);
        }
    //Create users:
    for (const user of users) {
        const query = `
        CREATE (u:User {title: $name, name: $name, facebookUrl: $facebookUrl, email: $email, age: $age, gender: $gender})
        RETURN u
      `;
      const params = {
        name: user.name,
        facebookUrl: user.facebookUrl,
        email: user.email,
        age: user.age,
        gender: user.gender,
      };

      const result = await session.run(query, params);
      console.log(`User created: ${result.records[0].get('u').properties.title}`);
    }
    //Create Ranking
    for (const user of users) {
        const rank = Math.floor(Math.random() * 11);
        const randomMovieIndex = Math.floor(Math.random() * (movies.length -1));
        const someMovie = movies[randomMovieIndex]
        const query = `
        MATCH (u:User {facebookUrl: $facebookUrl}), (m:Movie {title: $movieName})
        MERGE (u)<-[r:RANKED {rank: $rank}]->(m)
        RETURN u, r, m;`
        const params = {
            facebookUrl: user.facebookUrl,
            movieName: someMovie.name,
            rank,
        }
        await session.run(query, params);
    }
    return session
}
async function startInitData(){
    const driver = neo4j.driver('bolt://localhost:7687',neo4j.auth.basic('neo4j', '12345678'));
  return driver.session();
}

startInitData()
  .then((session) => deleteData(session))
  .then((session) => initData(session))
  .then((session) => finish(session))
  .catch((error) => {
    console.log('Error occured:', error);
    process.exit(1);
  });
