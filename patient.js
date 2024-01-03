window.onload = function() {
  if ((!sessionStorage.getItem('loggedInUser')) || (sessionStorage.getItem('accountType') !== 'Patient')) {
      window.location.href = 'login.html'; 
  }
};

async function displayAvailableDentist(appointmentDate, appointmentTime, clinicName) { 
  try {
    const response = await fetch('http://localhost:3000/displayAvailableDentist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({appointmentDate, appointmentTime, clinicName})
    })
    const data = await response.json()
    const displayAvailableDentist = document.getElementById('displayAvailableDentist');
    displayAvailableDentist.innerHTML = ''; 
    if (response.status === 200) {
      data.forEach(dentist => {
        const option = document.createElement('option');
        option.value = dentist.dentistUserName;
        option.textContent = dentist.dentistFullName;      
        displayAvailableDentist.appendChild(option);
      });
    } else {
       const option = document.createElement('option');
       option.textContent = ' ';
       displayAvailableDentist.appendChild(option);
    }
  } catch(error) {
      console.error('Có lỗi xảy ra:', error);
  };
 
}

async function scheduleAppointment(patientUserName, appointmentDate, appointmentTime, clinicName, dentistUserName) {
  try {
    const response = await fetch('http://localhost:3000/scheduleAppointment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ patientUserName, appointmentDate, appointmentTime, clinicName, dentistUserName})
    })
    const data = await response.json();
    const scheduleAppointmentResult = document.getElementById('scheduleAppointmentResult');
    scheduleAppointmentResult.innerHTML = '';
    if (response.status === 200) {
      scheduleAppointmentResult.innerHTML = data.message;
    } else if (response.status === 401) {
      const date = new Date(data.appointmentDate);
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
      const time = new Date(data.appointmentTime); 
      const formattedTime = `${time.getUTCHours().toString().padStart(2, '0')}:${time.getUTCMinutes().toString().padStart(2, '0')}`;
      scheduleAppointmentResult.innerHTML = `  
                                        <h3>You had appointment in this time:</h3>
                                        <p>Appointment ID: ${data.appointmentId}</p>
                                        <p>Appointment date: ${formattedDate}</p>
                                        <p>Appointment time: ${formattedTime}</p>
                                        <p>Clinic: ${data.clinicName}</p>
                                        <p>Dentist full name: ${data.dentistFullName}</p>
                                        <p>Note: ${data.note}</p>
                                        <p>Appointment status: ${data.appointmentStatus}
                                        `;
    } else if (response.status === 500) {
      scheduleAppointmentResult.innerHTML = data.message;
    }
  } catch(error) {
        console.error('Có lỗi xảy ra:', error);
  };     
}

async function getAllAppointmentsInfo(patientUserName) {
  try {
    const response = await fetch('http://localhost:3000/getAllAppointmentsInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ patientUserName }) 
    })
    const data = await response.json();
    const getAllAppointmentsInfoResult = document.getElementById('getAllAppointmentsInfoResult');
    getAllAppointmentsInfoResult.innerHTML = '';
    if (response.status === 200) {
      data.forEach(appointment => {
      const date = new Date(appointment.appointmentDate);
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
      const time = new Date(appointment.appointmentTime); 
      const formattedTime = `${time.getUTCHours().toString().padStart(2, '0')}:${time.getUTCMinutes().toString().padStart(2, '0')}`;
      const getAllAppointmentsInfoDetails = document.createElement('p');
      getAllAppointmentsInfoDetails.textContent = `
                                        Appointment ID: ${appointment.appointmentId},
                                        Appointment date: ${formattedDate},
                                        Appointment time: ${formattedTime},
                                        Clinic: ${appointment.clinicName},
                                        Dentist full name: ${appointment.dentistFullName}
                                        Note: ${appointment.note},
                                        Appointment status: ${appointment.appointmentStatus}`; 
      getAllAppointmentsInfoResult.appendChild(getAllAppointmentsInfoDetails);
      });
    } else {
      getAllAppointmentsInfoResult.innerHTML = data.message;
    }
  } catch (error)  {
    console.error('Có lỗi xảy ra khi lấy thông tin lịch hẹn', error);
  };
}

module.exports =  { displayAvailableDentist, scheduleAppointment, getAllAppointmentsInfo };
