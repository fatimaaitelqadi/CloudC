import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCar, FaCreditCard, FaCalendar, FaClock, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import '../Styles/PaymentModal.css';

export default function PaymentModal({ 
  showPayment, 
  setShowPayment, 
  reservationDetails, 
  setReservationDetails 
}) {
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    email: '',
    phone: ''
  });
  const [paymentErrors, setPaymentErrors] = useState({});

  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }));
    if (paymentErrors[name]) {
      setPaymentErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validatePaymentForm = () => {
    const newErrors = {};
    
    if (!paymentDetails.cardNumber.match(/^\d{16}$/)) {
      newErrors.cardNumber = 'Numéro de carte invalide';
    }
    if (!paymentDetails.cardHolder.trim()) {
      newErrors.cardHolder = 'Nom du titulaire requis';
    }
    if (!paymentDetails.expiryDate.match(/^\d{2}\/\d{2}$/)) {
      newErrors.expiryDate = 'Date d\'expiration invalide (MM/YY)';
    }
    if (!paymentDetails.cvv.match(/^\d{3}$/)) {
      newErrors.cvv = 'CVV invalide';
    }
    if (!paymentDetails.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Email invalide';
    }
    if (!paymentDetails.phone.match(/^\d{10}$/)) {
      newErrors.phone = 'Numéro de téléphone invalide';
    }

    setPaymentErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (validatePaymentForm()) {
      alert('Paiement effectué avec succès!');
      setShowPayment(false);
      setPaymentDetails({
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: '',
        email: '',
        phone: ''
      });
      setReservationDetails(null);
      navigate('/confirmation', { 
        state: { 
          reservationData: reservationDetails,
          paymentDetails: {
            ...paymentDetails,
            cardNumber: '****' + paymentDetails.cardNumber.slice(-4)
          }
        }
      });
    }
  };

  if (!showPayment || !reservationDetails) return null;

  return (
    <div className="cars-payment-modal" onClick={() => setShowPayment(false)}>
      <div className="cars-payment-content" onClick={e => e.stopPropagation()}>
        <span className="cars-close-button" onClick={() => setShowPayment(false)}>&times;</span>
        
        <div className="cars-payment-container">
          <div className="cars-reservation-summary">
            <h2>Résumé de la réservation</h2>
            <div className="cars-summary-details">
              <div className="cars-payment-details">
                <h3><FaCar /> Véhicule</h3>
                <p>{reservationDetails.selectedCar.name}</p>
                <p>Type: {reservationDetails.selectedCar.capacity}</p>
                <p>Transmission: {reservationDetails.selectedCar.transmission}</p>
              </div>
              
              <div className="cars-reservation-details">
                <div className="cars-detail-item">
                  <FaMapMarkerAlt />
                  <div>
                    <p>Lieu de prise en charge</p>
                    <strong>{reservationDetails.villeReservation}</strong>
                  </div>
                </div>
                
                <div className="cars-detail-item">
                  <FaCalendar />
                  <div>
                    <p>Date de début</p>
                    <strong>{reservationDetails.dateReservation}</strong>
                  </div>
                </div>
                
                <div className="cars-detail-item">
                  <FaClock />
                  <div>
                    <p>Heure de début</p>
                    <strong>{reservationDetails.TimeRes}</strong>
                  </div>
                </div>

                <div className="cars-detail-item">
                  <FaMapMarkerAlt />
                  <div>
                    <p>Lieu de retour</p>
                    <strong>{reservationDetails.VilleReturn}</strong>
                  </div>
                </div>
                
                <div className="cars-detail-item">
                  <FaCalendar />
                  <div>
                    <p>Date de retour</p>
                    <strong>{reservationDetails.DateReturn}</strong>
                  </div>
                </div>
                
                <div className="cars-detail-item">
                  <FaClock />
                  <div>
                    <p>Heure de retour</p>
                    <strong>{reservationDetails.TimeRetu}</strong>
                  </div>
                </div>

                <div className="cars-detail-item">
                  <FaUser />
                  <div>
                    <p>Âge du conducteur</p>
                    <strong>{reservationDetails.Age} ans</strong>
                  </div>
                </div>
              </div>

              <div className="cars-price-summary">
                <div className="cars-price-detail">
                  <span>Prix par jour</span>
                  <span>{reservationDetails.selectedCar.price_per_day} DH</span>
                </div>
                <div className="cars-price-detail">
                  <span>Nombre de jours</span>
                  <span>{reservationDetails.numberOfDays}</span>
                </div>
                <div className="cars-price-detail total">
                  <span>Total</span>
                  <span>{reservationDetails.totalPrice} DH</span>
                </div>
              </div>
            </div>
          </div>

          <div className="cars-payment-form-container">
            <h2><FaCreditCard /> Informations de paiement</h2>
            <form onSubmit={handlePaymentSubmit} className="cars-payment-form">
              <div className="cars-payment-group">
                <label>Numéro de carte</label>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={paymentDetails.cardNumber}
                  onChange={handlePaymentInputChange}
                  maxLength="16"
                />
                {paymentErrors.cardNumber && <span className="cars-payment-error">{paymentErrors.cardNumber}</span>}
              </div>

              <div className="cars-payment-group">
                <label>Titulaire de la carte</label>
                <input
                  type="text"
                  name="cardHolder"
                  placeholder="JOHN DOE"
                  value={paymentDetails.cardHolder}
                  onChange={handlePaymentInputChange}
                />
                {paymentErrors.cardHolder && <span className="cars-payment-error">{paymentErrors.cardHolder}</span>}
              </div>

              <div className="cars-payment-row">
                <div className="cars-payment-group">
                  <label>Date d'expiration</label>
                  <input
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={paymentDetails.expiryDate}
                    onChange={handlePaymentInputChange}
                    maxLength="5"
                  />
                  {paymentErrors.expiryDate && <span className="cars-payment-error">{paymentErrors.expiryDate}</span>}
                </div>

                <div className="cars-payment-group">
                  <label>CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    placeholder="123"
                    value={paymentDetails.cvv}
                    onChange={handlePaymentInputChange}
                    maxLength="3"
                  />
                  {paymentErrors.cvv && <span className="cars-payment-error">{paymentErrors.cvv}</span>}
                </div>
              </div>

              <div className="cars-payment-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={paymentDetails.email}
                  onChange={handlePaymentInputChange}
                />
                {paymentErrors.email && <span className="cars-payment-error">{paymentErrors.email}</span>}
              </div>

              <div className="cars-payment-group">
                <label>Téléphone</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="0612345678"
                  value={paymentDetails.phone}
                  onChange={handlePaymentInputChange}
                  maxLength="10"
                />
                {paymentErrors.phone && <span className="cars-payment-error">{paymentErrors.phone}</span>}
              </div>

              <button type="submit" className="cars-pay-button">
                Payer {reservationDetails.totalPrice} DH
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 