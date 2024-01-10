
const initialTPDisplayState = {}; 
const initialMRDisplayState = {}; 

window.onload = function() {
  

  const hiddenTPElements = document.querySelectorAll('.hiddenForAddTreatmentPlan');
  hiddenTPElements.forEach(element => {
    initialTPDisplayState[element.id] = window.getComputedStyle(element).display;
  });

  const hiddenMRElements = document.querySelectorAll('.hiddenForAddMedicalRecord');
  hiddenMRElements.forEach(element => {
    initialMRDisplayState[element.id] = window.getComputedStyle(element).display;
  });

};

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
          data.forEach(patient => {
          const allPatientsDetails = document.createElement('p');
          allPatientsDetails.textContent = `
                                          Phone number: ${patient.patientPhoneNumber},
                                          Full name: ${patient.patientFullName}, 
                                          Email: ${patient.patientEmail},
                                          Address: ${patient.patientAddress},
                                          Age: ${patient.patientAge},
                                          Gender: ${patient.patientGender}`; 

          allPatientsInfo.appendChild(allPatientsDetails);
          });
      } else {
          
          allPatientsInfo.innerHTML = data.message;
      }
  } catch (error)  {
      allPatientsInfo.innerHTML = data.message;
      console.error('Có lỗi xảy ra khi lấy thông tin bệnh nhân', error);
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
          patientInfo.innerHTML = `  
                                      <h3>Patient information</h3>
                                      <p>Phone number: ${data.patientPhoneNumber}</p>
                                      <p>Full name: ${data.patientFullName}</p>
                                      <p>Email: ${data.patientEmail}</p>
                                      <p>Address: ${data.patientAddress}</p>
                                      <p>Age: ${data.patientAge}</p>
                                      <p>Gender: ${data.patientGender}</p> 
                                      `;
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

function getWeekNumber(date) {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000));
    return Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
}

async function getDentistsWorkScheduleInfo() {
    const getDentistsWorkScheduleInfoResult = document.getElementById('getDentistsWorkScheduleInfoResult');
    const getDentistsWorkScheduleInfoByMonthResult = document.getElementById('getDentistsWorkScheduleInfoByMonthResult');
    const getDentistsWorkScheduleInfoByWeekResult = document.getElementById('getDentistsWorkScheduleInfoByWeekResult');
    const getDentistsWorkScheduleInfoByDateResult = document.getElementById('getDentistsWorkScheduleInfoByDateResult');
    

    try {
        const response = await fetch('http://localhost:3000/getDentistsWorkScheduleInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        if (response.status === 200) {  
            getDentistsWorkScheduleInfoResult.innerHTML = '';
            getDentistsWorkScheduleInfoByMonthResult.innerHTML = '';
            getDentistsWorkScheduleInfoByWeekResult.innerHTML = '';
            getDentistsWorkScheduleInfoByDateResult.innerHTML = '';
                
            const scheduleMap = {
                month: {},
                week: {},
                date: {}
            };

            data.forEach((entry) => {
                const date = new Date(entry.workingDate);
                const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
                const weekKey = `${date.getFullYear()}-W${getWeekNumber(date)}`;
                const dateKey = `${date.toISOString().split('T')[0]}`;


                if (!scheduleMap.month[monthKey]) {
                    scheduleMap.month[monthKey] = {};
                }
                // Kiểm tra thông tin về bác sĩ đã được thêm vào chưa
                if (!scheduleMap.month[monthKey][entry.dentistUserName]) {
                    scheduleMap.month[monthKey][entry.dentistUserName] = [];
                }
                // Thêm thông tin vào mảng của bác sĩ trong ngày
                scheduleMap.month[monthKey][entry.dentistUserName].push(entry); 
                ////////

                if (!scheduleMap.week[weekKey]) {
                    scheduleMap.week[weekKey] = {};
                }
                // Kiểm tra thông tin về bác sĩ đã được thêm vào chưa
                if (!scheduleMap.week[weekKey][entry.dentistUserName]) {
                    scheduleMap.week[weekKey][entry.dentistUserName] = [];
                }
                // Thêm thông tin vào mảng của bác sĩ trong ngày
                scheduleMap.week[weekKey][entry.dentistUserName].push(entry);
                ///////////

                if (!scheduleMap.date[dateKey]) {
                    scheduleMap.date[dateKey] = {};
                }
                // Kiểm tra thông tin về bác sĩ đã được thêm vào chưa
                if (!scheduleMap.date[dateKey][entry.dentistUserName]) {
                    scheduleMap.date[dateKey][entry.dentistUserName] = [];
                }
                // Thêm thông tin vào mảng của bác sĩ trong ngày
                scheduleMap.date[dateKey][entry.dentistUserName].push(entry);
            });

            function createScheduleByMonthElement(entry) {
                const scheduleElement = document.createElement('div');
                const stime = new Date(entry.startTime);
                const formattedSTime = `${stime.getUTCHours().toString().padStart(2, '0')}:${stime.getUTCMinutes().toString().padStart(2, '0')}`;
                const etime = new Date(entry.endTime);
                const formattedETime = `${etime.getUTCHours().toString().padStart(2, '0')}:${etime.getUTCMinutes().toString().padStart(2, '0')}`;
                scheduleElement.textContent = `Time: ${formattedSTime} - ${formattedETime}, Clinic: ${entry.clinicName}, Status: ${entry.busyStatus}
                `;
                // 
                return scheduleElement;
                //
            }

            function createScheduleByWeekElement(entry) {
                const scheduleElement = document.createElement('div');
                const stime = new Date(entry.startTime);
                const formattedSTime = `${stime.getUTCHours().toString().padStart(2, '0')}:${stime.getUTCMinutes().toString().padStart(2, '0')}`;
                const etime = new Date(entry.endTime);
                const formattedETime = `${etime.getUTCHours().toString().padStart(2, '0')}:${etime.getUTCMinutes().toString().padStart(2, '0')}`;
                scheduleElement.textContent = `Time: ${formattedSTime} - ${formattedETime}, Clinic: ${entry.clinicName}, Status: ${entry.busyStatus}
                `;
                // 
                return scheduleElement;
                //
            }

            function createScheduleByDateElement(entry) {
                const scheduleElement = document.createElement('div');
                const wdate = new Date(entry.workingDate);
                const formattedDate = `${wdate.getDate().toString().padStart(2, '0')}/${(wdate.getMonth() + 1).toString().padStart(2, '0')}/${wdate.getFullYear()}`;
                const stime = new Date(entry.startTime);
                const formattedSTime = `${stime.getUTCHours().toString().padStart(2, '0')}:${stime.getUTCMinutes().toString().padStart(2, '0')}`;
                const etime = new Date(entry.endTime);
                const formattedETime = `${etime.getUTCHours().toString().padStart(2, '0')}:${etime.getUTCMinutes().toString().padStart(2, '0')}`;
                scheduleElement.textContent = `Time: ${formattedSTime} - ${formattedETime}, Clinic: ${entry.clinicName}, Status: ${entry.busyStatus}`;
                return scheduleElement;
            }
        
            for (const monthKey in scheduleMap.month) {
                const monthScheduleElement = document.createElement('div');
                monthScheduleElement.classList.add('month-schedule'); // Thêm class cho phân cách
                monthScheduleElement.textContent = `Month: ${monthKey}`;
                getDentistsWorkScheduleInfoByMonthResult.appendChild(monthScheduleElement);
        
                for (const dentist in scheduleMap.month[monthKey]) { 
                    const dentistScheduleElement = document.createElement('div');
                    dentistScheduleElement.classList.add('dentist-schedule'); // Thêm class cho phân cách
                    dentistScheduleElement.textContent = `Dentist: ${dentist}`;
                    monthScheduleElement.appendChild(dentistScheduleElement);

                    const dates = {}; // Object để lưu trữ thông tin lịch theo từng ngày

                    scheduleMap.month[monthKey][dentist].forEach((entry) => {
                        const date = entry.workingDate;
                        if (!dates[date]) {
                            dates[date] = []; // Tạo mảng nếu chưa có thông tin lịch cho ngày đó
                        }
                        dates[date].push(entry);
                    });

                    // Hiển thị thông tin lịch theo ngày cho từng nha sĩ
                    for (const date in dates) {
                        const dateScheduleElement = document.createElement('div');
                        dateScheduleElement.classList.add('date-schedule'); // Thêm class cho phân cách
                        const wdate = new Date(date);
                        const formattedDate = `${wdate.getDate().toString().padStart(2, '0')}`;
                        dateScheduleElement.textContent = `Day of month: ${formattedDate}`;
                        dentistScheduleElement.appendChild(dateScheduleElement);

                        dates[date].forEach((entry) => {
                            const scheduleElement = createScheduleByMonthElement(entry);
                            dateScheduleElement.appendChild(scheduleElement);
                        });
                    }
                }
            }

            

            for (const weekKey in scheduleMap.week) {
                const weekScheduleElement = document.createElement('div');
                weekScheduleElement.classList.add('week-schedule'); // Thêm class cho phân cách
                weekScheduleElement.textContent = `Week: ${weekKey}`;
                getDentistsWorkScheduleInfoByWeekResult.appendChild(weekScheduleElement);
            
                for (const dentist in scheduleMap.week[weekKey]) {
                    const dentistScheduleElement = document.createElement('div');
                    dentistScheduleElement.classList.add('dentist-schedule'); // Thêm class cho phân cách
                    dentistScheduleElement.textContent = `Dentist: ${dentist}`;
                    weekScheduleElement.appendChild(dentistScheduleElement);
            
                    const dates = {}; // Object để lưu trữ thông tin lịch theo từng ngày
            
                    scheduleMap.week[weekKey][dentist].forEach((entry) => {
                        const date = new Date(entry.workingDate);
                        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }); // Lấy tên của ngày trong tuần
            
                        if (!dates[dayOfWeek]) {
                            dates[dayOfWeek] = []; // Tạo mảng nếu chưa có thông tin lịch cho ngày đó
                        }
                        dates[dayOfWeek].push(entry);
                    });
            
                    // Hiển thị thông tin lịch theo ngày cho từng nha sĩ
                    for (const dayOfWeek in dates) {
                        const dateScheduleElement = document.createElement('div');
                        dateScheduleElement.classList.add('date-schedule'); // Thêm class cho phân cách
                        dateScheduleElement.textContent = `Day of week: ${dayOfWeek}`;
                        dentistScheduleElement.appendChild(dateScheduleElement);
            
                        dates[dayOfWeek].forEach((entry) => {
                            const scheduleElement = createScheduleByWeekElement(entry);
                            dateScheduleElement.appendChild(scheduleElement);
                        });
                    }
                }
            }

            for (const dayKey in scheduleMap.date) {
                const dayScheduleElement = document.createElement('div');
                dayScheduleElement.classList.add('date-schedule'); // Thêm class cho phân cách
                dayScheduleElement.textContent = `Date: ${dayKey}`;
                getDentistsWorkScheduleInfoByDateResult.appendChild(dayScheduleElement);
        
                for (const dentist in scheduleMap.date[dayKey]) {
                    const dentistScheduleElement = document.createElement('div');
                    dentistScheduleElement.classList.add('dentist-schedule'); // Thêm class cho phân cách
                    dentistScheduleElement.textContent = `Dentist: ${dentist}`;
                    dayScheduleElement.appendChild(dentistScheduleElement);
        
                    scheduleMap.date[dayKey][dentist].forEach((entry) => {
                        const scheduleElement = createScheduleByDateElement(entry);
                        dentistScheduleElement.appendChild(scheduleElement);
                    });
                }
            }

        } else {
            
            getDentistsWorkScheduleInfoResult.innerHTML = data.message;
        }
    } catch (error)  {
        console.error('Error when get dentists work schedule information', error);
    };
}

