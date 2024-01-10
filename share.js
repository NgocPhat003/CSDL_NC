// function formatDateTime(dateTimeString) {
//     const dateTime = new Date(dateTimeString);
//     const formattedDate = `${dateTime.getDate().toString().padStart(2, '0')}/${(dateTime.getMonth() + 1).toString().padStart(2, '0')}/${dateTime.getFullYear()}`;
//     const formattedTime = `${dateTime.getHours().toString().padStart(2, '0')}:${dateTime.getMinutes().toString().padStart(2, '0')}`;
  
//     return {
//       date: formattedDate,
//       time: formattedTime 
//     };
//   }

async function getAllPatientsInfo() {
  const allPatientsInfo = document.getElementById('allPatientsInfo');
  try {
      const response = await fetch('http://localhost:3000/getAllPatientsInfo', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          }
      })
      const data = await response.json();
      if (response.status === 200) {            
          allPatientsInfo.innerHTML = ''; 
          const patientsTable = document.createElement('table');
          patientsTable.setAttribute('id', 'Table');

      // Create table header
      const headerRow = document.createElement('tr');
      headerRow.innerHTML = `
        <th>Phone Number</th>
        <th>Full Name</th>
        <th>Email</th>
        <th>Age</th>
        <th>Address</th>
        <th>Gender</th>`;

        patientsTable.appendChild(headerRow);
        
        data.forEach(patient => {
          // Create a new row for each staff
          const row = document.createElement('tr');
          row.innerHTML = `
      <td>${patient.patientPhoneNumber}</td>
      <td>${patient.patientFullName}</td>
      <td>${patient.patientEmail}</td>
      <td>${patient.patientAddress}</td>
      <td>${patient.patientAge}</td>
      <td>${patient.patientGender}</td>
    `;
  
          // Append the row to the table
          patientsTable.appendChild(row);
        });
        allPatientsInfo.appendChild(patientsTable)
      } else {
  
        allPatientsInfo.innerHTML = data.message;
      }
    } catch (error)  {
        console.error('Có lỗi xảy ra khi lấy thông tin nhân viên', error);
        allPatientsInfo.innerHTML = data.message;
    };
}

async function getPatientInfo(patientPhoneNumber) {
  const patientInfo = document.getElementById('getPatientInfo');
  try {
      const response = await fetch('http://localhost:3000/getPatientInfo', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ patientPhoneNumber }) 
      })
      const data = await response.json();
      if (response.status === 200) {  
        const table = `<table>
                            <caption><h3>Patient information</h3></caption>
                            <tbody>
                                <tr>${Object.entries(data).map(([key, value]) => `<th>${key}</th>`).join('')}</tr>
                                <tr>${Object.values(data).map(value => `<td>${value}</td>`).join('')}</tr>
                            </tbody>
                       </table>`;

        patientInfo.innerHTML = table;
      } else {
          patientInfo.innerHTML = data.message;
      }
  } catch (error) {
      patientInfo.innerHTML = data.message;
      console.error('Có lỗi xảy ra khi lấy thông tin bệnh nhân', error);
  };
}

async function updatePatientInfo() {
  
  const patientUpdateResult = document.getElementById('patientUpdateResult');
  const patientPhoneNumber = document.getElementById('updatePatientPhoneNumber').value;
  const patientFullName = document.getElementById('updatePatientFullName').value; 
  const patientEmail = document.getElementById('updatePatientEmail').value;
  const patientAddress = document.getElementById('updatePatientAddress').value;
  const patientAge = document.getElementById('updatePatientAge').value;
  const patientGender = document.getElementById('updatePatientGender').value;

  try {
      const response = await fetch('http://localhost:3000/updatePatientInfo', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ patientPhoneNumber, patientFullName, patientEmail, patientAddress, patientAge, patientGender })
      })
      const data = await response.json();
      if (response.status === 200) {
          patientUpdateResult.textContent = data.message;
      } else if (response.status === 404 ) {
          patientUpdateResult.textContent = data.message;
      } else if (response.status === 500) {
          patientUpdateResult.textContent = data.message;
      }
  } catch (error) {
      console.error('Có lỗi xảy ra:', error);
  };
}

async function addPatientInfo(patientPhoneNumber, patientFullName, patientEmail, patientAddress, patientAge, patientGender) {
  const patientAddResult = document.getElementById('patientAddResult');
  try {
      const response = await fetch('http://localhost:3000/addPatientInfo', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ patientPhoneNumber, patientFullName, patientEmail, patientAddress, patientAge, patientGender})
      })
      const data = await response.json();
      if (response.status === 200) {
          patientAddResult.textContent = data.message;
      } else if (response.status === 500) {
          patientAddResult.textContent = data.message;
      }    
  } catch (error) {
      patientAddResult.textContent = data.message;
      console.error('Có lỗi xảy ra:', error);
  }  
}

async function deletePatientInfo() {
  const patientDeleteResult = document.getElementById('patientDeleteResult');
  const patientPhoneNumber = document.getElementById('deletePatientPhoneNumber').value;
  try {
    const response = await fetch(`http://localhost:3000/deletePatientInfo/${patientPhoneNumber}`, {
    method: 'DELETE',
    })
    const data = await response.json();
    if (response.status === 200) {
      patientDeleteResult.textContent = data.message;
    } else if (response.status === 404) {
      patientDeleteResult.textContent = data.message;
    } else if (response.status === 500) {
      patientDeleteResult.textContent = data.message;
    }
  } catch(error) {
    console.error('Có lỗi xảy ra:', error);
  }
}
  
module.exports = { getAllPatientsInfo, getPatientInfo, updatePatientInfo, addPatientInfo, deletePatientInfo};
module.exports = { formatDateTime };