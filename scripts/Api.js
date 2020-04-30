const [water, setWater] = useState ([]);

const getMeteo = () => {
    axios.get ('api.openweathermap.org/data/2.5/forecast/daily?q=London&mode=xml&units=metric&cnt=7')
    .then (res => res.data)
    .then (data => {
        setWater (data[0])
    })
}

//blabla