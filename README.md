Tournament Statistics Service

run the app with command: node server.js 

examples for requests:
curl --location --request POST 'localhost:8000/tournament/saveTournamentResults' \
--header 'Content-Type: application/json' \
--data-raw '{
   "tournamentId": 1,
   "startDate": "2020-12-03T09:35:35+00:00",
   "endDateTime": "2020-12-03T12:35:35+00:00",
   "results": [{
                   "userId": 12,
                   "correctQuestions": [1,2,3,4,5,6],
                   "incorrectQuestions": [7,8,9,10],
               },
               {
                   "userId": 13,
                   "correctQuestions": [1,2,3,4,5,6,8,10],
                   "incorrectQuestions": [7,9],
               },
               {
                   "userId": 22,
                   "correctQuestions": [1],
                   "incorrectQuestions": [2,3,4,5,6,7,8,9,10],
               },
               {
                   "userId": 1,
                   "correctQuestions": [3,6,10],
                   "incorrectQuestions": [2,4,5,7,8,9],
               }]
}'
curl --location --request GET 'localhost:8000/tournament/1/getTournamentResults'
curl --location --request GET 'localhost:8000/tournament/1/fetchSuccessPerQuestion'
curl --location --request GET 'localhost:8000/tournament/1/fetchUsersScores'
