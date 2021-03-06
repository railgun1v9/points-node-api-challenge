# points-node-api-challenge

Coding challenge to demonstrate API development skills with NodeJS

# Requirements to run this program

-   NodeJs https://nodejs.org/en/ , use the LTS version!
-   Postman https://www.postman.com/, use this to make requests to the API

# Get started

1. Download the project either by cloning the project or downloading the ZIP file and extracting the project in its own directory
2. Navigate to the project directory
3. Run the command `npm install`
4. Run the command `npm run start`
5. The Points API server will start on port 3000 by default, take note of which port it responds with.

# Endpoints (using port 3000 for this example)
## Get Point Balance
`GET` `http://localhost:3000/point`

Example response:
```
{
    "DANNON": 1100,
    "UNILEVER": 200,
    "MILLER COORS": 10000
}
```

## Add Points
`POST` `http://localhost:3000/point`
BODY content-type = `application/x-www-form-urlencoded`
`payer` - `TEST` - string, required
`points` - `2000` - integer, required
`timestamp` - `2020-10-02T14:01:00Z` - timestamp (Iso-8601 formatted works), required 

Example response:
`[
    {
        "payer": "DANNON",
        "points": 1000,
        "timestamp": "2020-11-02T14:00:00Z"
    },
    {
        "payer": "UNILEVER",
        "points": 200,
        "timestamp": "2020-10-31T11:00:00Z"
    }.
    {
        "payer": "TEST",
        "points": 2000,
        "timestamp": "2020-10-02T14:01:00Z"
    }.
]`

## Spend Points
`POST` `http://localhost:3000/point/spend`
BODY content-type = `application/x-www-form-urlencoded`
`points` - `5000` - integer, required

Example response:
`{
    "ALDId": -4000,
    "DANNON": -700,
    "UNILEVER": 0,
    "MILLER COORS": -300
}`
  
  
