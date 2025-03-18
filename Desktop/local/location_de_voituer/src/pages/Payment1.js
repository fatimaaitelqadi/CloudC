import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Cars.css';

export default function Payment1({ 
  showPayment, 
  setShowPayment, 
  reservationDetails, 
  setReservationDetails,
  paymentDetails,
  setPaymentDetails,
  paymentErrors,
  setPaymentErrors
}) {
  const navigate = useNavigate();
  console.log('Payment1 component rendered:', { showPayment, reservationDetails });

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

  if (!showPayment) {
    console.log('Payment modal hidden because showPayment is false');
    return null;
  }

  return (
    <div className="payment-modal" style={{ display: showPayment ? 'block' : 'none' }}>
      <div className="payment-modal-content">
        <span className="payment-close-button" onClick={() => setShowPayment(false)}>&times;</span>
        <h2>Détails de la réservation</h2>
        {reservationDetails && (
          <div className="reservation-summary">
            <p><strong>Voiture:</strong> {reservationDetails.selectedCar.name}</p>
            <p><strong>Ville de départ:</strong> {reservationDetails.villeReservation}</p>
            <p><strong>Date de départ:</strong> {reservationDetails.dateReservation}</p>
            <p><strong>Ville de retour:</strong> {reservationDetails.VilleReturn}</p>
            <p><strong>Date de retour:</strong> {reservationDetails.DateReturn}</p>
            <p><strong>Durée:</strong> {reservationDetails.numberOfDays} jours</p>
            <p><strong>Prix total:</strong> {reservationDetails.totalPrice} DH</p>
          </div>
        )}
        <h3>Informations de paiement</h3>
        <form onSubmit={handlePaymentSubmit} className="payment-form">
          <div className="form-group">
            <label>Numéro de carte</label>
            <input
              type="text"
              name="cardNumber"
              value={paymentDetails.cardNumber}
              onChange={handlePaymentInputChange}
              placeholder="1234 5678 9012 3456"
            />
            {paymentErrors.cardNumber && <span className="error">{paymentErrors.cardNumber}</span>}
          </div>
          <div className="form-group">
            <label>Nom du titulaire</label>
            <input
              type="text"
              name="cardHolder"
              value={paymentDetails.cardHolder}
              onChange={handlePaymentInputChange}
              placeholder="JOHN DOE"
            />
            {paymentErrors.cardHolder && <span className="error">{paymentErrors.cardHolder}</span>}
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Date d'expiration</label>
              <input
                type="text"
                name="expiryDate"
                value={paymentDetails.expiryDate}
                onChange={handlePaymentInputChange}
                placeholder="MM/YY"
              />
              {paymentErrors.expiryDate && <span className="error">{paymentErrors.expiryDate}</span>}
            </div>
            <div className="form-group">
              <label>CVV</label>
              <input
                type="text"
                name="cvv"
                value={paymentDetails.cvv}
                onChange={handlePaymentInputChange}
                placeholder="123"
              />
              {paymentErrors.cvv && <span className="error">{paymentErrors.cvv}</span>}
            </div>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={paymentDetails.email}
              onChange={handlePaymentInputChange}
              placeholder="john@example.com"
            />
            {paymentErrors.email && <span className="error">{paymentErrors.email}</span>}
          </div>
          <div className="form-group">
            <label>Téléphone</label>
            <input
              type="tel"
              name="phone"
              value={paymentDetails.phone}
              onChange={handlePaymentInputChange}
              placeholder="0612345678"
            />
            {paymentErrors.phone && <span className="error">{paymentErrors.phone}</span>}
          </div>
          <button type="submit" className="payment-submit-button">
            Payer {reservationDetails?.totalPrice} DH
          </button>
        </form>
      </div>
    </div>
  );
} 