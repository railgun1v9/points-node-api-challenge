# points-node-api-challenge

Coding challenge to demonstrate API development skills with NodeJS

# Background
Our users have points in their accounts. Users only see a single balance in their accounts. But for reporting purposes we actually track their
points per payer/partner. In our system, each transaction record contains: payer (string), points (integer), timestamp (date).

For earning points it is easy to assign a payer, we know which actions earned the points. And thus which partner should be paying for the points.

When a user spends points, they don't know or care which payer the points come from. But, our accounting team does care how the points are
spent. There are two rules for determining what points to "spend" first:

- We want the oldest points to be spent first (oldest based on transaction timestamp, not the order they’re received)
- We want no payer's points to go negative.


# Requirements to run this program

-   NodeJs https://nodejs.org/en/ , use the LTS version!
-   Postman https://www.postman.com/, use this to make requests to the API

# Get started

1. Download the project either by cloning the project or downloading the ZIP file and extracting the project in its own directory
2. Navigate to the project directory
3. Run the command `npm install`
4. Run the command `npm run start`
5. The Points API server will start on port 3000 by default, take note of which port it responds with and make your requests to that port as needed.

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

```
BODY content-type = application/x-www-form-urlencoded

Key | Example Value | Validation Rules

payer | TEST | string, required
points | 2000 | integer, required
timestamp | 2020-10-02T14:01:00Z | timestamp (Iso-8601 formatted works), required 
```

Example response:
```
[
    {
        "payer": "DANNON",
        "points": 1000,
        "timestamp": "2020-11-02T14:00:00Z"
    },
    {
        "payer": "UNILEVER",
        "points": 200,
        "timestamp": "2020-10-31T11:00:00Z"
    },
    {
        "payer": "TEST",
        "points": 2000,
        "timestamp": "2020-10-02T14:01:00Z"
    }
]
```

## Spend Points
`POST` `http://localhost:3000/point/spend`
```
BODY content-type = application/x-www-form-urlencoded

Key | Example Value | Validation Rules

points | 5000 | integer, required
```



Example response:
```
{
    "ALDI": -4000,
    "DANNON": -700,
    "UNILEVER": 0,
    "MILLER COORS": -300
}
```

*NOTE*: If your total point balance is insufficient for spending the amount specified, you will get an error saying so and you will not be able to spend the point amount.
```
{
    "message": "Balance is insufficient."
}
```
  
  
