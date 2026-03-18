# Quick Reference: cURL Commands for Testing

## 1. REGISTER NEW USER

```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"yourname","password":"yourpass"}'
```

## 2. LOGIN USER (Creates Session)

```bash
curl -c cookies.txt -X POST http://localhost:5000/customer/login \
  -H "Content-Type: application/json" \
  -d '{"username":"yourname","password":"yourpass"}'
```

## 3. GET ALL BOOKS

```bash
curl http://localhost:5000/
```

## 4. GET BOOK BY ISBN

```bash
curl http://localhost:5000/isbn/9780141439570
```

## 5. GET BOOKS BY AUTHOR

```bash
curl "http://localhost:5000/author/Chinua%20Achebe"
```

## 6. GET BOOKS BY TITLE

```bash
curl "http://localhost:5000/title/Things%20Fall%20Apart"
```

## 7. GET REVIEWS FOR BOOK

```bash
curl http://localhost:5000/review/9780141439570
```

## 8. ADD/MODIFY REVIEW (Requires Session)

```bash
curl -b cookies.txt -X PUT http://localhost:5000/customer/auth/review/9780141439570 \
  -H "Content-Type: application/json" \
  -d '{"review":"Your review text here"}'
```

## 9. DELETE REVIEW (Requires Session)

```bash
curl -b cookies.txt -X DELETE http://localhost:5000/customer/auth/review/9780141439570
```

## 10. DETAILED REQUEST (Shows Headers)

```bash
curl -i http://localhost:5000/
```

## NOTE: Available ISBN Values

- 9780141439570 (Things Fall Apart)
- 9780199232765 (Fairy tales)
- 9780142437223 (The Divine Comedy)
- 9780199232599 (The Epic Of Gilgamesh)
- 9780199232735 (The Book Of Job)
- 9780199232742 (One Thousand and One Nights)
- 9780141192765 (Njál's Saga)
- 9780141439518 (Pride and Prejudice)
- 9780142437254 (Le Père Goriot)
- 9780199232734 (Molloy, Malone Dies, The Unnamable)

## Available Authors

- Chinua Achebe
- Hans Christian Andersen
- Dante Alighieri
- Unknown
- Jane Austen
- Honoré de Balzac
- Samuel Beckett

## Available Titles

- Things Fall Apart
- Fairy tales
- The Divine Comedy
- The Epic Of Gilgamesh
- The Book Of Job
- One Thousand and One Nights
- Njál's Saga
- Pride and Prejudice
- Le Père Goriot
- Molloy, Malone Dies, The Unnamable, the trilogy

## Tips

1. URL encode spaces as %20 in author and title queries
2. Save session cookies with -c for login, use -b for authenticated requests
3. Use -i flag to see HTTP headers and status codes
4. Use -X to specify HTTP method (POST, PUT, DELETE, GET)
5. Use -d for request body (JSON)
6. Use -H for custom headers
