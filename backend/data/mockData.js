// Mock data for MotorMob application
const { images } = require('./images');

// Mock drivers
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

// Mock races
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
    circuitImage: images.circuits?.monaco || '/assets/circuits/monaco.jpg',
    description: "The Monaco Grand Prix is a Formula One motor race held annually on the Circuit de Monaco on the last weekend in May. Run since 1929, it is widely considered to be one of the most important and prestigious automobile races in the world, alongside the Indianapolis 500 and the 24 Hours of Le Mans.",
    previousWinners: [
      { year: 2024, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2023, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2022, driver: "Sergio Perez", team: "Red Bull Racing" },
      { year: 2021, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2019, driver: "Lewis Hamilton", team: "Mercedes" }
    ],
    trackLayout: images.circuits?.monaco || '/assets/circuits/monaco.jpg',
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
    circuitLength: "4.023 km",
    laps: 200,
    distance: "804.672 km",
    lapRecord: {
      time: "37.895",
      driver: "Scott Dixon",
      year: 2022
    },
    circuitImage: images.circuits?.indianapolis || '/assets/circuits/indianapolis.jpg',
    description: "The Indianapolis 500 is an automobile race held annually at Indianapolis Motor Speedway in Speedway, Indiana, United States, an enclave suburb of Indianapolis. The event is traditionally held over Memorial Day weekend, usually the last weekend of May.",
    previousWinners: [
      { year: 2024, driver: "Scott Dixon", team: "Chip Ganassi Racing" },
      { year: 2023, driver: "Josef Newgarden", team: "Team Penske" },
      { year: 2022, driver: "Marcus Ericsson", team: "Chip Ganassi Racing" },
      { year: 2021, driver: "Helio Castroneves", team: "Meyer Shank Racing" },
      { year: 2020, driver: "Takuma Sato", team: "Rahal Letterman Lanigan Racing" }
    ],
    trackLayout: images.circuits?.indianapolis || '/assets/circuits/indianapolis.jpg',
    weatherForecast: {
      conditions: "Partly Cloudy",
      temperature: "24°C",
      precipitation: "10%",
      windSpeed: "15 km/h"
    }
  }
};

// Mock upcoming races
const mockUpcomingRaces = [
  {
    id: 1,
    name: "Monaco Grand Prix",
    circuit: "Circuit de Monaco",
    date: "May 25, 2025",
    time: "14:00",
    location: "Monte Carlo, Monaco",
    status: "upcoming",
    series: "Formula 1",
    thumbnail: images.circuits?.monaco || '/assets/circuits/monaco.jpg'
  },
  {
    id: 2,
    name: "Indianapolis 500",
    circuit: "Indianapolis Motor Speedway",
    date: "May 26, 2025",
    time: "12:00",
    location: "Indianapolis, USA",
    status: "upcoming",
    series: "IndyCar",
    thumbnail: images.circuits?.indianapolis || '/assets/circuits/indianapolis.jpg'
  },
  {
    id: 3,
    name: "Nürburgring 24 Hours",
    circuit: "Nürburgring Nordschleife",
    date: "June 1, 2025",
    time: "15:30",
    location: "Nürburg, Germany",
    status: "upcoming",
    series: "GT Racing",
    thumbnail: images.circuits?.nurburgring || '/assets/circuits/nurburgring.jpg'
  }
];

// Mock standings
const mockStandings = {
  f1: [
    {
      position: 1,
      driver: {
        id: 1,
        name: "Max Verstappen",
        nationality: "Netherlands"
      },
      team: "Red Bull Racing",
      points: 125,
      wins: 4,
      series: "Formula 1"
    },
    {
      position: 2,
      driver: {
        id: 2,
        name: "Lewis Hamilton",
        nationality: "United Kingdom"
      },
      team: "Mercedes",
      points: 110,
      wins: 2,
      series: "Formula 1"
    },
    {
      position: 3,
      driver: {
        id: 7,
        name: "Charles Leclerc",
        nationality: "Monaco"
      },
      team: "Ferrari",
      points: 95,
      wins: 1,
      series: "Formula 1"
    }
  ],
  indycar: [
    {
      position: 1,
      driver: {
        id: 3,
        name: "Scott Dixon",
        nationality: "New Zealand"
      },
      team: "Chip Ganassi Racing",
      points: 95,
      wins: 2,
      series: "IndyCar"
    },
    {
      position: 2,
      driver: {
        id: 10,
        name: "Josef Newgarden",
        nationality: "United States"
      },
      team: "Team Penske",
      points: 90,
      wins: 1,
      series: "IndyCar"
    },
    {
      position: 3,
      driver: {
        id: 11,
        name: "Alex Palou",
        nationality: "Spain"
      },
      team: "Chip Ganassi Racing",
      points: 85,
      wins: 1,
      series: "IndyCar"
    }
  ]
};

// Mock news
const mockNews = [
  {
    id: 1,
    title: "Verstappen Wins Fifth Race of the Season",
    summary: "Max Verstappen secured his fifth win of the 2025 season at the Spanish Grand Prix, extending his championship lead.",
    content: "Max Verstappen dominated the Spanish Grand Prix to secure his fifth win of the 2025 Formula 1 season. The Red Bull driver started from pole position and led every lap of the race, finishing ahead of Lewis Hamilton and Charles Leclerc. This victory extends Verstappen's lead in the drivers' championship to 40 points.",
    date: "May 10, 2025",
    author: "John Motorsport",
    category: "Formula 1",
    tags: ["Verstappen", "Red Bull", "Spanish GP"],
    image: images.news?.verstappen_win || '/assets/news/news-placeholder.jpg'
  },
  {
    id: 2,
    title: "Dixon Takes Victory at Long Beach",
    summary: "Scott Dixon won the Long Beach Grand Prix to take the lead in the IndyCar championship standings.",
    content: "Scott Dixon put on a masterclass performance to win the Long Beach Grand Prix, taking the lead in the IndyCar championship standings. The New Zealander qualified second but took the lead on the first lap and never looked back. Josef Newgarden finished second, with Alex Palou rounding out the podium.",
    date: "May 5, 2025",
    author: "Sarah Racing",
    category: "IndyCar",
    tags: ["Dixon", "Long Beach", "IndyCar"],
    image: images.news?.dixon_win || '/assets/news/news-placeholder.jpg'
  },
  {
    id: 3,
    title: "Mercedes Announces New Car Upgrades",
    summary: "Mercedes announces significant upgrades to their car ahead of the Monaco Grand Prix.",
    content: "Mercedes has announced significant upgrades to their car ahead of the Monaco Grand Prix. The team has been working on improvements to the car's aerodynamics and suspension, which they hope will help them challenge Red Bull for race wins. Lewis Hamilton expressed optimism about the changes, stating that they should help the team close the gap to their rivals.",
    date: "May 15, 2025",
    author: "Technical Reporter",
    category: "Formula 1",
    tags: ["Mercedes", "Upgrades", "Monaco GP"],
    image: images.news?.mercedes_upgrade || '/assets/news/news-placeholder.jpg'
  }
];

module.exports = {
  mockDrivers,
  mockRaces,
  mockUpcomingRaces,
  mockStandings,
  mockNews
};
