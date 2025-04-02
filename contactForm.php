<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "1234";
$database = "contact_form_db";

$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $full_name = $_POST['fullName'] ?? '';
    $email = $_POST['email'] ?? '';
    $telephone_no = $_POST['telephoneNo'] ?? '';
    
    // Prepare SQL statement to prevent SQL injection
    $stmt = $conn->prepare("INSERT INTO contacts (full_name, email, telephone_no) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $full_name, $email, $telephone_no);

    if ($stmt->execute()) {
        echo "Contact form submitted successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }
    
    $stmt->close();
}

$conn->close();
?>