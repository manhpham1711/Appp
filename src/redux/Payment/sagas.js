/* eslint-disable prettier/prettier */
import {put, call, takeLatest} from 'redux-saga/effects';
import paymentAction, {PaymentTypes} from './actions';
import NavigationUtils from '../../navigation/Utils';
import RNMomosdk from 'react-native-momosdk';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export function* confirmPaymentUserSaga({jsonData}){
  try {

    let dataPayment = yield RNMomosdk.requestPayment(jsonData);

    console.log("data_request_payment****** " + JSON.stringify(dataPayment));

    yield confirmPaymentServerSaga(dataPayment,jsonData.amount);
  } catch (error) {
    console.error(error);
  }
}

export function* confirmPaymentServerSaga(response,amount){
  const dispatch = useDispatch();
    try {
      if (response && response.status == 0) {
        axios({
          method: 'POST',
          url: 'https://polar-taiga-31053.herokuapp.com/api/payment',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + response.data,
          },
          data: {
            amount: amount,
            orderId: response.orderId,
            customerNumber: response.phonenumber,
          },
        }).then(function (responses) {
          console.log('responses', responses);
          if (responses.data.error) {
            alert(responses.data.appData);
          } else {
            console.log('responses', responses);
            var pack = responses.data.amount === 200000 ? 'PREMIUM' : 'PRO';
            AsyncStorage.setItem('is_pro','true')
            alert('Thanh toán thành công')
          }
        });
      } else {
        alert(response.message);
      }
    } catch (ex) {
      alert(ex);
    }
};


const paymentSagas = () =>[
  takeLatest(PaymentTypes.CONFIRM_PAYMENT_USER, confirmPaymentUserSaga),
  takeLatest(PaymentTypes.CONFIRM_PAYMENT_SERVER, confirmPaymentServerSaga)
];

export default paymentSagas();

