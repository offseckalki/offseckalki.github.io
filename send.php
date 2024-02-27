<?php

$to = "offseckalki@gmail.com";
$subject = "Notice of Examination Cancellation";

// Set the sender email and name
$senderEmail = 'info.hpsc@gmail.com ';
$senderName = "info.hpsc@gmail.com ";


// HTML message
$message = '
Dear APOORV GARG,

We regret to inform you that due to unforeseen circumstances, the Haryana Civil Service (Judicial Branch) Prelims Examination scheduled to be held on 3rd March 2024  has been cancelled until further notice.
The commission is actively working to resolve the issues and will provide updates regarding the rescheduling of the examination as soon as possible.

We apologize for any inconvenience this may cause and appreciate your understanding and cooperation in this matter.

For further updates, please visit our official website or contact our helpline.

Regards-
HPSC, Panchkula
Note:This is a system generated email. You need not to reply to same.';

// Set additional headers
$headers = 'From: ' . $senderName . ' <' . $senderEmail . '>' . "\r\n" .
    
    'X-Mailer: PHP/' . phpversion() . "\r\n" .
    'MIME-Version: 1.0\r\n' .
    'Content-Type: text/html; charset=UTF-8' . "\r\n";

// Use the mail() function to send the email
if (mail($to, $subject, $message, $headers)) {
    echo "Email sent successfully.";
} else {
    echo "Error sending email. Check your server configuration and error logs for more information.";
}
?>
