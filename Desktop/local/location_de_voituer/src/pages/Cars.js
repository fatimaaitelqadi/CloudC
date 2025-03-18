import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCar, FaGasPump, FaCogs, FaUsers, FaSuitcase, FaSearch, FaCreditCard, FaCalendar, FaClock, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import { dataCars } from '../Data/dataCars';
import Payment1 from './Payment1';
import '../Styles/Cars.css';

export default function Cars() {
  const location = useLocation();
  
  const navigate = useNavigate();
  const [availableCars, setAvailableCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [searchData, setSearchData] = useState(location.state?.formData || {
    villeReservation: '',
    dateReservation: '',
    TimeRes: '',
    VilleReturn: '',
    DateReturn: '',
    TimeRetu: '',
    Age: '25'
  });
  const [filters, setFilters] = useState({
    age: '',
    type: '',
    price: '',
    transmission: '',
    luggage: ''
  });
  const [showPayment, setShowPayment] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    email: '',
    phone: ''
  });
  const [paymentErrors, setPaymentErrors] = useState({});
  const [reservationDetails, setReservationDetails] = useState(null);

  useEffect(() => {
    if (location.state?.formData) {
      setSearchData(location.state.formData);
    }
  }, [location.state]);

  useEffect(() => {
    let filtered = dataCars;
    console.log('Initial cars:', dataCars);
    console.log('Search data:', searchData);
    console.log('Filters:', filters);

    if (searchData.villeReservation) {
      filtered = filtered.filter(car => {
        const carCity = (car.city || '').toLowerCase().trim();
        const searchCity = searchData.villeReservation.toLowerCase().trim();
        const cityMatch = carCity === searchCity;
        const ageMatch = !searchData.Age || parseInt(searchData.Age) >= parseInt(car.driver_age || 18);
        return cityMatch && ageMatch;
      });
    }

    if (filters.age) {
      filtered = filtered.filter(car => parseInt(filters.age) >= parseInt(car.driver_age));
    }

    if (filters.type) {
      filtered = filtered.filter(car => {
        const carType = (car.capacity || '').toLowerCase().trim();
        const filterType = filters.type.toLowerCase().trim();
        console.log('Comparing types:', carType, filterType);
        return carType === filterType;
      });
    }

    if (filters.price) {
      const [min, max] = filters.price.split('-').map(Number);
      filtered = filtered.filter(car => car.price_per_day >= min && car.price_per_day <= max);
    }

    if (filters.transmission) {
      filtered = filtered.filter(car => {
        const carTransmission = (car.transmission || '').toLowerCase().trim();
        const filterTransmission = filters.transmission.toLowerCase().trim();
        return carTransmission === filterTransmission;
      });
    }

    if (filters.luggage) {
      filtered = filtered.filter(car => car.luggage_capacity >= parseInt(filters.luggage));
    }

    console.log('Filtered cars:', filtered);
    setAvailableCars(filtered);
  }, [searchData, filters]);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    console.log('Input changed:', name, value);
    
    setSearchData(prev => {
      const updated = {
        ...prev,
        [name]: value
      };
      console.log('Updated search data:', updated);
      return updated;
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    console.log('Filter changed:', name, value);
    setFilters(prev => {
      const updated = {
        ...prev,
        [name]: value
      };
      console.log('Updated filters:', updated);
      return updated;
    });
  };

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

  const handleReservation = (car) => {
    if (!searchData.dateReservation || !searchData.DateReturn) {
      alert('Veuillez sélectionner les dates de réservation');
      return;
    }

    const startDate = new Date(searchData.dateReservation);
    const endDate = new Date(searchData.DateReturn);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const reservationData = {
      ...searchData,
      selectedCar: car,
      totalPrice: car.price_per_day * diffDays,
      numberOfDays: diffDays
    };
    console.log('Setting reservation details:', reservationData);
    setReservationDetails(reservationData);
    console.log('Opening payment modal');
    setShowPayment(true);
    setSelectedCar(null);
  };

  return (
    <div className="cars-page">
      <section className="cars-hero-section">
        <div className="cars-hero-content">
          <h1>Trouvez la voiture parfaite pour votre voyage</h1>
          <form className="cars-search-form" onSubmit={handleSearch}>
            <div className="cars-form-grid">
              <div className="cars-form-group">
                <label>Ville de départ</label>
                <select 
                  name="villeReservation" 
                  value={searchData.villeReservation}
                  onChange={handleSearchChange}
                >
                  <option value="">Sélectionnez une ville</option>
                  <option value="Casablanca">Casablanca</option>
                  <option value="Marrakech">Marrakech</option>
                  <option value="Oujda">Oujda</option>
                  <option value="Tanger">Tanger</option>
                </select>
              </div>
              <div className="cars-form-group">
                <label>Date de départ</label>
                <input
                  type="date"
                  name="dateReservation"
                  value={searchData.dateReservation}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="cars-form-group">
                <label>Heure de départ</label>
                <input
                  type="time"
                  name="TimeRes"
                  value={searchData.TimeRes}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="cars-form-group">
                <label>Return city</label>
                <select
                  name="VilleReturn"
                  value={searchData.VilleReturn}
                  onChange={handleSearchChange}
                >
                  <option value="">Sélectionnez une ville</option>
                  <option value="Casablanca">Casablanca</option>
                  <option value="Marrakech">Marrakech</option>
                  <option value="Oujda">Oujda</option>
                  <option value="Tanger">Tanger</option>
                </select>
              </div>
              <div className="cars-form-group">
                <label>Return date</label>
                <input
                  type="date"
                  name="DateReturn"
                  value={searchData.DateReturn}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="cars-form-group">
                <label>Return time</label>
                <input
                  type="time"
                  name="TimeRetu"
                  value={searchData.TimeRetu}
                  onChange={handleSearchChange}
                />
              </div>
              <div className='cars-form-group'>
                            <label>Code Promme</label>
                            <input type='Number' value={searchData.CodeP} onChange={handleSearchChange} />
                            

                        </div>
              <div className="cars-form-group">
                <label>Âge du conducteur</label>
                <input
                  type="number"
                  name="Age"
                  min="18"
                  max="99"
                  value={searchData.Age}
                  onChange={handleSearchChange}
                  placeholder="Âge"
                />
              </div>
            </div>
            <button type="submit" className="cars-search-button">
          <div className='serch'>  Rechercher  <FaSearch style={{margin:'4px'}} /></div>   
            </button>
          </form>
        </div>
      </section>

      <div className="cars-main-content">
        <div className="cars-filters-section">
        <h3 style={{textAlign:'center'}}>Filtrer les résultats</h3>

          <div className="cars-filters-grid">
            <select name="age" onChange={handleFilterChange} value={filters.age}>
              <option value="">Âge minimum</option>
              <option value="18">18+</option>
              <option value="21">21+</option>
              <option value="25">25+</option>
            </select>

            <select name="type" onChange={handleFilterChange} value={filters.type}>
              <option value="">Type de véhicule</option>
              <option value="compacte">Compacte</option>
              <option value="berline">Berline</option>
              <option value="suv">SUV</option>
              <option value="luxe">Luxe</option>
              <option value="sport">Sport</option>
              <option value="coupe">Coupé</option>
            </select>

            <select name="price" onChange={handleFilterChange} value={filters.price}>
              <option value="">Prix par jour</option>
              <option value="0-200">0-200 DH</option>
              <option value="200-500">200-500 DH</option>
              <option value="500-1000">500-1000 DH</option>
              <option value="1000-2000">1000-2000 DH</option>
            </select>

            <select name="transmission" onChange={handleFilterChange} value={filters.transmission}>
              <option value="">Transmission</option>
              <option value="automatique">Automatique</option>
              <option value="manuelle">Manuelle</option>
            </select>

            <select name="luggage" onChange={handleFilterChange} value={filters.luggage}>
              <option value="">Capacité bagages</option>
              <option value="2">2+ valises</option>
              <option value="3">3+ valises</option>
              <option value="4">4+ valises</option>
              <option value="5">5+ valises</option>
            </select>
          </div>
        </div>

        <div className="cars-available" style={{padding:'20px'}}>
          <h2 style={{textAlign:'center'}}>
            {searchData.villeReservation 
              ? `Voitures disponibles à ${searchData.villeReservation}`
              : 'Toutes nos voitures'}
          </h2>
          
          {availableCars.length > 0 ? (
            <div className="cars-grid">
              {availableCars.map(car => (
                <div 
                  key={car.id} 
                  className="car-card"
                  onClick={() => setSelectedCar(car)}
                >
                  <div className="car-image">
                    <img src={car.imageUrl} alt={car.name} />
                  </div>
                  <div className="car-info">
                    <h3>{car.name}</h3>
                    <div className='icons'>
                    <div className="car-type">{car.capacity}</div>
                    <div className="car-specs">
                      <span><FaCogs /> {car.transmission}</span>
                      <span><FaUsers /> {car.seats} places</span>
                      <span><FaSuitcase /> {car.luggage_capacity} valises</span>
                      <span><FaGasPump /> {car.fuel}</span>
                    </div>
                    {car.features && car.features.length > 0 && (
                      <div className="car-features">
                        {car.features.slice(0, 3).map((feature, index) => (
                          <span key={index} className="feature-tag">
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}
                    </div>
                    <div className="car-price">
                      <div className="price-per-day">{car.price_per_day} DH/jour</div>
                      {searchData.dateReservation && searchData.DateReturn && (
                        <div className="total-price">
                          Total: {car.price_per_day * Math.ceil(Math.abs(new Date(searchData.DateReturn) - new Date(searchData.dateReservation)) / (1000 * 60 * 60 * 24))} DH
                        </div>
                      )}
                    </div>
                    <button
                      className="cars-reserve-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!searchData.dateReservation || !searchData.DateReturn) {
                          alert('Veuillez sélectionner les dates de réservation');
                          return;
                        }
                        handleReservation(car);
                      }}
                    >
                     Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="cars-no-cars">
              <h3>Aucune voiture disponible</h3>
              <p>Veuillez modifier vos critères de recherche</p>
            </div>
          )}
        </div>
      </div>

      {selectedCar && (
        <div className="cars-modal" onClick={() => setSelectedCar(null)}>
          <div className="cars-modal-content" onClick={e => e.stopPropagation()}>
            <span className="cars-close-button" onClick={() => setSelectedCar(null)}>&times;</span>
            <img src={selectedCar.imageUrl} alt={selectedCar.name} className="cars-modal-image" />
            <div className="cars-modal-info">
              <h2>{selectedCar.name}</h2>
              <p>{selectedCar.description}</p>
              <div className="cars-details">
                <div>
                  <strong>Type de véhicule:</strong>
                  <p>{selectedCar.capacity}</p>
                </div>
                <div>
                  <strong>Transmission:</strong>
                  <p>{selectedCar.transmission}</p>
                </div>
                <div>
                  <strong>Carburant:</strong>
                  <p>{selectedCar.fuel}</p>
                </div>
                <div>
                  <strong>Places:</strong>
                  <p>{selectedCar.seats}</p>
                </div>
                <div>
                  <strong>Bagages:</strong>
                  <p>{selectedCar.luggage_capacity} valises</p>
                </div>
                <div>
                  <strong>Kilométrage:</strong>
                  <p>{selectedCar.mileage_limit}</p>
                </div>
              </div>
              {selectedCar.features && selectedCar.features.length > 0 && (
                <div className="cars-features-list">
                  <strong>Équipements:</strong>
                  <ul>
                    {selectedCar.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="cars-modal-price">
                <div className="cars-price-per-day">{selectedCar.price_per_day} DH/jour</div>
                {searchData.dateReservation && searchData.DateReturn && (
                  <div className="cars-total-price">
                    Prix total pour {Math.ceil(Math.abs(new Date(searchData.DateReturn) - new Date(searchData.dateReservation)) / (1000 * 60 * 60 * 24))} jours:
                    <span className="cars-total-amount">
                      {selectedCar.price_per_day * Math.ceil(Math.abs(new Date(searchData.DateReturn) - new Date(searchData.dateReservation)) / (1000 * 60 * 60 * 24))} DH
                    </span>
                  </div>
                )}
              </div>
              <button 
                className="cars-reserve-button"
                onClick={() => handleReservation(selectedCar)}
              >
                Réserver maintenant
              </button>
            </div>
          </div>
        </div>
      )}

      <Payment1
        showPayment={showPayment}
        setShowPayment={setShowPayment}
        reservationDetails={reservationDetails}
        setReservationDetails={setReservationDetails}
        paymentDetails={paymentDetails}
        setPaymentDetails={setPaymentDetails}
        paymentErrors={paymentErrors}
        setPaymentErrors={setPaymentErrors}
      />
      {console.log('Payment modal state:', { showPayment, reservationDetails })}
    </div>
  );
}

