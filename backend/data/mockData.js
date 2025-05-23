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

// Mock racing series data
const mockRacingSeries = [
  {
    id: 1,
    name: "Formula 1",
    shortName: "F1",
    description: "The pinnacle of motorsport, featuring the fastest circuit racing cars in the world.",
    logo: "https://via.placeholder.com/300x150?text=Formula+1",
    primaryColor: "#e10600", // F1 red
    driversCount: 20
  },
  {
    id: 2,
    name: "IndyCar Series",
    shortName: "IndyCar",
    description: "The premier level of open-wheel racing in North America, known for its high-speed oval races and road courses.",
    logo: "https://via.placeholder.com/300x150?text=IndyCar",
    primaryColor: "#1447b5", // IndyCar blue
    driversCount: 24
  },
  {
    id: 3,
    name: "NASCAR Cup Series",
    shortName: "NASCAR",
    description: "America's most popular stock car racing championship, featuring close racing and high-speed ovals.",
    logo: "https://via.placeholder.com/300x150?text=NASCAR",
    primaryColor: "#ffd659", // NASCAR yellow
    driversCount: 36
  },
  {
    id: 4,
    name: "Formula E",
    shortName: "FE",
    description: "An electric street racing series showcasing innovation and sustainability in motorsport.",
    logo: "https://via.placeholder.com/300x150?text=Formula+E",
    primaryColor: "#14b5a0", // Formula E teal
    driversCount: 22
  }
];

// Mock races for each racing series
const mockRacesBySeries = {
  // Formula 1 races (seriesId: 1)
  "1": [
    {
      id: 101,
      name: "Monaco Grand Prix",
      circuit: "Circuit de Monaco",
      date: "May 25, 2025",
      location: "Monte Carlo, Monaco",
      image: "https://via.placeholder.com/400x250?text=Monaco"
    },
    {
      id: 102,
      name: "Australian Grand Prix",
      circuit: "Albert Park Circuit",
      date: "June 15, 2025",
      location: "Melbourne, Australia",
      image: "https://via.placeholder.com/400x250?text=Melbourne"
    },
    {
      id: 103,
      name: "Chinese Grand Prix",
      circuit: "Shanghai International Circuit",
      date: "June 29, 2025",
      location: "Shanghai, China",
      image: "https://via.placeholder.com/400x250?text=Shanghai"
    }
  ],
  
  // IndyCar races (seriesId: 2)
  "2": [
    {
      id: 201,
      name: "Indianapolis 500",
      circuit: "Indianapolis Motor Speedway",
      date: "May 26, 2025",
      location: "Indianapolis, USA",
      image: "https://via.placeholder.com/400x250?text=Indianapolis"
    },
    {
      id: 202,
      name: "Long Beach Grand Prix",
      circuit: "Long Beach Street Circuit",
      date: "June 7, 2025",
      location: "Long Beach, California, USA",
      image: "https://via.placeholder.com/400x250?text=LongBeach"
    }
  ],
  
  // NASCAR races (seriesId: 3)
  "3": [
    {
      id: 301,
      name: "Daytona 500",
      circuit: "Daytona International Speedway",
      date: "May 22, 2025",
      location: "Daytona Beach, Florida, USA",
      image: "https://via.placeholder.com/400x250?text=Daytona"
    },
    {
      id: 302,
      name: "Coca-Cola 600",
      circuit: "Charlotte Motor Speedway",
      date: "June 12, 2025",
      location: "Concord, North Carolina, USA",
      image: "https://via.placeholder.com/400x250?text=Charlotte"
    }
  ],
  
  // Formula E races (seriesId: 4)
  "4": [
    {
      id: 401,
      name: "London E-Prix",
      circuit: "ExCeL London Circuit",
      date: "May 30, 2025",
      location: "London, UK",
      image: "https://via.placeholder.com/400x250?text=London"
    },
    {
      id: 402,
      name: "Monaco E-Prix",
      circuit: "Circuit de Monaco",
      date: "June 20, 2025",
      location: "Monte Carlo, Monaco",
      image: "https://via.placeholder.com/400x250?text=MonacoE"
    }
  ]
};

// Mock race calendar
const mockRaceCalendar = [
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

// Mock race results
const mockRaceResults = {
  "1": [
    { position: 1, driver: "Max Verstappen", team: "Red Bull Racing", time: "1:32:45.567", points: 25 },
    { position: 2, driver: "Lewis Hamilton", team: "Mercedes", time: "+5.231s", points: 18 },
    { position: 3, driver: "Charles Leclerc", team: "Ferrari", time: "+7.126s", points: 15 },
    { position: 4, driver: "Carlos Sainz", team: "Ferrari", time: "+12.359s", points: 12 },
    { position: 5, driver: "Lando Norris", team: "McLaren", time: "+14.752s", points: 10 }
  ]
};

module.exports = {
  mockDrivers,
  mockRaces,
  mockUpcomingRaces,
  mockStandings,
  mockNews,
  mockRacingSeries,
  mockRacesBySeries,
  mockRaceCalendar,
  mockRaceResults
};
