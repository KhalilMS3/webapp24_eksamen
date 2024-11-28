export const events =[
  {
    id: "event001",
    title: "Fredagsjoggen",
    slug: "fredagsjoggen",
    description: "En ukentlig joggetur for alle som vil være med. En fin måte å komme i form og møte nye mennesker.",
    date: "2024-11-22T18:00:00Z",
    location: "Sentralparken, Oslo",
    type: "Sport",
    capacity: 30,
    price: 0,
    isPrivate: false,
    waitlistAvailable: true,
    availableSpots: 10,
    status: "Ledig"
  },
  {
    id: "event002",
    title: "Middag med Styret",
    slug: "middag-med-styret",
    description: "En formell middag med styret hvor medlemmer kan diskutere fremtidige planer og dele sine ideer.",
    date: "2024-11-25T19:00:00Z",
    location: "Grand Hotell, Oslo",
    type: "Møte",
    capacity: 20,
    price: 500,
    isPrivate: true,
    waitlistAvailable: false,
    availableSpots: 0,
    status: "Fullbooket"
  },
  {
    id: "event003",
    title: "Yoga i Parken",
    slug: "yoga-i-parken",
    description: "Bli med på en avslappende yogaøkt ute i frisk luft. Passer for alle nivåer.",
    date: "2025-01-01T10:00:00Z",
    location: "Byparken, Bergen",
    type: "Trening",
    capacity: 50,
    price: 100,
    isPrivate: false,
    waitlistAvailable: true,
    availableSpots: 30,
    status: "Ledig"
  },
  {
    id: "event004",
    title: "Juleverksted for Barn",
    slug: "juleverksted-for-barn",
    description: "En morsom dag med juleverksted for barn. Lag dine egne juledekorasjoner!",
    date: "2021-12-05T12:00:00Z",
    location: "Kulturhuset, Trondheim",
    type: "Familie",
    capacity: 25,
    price: 50,
    isPrivate: false,
    waitlistAvailable: true,
    availableSpots: 5,
    status: "Ledig"
  },
  {
    id: "event005",
    title: "Digital Marketing Workshop",
    slug: "digital-marketing-workshop",
    description: "En intensiv workshop for å lære grunnleggende digital markedsføring. Perfekt for småbedrifter og gründere.",
    date: "2023-05-10T09:00:00Z",
    location: "Næringslivets Hus, Oslo",
    type: "Workshop",
    capacity: 15,
    price: 800,
    isPrivate: false,
    waitlistAvailable: false,
    availableSpots: 0,
    status: "Fullbooket"
  }
];



export const months = [
  { value: '1', label: 'Januar' },
  { value: '2', label: 'Februar' },
  { value: '3', label: 'Mars' },
  { value: '4', label: 'April' },
  { value: '5', label: 'Mai' },
  { value: '6', label: 'Juni' },
  { value: '7', label: 'Juli' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'Oktober' },
  { value: '11', label: 'November' },
  { value: '12', label: 'Desember' }, 
]
export const weekDays = [
        "Mandag",
        "Tirsdag",
        "Onsdag",
        "Torsdag",
        "Fredag",
        "Lørdag",
        "Søndag",
      ]
export const generateYears = (startOffset: number, endOffset: number) => {
  const currentYear = new Date().getFullYear()
  const years: number[] = []
  for (let i = currentYear + startOffset; i <= currentYear + endOffset; i++) {
    years.push(i)
  }

  return years
}