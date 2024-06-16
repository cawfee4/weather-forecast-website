const router = require("express").Router();
const fetch = require("node-fetch");
const RegisteredEmail = require("../models/emailModel");
const HTML_TEMPLATE = require("../utils/mail-template");
const SENDMAIL = require("../utils/mailer");
const generateEmailTemplate = require("../utils/subscription-template");

router.get("/getForecast", async (req, res) => {
  try {
    const { city, day } = req.query;
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${city}&days=${day}`
    );
    const data = await response.json();
    if (data.error) {
      return res.status(404).json({ message: data.error.message });
    }
    const { forecastday } = data.forecast;
    const forecast = forecastday.map((day) => {
      return {
        date: day.date,
        temperature: day.day.avgtemp_c,
        wind: day.day.maxwind_kph,
        humidity: day.day.avghumidity,
        icon: day.day.condition.icon,
      };
    });
    const forecastFinal = {
      date: data.current.last_updated,
      temperature: data.current.temp_c,
      wind: data.current.wind_kph,
      city: data.location.name,
      icon: data.current.condition.icon,
      condition: data.current.condition.text,
      humidity: data.current.humidity,
      forecast,
    };
    res.json(forecastFinal);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching forecast data", error: error.message });
  }
});

router.get("/getCity", async (req, res) => {
  try {
    const { city } = req.query || "%20";
    const response = await fetch(
      `https://api.weatherapi.com/v1/search.json?q=${city}&key=${process.env.WEATHER_API_KEY}`
    );
    const data = await response.json();
    if (data.error) {
      return res.status(404).json({ message: data.error.message });
    }
    const cityname = data.map((city) => {
      return {
        name: city.name,
        id: city.id,
      };
    });
    res.json(cityname);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching city data", error: error.message });
  }
});

router.get("/sendMail", async (req, res) => {
  try {
    const emails = await RegisteredEmail.find();
    if (!emails.length) {
      return res.status(404).json({ message: "No registered emails found" });
    }

    for (let email of emails) {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${email.location}&days=2`
        );

        if (!response.ok) {
          console.error(`Failed to fetch weather data for ${email.location}`);
          continue; // Skip to the next email
        }

        const data = await response.json();
        const { forecastday } = data.forecast;

        const forecast = forecastday.map((day) => {
          return {
            date: day.date,
            temperature: day.day.avgtemp_c,
            wind: day.day.maxwind_kph,
            humidity: day.day.avghumidity,
            condition: day.day.condition.text,
            icon: day.day.condition.icon,
          };
        });

        const mailDetails = {
          from: process.env.EMAIL,
          to: email.address,
          subject: "Weather Forecast",
          html: generateEmailTemplate(forecast),
        };

        await new Promise((resolve, reject) => {
          SENDMAIL(mailDetails, (info) => {
            if (info) {
              console.log(`Email sent successfully to ${email.address}`);
              resolve();
            } else {
              reject(new Error(`Failed to send email to ${email.address}`));
            }
          });
        });
      } catch (emailError) {
        console.error(`Failed to send email to ${email.address}`, emailError);
      }
    }

    res.status(200).json({ message: "Emails sent successfully" });
  } catch (err) {
    console.error("Failed to send emails", err);
    res
      .status(500)
      .json({ message: "Failed to send emails", error: err.message });
  }
});

router.post("/subscribeDaily", async (req, res) => {
  const { address, location } = req.body;
  try {
    // Check if the email already exists
    const existingSubscription = await RegisteredEmail.findOne({ address });
    if (existingSubscription) {
      // Delete the existing subscription
      await RegisteredEmail.deleteOne({ address });
      res.status(200).json({
        message: "Unsubscribed successfully",
        address: address,
        status: "unsubscribed",
      });
      return;
    }

    // If not, create a new subscription
    const newSubscription = new RegisteredEmail({ address, location });
    await newSubscription.save();

    // Send a confirmation email
    const mailDetails = {
      from: process.env.EMAIL,
      to: address,
      subject: "Weather Forecast Subscription",
      html: HTML_TEMPLATE(address),
    };
    SENDMAIL(mailDetails, () => {
      res.status(201).json({
        message: "Subscribe successful",
        address: address,
        location: location,
        status: "subscribed",
      });
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
      status: "error",
    });
  }
});

module.exports = router;
