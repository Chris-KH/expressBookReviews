### TASK 2: Get All Books

Command:
curl -i http://localhost:5000/

Output:
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

[{"isbn":"9780141439570","author":"Chinua Achebe","title":"Things Fall Apart","reviews":{"testuser":"This is a great book!"}},{"isbn":"9780199232765","author":"Hans Christian Andersen","title":"Fairy tales","reviews":{}},{"isbn":"9780142437223","author":"Dante Alighieri","title":"The Divine Comedy","reviews":{}},{"isbn":"9780199232599","author":"Unknown","title":"The Epic Of Gilgamesh","reviews":{}},{"isbn":"9780199232735","author":"Unknown","title":"The Book Of Job","reviews":{}},{"isbn":"9780199232742","author":"Unknown","title":"One Thousand and One Nights","reviews":{}},{"isbn":"9780141192765","author":"Unknown","title":"Njál's Saga","reviews":{}},{"isbn":"9780141439518","author":"Jane Austen","title":"Pride and Prejudice","reviews":{}},{"isbn":"9780142437254","author":"Honoré de Balzac","title":"Le Père Goriot","reviews":{}},{"isbn":"9780199232734","author":"Samuel Beckett","title":"Molloy, Malone Dies, The Unnamable, the trilogy","reviews":{}}]

---

### TASK 3: Get Book by ISBN

Command:
curl -i http://localhost:5000/isbn/9780141439570

Output:
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{"isbn":"9780141439570","author":"Chinua Achebe","title":"Things Fall Apart","reviews":{"testuser":"This is a great book!"}}

---

### TASK 4: Get Books by Author

Command:
curl -i "http://localhost:5000/author/Jane%20Austen"

Output:
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

[{"isbn":"9780141439518","author":"Jane Austen","title":"Pride and Prejudice","reviews":{}}]

---

### TASK 5: Get Books by Title

Command:
curl -i "http://localhost:5000/title/Pride%20and%20Prejudice"

Output:
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

[{"isbn":"9780141439518","author":"Jane Austen","title":"Pride and Prejudice","reviews":{}}]

---

### TASK 6: Get Book Review

Command:
curl -i "http://localhost:5000/review/9780141439570"

Output:
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{"testuser":"This is a great book!"}

---

### TASK 7: Register New User

Command:
curl -X POST http://localhost:5000/register -H "Content-Type: application/json" -d '{"username":"testuser2","password":"pass123"}'

Output:
{"message":"User successfully registered. Now you can login"}

---

### TASK 8: Login User

Command:
curl -c cookies.txt -X POST http://localhost:5000/customer/login -H "Content-Type: application/json" -d '{"username":"testuser","password":"testpass123"}'

Output:
{"message":"User successfully logged in"}

---

### TASK 9: Add/Modify Book Review

Command:
curl -b cookies.txt -X PUT http://localhost:5000/customer/auth/review/9780141439570 -H "Content-Type: application/json" -d '{"review":"Excellent literary work!"}'

Output:
{"message":"Review successfully posted","reviews":{"testuser":"Excellent literary work!"}}

---

### TASK 10: Delete Book Review

Command:
curl -b cookies.txt -X DELETE http://localhost:5000/customer/auth/review/9780141439570

Output:
{"message":"Review successfully deleted","reviews":{}}

---

### TASK 11: GitHub URLs

general.js implementation can be found at:
https://github.com/YOUR_USERNAME/expressBookReviews/blob/main/final_project/router/general.js

The implementation uses async/await with Promise.resolve() for asynchronous operations and axios integration for potential external API calls.
