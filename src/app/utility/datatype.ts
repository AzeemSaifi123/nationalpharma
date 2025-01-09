export interface userData {
    // _id: string;
    name: string;
    email:string;
    phone:string;
    whatsapp:string;
    hospital:string;
    uploadslip:string | File;
    address:string;
    currState:string;
    currCity:string;
    pincode:string;
  }

  export interface stateData {
    // _id: string;
    state: string;
    city:string;

  }