import React from 'react';


class BillForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      recipients: [], //array of recipient_ids
      description: "",
      amount: "",
      date:"",
    }
  }

}


export default BillForm;
