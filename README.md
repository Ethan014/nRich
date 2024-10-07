
## My NestJS Project
A NestJS application using Fastify with Swagger for API documentation.

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```
2. **Install dependencies::**
    npm install

3. **Start the application:**
    npm run start
    By default, the application will run on port 3000.


 **Access the API:**
  Hello Route: http://localhost:3000/api/Hello
  Swagger Documentation: http://localhost:3000/api/docs

  -[]- /api/movie/getAllMovies - {}
  -[]- /api/movie/addNewMovie -{
    "title": "The Walking Dead",
    "genre": ["horror","Comdey"],
    "name": "The Walking Dead",
    "year": 2013,
    "duration": 139,
    "director": "Ethan"
    }
  -[]- /api/movie/recommend - 
  {
  "facebookUrl":"https://www.facebook.com/david.johnson" ,
  "movieName": "Pulp Fiction",
  "rank": 10
}


  -[]- /api/movie/getRecommendations- 
  {
"facebookUrl": "https://www.facebook.com/robert.taylor"
}
  -[]- /api/movie/getSimilarUsers- {
  "facebookUrl":"https://www.facebook.com/jane.smith@facebook.com"
}

 **Stay in Touch**
Author: [Ethan]
Email: [Ethan.nusu@gmail.com]