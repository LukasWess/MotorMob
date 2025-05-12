const express = require('express');
const router = express.Router();
const { images } = require('../data/images');

// Mock data for motorsport endpoints
const mockDrivers = {
  "1": {
    id: 1,
    name: "Max Verstappen",
    number: 1,
    team: "Red Bull Racing",
    nationality: "Netherlands",
    dateOfBirth: "September 30, 1997",
    biography: "Max Emilian Verstappen is a Belgian-Dutch racing driver currently competing in Formula One, under the Dutch flag, with Red Bull Racing. At the 2015 Australian Grand Prix, when he was aged 17 years, 166 days, he became the youngest driver to compete in Formula One.",
    championships: 3,
    wins: 62,
    podiums: 105,
    polePositions: 42,
    fastestLaps: 32,
    currentSeasonPoints: 125,
    currentSeasonPosition: 1,
    image: images.drivers.verstappen
  },
  "2": {
    id: 2,
    name: "Lewis Hamilton",
    number: 44,
    team: "Mercedes",
    nationality: "United Kingdom",
    dateOfBirth: "January 7, 1985",
    biography: "Sir Lewis Carl Davidson Hamilton MBE is a British racing driver currently competing in Formula One for Mercedes. A seven-time World Drivers' Championship winner, he is widely regarded as one of the greatest drivers in the history of the sport.",
    championships: 7,
    wins: 103,
    podiums: 191,
    polePositions: 104,
    fastestLaps: 61,
    currentSeasonPoints: 110,
    currentSeasonPosition: 2,
    image: images.drivers.hamilton
  },
  "3": {
    id: 3,
    name: "Scott Dixon",
    number: 9,
    team: "Chip Ganassi Racing",
    nationality: "New Zealand",
    dateOfBirth: "July 22, 1980",
    biography: "Scott Ronald Dixon is a New Zealand professional racing driver who competes in the NTT IndyCar Series for Chip Ganassi Racing. Dixon has won the IndyCar championship six times: in 2003, 2008, 2013, 2015, 2018 and 2020.",
    championships: 6,
    wins: 53,
    podiums: 130,
    polePositions: 32,
    fastestLaps: 47,
    currentSeasonPoints: 95,
    currentSeasonPosition: 1,
    image: images.drivers.dixon
  }
};

