import React, { useState, useRef } from 'react';
import axios from 'axios';
import '../styles/FeedbackForm.css';
import status_ok from '../static/img/free-png.ru-3.png';

const FeedbackForm = ({ setSubmitError }) => {
  const [fullName, setFullName] = useState('');
  const [contactType, setContactType] = useState('phone');
  const [contactValue, setContactValue] = useState('');
  const [question, setQuestion] = useState('');
  const [errorMessages, setErrorMessages] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const fullNameRef = useRef();
  const contactValueRef = useRef();
  const questionRef = useRef();

  const validateFullName = () => {
    if (fullName.trim() === '') {
      return 'Введите свое полное имя';
    }
    return '';
  };

  const validateContactType = () => {
    if (contactType === '') {
      return 'Введите корректный способ связи';
    }
    return '';
  };

  const validateContactValue = () => {
    if (contactValue.trim() === '') {
      return 'Введите корректный способ связи';
    } else if (contactType === 'phone' && contactValue.length !== 18) {
      return 'Неверный формат номера телефона';
    }
    return '';
  };

  const validateQuestion = () => {
    if (question.trim() === '') {
      return 'Введите ваш вопрос';
    }
    return '';
  };

  const validateForm = () => {
    const errors = {
      fullName: validateFullName(),
      contactType: validateContactType(),
      contactValue: validateContactValue(),
      question: validateQuestion(),
    };
    setErrorMessages(errors);
    return Object.values(errors).every((error) => error === '');
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
    setErrorMessages((prevErrors) => ({ ...prevErrors, fullName: '' }));
  };

  const handleContactTypeChange = (event) => {
    setContactType(event.target.value);
    setContactValue('');
    setErrorMessages((prevErrors) => ({ ...prevErrors, contactType: '' }));
  };

  const handleContactValueChange = (event) => {
    const { value } = event.target;
    setContactValue(value);
    setErrorMessages((prevErrors) => ({ ...prevErrors, contactValue: '' }));

    if (contactType === 'phone' && value.length === 18) {
      questionRef.current.focus();
    }
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
    setErrorMessages((prevErrors) => ({ ...prevErrors, question: '' }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isFormValid = validateForm();

    if (!isFormValid) {
      return;
    }

    let formattedContactValue = contactValue;
    if (contactType === 'phone') {
      formattedContactValue = formatPhoneNumber(contactValue);
    } else if (contactType === 'telegram') {
      formattedContactValue = formatTelegramValue(contactValue);
    }

    const message = `Full Name: ${fullName}\nContact Type: ${contactType}\nContact Value: ${formattedContactValue}\nQuestion: ${question}`;

    try {
      const response = await axios.post(
          `https://api.telegram.org/bot6044408127:AAE6hwgz6P1Q-bW7HiFkvY76g3agv2t97_I/sendMessage`,
          {
            chat_id: '-1001899287359',
            text: message,
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: 'Взять задачу',
                    callback_data: 'take_task',
                  },
                ],
              ],
            },
          }
      );

      if (response.status === 200 && response.data.ok) {
        setSubmitted(true);
        setFullName('');
        setContactType('phone');
        setContactValue('');
        setQuestion('');
        setErrorMessages({});
        setSubmitError('');
      } else {
        setSubmitError('Failed to submit the form');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      setSubmitError('An error occurred while submitting the form');
    }
  };

  const formatPhoneNumber = (phoneNumber) => {
    if (phoneNumber.length === 0) {
      return '';
    }

    const cleanedPhoneNumber = phoneNumber.replace(/[^0-9]/g, '').substring(1);

    let formattedValue = '+7 (';

    for (let i = 0; i < cleanedPhoneNumber.length; i++) {
      formattedValue += cleanedPhoneNumber[i];

      if (i === 2) {
        formattedValue += ') ';
      } else if (i === 2 || i === 5 || i === 7 || i === 9) {
        formattedValue += ' ';
      }
    }

    return formattedValue.trim();
  };

  const formatTelegramValue = (value) => {
    if (value.length === 0) {
      return '';
    }
    let formattedValue = value.trim().substring(5);
    if (formattedValue.startsWith('@')) {
      formattedValue = formattedValue.slice(1);
    } else if (formattedValue.startsWith('https://t.me/')) {
      formattedValue = formattedValue.slice(13);
    } else if (formattedValue.startsWith('t.me/')) {
      formattedValue = formattedValue.slice(6);
    }
    return `t.me/${formattedValue}`;
  };

  const renderErrorMessage = (inputName, message) => {
    return <div className="error-message">{message}</div>;
  };

  const renderSuccessMessage = () => {
    return (
        <div className="success-message" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={status_ok} alt="logo" width="40" height="40" style={{ marginRight: '10px' }} />
          <div style={{ textAlign: 'center' }}>
            Спасибо! Ваш вопрос был отправлен. Ожидайте ответа в ближайшее время.
          </div>
        </div>
    );
  };

  const getContactValuePlaceholder = () => {
    if (contactType === 'email') {
      return 'username@domain.ru';
    }

    if (contactType === 'telegram') {
      return 't.me/username';
    }

    if (contactType === 'phone') {
      return '+7 (912) 345 67 89';
    }

    return 'Contact Value';
  };

  const getFormattedContactValue = () => {
    if (contactType === 'phone') {
      return formatPhoneNumber(contactValue);
    } else if (contactType === 'telegram') {
      return formatTelegramValue(contactValue);
    }
    return contactValue;
  };

  return (
      <div className="feedback-form">
        {!submitted ? (
            <form onSubmit={handleSubmit}>
              <div className="full-name-input">
                <input
                    type="text"
                    className={errorMessages.fullName ? 'form-input error' : 'form-input'}
                    placeholder="Иванов Иван Иванович"
                    value={fullName}
                    onChange={handleFullNameChange}
                    ref={fullNameRef}
                />
                {errorMessages.fullName && renderErrorMessage('fullName', errorMessages.fullName)}
              </div>

              <div className="input-group">
                <select
                    className={errorMessages.contactType ? 'contact-type-selector error' : 'contact-type-selector'}
                    value={contactType}
                    onChange={handleContactTypeChange}
                >
                  <option value="phone">Телефон</option>
                  <option value="email">Email</option>
                  <option value="telegram">Telegram</option>
                </select>
                <input
                    type="text"
                    className={errorMessages.contactValue ? 'form-input error' : 'form-input'}
                    placeholder={getContactValuePlaceholder()}
                    value={getFormattedContactValue()}
                    onChange={handleContactValueChange}
                    ref={contactValueRef}
                />
              </div>
              {errorMessages.contactType && renderErrorMessage('contactType', errorMessages.contactType)}
              {errorMessages.contactValue && renderErrorMessage('contactValue', errorMessages.contactValue)}

              <div className={`question-input ${errorMessages.question ? 'error' : ''}`}>
                        <textarea
                            className="form-input"
                            placeholder="Введите текст вопроса"
                            value={question}
                            onChange={handleQuestionChange}
                            ref={questionRef}
                        />
                {errorMessages.question && renderErrorMessage('question', errorMessages.question)}
              </div>


              <div>
                <button type="submit" className="submit-button">
                  Отправить
                </button>
                <p className="privacy-policy">
                  Нажимая на кнопку, я даю свое согласие на обработку представленных в форме персональных данных в соответствии с
                  требованиями Федерального закона от 27.07.2006 г. № 152-ФЗ «О персональных данных»
                </p>
              </div>
            </form>
        ) : (
            renderSuccessMessage()
        )}
      </div>
  );
};
export default FeedbackForm;