function resetTPForm() {
  const createTreatmentPlanForm = document.getElementById("createTreatmentPlanForm");
  createTreatmentPlanForm.reset();
  const displayDentistsForMedical = document.getElementById("displayDentistsForMedical");
  displayDentistsForMedical.selectedIndex = -1;
}

function resetMRForm() {
  const addPatientMedicalRecordForm = document.getElementById("addPatientMedicalRecordForm");
  addPatientMedicalRecordForm.reset();
}

function restoreInitialTPDisplayState() {
  for (const id in initialTPDisplayState) {
    if (initialTPDisplayState.hasOwnProperty(id)) {
      const element = document.getElementById(id);
      if (element) {
        element.style.display = initialTPDisplayState[id];
      }
    }
  }
}

function restoreInitialMRDisplayState() {
  for (const id in initialMRDisplayState) {
    if (initialMRDisplayState.hasOwnProperty(id)) {
      const element = document.getElementById(id);
      if (element) {
        element.style.display = initialMRDisplayState[id];
      }
    }
  }
}

async function displayDentistsForAddAppointment(date, time, clinicName) { 
  try {
    const response = await fetch('http://localhost:3000/displayAvailableDentists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({date, time, clinicName})
    })
    const data = await response.json()
    const displayDentistsForAddAppointment = document.getElementById('displayDentistsForAddAppointment');
    displayDentistsForAddAppointment.innerHTML = ''; 
    if (response.status === 200) {
      data.forEach(dentist => {
        const option = document.createElement('option');
        option.value = dentist.dentistUserName;
        option.textContent = dentist.dentistFullName;      
        displayDentistsForAddAppointment.appendChild(option);
      });
    } else {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = `Can't find a suitable dentist`;  
        displayDentistsForAddAppointment.appendChild(option);
    }
  } catch(error) {
      console.error('Có lỗi xảy ra:', error);
  };
 
}

async function displayDentistsForUpdateAppointment(date, time, clinicName) { 
  try {
    const response = await fetch('http://localhost:3000/displayAvailableDentists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({date, time, clinicName})
    })
    const data = await response.json()
    const displayDentistsForUpdateAppointment = document.getElementById('displayDentistsForUpdateAppointment');
    displayDentistsForUpdateAppointment.innerHTML = ''; 
    if (response.status === 200) {
      data.forEach(dentist => {
        const option = document.createElement('option');
        option.value = dentist.dentistUserName;
        option.textContent = dentist.dentistFullName;      
        displayDentistsForUpdateAppointment.appendChild(option);
      });
    } else {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = `Can't find a suitable dentist`;
        displayDentistsForUpdateAppointment.appendChild(option);
    }
  } catch(error) {
      console.error('Có lỗi xảy ra:', error);
  };
 
}

async function displayDentistsForMedical(date, time, clinicName) { 
  try {
    const response = await fetch('http://localhost:3000/displayAvailableDentists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({date, time, clinicName})
    })
    const data = await response.json()
    const displayDentistsForMedical = document.getElementById('displayDentistsForMedical');
    displayDentistsForMedical.innerHTML = ''; 
    if (response.status === 200) {
      data.forEach(dentist => {
        const option = document.createElement('option');
        option.value = dentist.dentistUserName;
        option.textContent = dentist.dentistFullName;      
        displayDentistsForMedical.appendChild(option);
      });
    } else {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = `Can't find a suitable dentist`;  
        displayDentistsForMedical.appendChild(option);
    }
  } catch(error) {
      console.error('Có lỗi xảy ra:', error);
  };
 
}

async function searchTooth(toothId) {
  try {
      const response = await fetch('http://localhost:3000/searchTooth', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ toothId })
      })
      const data = await response.json();
      const searchToothResult = document.getElementById('searchToothResult');
      searchToothResult.innerHTML = '';
      if (response.status === 200) {  
          const resultHTML = data.map(tooth => {
              return `
                <div id="addTooth">
                  <p>Tooth Id: ${tooth.toothId}</p>
                  <select id="toothFaceName_${tooth.toothId}"required>
                      <option value="Lingual">Lingual - L</option>
                      <option value="Facial">Facial - F</option>
                      <option value="Distal">Distal - D</option>
                      <option value="Mesial">Mesial - M</option>
                      <option value="Top">Top - T</option>
                      <option value="Root">Root - R</option>
                  </select>
                  <button onclick="addTooth('${tooth.toothId}')">Add tooth</button>
                </div>
              `;
            }).join('');
            searchToothResult.innerHTML = resultHTML;                                
      } else if (response.status === 404) {
          searchToothResult.textContent = data.message;
      }    
  } catch (error) {
      console.error('Có lỗi xảy ra:', error);
  }  
}

async function searchDrug(drugName) {
  try {
      const response = await fetch('http://localhost:3000/searchDrug', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ drugName })
      })
      const data = await response.json();
      const searchDrugResult = document.getElementById('searchDrugResult');
      searchDrugResult.innerHTML = '';
      if (response.status === 200) {  
          const resultHTML = data.map(drug => {
              return `
              <div id="addDrug">
                  <p>Drug Id: ${drug.drugId}</p>
                  <p>Drug name: ${drug.drugName}</p>
                  <label for="quantity_${drug.drugId}">Quantity:</label>
                  <input type="number" id="quantity_${drug.drugId}" min="1" max="100" required>
                  <button onclick="addDrug('${drug.drugId}','${drug.drugName}')">Add drug</button>
              </div>
              `;
            }).join('');
          //   <p>Stock number: ${drug.stockNumber}</p>
            console.log(data);
            searchDrugResult.innerHTML = resultHTML;  
      } else if (response.status === 404) {
          searchDrugResult.textContent = data.message;
      }    
  } catch (error) {
      console.error('Có lỗi xảy ra:', error);
  }  
}

