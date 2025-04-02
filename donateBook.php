<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "1234";
$database = "book_donations";

$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $book_name = $_POST['book_name'] ?? '';
    $author_name = $_POST['author_name'] ?? '';
    $book_type = $_POST['book-type'] ?? '';
    $year = $_POST['year'] ?? '';
    $subject = $_POST['subject'] ?? '';
    $publication = $_POST['publication'] ?? '';
    $description = $_POST['description'] ?? '';

    // Prepare SQL statement to prevent SQL injection
    $stmt = $conn->prepare("INSERT INTO books (book_name, author_name, book_type, year, subject, publication, description) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssss", $book_name, $author_name, $book_type, $year, $subject, $publication, $description);

    if ($stmt->execute()) {
        echo "Book donation recorded successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }
    
    $stmt->close();
}

$conn->close();
?>