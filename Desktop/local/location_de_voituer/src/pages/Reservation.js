import React, { useState } from 'react';
import { FaClock, FaShieldAlt, FaCar, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../Styles/Reservation.css';


export default function Reservation() {
  const navigate = useNavigate();
  const [villeReservation, SetVilleRes] = useState('');
  const [VilleReturn, SetVilleReturn] = useState('');
  const [dateReservation, setDateReservatiion] = useState('');
  const [DateReturn, SetDateReturn] = useState('');
  const [TimeRes, SetTimeR] = useState('10:00');
  const [TimeRetu, SetTimeRetu] = useState('10:00');
  const [CodeProme, SetCodeProme] = useState('');
  const [Age, SetAge] = useState('19+');
  const [activeQuestion, setActiveQuestion] = useState(null);

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  function handelVillReservation(e) {
    const newVille = e.target.value;
    SetVilleRes(newVille);
    // If return city is empty, set it to the same as reservation city
    if (!VilleReturn) {
      SetVilleReturn(newVille);
    }
  }

  function handelVillReturn(e) {
    SetVilleReturn(e.target.value);
  }

  function HandelDateRervation(e) {
    const newDate = e.target.value;
    setDateReservatiion(newDate);
    // If return date is before new reservation date, update return date
    if (DateReturn && DateReturn < newDate) {
      SetDateReturn(newDate);
    }
  }

  function HandelDateReturn(e) {
    SetDateReturn(e.target.value);
  }

  function HandeltimeRervation(e) {
    SetTimeR(e.target.value);
  }

  function HandeltimeRuteurn(e) {
    SetTimeRetu(e.target.value);
  }

  function HandelAge(e) {
    SetAge(e.target.value);
  }

  function HandleCodeProme(e) {
    SetCodeProme(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Validation des champs obligatoires
    if (!villeReservation || !dateReservation || !DateReturn) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Validation des dates
    if (dateReservation < today) {
      alert('La date de réservation ne peut pas être dans le passé');
      return;
    }

    if (DateReturn < dateReservation) {
      alert('La date de retour doit être après la date de réservation');
      return;
    }

    // Si même jour, vérifier les heures
    if (dateReservation === DateReturn) {
      if (TimeRetu <= TimeRes) {
        alert("L'heure de retour doit être après l'heure de réservation");
        return;
      }
    }

    const formData = {
      villeReservation,
      VilleReturn: VilleReturn || villeReservation,
      dateReservation,
      DateReturn,
      TimeRes,
      TimeRetu,
      CodeProme,
      Age
    };
    
    // Navigate to Cars page with form data
    navigate('/cars', { 
      state: { 
        formData,
        reservationDetails: {
          pickupDate: new Date(dateReservation).toLocaleDateString(),
          returnDate: new Date(DateReturn).toLocaleDateString(),
          pickupTime: TimeRes,
          returnTime: TimeRetu,
          location: villeReservation
        }
      } 
    });
  }

  const Faq = [
    {
      id: 1,
      Qestion: "Can I cancel or modify my reservation?",
      answer: "Yes, you can cancel or modify your reservation up to 24 hours before the pickup time without any charges."
    },
    {
      id: 2,
      Qestion: "What documents do I need to pick up my car?",
      answer: "You need a valid driver's license, credit card, and a form of identification (passport or ID card)."
    },
    {
      id: 3,
      Qestion: "Is insurance included in the rental price?",
      answer: "Basic insurance is included. Additional coverage options are available at pickup."
    },
    {
      id: 4,
      Qestion: "What is the minimum age to rent a car?",
      answer: "The minimum age requirement is 21 years old with a valid driver's license."
    },
    {
      id: 5,
      Qestion: "Do you offer unlimited mileage?",
      answer: "Yes, most of our rentals come with unlimited mileage included."
    },
    {
      id: 6,
      Qestion: "Can I return the car to a different location?",
      answer: "Yes, one-way rentals are possible for an additional fee."
    },
    {
      id: 7,
      Qestion: "What is your fuel policy?",
      answer: "Cars must be returned with the same fuel level as at pickup."
    },
    {
      id: 8,
      Qestion: "Do you offer child seats?",
      answer: "Yes, child seats are available for an additional fee."
    },
    {
      id: 9,
      Qestion: "What happens if I return the car late?",
      answer: "Late returns may incur additional hourly or daily charges."
    },
    {
      id: 10,
      Qestion: "Is roadside assistance included?",
      answer: "Yes, 24/7 roadside assistance is included with all rentals."
    },
  ];

  const toggleQuestion = (id) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <div>
      <div className='resrvation-page'>
        <section className='hero-section'>
          <div className='hero-content'>
            <h1>Book Your Car</h1>
            <p>With EasyCarMaroc, enjoy a simple and convenient car rental experience. Book your car in just a few clicks and enjoy the best rates.</p>
          </div>
          <div className='form-container'>
            <form className='form-reservation' onSubmit={handleSubmit}>
              <div>
                <div className='input-group'>
                  <label>ville de reservation</label><br></br>
                  <select value={villeReservation} onChange={handelVillReservation}>
                    <option>Selection la ville de reservation</option>
                    <option value="Marrakech">Marrakech</option>
                    <option value="Oujda">Oujda</option>
                    <option value="Casablanca">Casablanca</option>
                    <option value="Tanger">Tanger</option>
                  </select><br></br>
                
                  <label>Date de reservation</label><br></br>
                  <input type='date' value={dateReservation} onChange={HandelDateRervation} required /><br></br>
                  <label>time de reservation</label><br></br>
                  <input type='time' value={TimeRes} onChange={HandeltimeRervation} required /><br></br>
                  <label>you have code promo</label><br></br>
                  <input type='text' value={CodeProme} onChange={HandleCodeProme} /><br></br>
                </div>
              </div>

              <div className='input-group'>
                <label>ville de return</label>
                <select onChange={handelVillReturn} value={VilleReturn}>
                  <option>Selection la ville de reservation</option>
                  <option value="Marrakech">Marrakech</option>
                  <option value="Oujda">Oujda</option>
                  <option value="Casablanca">Casablanca</option>
                  <option value="Tanger">Tanger</option>
                </select><br></br>
                <label>Date de return</label><br></br>
                <input type='date' value={DateReturn} onChange={HandelDateReturn} required /><br></br>
                <label>time de return</label><br></br>
                <input type='time' value={TimeRetu} onChange={HandeltimeRuteurn} required /><br></br>
                <label>Age</label><br></br>
                <input 
                  type='number' 
                  min="18" 
                  max="99"
                  value={Age} 
                  onChange={HandelAge} 
                  required 
                /><br></br>
              </div>

              <button type="submit" className="submit-button">
                Chercher une voiture
              </button>
            </form>
          </div>
        </section>

        <section className='features-section'>
          <div className="feature-card">
            <FaClock className="feature-icon" />
            <h3>24/7 Service</h3>
            <p>Available at any time to meet your needs</p>
          </div>
          <div className="feature-card">
            <FaShieldAlt className="feature-icon" />
            <h3>Guaranteed Security</h3>
            <p>Vehicles regularly maintained and insured</p>
          </div>
          <div className="feature-card">
            <FaCar className="feature-icon" />
            <h3>Wide Selection</h3>
            <p>Une flotte diversifiée pour tous les besoins</p>
          </div>
        </section>

        <section className="faq-section">
          <h1>Questions About Car Reservations</h1>

          <div className="faq-container">
     
            {Faq.map((faq) => (
              <div key={faq.id} className="faq-item">
                <div 
                  className={`faq-question ${activeQuestion === faq.id ? 'active' : ''}`}
                  onClick={() => toggleQuestion(faq.id)}
                >
                  <h3>{faq.Qestion}</h3>
                  <FaChevronDown />
                </div>
                <div className={`faq-answer ${activeQuestion === faq.id ? 'active' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
