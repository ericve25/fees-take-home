Initial setup:
```
git clone https://ericve25@bitbucket.org/ericve25/kofile-take-home.git
npm install
```

Challenge 1:
```
node fees.js
```

Challenge 2:
```
node distributions.js
```

Challenge 3:
```
node server.js
```
Then using your favorite REST client (Postman, DHC, etc.) http post to "http://localhost:3000/fees" for fee calculations
and "http://localhost:3000/distributions" for fund calculations with orders.json contained in the body of the request.