#!/bin/bash

echo "=== Task 1: GitHub Repository Fork ==="
echo "GitHub URL: https://github.com/ibm-developer-skills-network/expressBookReviews"
echo ""

echo "=== Task 2: Get All Books ===" 
curl -i http://localhost:5000/
echo ""

echo "=== Task 3: Get Book by ISBN ===" 
curl -i http://localhost:5000/isbn/9780141439570
echo ""

echo "=== Task 4: Get Books by Author ===" 
curl -i "http://localhost:5000/author/Jane%20Austen"
echo ""

echo "=== Task 5: Get Books by Title ===" 
curl -i "http://localhost:5000/title/Pride%20and%20Prejudice"
echo ""

echo "=== Task 6: Get Book Review ===" 
curl -i "http://localhost:5000/review/9780141439570"
echo ""

echo "=== Task 7: Register New User ===" 
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}'
echo ""

echo "=== Task 8: Login User ===" 
curl -c "cookies.txt" -X POST http://localhost:5000/customer/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}'
echo ""

echo "=== Task 9: Add/Modify Book Review ===" 
curl -b "cookies.txt" -X PUT http://localhost:5000/customer/auth/review/9780141439570 \
  -H "Content-Type: application/json" \
  -d '{"review":"This is a great book!"}'
echo ""

echo "=== Task 10: Delete Book Review ===" 
curl -b "cookies.txt" -X DELETE http://localhost:5000/customer/auth/review/9780141439570
echo ""

echo "=== Task 11: GitHub URLs ===" 
echo "general.js: https://github.com/YOUR_USERNAME/expressBookReviews/blob/main/final_project/router/general.js"
