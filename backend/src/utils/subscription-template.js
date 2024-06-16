const generateEmailTemplate = (forecast) => {
  const forecastHTML = forecast
    .map(
      (day) => `
        <tr>
            <td>${day.date}</td>
            <td>${day.temperature}°C</td>
            <td>${day.wind} M/S</td>
            <td>${day.humidity}%</td>
            <td>${day.condition}</td>
        </tr>
    `
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather Forecast</title>
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
        table {
            width: 100%;
            border-collapse: collapse;
        }
        table, th, td {
            border: 1px solid black;
        }
        th, td {
            padding: 10px;
            text-align: left;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Weather Forecast for your city</h1>
        </div>
        <div class="content">
            <h2>Daily Forecast</h2>
            <table>
                <tr>
                    <th>Date</th>
                    <th>Temperature</th>
                    <th>Wind</th>
                    <th>Humidity</th>
                    <th>Condition</th>
                </tr>
                ${forecastHTML}
            </table>
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

module.exports = generateEmailTemplate;