const mockRaces = {
  "1": {
    id: 1,
    name: "Monaco Grand Prix",
    circuit: "Circuit de Monaco",
    location: "Monte Carlo, Monaco",
    date: "May 25, 2025",
    time: "14:00",
    status: "upcoming",
    series: "Formula 1",
    circuitLength: "3.337 km",
    laps: 78,
    distance: "260.286 km",
    lapRecord: {
      time: "1:12.909",
      driver: "Lewis Hamilton",
      year: 2021
    },
    circuitImage: images.circuits.monaco,
    description: "The Monaco Grand Prix is a Formula One motor race held annually on the Circuit de Monaco on the last weekend in May. Run since 1929, it is widely considered to be one of the most important and prestigious automobile races in the world, alongside the Indianapolis 500 and the 24 Hours of Le Mans.",
    previousWinners: [
      { year: 2024, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2023, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2022, driver: "Sergio Perez", team: "Red Bull Racing" },
      { year: 2021, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2019, driver: "Lewis Hamilton", team: "Mercedes" }
    ],
    trackLayout: images.circuits.monaco,
    weatherForecast: {
      conditions: "Sunny",
      temperature: "22°C",
      precipitation: "0%",
      windSpeed: "5 km/h"
    }
  },
  "2": {
    id: 2,
    name: "Indianapolis 500",
    circuit: "Indianapolis Motor Speedway",
    location: "Indianapolis, USA",
    date: "May 26, 2025",
    time: "12:00",
    status: "upcoming",
    series: "IndyCar",
    circuitLength: "2.5 miles",
    laps: 200,
    distance: "500 miles",
    lapRecord: {
      time: "37.895 seconds",
      driver: "Scott Dixon",
      year: 2022
    },
    circuitImage: images.circuits.indianapolis,
    description: "The Indianapolis 500 is an automobile race held annually at Indianapolis Motor Speedway in Speedway, Indiana, United States, an enclave suburb of Indianapolis. The event is traditionally held over Memorial Day weekend in late May. It is contested as part of the IndyCar Series, the top level of American championship car racing.",
    previousWinners: [
      { year: 2024, driver: "Scott Dixon", team: "Chip Ganassi Racing" },
      { year: 2023, driver: "Josef Newgarden", team: "Team Penske" },
      { year: 2022, driver: "Marcus Ericsson", team: "Chip Ganassi Racing" },
      { year: 2021, driver: "Helio Castroneves", team: "Meyer Shank Racing" },
      { year: 2020, driver: "Takuma Sato", team: "Rahal Letterman Lanigan Racing" }
    ],
    trackLayout: images.circuits.indianapolis,
    weatherForecast: {
      conditions: "Partly Cloudy",
      temperature: "25°C",
      precipitation: "10%",
      windSpeed: "8 km/h"
    }
  },
  "3": {
    id: 3,
    name: "Nürburgring 24 Hours",
    circuit: "Nürburgring Nordschleife",
    date: "June 1, 2025",
    time: "15:30",
    location: "Nürburg, Germany",
    status: "upcoming",
    series: "GT Racing",
    circuitLength: "25.378 km",
    laps: 100,
    distance: "2537.8 km",
    lapRecord: {
      time: "8:10.914",
      driver: "Timo Bernhard",
      year: 2018
    },
    circuitImage: images.circuits.nurburgring,
    description: "The 24 Hours Nürburgring is a 24-hour annual touring car and GT endurance racing event on the Nordschleife of the Nürburgring in central Germany. Held on a 25 km-long combination of the Nordschleife and the modern Grand Prix circuit, it is known for its challenging and demanding nature.",
    previousWinners: [
      { year: 2024, driver: "Raffaele Marciello", team: "Mercedes-AMG Team HRT" },
      { year: 2023, driver: "Nicky Catsburg", team: "Rowe Racing" },
      { year: 2022, driver: "Laurens Vanthoor", team: "Phoenix Racing" },
      { year: 2021, driver: "Kelvin van der Linde", team: "Audi Sport Team Land" },
      { year: 2020, driver: "Nick Yelloly", team: "ROWE Racing" }
    ],
    trackLayout: images.circuits.nurburgring,
    weatherForecast: {
      conditions: "Overcast",
      temperature: "18°C",
      precipitation: "30%",
      windSpeed: "15 km/h"
    }
  }
};

const mockUpcomingRaces = [
  {
    id: 1,
    name: 'Monaco Grand Prix',
    circuit: 'Circuit de Monaco',
    date: 'May 25, 2025',
    time: '14:00',
    location: 'Monte Carlo, Monaco',
    status: 'upcoming',
    series: 'Formula 1'
  },
  {
    id: 2,
    name: 'Indianapolis 500',
    circuit: 'Indianapolis Motor Speedway',
    date: 'May 26, 2025',
    time: '12:00',
    location: 'Indianapolis, USA',
    status: 'upcoming',
    series: 'IndyCar'
  },
  {
    id: 3,
    name: 'Nürburgring 24 Hours',
    circuit: 'Nürburgring Nordschleife',
    date: 'June 1, 2025',
    time: '15:30',
    location: 'Nürburg, Germany',
    status: 'upcoming',
    series: 'GT Racing'
  }
];

const mockTopDrivers = [
  {
    id: 1,
    name: 'Max Verstappen',
    team: 'Red Bull Racing',
    points: 125,
    position: 1,
    nationality: 'Netherlands',
    series: 'Formula 1',
    image: images.drivers.verstappen
  },
  {
    id: 2,
    name: 'Lewis Hamilton',
    team: 'Mercedes',
    points: 110,
    position: 2,
    nationality: 'United Kingdom',
    series: 'Formula 1',
    image: images.drivers.hamilton
  },
  {
    id: 3,
    name: 'Scott Dixon',
    team: 'Chip Ganassi Racing',
    points: 95,
    position: 1,
    nationality: 'New Zealand',
    series: 'IndyCar',
    image: images.drivers.dixon
  }
];

