

export const createBill = (bills) => {
  return $.ajax({
    url: '/api/bills',
    method: 'POST',
    data: {bills}
  });
};

export const fetchBills = bills => {
  return $.ajax({
    url: '/api/bills/getBills',
    method: 'GET'
  });
};


export const settleBill = bills => {
  return $.ajax({
    url:'/api/bills',
    method: 'PUT',
    data: {bills}
  });
};
