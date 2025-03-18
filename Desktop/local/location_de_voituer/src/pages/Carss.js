import React, { useEffect, useState } from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import { dataCars } from '../Data/dataCars'
import '../Styles/Cars.css'

export default function Carss() {
    const location=useLocation()
    const navigate=useNavigate()
      const [availableCars, setAvailableCars] = useState([]);
    
    const [selectedCar,setSelectedCar]=useState(null)
    const [searchData,setSearchData]=useState(location.state?.formData || {
        villeReservation:'',
        dateReservation:'',
        TimeRes:'10:00',
        VilleReturn:'',
        dateReturn:'',
        TimeRetu:'10:00',
        CodeP:'',
        Age:'+19'
    } )
    const [filters,setFilters]=useState({
        type:'',
        price:'',
        transmission:'',
        luggage:'',
        Age:''
    })
    useEffect(()=>{
        if(location.state?.formData){
            setSearchData(location.state.formData)
        }
    },[location.state])
    useEffect(()=>{
        const filtered=dataCars
        if(searchData.villeReservation){
            filtered=filtered.filter(car =>{
                const carCity=(car.city || '').toLowerCase().trim();
                const searchCity=searchData.villeReservation.toLowerCase().trim();
                const cityMatch=carCity===searchCity
                const ageMatch=!searchData.Age || parseInt(searchData.Age) >= parseInt(car.driver_age || 25)
                return cityMatch && ageMatch

             } )

        }
        if(filters.Age){
            filtered=filtered.filter(car => parseInt(filters.Age)>= parseInt(car.driver_age))
        }
        if(filters.type){
            filtered=filtered.filter(car =>{
                const carType=car.type.toLowerCase().trim();
                const filterType=filters.type.toLowerCase().trim()
                return carType===filterType
            })
        }
        if(filters.price){
            const [min,max]=filters.price.split('-').map(Number)
            filtered=filtered.filter(car =>
                car.price_per_day >= min && car.price_per_day<=max
            )

        }
        if(filters.transmission){
            filtered=filtered.filter(car =>{
                const carTransmission=(car.transmission || '').toLowerCase().trim()
                const filterTransmission=filters.transmission.toLowerCase().trim()
                return carTransmission===filterTransmission
            })
           
        }
        if(filters.luggage){
            filtered=filtered.filter(car => car.luggage_capacity>=filters.luggage)
        }
        setAvailableCars(filtered)
    },[searchData,filters])

    function handleSearchChange(e){
        const {name,value}=e.target;
        setSearchData(prev=>{
            const updated={
                ...prev,[name]:value
            }
            return updated
        })
    }
   function handleFilterChange(e){
    const {name,value}=e.target;
    setFilters(prev=>{
        const updated={
            ...prev,[name]:value
        }
        return updated
    })
   }
   const handleSearch = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    
    const formData = new FormData(e.target);
    const newSearchData = {};
    formData.forEach((value, key) => {
      newSearchData[key] = value;
      console.log('Form field:', key, value);
    });

    setSearchData(prev => {
      const updated = {
        ...prev,
        ...newSearchData
      };
      console.log('Updated search data:', updated);
      return updated;
    });
  };
  return (
    <div className='cars-page'>
        <section className='cars-hero-section'>
            <div className='cars-hero-content'>
                <h1>Find the perfect car for your trip</h1>
                <form className='cars-search-form' onSubmit={handleSearch}>
                    <div>
                        <div className='cars-form-group'>
                            <label>Departure city</label>
                            <select name='VillReservation' value={searchData.villeReservation} onChange={handleSearchChange}>
                                <option value="">Select a city</option>
                                <option value="Casablanca">Casablanca</option>
                                <option value="Marrakech">Marrakech</option>
                                <option value="Oujda">Oujda</option>
                                <option value="Tanger">Tanger</option>
                            </select>

                        </div>
                        <div className='cars-form-group'>
                            <label>Departure date</label>
                            <input type='date' value={searchData.dateReservation} onChange={handleSearchChange} />
                        </div>
                        <div className='cars-form-group'>
                            <label>Departure time</label>
                            <input type='time' value={searchData.TimeRes} onChange={handleSearchChange} />
                            

                        </div>
                        <div className='cars-form-group'>
                            <label>Return city</label>
                            <select name='VillReservation' value={searchData.VilleReturn} onChange={handleSearchChange}>
                                <option value="">Select a city</option>
                                <option value="Casablanca">Casablanca</option>
                                <option value="Marrakech">Marrakech</option>
                                <option value="Oujda">Oujda</option>
                                <option value="Tanger">Tanger</option>
                            </select>

                        </div>
                        <div className='cars-form-group'>
                            <label>Return date</label>
                            <input type='date' value={searchData.dateReturn} onChange={handleSearchChange} />
                        </div>
                        <div className='cars-form-group'>
                            <label>Return time</label>
                            <input type='time' value={searchData.TimeRetu} onChange={handleSearchChange} />
                            

                        </div>
                        <div className='cars-form-group'>
                            <label>Code Promme</label>
                            <input type='Number' value={searchData.CodeP} onChange={handleSearchChange} />
                            

                        </div>
                        <div className='cars-form-group'>
                            <label>Age</label>
                            <input type='Number' name='Age' min={19} max={90} value={searchData.Age} onChange={handleSearchChange} placeholder='25' />
                            

                      

                        </div>
                    </div>
                  
                        <div className='cars-form-search'>
                          <button type='submit'>Search <FaSearch/></button>
                          </div>


                </form>
            </div>
        </section>
        <section>
            <div className='xars-main-content'>
                <div className='cars-filters-section'>
                    <h1>Filter the results</h1>
                    <div className='cars-filters-grid'>
                        <select onChange={handleFilterChange} value={filters.type}>
                            <option value="">Vehicle type</option>
                            <option value='Compacte'>Compacte</option>
                            <option value='Berline'>Berline</option>
                            <option value='SUV'>SUV</option>
                            <option value='Luxe'>Luxe</option>
                            <option value='Coupé'>Coupé</option>
                            <option value='Sport'>Sport</option>
                        </select>
                        <select onChange={handleFilterChange} value={filters.price}>
                            <option value="">Vehicle Price per day</option>
                            <option value='0-200'>0-200 DH</option>
                            <option value='200-500'>200-500 DH</option>
                            <option value='500-1000'>500-1000 DH</option>
                            <option value='1000-2000'>1000-2000 DH</option>
                            
                        </select>
                        <select onChange={handleFilterChange} value={filters.transmission}>
                            <option value="">transmission</option>
                            <option value='Automatique'>Automatique</option>
                            <option value='Manuelle'>Manuelle</option>
                            
                        </select>
                        <select onChange={handleFilterChange} value={filters.luggage}>
                            <option value="">Luggage capacity.</option>
                            <option value='2+ suitcases'>2+ suitcases </option>
                            <option value='3+ suitcases'>3+ suitcases</option>
                            <option value='4+ suitcases'>4+ suitcases</option>
                            <option value='5+ suitcases'>5+ suitcases</option>
                            
                        </select>
                        <select onChange={handleFilterChange} value={filters.Age}>
                            <option value="">Minimum age</option>
                            <option value='19+'>19+ </option>
                            <option value='21+'>21+</option>
                            <option value='25+'>25+</option>
                            
                        </select>

                    </div>
                </div>
            </div>
        </section>
      
    </div>
  )
}