async function searchDrugContraindication(drugContraindicationName) {
  const drugName = drugContraindicationName;  
  try {
        const response = await fetch('http://localhost:3000/searchDrug', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ drugName })
        })
        const data = await response.json();
        const searchDrugContraindicationResult = document.getElementById('searchDrugContraindicationResult');
        searchDrugContraindicationResult.innerHTML = '';
        if (response.status === 200) {  
            const resultHTML = data.map(drug => {
                return `
                <div id="addDrugContraindication">
                    <p id="addDrugContraindicationId">Drug contraindication Id: ${drug.drugId}</p>
                    <p id="addDrugContraindicationName">Drug contraindication name: ${drug.drugName}</p>
                    <button onclick="addDrugContraindication('${drug.drugId}','${drug.drugName}')">Add drug contraindication</button>
                </div>
                `;
              }).join('');
              console.log(data);
              searchDrugContraindicationResult.innerHTML = resultHTML;  
        } else if (response.status === 404) {
            searchDrugContraindicationResult.textContent = data.message;
        }    
    } catch (error) {
        console.error('Có lỗi xảy ra:', error);
    }  
} 

let selectedToothsId = [];
let selectedToothsFaceName = [];
async function addTooth(toothId) {
    const toothFaceName = document.getElementById(`toothFaceName_${toothId}`).value;

    let combined = selectedToothsId.map((id, index) => ({ id, faceName: selectedToothsFaceName[index] }));
    let exists = combined.some(tooth => tooth.id === toothId && tooth.faceName === toothFaceName);

    const addToothResult = document.getElementById('addToothResult');
    if (!exists) {
        selectedToothsId.push(toothId);
        selectedToothsFaceName.push(toothFaceName);

        document.getElementById(`addTooth`).innerHTML = '';
        

        addToothResult.innerHTML = '';
        addToothResult.innerHTML = 'Thêm răng và mặt răng thành công'; 
        setTimeout(`addToothResult.style.display = 'none'`, 3000);
        setTimeout(`addToothResult.innerHTML = ''`,3001);
        setTimeout(`addToothResult.style.display = 'block'`, 3002);

        const toothsList = document.getElementById('toothsList');
        toothsList.innerHTML = '';

        const selectedToothsInfo = selectedToothsId.map((toothId, index) => ({
            toothId,
            toothFaceName: selectedToothsFaceName[index]
        }));
    
        const selectedToothsHTML = selectedToothsInfo.map(tooth => {
        return `
          <tr>
            <td>${tooth.toothId}</td>
            <td>${tooth.toothFaceName}</td>
          </tr>
        `;
        }).join('');
      
        const selectedToothsTable = `
            <table>
            <tr>
                <th>Tooth Id</th>
                <th>Tooth face name</th>
            </tr>
            ${selectedToothsHTML}
            </table>
        `;
        toothsList.innerHTML = selectedToothsTable;
    } else {
        document.getElementById(`addTooth`).innerHTML = '';

        addToothResult.innerHTML = '';
        addToothResult.innerHTML = `Đã có răng số ${toothId} - mặt răng ${toothFaceName} trong liệu trình`;
        setTimeout(`addToothResult.style.display = 'none'`, 3000);
        setTimeout(`addToothResult.innerHTML = ''`,3001);
        setTimeout(`addToothResult.style.display = 'block'`, 3002);
    }
}

let selectedDrugsId = [];
let selectedDrugsName = [];
let selectedDrugsQuantity = [];
let selectedDrugsContraindicationId = [];
let selectedDrugsContraindicationName = [];

async function addDrug(drugId, drugName) {

    const addDrugResult = document.getElementById('addDrugResult');
    if ((!selectedDrugsId.includes(drugId)) && (!selectedDrugsContraindicationId.includes(drugId))) {
        const quantity = document.getElementById(`quantity_${drugId}`).value;
        if (quantity) {
            selectedDrugsId.push(drugId);
            selectedDrugsName.push(drugName);
            selectedDrugsQuantity.push(quantity);

            document.getElementById(`addDrug`).innerHTML = '';
            

            addDrugResult.innerHTML = '';
            addDrugResult.innerHTML = 'Thêm thuốc thành công'; 
            setTimeout(`addDrugResult.style.display = 'none'`, 3000);
            setTimeout(`addDrugResult.innerHTML = ''`,3001);
            setTimeout(`addDrugResult.style.display = 'block'`, 3002);
            
            const drugsList = document.getElementById('drugsList');
            drugsList.innerHTML = '';
            const selectedDrugsInfo = selectedDrugsId.map((drugId, index) => ({
                drugId,
                drugName: selectedDrugsName[index],
                quantity: selectedDrugsQuantity[index],
            }));

            const selectedDrugsHTML = selectedDrugsInfo.map(drug => {
            return `
            <tr>
                <td>${drug.drugId}</td>
                <td>${drug.drugName}</td>
                <td>${drug.quantity}</td>
            </tr>
            `;
            }).join('');
        
            const selectedDrugsTable = `
                <table>
                <tr>
                    <th>Drug Id</th>
                    <th>Drug Name</th>
                    <th>Quantity</th>
                </tr>
                ${selectedDrugsHTML}
                </table>
            `;
            drugsList.innerHTML = selectedDrugsTable;
        } else {
            addDrugResult.innerHTML = '';
            addDrugResult.innerHTML = 'Vui lòng nhập số lượng thuốc';
            setTimeout(`addDrugResult.style.display = 'none'`, 3000);
            setTimeout(`addDrugResult.innerHTML = ''`,3001);
            setTimeout(`addDrugResult.style.display = 'block'`, 3002);
        }
    } else {
        document.getElementById(`addDrug`).innerHTML = '';
        addDrugResult.innerHTML = '';
        addDrugResult.innerHTML = `Đã có thuốc hoặc đã chống chỉ chỉ định thuốc ${drugName} trong liệu trình`;
        setTimeout(`addDrugResult.style.display = 'none'`, 3000);
        setTimeout(`addDrugResult.innerHTML = ''`,3001);
        setTimeout(`addDrugResult.style.display = 'block'`, 3002);
    }
}

async function addDrugContraindication(drugContraindicationId, drugContraindicationName) {
    const addDrugContraindicationResult = document.getElementById('addDrugContraindicationResult');
    if ((!selectedDrugsId.includes(drugContraindicationId)) && (!selectedDrugsContraindicationId.includes(drugContraindicationId))) {
        selectedDrugsContraindicationId.push(drugContraindicationId);
        selectedDrugsContraindicationName.push(drugContraindicationName);

        document.getElementById('addDrugContraindication').innerHTML = '';


        addDrugContraindicationResult.innerHTML = '';
        addDrugContraindicationResult.innerHTML = 'Thêm thuốc chống chỉ định thành công'; 
        setTimeout(`addDrugContraindicationResult.style.display = 'none'`, 3000);
        setTimeout(`addDrugContraindicationResult.innerHTML = ''`, 3001);
        setTimeout(`addDrugContraindicationResult.style.display = 'block'`, 3002);

        const drugsContraindicationList = document.getElementById('drugsContraindicationList');
        drugsContraindicationList.innerHTML = '';
        const selectedDrugsContraindicationInfo = selectedDrugsContraindicationId.map((drugContraindicationId, index) => ({
            drugContraindicationId,
            drugContraindicationName: selectedDrugsContraindicationName[index]
        }));

        const selectedDrugsContraindicationHTML = selectedDrugsContraindicationInfo.map(drugContraindication => {
        return `
        <tr>
            <td>${drugContraindication.drugContraindicationId}</td>
            <td>${drugContraindication.drugContraindicationName}</td>
        </tr>
        `;
        }).join('');
    
        const selectedDrugsContraindicationTable = `
            <table>
            <tr>
                <th>Drug contraindication Id</th>
                <th>Drug contraindication name</th>
            </tr>
            ${selectedDrugsContraindicationHTML}
            </table>
        `;
        drugsContraindicationList.innerHTML = selectedDrugsContraindicationTable;
    } else {
        document.getElementById('addDrugContraindication').innerHTML = '';

        addDrugContraindicationResult.innerHTML = '';
        addDrugContraindicationResult.innerHTML = `Đã có chống chỉ định thuốc hoặc đã chọn thuốc ${drugContraindicationName} trong liệu trình`;
        setTimeout(`addDrugContraindicationResult.style.display = 'none'`, 3000);
        setTimeout(`addDrugContraindicationResult.innerHTML = ''`, 3001);
        setTimeout(`addDrugContraindicationResult.style.display = 'block'`, 3002);
    }

}


let selectedTreatmentPlansDate = [];
let selectedTreatmentPlansTime = [];
let selectedTreatmentPlansClinicName = [];
let selectedTreatmentPlansDentistUserName = [];
let selectedTreatmentPlansDentistFullName = [];
let selectedTreatmentPlansTreatmentId = [];
let selectedTreatmentPlansTreatmentName = [];
let selectedTreatmentPlansDescription = [];
let selectedTreatmentPlansNote = [];

