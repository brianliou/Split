

export const createBill = (bills) => {
  return $.ajax({
    url: '/api/bills',
    method: 'POST',
    data: bills
  });
};
