const HTML_TEMPLATE = (address) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subscription Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 10px 0;
            background-color: #4CAF50;
            color: white;
        }
        .content {
            padding: 20px;
            text-align: left;
        }
        .content h1 {
            font-size: 24px;
        }
        .content p {
            font-size: 16px;
            line-height: 1.6;
        }
        .footer {
            text-align: center;
            padding: 10px 0;
            font-size: 14px;
            color: #666666;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            font-size: 16px;
            color: white;
            background-color: #4CAF50;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Weather Update Subscription</h1>
        </div>
        <div class="content">
            <h1>Subscription Successful!</h1>
            <p>Dear ${address},</p>
            <p>Thank you for subscribing to our daily weather updates. We are excited to keep you informed about the latest weather conditions directly to your inbox.</p>
            <p>You will receive daily emails with the current weather, forecasts, and any important weather alerts for your selected location.</p>
            <p>We hope you find this service useful and that it helps you plan your day better.</p>
            <a href="http://localhost:5173/" class="button">Visit Our Website</a>
        </div>
        <div class="footer">
            <p>If you have any questions, feel free to contact our support team.</p>
            <p>&copy; 2024 Weather Updates Inc. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
};

module.exports = HTML_TEMPLATE;