const mockNews = [
  {
    id: 1,
    title: "Verstappen Extends Championship Lead With Monaco Victory",
    excerpt: "Max Verstappen secured his fourth consecutive victory this season at the Monaco Grand Prix, extending his lead in the drivers' championship.",
    date: "May 10, 2025",
    source: "RacingNews",
    imageUrl: images.news.placeholder
  },
  {
    id: 2,
    title: "Hamilton Signs Two-Year Contract Extension with Mercedes",
    excerpt: "Seven-time world champion Lewis Hamilton has signed a two-year contract extension with Mercedes, ending speculation about his future.",
    date: "May 9, 2025",
    source: "F1 Insider",
    imageUrl: images.news.placeholder
  },
  {
    id: 3,
    title: "IndyCar Introduces New Safety Measures for 2025 Season",
    excerpt: "IndyCar has announced new safety measures that will be implemented for the remainder of the 2025 season following recent incidents.",
    date: "May 8, 2025",
    source: "Motorsport Today",
    imageUrl: images.news.placeholder
  },
  {
    id: 4,
    title: "New Night Race Added to Formula 1 Calendar",
    excerpt: "Formula 1 has announced a new night race in Thailand will be added to the calendar starting from the 2026 season.",
    date: "May 7, 2025",
    source: "RaceFans",
    imageUrl: images.news.placeholder
  }
];

// Get driver profile by ID
router.get('/drivers/:id', (req, res) => {
  const driver = mockDrivers[req.params.id];
  if (!driver) {
    return res.status(404).json({ error: 'Driver not found' });
  }
  res.json(driver);
});

// Get championship standings
router.get('/standings', (req, res) => {
  const { series } = req.query;
  
  let standings = mockTopDrivers;
  
  if (series && series !== 'all') {
    standings = standings.filter(driver => driver.series.toLowerCase() === series.toLowerCase());
  }
  
  res.json(standings);
});

// Get race results
router.get('/races/:id/results', (req, res) => {
  const race = mockRaces[req.params.id];
  if (!race) {
    return res.status(404).json({ error: 'Race not found' });
  }
  
  // Mock race results
  const results = [
    { position: 1, driver: "Max Verstappen", team: "Red Bull Racing", time: "1:32:45.567", points: 25 },
    { position: 2, driver: "Lewis Hamilton", team: "Mercedes", time: "+5.231s", points: 18 },
    { position: 3, driver: "Charles Leclerc", team: "Ferrari", time: "+7.126s", points: 15 },
    { position: 4, driver: "Carlos Sainz", team: "Ferrari", time: "+12.359s", points: 12 },
    { position: 5, driver: "Lando Norris", team: "McLaren", time: "+14.752s", points: 10 }
  ];
  
  res.json({
    race,
    results
  });
});

// Get upcoming races
router.get('/races/upcoming', (req, res) => {
  const { limit } = req.query;
  
  let races = [...mockUpcomingRaces];
  
  if (limit) {
    races = races.slice(0, parseInt(limit, 10));
  }
  
  res.json(races);
});

// Get race details
router.get('/races/:id', (req, res) => {
  const race = mockRaces[req.params.id];
  if (!race) {
    return res.status(404).json({ error: 'Race not found' });
  }
  res.json(race);
});

// Get race calendar
router.get('/calendar', (req, res) => {
  const { series, year } = req.query;
  
  // Mock calendar data
  const calendar = [
    {
      id: 1,
      name: "Monaco Grand Prix",
      circuit: "Circuit de Monaco",
      date: "May 25, 2025",
      location: "Monte Carlo, Monaco",
      series: "Formula 1"
    },
    {
      id: 2,
      name: "Indianapolis 500",
      circuit: "Indianapolis Motor Speedway",
      date: "May 26, 2025",
      location: "Indianapolis, USA",
      series: "IndyCar"
    },
    {
      id: 3,
      name: "Nürburgring 24 Hours",
      circuit: "Nürburgring Nordschleife",
      date: "June 1, 2025",
      location: "Nürburg, Germany",
      series: "GT Racing"
    },
    {
      id: 4,
      name: "Australian Grand Prix",
      circuit: "Albert Park Circuit",
      date: "June 15, 2025",
      location: "Melbourne, Australia",
      series: "Formula 1"
    },
    {
      id: 5,
      name: "Chinese Grand Prix",
      circuit: "Shanghai International Circuit",
      date: "June 29, 2025",
      location: "Shanghai, China",
      series: "Formula 1"
    }
  ];
  
  let filteredCalendar = [...calendar];
  
  if (series && series !== 'all') {
    filteredCalendar = filteredCalendar.filter(race => race.series.toLowerCase() === series.toLowerCase());
  }
  
  res.json(filteredCalendar);
});

// Get latest news
router.get('/news', (req, res) => {
  const { limit } = req.query;
  
  let news = [...mockNews];
  
  if (limit) {
    news = news.slice(0, parseInt(limit, 10));
  }
  
  res.json(news);
});

module.exports = router;
