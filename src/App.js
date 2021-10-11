import React, { useState, useEffect } from 'react';

export const customerData = {
  name: 'Srikanth',
  transactions: [
    { id:'001', date: '07-Nov-2021', value: 70 },
    { id:'002', date: '01-Oct-2021', value: 400 },
    { id:'003', date: '18-Sep-2021', value: 60 },
    { id:'004', date: '05-Sep-2021', value: 120 },
  ],
};

export default function App() {
  const [customerName, setCustomerName] = useState('');
  const [allTransactions, setAllTransactions] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  
  const getPoint = (transaction) => {
    if (transaction >= 50 && transaction <= 100) {
      return 1 * (transaction - 50);
    } else if (transaction > 100) {
      const twoPointsAmout = transaction - 100;
      return 2 * twoPointsAmout + 1 * 50;
    }
    return 0;
  };

  useEffect(() => {
    setCustomerName(customerData.name);
    setAllTransactions(
      customerData.transactions.map((_transaction) => ({
        ..._transaction,
        points: getPoint(_transaction.value),
      }))
    );
  }, []);

  useEffect(() => {
    if (allTransactions.length > 0) {
      setTotalPoints(
        allTransactions
          .map((d) => d.points)
          .reduce((previousValue, currentValue) => {
            return previousValue + currentValue;
          }, 0)
      );
    }
  }, [allTransactions]);

  return (
    <div className="container-fluid">
      <h4 className="text-danger border-bottom pb-2 ps-2 mt-4">{customerName}</h4>
      <div className="list-group">
        {allTransactions.map((data) => {
          return (
            <a key={data.id} className="list-group-item list-group-item-action">
              <div className="row w-100 text-muted">
                <div className="col-md-4 col-12">
                  Date :{' '}
                  <span className="fw-bold text-success">{data.date}</span>
                </div>
                <div className="col-md-4 col-12">
                  Amout :{' '}
                  <span className="fw-bold text-success">${data.value}</span>
                </div>
                <div className="col-md-4 col-12">
                  Points :{' '}
                  <span className="fw-bold text-success">{data.points}</span>
                </div>
              </div>
            </a>
          );
        })}
      </div>
      <p className="text-end text-success pe-4 border-top py-1 mt-3 fw-bold border-bottom">
        Total Point : {totalPoints}
      </p>
    </div>
  );
}