let selectedTreatmentPlansToothsId = [];
let selectedTreatmentPlansToothsFaceName = [];
let selectedTreatmentPlansDrugsId = [];
let selectedTreatmentPlansDrugsName = [];
let selectedTreatmentPlansDrugsQuantity = [];
let selectedTreatmentPlansDrugsContraindicationId = [];
let selectedTreatmentPlansDrugsContraindicationName = [];
async function addTreatmentPlan(treatmentPlanDate, treatmentPlanTime, clinicName, dentistUserName, dentistFullName, treatmentId, treatmentName,
  description, note, toothsId, toothsFaceName, drugsId, drugsName, drugsQuantity, drugsContraindicationId, drugsContraindicationName ) {

    let exists = selectedTreatmentPlansDate.some((date, index) => 
      date === treatmentPlanDate &&

      ((selectedTreatmentPlansTime[index] >= '06:00' && selectedTreatmentPlansTime[index] < '08:00' && 
      treatmentPlanTime >= '06:00' && treatmentPlanTime < '08:00') ||

      (selectedTreatmentPlansTime[index] >= '08:00' && selectedTreatmentPlansTime[index] < '10:00' && 
      treatmentPlanTime >= '08:00' && treatmentPlanTime < '10:00') ||

      (selectedTreatmentPlansTime[index] >= '13:00' && selectedTreatmentPlansTime[index] < '15:00' && 
      treatmentPlanTime >= '13:00' && treatmentPlanTime < '15:00') ||

      (selectedTreatmentPlansTime[index] >= '15:00' && selectedTreatmentPlansTime[index] < '17:00' && 
      treatmentPlanTime >= '15:00' && treatmentPlanTime < '17:00'))
    );

    if (!exists) {
      selectedTreatmentPlansDate.push(treatmentPlanDate);
      selectedTreatmentPlansTime.push(treatmentPlanTime);
      selectedTreatmentPlansClinicName.push(clinicName);
      selectedTreatmentPlansDentistUserName.push(dentistUserName);
      selectedTreatmentPlansDentistFullName.push(dentistFullName);
      selectedTreatmentPlansTreatmentId.push(treatmentId);
      selectedTreatmentPlansTreatmentName.push(treatmentName);
      selectedTreatmentPlansDescription.push(description);
      selectedTreatmentPlansNote.push(note);
      selectedTreatmentPlansToothsId.push(toothsId);
      selectedTreatmentPlansToothsFaceName.push(toothsFaceName);
      selectedTreatmentPlansDrugsId.push(drugsId);
      selectedTreatmentPlansDrugsName.push(drugsName);
      selectedTreatmentPlansDrugsQuantity.push(drugsQuantity);
      selectedTreatmentPlansDrugsContraindicationId.push(drugsContraindicationId);
      selectedTreatmentPlansDrugsContraindicationName.push(drugsContraindicationName);

      const treatmentPlanAddResult = document.getElementById('treatmentPlanAddResult');
      treatmentPlanAddResult.innerHTML = '';
      treatmentPlanAddResult.innerHTML = 'Thêm kế hoạch điều trị thành công'; 
      setTimeout(`treatmentPlanAddResult.style.display = 'none'`, 3000);
      setTimeout(`treatmentPlanAddResult.innerHTML = ''`, 3001);
      setTimeout(`treatmentPlanAddResult.style.display = 'block'`, 3002);

      document.getElementById('toothsList').innerHTML = '';
      document.getElementById('drugsList').innerHTML = '';
      document.getElementById('drugsContraindicationList').innerHTML = '';

      document.getElementById('searchToothForm').reset();
      document.getElementById('searchDrugForm').reset();
      document.getElementById('searchDrugContraindicationForm').reset();

      selectedToothsId = [];
      selectedToothsFaceName = [];
      selectedDrugsId = [];
      selectedDrugsName = [];
      selectedDrugsQuantity = [];
      selectedDrugsContraindicationId = [];
      selectedDrugsContraindicationName = [];

      resetTPForm();
      document.getElementById('checkButton').style.display = 'block';
      restoreInitialTPDisplayState();

    } else {
      treatmentPlanAddResult.innerHTML = '';
      treatmentPlanAddResult.innerHTML = 'Đã chọn kế hoạch điều trị và thời gian này'; 
      setTimeout(`treatmentPlanAddResult.style.display = 'none'`, 3000);
      setTimeout(`treatmentPlanAddResult.innerHTML = ''`, 3001);
      setTimeout(`treatmentPlanAddResult.style.display = 'block'`, 3002);

      document.getElementById('toothsList').innerHTML = '';
      document.getElementById('drugsList').innerHTML = '';
      document.getElementById('drugsContraindicationList').innerHTML = '';

      document.getElementById('searchToothForm').reset();
      document.getElementById('searchDrugForm').reset();
      document.getElementById('searchDrugContraindicationForm').reset();

      selectedToothsId = [];
      selectedToothsFaceName = [];
      selectedDrugsId = [];
      selectedDrugsName = [];
      selectedDrugsQuantity = [];
      selectedDrugsContraindicationId = [];
      selectedDrugsContraindicationName = [];
      restoreInitialTPDisplayState();
    }

}

async function displayMedicalRecordInfo(patientPhoneNumber, examinationDate, examinationTime, oralHealth, allergies,
    treatmentPlansDate, treatmentPlansTime, treatmentPlansClinicName, treatmentPlansDentistFullName, treatmentPlansTreatmentName, treatmentPlansDescription, treatmentPlansNote,
    treatmentPlansToothsId, treatmentPlansToothsFaceName, treatmentPlansDrugsName, treatmentPlansDrugsQuantity, treatmentPlansDrugsContraindicationName) {
    const medicalRecordInfo = document.getElementById('medicalRecordInfo');
    medicalRecordInfo.innerHTML = ''; 

    const medicalRecordDiv = document.createElement('div');
    medicalRecordDiv.classList.add('medical-record');
    const generalMedicalInfoParagraph = document.createElement('p');
    generalMedicalInfoParagraph.textContent = `Patient phone number: ${patientPhoneNumber}  -  Examination Date: ${examinationDate}  -  ExaminationTime: ${examinationTime}  -  Oral Health: ${oralHealth}  -  Allergies: ${allergies}`;
    medicalRecordDiv.appendChild(generalMedicalInfoParagraph);

    for (let i = 0; i < treatmentPlansDate.length; i++) {
        const treatmentPlanDiv = document.createElement('div');
        treatmentPlanDiv.classList.add('treatment-plan');

        const treatmentPlanInfo = document.createElement('p');
        treatmentPlanInfo.textContent = `Treatment plan ${i+1}:`;
        const generalTreatmentPlanInfoParagraph = document.createElement('p');
        generalTreatmentPlanInfoParagraph.textContent = `Date: ${treatmentPlansDate[i]}  -  Time: ${treatmentPlansTime[i]}  -  Clinic: ${treatmentPlansClinicName[i]}  -  Dentist: ${treatmentPlansDentistFullName[i]}  -  Treatment: ${treatmentPlansTreatmentName[i]}  -  Description: ${treatmentPlansDescription[i]}  -  Note: ${treatmentPlansNote[i]}  -  Status: 'Plan'`;
        
        treatmentPlanDiv.appendChild(treatmentPlanInfo);
        treatmentPlanDiv.appendChild(generalTreatmentPlanInfoParagraph);

        for (let j = 0; j < treatmentPlansToothsId[i].length; j++) {
            const toothInfoParagraph = document.createElement('p');
            toothInfoParagraph.textContent = `Tooth: ${treatmentPlansToothsId[i][j]}  -  Face: ${treatmentPlansToothsFaceName[i][j]}`;
            treatmentPlanDiv.appendChild(toothInfoParagraph);
        }

        for (let j = 0; j < treatmentPlansDrugsName[i].length; j++) {
            const drugInfoParagraph = document.createElement('p');
            drugInfoParagraph.textContent = `Drug: ${treatmentPlansDrugsName[i][j]}  -  Quantity: ${treatmentPlansDrugsQuantity[i][j]}`;
            treatmentPlanDiv.appendChild(drugInfoParagraph);
        }

        for (let j = 0; j < treatmentPlansDrugsContraindicationName[i].length; j++) {
            const drugContraindicationInfoParagraph = document.createElement('p');
            drugContraindicationInfoParagraph.textContent = `Contraindication drug: ${treatmentPlansDrugsContraindicationName[i][j]}`;
            treatmentPlanDiv.appendChild(drugContraindicationInfoParagraph);
        }

        medicalRecordDiv.appendChild(treatmentPlanDiv);

        medicalRecordInfo.appendChild(medicalRecordDiv);
    }
}

async function addPatientMedicalRecord(patientPhoneNumber, examinationDate, examinationTime, oralHealth, allergies, 
    treatmentPlansDate, treatmentPlansTime, treatmentPlansClinicName, treatmentPlansDentistUserName, treatmentPlansTreatmentId, treatmentPlansDescription, treatmentPlansNote,
    treatmentPlansToothsId, treatmentPlansToothsFaceName, treatmentPlansDrugsId, treatmentPlansDrugsName, treatmentPlansDrugsQuantity, treatmentPlansDrugsContraindicationId ) {
    // const totalAmount = await calculateTotalAmount(treatmentPlansTreatmentId, treatmentPlansToothsFaceName, treatmentPlansDrugsName, treatmentPlansDrugsQuantity);
    
    try {
        const response = await fetch('http://localhost:3000/addPatientMedicalRecord', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ patientPhoneNumber, examinationDate, examinationTime, oralHealth, allergies, 
                treatmentPlansDate, treatmentPlansTime, treatmentPlansClinicName, treatmentPlansDentistUserName, treatmentPlansTreatmentId,  treatmentPlansDescription, treatmentPlansNote, 
                treatmentPlansToothsId, treatmentPlansToothsFaceName, treatmentPlansDrugsId, treatmentPlansDrugsQuantity, treatmentPlansDrugsContraindicationId
                 })
        }) // totalAmount
        const data = await response.json();
        const patientMedicalRecordAddResult = document.getElementById('patientMedicalRecordAddResult');
        if (response.status === 200) {
            resetMRForm();
            restoreInitialMRDisplayState();
            patientMedicalRecordAddResult.textContent = data.message;
        } else if (response.status === 500) {
            patientMedicalRecordAddResult.textContent = data.message;
        }    
    } catch (error) {
        console.error('Có lỗi xảy ra:', error);
    }  
}

function getColorByStatus(status) {
  switch (status) {
      case 'Plan':
          return 'blue';
      case 'Complete':
          return 'green';
      case 'Cancel':
          return 'yellow';
      default:
          return 'inherit';
  }
}

async function getPatientMedicalRecordInfo(patientPhoneNumber) {
  try {
      // Lấy dữ liệu từ server
      const response = await fetch('http://localhost:3000/getPatientMedicalRecordInfo', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ patientPhoneNumber }) 
      })
      const data = await response.json();
      const getPatientMedicalRecordInfoResult = document.getElementById('getPatientMedicalRecordInfoResult');
      getPatientMedicalRecordInfoResult.innerHTML = '';

      if (response.status === 200) {
          // Hiển thị thông tin bệnh nhân
          const patientDiv = document.createElement('div');
          patientDiv.textContent = 'PATIENT MEDICAL RECORDS AND PAYMENT INFOMATION';
          patientDiv.classList.add('patient-info');

          const patientGeneralInfoParagraph = document.createElement('p');
          patientGeneralInfoParagraph.textContent = `Full name: ${data.patientInfo.patientFullName}  -  Age: ${data.patientInfo.patientAge}  -  Gender: ${data.patientInfo.patientGender}`;
          patientDiv.appendChild(patientGeneralInfoParagraph);
          getPatientMedicalRecordInfoResult.appendChild(patientDiv);

          // Hiển thị thông tin hồ sơ bệnh án và kế hoạch điều trị
          for (let i = 0; i < data.medicalRecordsInfo.length; i++) {
              const medicalRecordDiv = document.createElement('div');
              medicalRecordDiv.classList.add('medical-record');

              // Thêm nút mở rộng/ thu gọn cho medical record
              const expandMedicalRecordBtn = document.createElement('span');
              expandMedicalRecordBtn.classList.add('expand-btn');
              expandMedicalRecordBtn.textContent = '+';
              expandMedicalRecordBtn.addEventListener('click', () => {
                  if (treatmentPlansDiv.style.display === 'none') {
                      treatmentPlansDiv.style.display = 'block';
                      expandMedicalRecordBtn.textContent = '-';
                  } else {
                      treatmentPlansDiv.style.display = 'none';
                      expandMedicalRecordBtn.textContent = '+';
                  }
              });
              medicalRecordDiv.appendChild(expandMedicalRecordBtn);

              const medicalRecordHeader = document.createElement('span');
              medicalRecordHeader.textContent = `Medical record ${i + 1} (Id: ${data.medicalRecordsInfo[i].medicalRecordId})`;
              medicalRecordDiv.appendChild(medicalRecordHeader);

              const treatmentPlansDiv = document.createElement('div');
              treatmentPlansDiv.style.display = 'none';

              const medicalRecordGeneralInfoParagraph = document.createElement('p');
              const examDate = new Date(data.medicalRecordsInfo[i].examinationDate);
              const formattedExamDate = `${examDate.getDate().toString().padStart(2, '0')}/${(examDate.getMonth() + 1).toString().padStart(2, '0')}/${examDate.getFullYear()}`;
              const examTime = new Date(data.medicalRecordsInfo[i].examinationTime); 
              const formattedExamTime = `${examTime.getUTCHours().toString().padStart(2, '0')}:${examTime.getUTCMinutes().toString().padStart(2, '0')}`;
              medicalRecordGeneralInfoParagraph.textContent = `Examination date: ${formattedExamDate}  -  Examination time: ${formattedExamTime}  -  Oral health: ${data.medicalRecordsInfo[i].oralHealth}  -  Allergies: ${data.medicalRecordsInfo[i].allergies}`;
              medicalRecordDiv.appendChild(medicalRecordGeneralInfoParagraph);

              // Hiển thị các kế hoạch điều trị trong từng hồ sơ bệnh án
              for (let j = 0; j < data.medicalRecordsInfo[i].treatmentPlans.length; j++) {
                  const treatmentPlanDiv = document.createElement('div');
                  treatmentPlanDiv.classList.add('treatment-plan');
                  treatmentPlanDiv.style.color = getColorByStatus(data.medicalRecordsInfo[i].treatmentPlans[j].treatmentPlanStatus);

                  const expandTreatmentPlanBtn = document.createElement('span');
                  expandTreatmentPlanBtn.classList.add('expand-btn');
                  expandTreatmentPlanBtn.textContent = '+';
                  expandTreatmentPlanBtn.addEventListener('click', () => {
                      if (treatmentPlanDetailsDiv.style.display === 'none') {
                          treatmentPlanDetailsDiv.style.display = 'block';
                          expandTreatmentPlanBtn.textContent = '-';
                      } else {
                          treatmentPlanDetailsDiv.style.display = 'none';
                          expandTreatmentPlanBtn.textContent = '+';
                      }
                  });
                  treatmentPlanDiv.appendChild(expandTreatmentPlanBtn);

                  const treatmentPlanHeader = document.createElement('span');
                  treatmentPlanHeader.textContent = `Treatment plan ${j + 1} (Id: ${data.medicalRecordsInfo[i].treatmentPlans[j].treatmentPlanId})`;
                  treatmentPlanDiv.appendChild(treatmentPlanHeader);

                  const treatmentPlanDetailsDiv = document.createElement('div');
                  treatmentPlanDetailsDiv.style.display = 'none';

                  const treatmentPlanInfoParagraph = document.createElement('p');
                  const date = new Date(data.medicalRecordsInfo[i].treatmentPlans[j].treatmentPlanDate);
                  const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
                  const time = new Date(data.medicalRecordsInfo[i].treatmentPlans[j].treatmentPlanTime); 
                  const formattedTime = `${time.getUTCHours().toString().padStart(2, '0')}:${time.getUTCMinutes().toString().padStart(2, '0')}`;
                  treatmentPlanInfoParagraph.textContent = `Date: ${formattedDate}  -  Time: ${formattedTime}  -  Clinic: ${data.medicalRecordsInfo[i].treatmentPlans[j].clinicName}  -  Dentist: ${data.medicalRecordsInfo[i].treatmentPlans[j].dentistFullName}  -  Treatment: ${data.medicalRecordsInfo[i].treatmentPlans[j].treatmentName}  -  Description: ${data.medicalRecordsInfo[i].treatmentPlans[j].description}  -  Note: ${data.medicalRecordsInfo[i].treatmentPlans[j].note}  -  Status: ${data.medicalRecordsInfo[i].treatmentPlans[j].treatmentPlanStatus}`;
                  treatmentPlanDetailsDiv.appendChild(treatmentPlanInfoParagraph);

                  // Hiển thị thông tin răng
                  for (let k = 0; k < data.medicalRecordsInfo[i].treatmentPlans[j].teeth.length; k++) {
                      const toothInfoParagraph = document.createElement('p');
                      toothInfoParagraph.textContent = `Tooth: ${data.medicalRecordsInfo[i].treatmentPlans[j].teeth[k].toothId}  -  Face: ${data.medicalRecordsInfo[i].treatmentPlans[j].teeth[k].toothFaceName}`;
                      treatmentPlanDetailsDiv.appendChild(toothInfoParagraph);
                  }

                  // Hiển thị thông tin thuốc
                  for (let k = 0; k < data.medicalRecordsInfo[i].treatmentPlans[j].drugs.length; k++) {
                      const drugInfoParagraph = document.createElement('p');
                      drugInfoParagraph.textContent = `Drug: ${data.medicalRecordsInfo[i].treatmentPlans[j].drugs[k].drugName}  -  Quantity: ${data.medicalRecordsInfo[i].treatmentPlans[j].drugs[k].quantity}`;
                      treatmentPlanDetailsDiv.appendChild(drugInfoParagraph);
                  }

                  // Hiển thị thông tin thuốc đối phó
                  for (let k = 0; k < data.medicalRecordsInfo[i].treatmentPlans[j].drugsContraindication.length; k++) {
                      const drugContraindicationInfoParagraph = document.createElement('p');
                      drugContraindicationInfoParagraph.textContent = `Contraindication drug: ${data.medicalRecordsInfo[i].treatmentPlans[j].drugsContraindication[k].drugName}`;
                      treatmentPlanDetailsDiv.appendChild(drugContraindicationInfoParagraph);
                  }

                  treatmentPlanDiv.appendChild(treatmentPlanDetailsDiv);
                  treatmentPlansDiv.appendChild(treatmentPlanDiv);
                  
              }
              medicalRecordDiv.appendChild(treatmentPlansDiv);
              getPatientMedicalRecordInfoResult.appendChild(medicalRecordDiv);

              // Hiển thị thông tin thanh toán
              const receiptDiv = document.createElement('div');
              receiptDiv.textContent = `Payment information of medical record ${data.medicalRecordsInfo[i].medicalRecordId}:`;
              receiptDiv.classList.add('receipt');

              if (data.receiptsInfo[i]) {
                  const receiptInfoParagraph = document.createElement('p');
                  receiptInfoParagraph.textContent = `Receipt Id: ${data.receiptsInfo[i].receiptId}  -  Total amount: ${data.receiptsInfo[i].totalAmount}  -  Total paid amount: ${data.receiptsInfo[i].totalPaidAmount}  -  Change amount: ${data.receiptsInfo[i].changeAmount}  -  Status: ${data.receiptsInfo[i].paymentStatus}`;
                  receiptDiv.appendChild(receiptInfoParagraph);
                  getPatientMedicalRecordInfoResult.appendChild(receiptDiv);

                  for (let j = 0; j < data.receiptsInfo[i].payments.length; j++) {
                    const paymentReceiptDiv = document.createElement('div');
                    paymentReceiptDiv.classList.add('payment-receipt');

                    const paymentReceiptInfo = document.createElement('p');
                    paymentReceiptInfo.textContent = `Payment details ${j + 1}:`;
                    const paymentDate = new Date(data.receiptsInfo[i].payments[j].paymentDate);
                    const formattedPaymentDate = `${paymentDate.getDate().toString().padStart(2, '0')}/${(paymentDate.getMonth() + 1).toString().padStart(2, '0')}/${paymentDate.getFullYear()}`;
                    const paymentTime = new Date(data.receiptsInfo[i].payments[j].paymentTime);
                    const formattedPaymentTime = `${paymentTime.getUTCHours().toString().padStart(2, '0')}:${paymentTime.getUTCMinutes().toString().padStart(2, '0')}:${paymentTime.getUTCSeconds().toString().padStart(2, '0')}`;
                    const paymentReceiptInfoParagraph = document.createElement('p');
                    paymentReceiptInfoParagraph.textContent = `Payment date: ${formattedPaymentDate}  -  Payment time: ${formattedPaymentTime}  -  Staff full name: ${data.receiptsInfo[i].payments[j].staffFullName}  -  Paid amount: ${data.receiptsInfo[i].payments[j].paidAmount} - Payment type: ${data.receiptsInfo[i].payments[j].paymentType}`;

                    paymentReceiptDiv.appendChild(paymentReceiptInfoParagraph);
                    receiptDiv.appendChild(paymentReceiptDiv);
                    getPatientMedicalRecordInfoResult.appendChild(receiptDiv);
                  }  
              } else {
                  const receiptInfoParagraph = document.createElement('p');
                  receiptInfoParagraph.textContent = `Payment has not been made`;
                  receiptDiv.appendChild(receiptInfoParagraph);
                  getPatientMedicalRecordInfoResult.appendChild(receiptDiv);
              }
          }
      } else {
          getPatientMedicalRecordInfoResult.innerHTML = data.message;
      }
  } catch (error) {
      console.error('Có lỗi xảy ra khi lấy thông tin hồ sơ bệnh nhân', error);
  };
}

async function getAppointmentsByPatientPhoneNumber(patientPhoneNumber, selectedDatePatientPhoneNumber) {
  const getAppointmentsByPatientPhoneNumberResult = document.getElementById('getAppointmentsByPatientPhoneNumberResult');
  try {
     const response = await fetch('http://localhost:3000/getAppointmentsByPatientPhoneNumber', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({patientPhoneNumber, selectedDatePatientPhoneNumber})
    })
    const data = await response.json();
    if (response.status === 200) {            
      getAppointmentsByPatientPhoneNumberResult.innerHTML = ''; 
      data.forEach(appointment => {
      const appointmentDetails = document.createElement('p');
      const date = new Date(appointment.appointmentDate);
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
      const time = new Date(appointment.appointmentTime); 
      const formattedTime = `${time.getUTCHours().toString().padStart(2, '0')}:${time.getUTCMinutes().toString().padStart(2, '0')}`;
      appointmentDetails.textContent = `
                                      Appointment Id: ${appointment.appointmentId},
                                      Phone number: ${appointment.patientPhoneNumber},
                                      Full name: ${appointment.patientFullName}, 
                                      Date: ${formattedDate},
                                      Time: ${formattedTime},
                                      Clinic: ${appointment.clinicName},
                                      Dentist: ${appointment.dentistFullName},
                                      Note: ${appointment.note},
                                      Status: ${appointment.appointmentStatus}
                                      `; 
      getAppointmentsByPatientPhoneNumberResult.appendChild(appointmentDetails);
      });
    } else {
      getAppointmentsByPatientPhoneNumberResult.innerHTML = data.message;
    }
  } catch(error) {
    console.error('Có lỗi xảy ra:', error);
  };     
}

async function getAppointmentsByClinicName(clinicName, selectedDateClinic) {
  const getAppointmentsByClinicNameResult = document.getElementById('getAppointmentsByClinicNameResult');
  try {
     const response = await fetch('http://localhost:3000/getAppointmentsByClinicName', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({clinicName, selectedDateClinic})
    })
    const data = await response.json();
    if (response.status === 200) {            
      getAppointmentsByClinicNameResult.innerHTML = ''; 
      data.forEach(appointment => {
      const appointmentDetails = document.createElement('p');
      const date = new Date(appointment.appointmentDate);
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
      const time = new Date(appointment.appointmentTime); 
      const formattedTime = `${time.getUTCHours().toString().padStart(2, '0')}:${time.getUTCMinutes().toString().padStart(2, '0')}`;
      appointmentDetails.textContent = `
                                      Appointment Id: ${appointment.appointmentId},
                                      Phone number: ${appointment.patientPhoneNumber},
                                      Full name: ${appointment.patientFullName}, 
                                      Date: ${formattedDate},
                                      Time: ${formattedTime},
                                      Clinic: ${appointment.clinicName},
                                      Dentist: ${appointment.dentistFullName},
                                      Note: ${appointment.note},
                                      Status: ${appointment.appointmentStatus}
                                      `; 
      getAppointmentsByClinicNameResult.appendChild(appointmentDetails);
      });
    } else {
      getAppointmentsByClinicNameResult.innerHTML = data.message;
    }
  } catch(error) {
        console.error('Có lỗi xảy ra:', error);
  };     
}

async function getAppointmentsByDentistUserName(dentistUserName, selectedDateDentistUserName) {
  const getAppointmentsByDentistUserNameResult = document.getElementById('getAppointmentsByDentistUserNameResult');
  try {
     const response = await fetch('http://localhost:3000/getAppointmentsByDentistUserName', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({dentistUserName, selectedDateDentistUserName})
    })
    const data = await response.json();
    if (response.status === 200) {            
      getAppointmentsByDentistUserNameResult.innerHTML = ''; 
      data.forEach(appointment => {
      const appointmentDetails = document.createElement('p');
      const date = new Date(appointment.appointmentDate);
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
      const time = new Date(appointment.appointmentTime); 
      const formattedTime = `${time.getUTCHours().toString().padStart(2, '0')}:${time.getUTCMinutes().toString().padStart(2, '0')}`;
      appointmentDetails.textContent = `
                                      Appointment Id: ${appointment.appointmentId},
                                      Phone number: ${appointment.patientPhoneNumber},
                                      Full name: ${appointment.patientFullName}, 
                                      Date: ${formattedDate},
                                      Time: ${formattedTime},
                                      Clinic: ${appointment.clinicName},
                                      Dentist: ${appointment.dentistFullName},
                                      Note: ${appointment.note},
                                      Status: ${appointment.appointmentStatus}
                                      `; 
      getAppointmentsByDentistUserNameResult.appendChild(appointmentDetails);
      });
    } else {
      getAppointmentsByDentistUserNameResult.innerHTML = data.message;
    }
  } catch(error) {
        console.error('Có lỗi xảy ra:', error);
  };     
}

async function getAppointment(getAppointmentPatientPhoneNumber, getAppointmentDate, getAppointmentTime, getAppointmentClinicName) {
  const getAppointmentResult = document.getElementById('getAppointmentResult');
  try {
     const response = await fetch('http://localhost:3000/getAppointment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({getAppointmentPatientPhoneNumber, getAppointmentDate, getAppointmentTime, getAppointmentClinicName})
    })
    const data = await response.json();
    if (response.status === 200) {            
      getAppointmentResult.innerHTML = ''; 
      const date = new Date(data.appointmentDate);
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
      const time = new Date(data.appointmentTime); 
      const formattedTime = `${time.getUTCHours().toString().padStart(2, '0')}:${time.getUTCMinutes().toString().padStart(2, '0')}`;
      getAppointmentResult.innerHTML = `
                                      <p>APPOINTMENT INFO:</p>
                                      <p>Appointment Id: ${data.appointmentId}</p>
                                      <p>Phone number: ${data.patientPhoneNumber}</p>
                                      <p>Full name: ${data.patientFullName}</p> 
                                      <p>Date: ${formattedDate}</p>
                                      <p>Time: ${formattedTime}</p>
                                      <p>Clinic: ${data.clinicName}</p>
                                      <p>Dentist: ${data.dentistFullName}</p>
                                      <p>Note: ${data.note}</p>
                                      <p>Status: ${data.appointmentStatus}</p>
                                      `; 
    } else {
      getAppointmentResult.innerHTML = data.message;
    }
  } catch(error) {
        console.error('Có lỗi xảy ra:', error);
  };     
}

async function addAppointment(addAppointmentPatientPhoneNumber, addAppointmentPatientFullName, addAppointmentPatientEmail, 
  addAppointmentPatientAddress, addAppointmentPatientAge, addAppointmentPatientGender, addAppointmentDate, 
  addAppointmentTime, addAppointmentClinicName, addAppointmentDentistUserName) {
    const addAppointmentResult = document.getElementById('addAppointmentResult');
    try {
       const response = await fetch('http://localhost:3000/addAppointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({addAppointmentPatientPhoneNumber, addAppointmentPatientFullName, addAppointmentPatientEmail, 
          addAppointmentPatientAddress, addAppointmentPatientAge, addAppointmentPatientGender, addAppointmentDate, 
          addAppointmentTime, addAppointmentClinicName, addAppointmentDentistUserName})
      })
      const data = await response.json();
      if (response.status === 200) {
        addAppointmentResult.innerHTML = data.message;
      } else if (response.status === 401){
        const date = new Date(data.appointmentDate);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
        const time = new Date(data.appointmentTime); 
        const formattedTime = `${time.getUTCHours().toString().padStart(2, '0')}:${time.getUTCMinutes().toString().padStart(2, '0')}`;
        addAppointmentResult.innerHTML = `  
                                          <h3>Đã có lịch hẹn vào thời gian này:</h3>
                                          <p>Appointment Id: ${data.appointmentId}</p>
                                          <p>Phone number: ${data.patientPhoneNumber}</p>
                                          <p>Full name: ${data.patientFullName}</p> 
                                          <p>Date: ${formattedDate}</p>
                                          <p>Time: ${formattedTime}</p>
                                          <p>Clinic: ${data.clinicName}</p>
                                          <p>Dentist: ${data.dentistFullName}</p>
                                          <p>Note: ${data.note}</p>
                                          <p>Status: ${data.appointmentStatus}</p>
                                          `;
      } else if (response.status === 500) {
        addAppointmentResult.innerHTML = data.message;
      }
    } catch(error) {
          console.error('Có lỗi xảy ra:', error);
    };     
}

async function findAppointment(findAppointmentId) {
  const updateAppointmentResult = document.getElementById('updateAppointmentResult');
  try {
     const response = await fetch('http://localhost:3000/findAppointment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({findAppointmentId})
    })
    const data = await response.json();
    if (response.status === 200) {            
      updateAppointmentResult.innerHTML = data.message; 
    } else {
      updateAppointmentResult.innerHTML = data.message;
    }
  } catch(error) {
        console.error('Có lỗi xảy ra:', error);
  };     
}

async function updateAppointment(updateAppointmentId, updateAppointmentDate, updateAppointmentTime, updateAppointmentClinicName, updateAppointmentDentistUserName) {
    const updateAppointmentResult = document.getElementById('updateAppointmentResult');
    try {
       const response = await fetch('http://localhost:3000/addAppointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({updateAppointmentId, updateAppointmentDate, updateAppointmentTime, updateAppointmentClinicName, updateAppointmentDentistUserName})
      })
      const data = await response.json();
      if (response.status === 200) {
        updateAppointmentResult.textContent = data.message;
      } else if (response.status === 404 ) {
          updateAppointmentResult.textContent = data.message;
      } else if (response.status === 500) {
          updateAppointmentResult.textContent = data.message;
      }
    } catch(error) {
          console.error('Có lỗi xảy ra:', error);
    };     
}

async function deleteAppointment(deleteAppointmentId) {
  const deleteAppointmentResult = document.getElementById('deleteAppointmentResult');
  try {
      const response = await fetch(`http://localhost:3000/deleteAppointment/${deleteAppointmentId}`, {
      method: 'DELETE',
      })
      const data = await response.json();
      if (response.status === 200) {
        deleteAppointmentResult.textContent = data.message;
      } else if (response.status === 404 ) {
          deleteAppointmentResult.textContent = data.message;
      } else if (response.status === 500) {
          deleteAppointmentResult.textContent = data.message;
      }
  } catch (error) {
      console.error('Có lỗi xảy ra:', error);
  }
}

async function getReceiptInfo(patientPhoneNumber) {
  try {
      const response = await fetch('http://localhost:3000/getReceiptInfo', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ patientPhoneNumber }) 
      })
      const data = await response.json();
      const getReceiptInfoResult = document.getElementById('getReceiptInfoResult');
      getReceiptInfoResult.innerHTML = '';

      if (response.status === 200) {         
        const patientDiv = document.createElement('div');
        patientDiv.textContent = 'PAYMENT INFOMATION';
        patientDiv.classList.add('patient-info');

        const patientGeneralInfoParagraph = document.createElement('p');
        patientGeneralInfoParagraph.textContent = `Patient phone number: ${data.patientInfo.patientPhoneNumber}`;
        patientDiv.appendChild(patientGeneralInfoParagraph);
        getReceiptInfoResult.appendChild(patientDiv);

        var totalAmount = 0;
        var totalTreatmentsPrice = 0;
        var totalToothsFacePrice = 0;
        var totalDrugsPrice = 0;
        for (let i = 0; i < data.medicalRecordsInfo.length; i++) {
            const medicalRecordDiv = document.createElement('div');
            medicalRecordDiv.textContent = `Medical record ${i+1} (Id: ${data.medicalRecordsInfo[i].medicalRecordId}):`;
            medicalRecordDiv.classList.add('medical-record');

            for (let j = 0; j < data.medicalRecordsInfo[i].treatmentPlans.length; j++) {
                const treatmentPlanDiv = document.createElement('div');
                treatmentPlanDiv.textContent = `Treatment plan ${j+1} (Id: ${data.medicalRecordsInfo[i].treatmentPlans[j].treatmentPlanId}):`;
                treatmentPlanDiv.classList.add('treatment-plan');

                const treatmentPlanInfoParagraph = document.createElement('p');
                treatmentPlanInfoParagraph.textContent = `Treatment: ${data.medicalRecordsInfo[i].treatmentPlans[j].treatmentName}  -  Price: ${data.medicalRecordsInfo[i].treatmentPlans[j].price}$`;
                totalTreatmentsPrice += parseInt(data.medicalRecordsInfo[i].treatmentPlans[j].price);

                treatmentPlanDiv.appendChild(treatmentPlanInfoParagraph);

                for (let k = 0; k < data.medicalRecordsInfo[i].treatmentPlans[j].teeth.length; k++) {
                    const toothInfoParagraph = document.createElement('p');
                    toothInfoParagraph.textContent = `Tooth: ${data.medicalRecordsInfo[i].treatmentPlans[j].teeth[k].toothId}  -  Face: ${data.medicalRecordsInfo[i].treatmentPlans[j].teeth[k].toothFaceName}  -  Price: ${data.medicalRecordsInfo[i].treatmentPlans[j].teeth[k].price}$`;
                    totalToothsFacePrice += parseInt(data.medicalRecordsInfo[i].treatmentPlans[j].teeth[k].price);

                    treatmentPlanDiv.appendChild(toothInfoParagraph);
                }            
                for (let k = 0; k < data.medicalRecordsInfo[i].treatmentPlans[j].drugs.length; k++) {
                    const drugInfoParagraph = document.createElement('p');
                    drugInfoParagraph.textContent = `Drug: ${data.medicalRecordsInfo[i].treatmentPlans[j].drugs[k].drugName}  -  Price: ${data.medicalRecordsInfo[i].treatmentPlans[j].drugs[k].price}$  -  Quantity: ${data.medicalRecordsInfo[i].treatmentPlans[j].drugs[k].quantity}`;
                    totalDrugsPrice += parseInt(data.medicalRecordsInfo[i].treatmentPlans[j].drugs[k].price) * parseInt(data.medicalRecordsInfo[i].treatmentPlans[j].drugs[k].quantity);

                    treatmentPlanDiv.appendChild(drugInfoParagraph);
                }      
                
                totalAmount = totalTreatmentsPrice + totalToothsFacePrice + totalDrugsPrice;
                medicalRecordDiv.appendChild(treatmentPlanDiv);
            }
            getReceiptInfoResult.appendChild(medicalRecordDiv);

            const receiptDiv = document.createElement('div');
            receiptDiv.textContent = `Payment information of medical record ${data.medicalRecordsInfo[i].medicalRecordId}:`;
            receiptDiv.classList.add('receipt');

            const treatmentPriceParagraph = document.createElement('p');
            treatmentPriceParagraph.textContent = `Total treatments price: ${totalTreatmentsPrice}$`;
            const toothPriceParagraph = document.createElement('p');
            toothPriceParagraph.textContent = `Total tooths price: ${totalToothsFacePrice}$`;
            const drugPriceParagraph = document.createElement('p');
            drugPriceParagraph.textContent = `Total drugs price: ${totalDrugsPrice}$`;
            const receiptPriceParagraph = document.createElement('p');
            receiptPriceParagraph.textContent = `Total amount: ${totalAmount}$`;

            receiptDiv.appendChild(treatmentPriceParagraph);
            receiptDiv.appendChild(toothPriceParagraph);
            receiptDiv.appendChild(drugPriceParagraph);
            receiptDiv.appendChild(receiptPriceParagraph);
            getReceiptInfoResult.appendChild(receiptDiv);

            // nếu có thông tin hóa đơn
            if (data.receiptsInfo[i]) {
              const receiptInfoParagraph = document.createElement('p');
              receiptInfoParagraph.textContent = `Receipt Id: ${data.receiptsInfo[i].receiptId}  -  Total amount: ${data.receiptsInfo[i].totalAmount}  -  Total paid amount: ${data.receiptsInfo[i].totalPaidAmount}  -  Change amount: ${data.receiptsInfo[i].changeAmount}  -  Status: ${data.receiptsInfo[i].paymentStatus}`;
              receiptDiv.appendChild(receiptInfoParagraph);
              getReceiptInfoResult.appendChild(receiptDiv);

              for (let j = 0; j < data.receiptsInfo[i].payments.length; j++) {
                const paymentReceiptDiv = document.createElement('div');
                paymentReceiptDiv.classList.add('payment-receipt');

                const paymentReceiptInfo = document.createElement('p');
                paymentReceiptInfo.textContent = `Payment details ${j + 1}:`;
                const paymentDate = new Date(data.receiptsInfo[i].payments[j].paymentDate);
                const formattedPaymentDate = `${paymentDate.getDate().toString().padStart(2, '0')}/${(paymentDate.getMonth() + 1).toString().padStart(2, '0')}/${paymentDate.getFullYear()}`;
                const paymentTime = new Date(data.receiptsInfo[i].payments[j].paymentTime);
                const formattedPaymentTime = `${paymentTime.getUTCHours().toString().padStart(2, '0')}:${paymentTime.getUTCMinutes().toString().padStart(2, '0')}:${paymentTime.getUTCSeconds().toString().padStart(2, '0')}`;
                const paymentReceiptInfoParagraph = document.createElement('p');
                paymentReceiptInfoParagraph.textContent = `Payment date: ${formattedPaymentDate}  -  Payment time: ${formattedPaymentTime}  -  Staff full name: ${data.receiptsInfo[i].payments[j].staffFullName}  -  Paid amount: ${data.receiptsInfo[i].payments[j].paidAmount} - Payment type: ${data.receiptsInfo[i].payments[j].paymentType}`;

                paymentReceiptDiv.appendChild(paymentReceiptInfoParagraph);
                receiptDiv.appendChild(paymentReceiptDiv);
                getReceiptInfoResult.appendChild(receiptDiv);
              }  
            }

            // nếu có hóa đơn và chưa thanh toán xong     hoặc    chưa có hóa đơn
            if ((data.receiptsInfo[i] && (data.receiptsInfo[i].totalAmount > data.receiptsInfo[i].totalPaidAmount)) || (!data.receiptsInfo[i])) {
              const paymentForm = document.createElement('form');
              paymentForm.classList.add('payment-form');

              const paymentInput = document.createElement('input');
              paymentInput.setAttribute('type', 'number');
              paymentInput.setAttribute('placeholder', 'Payment amount');
              paymentInput.classList.add('payment-amount');

              const paymentTypeSelect = document.createElement('select');
              paymentTypeSelect.classList.add('payment-method');

              const cashOption = document.createElement('option');
              cashOption.value = 'cash';
              cashOption.textContent = 'Cash';

              const onlineOption = document.createElement('option');
              onlineOption.value = 'online';
              onlineOption.textContent = 'Online';

              paymentTypeSelect.appendChild(cashOption);
              paymentTypeSelect.appendChild(onlineOption);

              const payButton = document.createElement('button');
              payButton.setAttribute('id', `payButton_${data.medicalRecordsInfo[i].medicalRecordId}_${totalAmount}`);
              payButton.textContent = 'Pay';
              payButton.addEventListener('click', async function(event) {
                  event.preventDefault();
                  const paymentAmount = parseInt(paymentInput.value);
                  const paymentType = paymentTypeSelect.value;
                  const staffUserName = sessionStorage.getItem('loggedInUser');
                  if (paymentAmount && paymentAmount !== 0) {
                    const currentDate = new Date();
                    const formattedDate = currentDate.toISOString().split('T')[0]; // Lấy ngày tháng
                    const formattedTime = currentDate.toTimeString().split(' ')[0]; // Lấy giờ
                    const receiptPriceId = payButton.getAttribute('id');
                    const receiptInfo = receiptPriceId.split('_'); // Chia chuỗi ID thành mảng
                    const medicalRecordId = receiptInfo[1];
                    const totalAmount = receiptInfo[2];
                    let paidAmount = paymentAmount;
                    const response = await fetch('http://localhost:3000/payReceipt', {
                          method: 'POST',
                          headers: {
                              'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({ medicalRecordId, totalAmount, formattedDate, formattedTime, staffUserName, paidAmount, paymentType,   }) 
                    });
                      const data = await response.json();
                      if (response.status === 200) {
                        // Lấy thông tin cập nhật từ phản hồi
                        const { receiptId, totalPaidAmount, changeAmount, paymentStatus } = data;
                        console.log('data: ' + data);
                    
                        const updatedReceiptDiv = document.createElement('div');
                        updatedReceiptDiv.classList.add('updated-receipt');
                    
                        const updatedReceiptInfoParagraph = document.createElement('p');
                        updatedReceiptInfoParagraph.textContent = `Receipt Id: ${receiptId} -  Total paid amount: ${totalPaidAmount}$  -  Change amount: ${changeAmount}$  -  Status: ${paymentStatus}`;
                        
                        updatedReceiptDiv.appendChild(updatedReceiptInfoParagraph);
                    
                        // Hiển thị thông tin cập nhật cho người dùng
                        getReceiptInfoResult.appendChild(updatedReceiptDiv);
                      } else {
                          // Xử lý trường hợp không thành công khi thanh toán
                          getReceiptInfoResult.innerHTML = data.message;
                      }

                  } else {
                    alert('Please provide payment amount');
                  }
              });

              paymentForm.appendChild(paymentInput);
              paymentForm.appendChild(paymentTypeSelect);
              paymentForm.appendChild(payButton);
              receiptDiv.appendChild(paymentForm);

              getReceiptInfoResult.appendChild(receiptDiv);
            }

            totalTreatmentsPrice = 0;
            totalToothsFacePrice = 0;
            totalDrugsPrice = 0;
            totalAmount = 0;

        }
      } else {
        getReceiptInfoResult.innerHTML = data.message;
      }
  } catch (error) {
      console.error('Error when payment receipt', error);
  };
}

module.exports = { restoreInitialTPDisplayState, restoreInitialMRDisplayState, resetTPForm, resetMRForm };
module.exports = { displayDentistsForAddAppointment, displayDentistsForUpdateAppointment, displayDentistsForMedical};
module.exports = { getAppointmentsByPatientPhoneNumber, getAppointmentsByClinicName, getAppointmentsByDentistUserName};
module.exports = { getAppointment, addAppointment, findAppointment, updateAppointment, deleteAppointment};
module.exports = { addTreatmentPlan, displayMedicalRecordInfo, addPatientMedicalRecord, getColorByStatus, getPatientMedicalRecordInfo, 
                  searchTooth, searchDrug, searchDrugContraindication, addTooth, addDrug, addDrugContraindication};
module.exports = { getReceiptInfo };
module.exports = { selectedTreatmentPlansDate, selectedTreatmentPlansTime, selectedTreatmentPlansClinicName, selectedTreatmentPlansDentistUserName, selectedTreatmentPlansDentistFullName, 
                  selectedTreatmentPlansTreatmentId, selectedTreatmentPlansTreatmentName, selectedTreatmentPlansDescription, selectedTreatmentPlansNote,
                  selectedTreatmentPlansToothsId, selectedTreatmentPlansToothsFaceName, selectedTreatmentPlansDrugsId, selectedTreatmentPlansDrugsName, 
                  selectedTreatmentPlansDrugsQuantity, selectedTreatmentPlansDrugsContraindicationId, selectedTreatmentPlansDrugsContraindicationName};
  

module.exports = { getAllPatientsInfo, getPatientInfo, updatePatientInfo, addPatientInfo, deletePatientInfo};
module.exports = { getDentistsWorkScheduleInfo, getWeekNumber };
