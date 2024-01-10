window.onload = function() {
    if ((!sessionStorage.getItem('loggedInUser')) || (sessionStorage.getItem('accountType') !== 'Admin')) {
        window.location.href = 'login.html'; // Chuyển hướng về trang đăng nhập
    }
};

// staff
async function getAllStaffsInfo() {
    const allStaffsInfo = document.getElementById('allStaffsInfo');
    try {
        const response = await fetch('http://localhost:3000/getAllStaffsInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        if (response.status === 200) {            
            allStaffsInfo.innerHTML = ''; 

      const staffsTable = document.createElement('table');
      staffsTable.setAttribute('id', 'Table')

      // Create table header
      const headerRow = document.createElement('tr');
      headerRow.innerHTML = `
        <th>Staff User Name</th>
        <th>Password</th>
        <th>Staff Name</th>`;

        staffsTable.appendChild(headerRow);
        
        data.forEach(staff => {
          // Create a new row for each staff
          const row = document.createElement('tr');
          row.innerHTML = `
      <td>${staff.staffUserName}</td>
      <td>${staff.staffPassword}</td>
      <td>${staff.staffFullName}</td>
    `;
  
          // Append the row to the table
          staffsTable.appendChild(row);
        });
        allStaffsInfo.appendChild(staffsTable)
      } else {
  
        allStaffsInfo.innerHTML = data.message;
      }
    } catch (error)  {
        console.error('Có lỗi xảy ra khi lấy thông tin nhân viên', error);
        allStaffsInfo.innerHTML = data.message;
    };
}

async function getStaffInfo(staffUserName) {
    const staffInfo = document.getElementById('getStaffInfo');
    try {
        const response = await fetch('http://localhost:3000/getStaffInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ staffUserName }) 
        })
        const data = await response.json();
        if (response.status === 200) {  
            staffInfo.innerHTML = ` <h3>Staff information</h3>
                                    <p>Staff username: ${data.staffUserName}</p>
                                    <p>Staff password: ${data.staffPassword}</p>
                                    <p>Staff name: ${data.staffFullName}</p>`;
        } else {
            staffInfo.innerHTML = data.message;
        }
    } catch (error) {
        staffInfo.innerHTML = data.message;
        console.error('Có lỗi xảy ra khi lấy thông tin nhân viên', error);
    };
}
  
async function updateStaffInfo() {
    const staffUpdateResult = document.getElementById('staffUpdateResult');
    const enterStaffUserName = document.getElementById('enterStaffUserName').value;
    const updateStaffUserName = document.getElementById('updateStaffUserName').value;
    const staffPassword = document.getElementById('updateStaffPassword').value;
    const staffFullName = document.getElementById('updateStaffFullName').value;
    try {
        const response = await fetch('http://localhost:3000/updateStaffInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ enterStaffUserName, updateStaffUserName, staffPassword, staffFullName })
        })
        const data = await response.json();
        if (response.status === 200) {
            staffUpdateResult.textContent = data.message;
        } else if (response.status === 404 ) {
            staffUpdateResult.textContent = data.message;
        } else if (response.status === 500) {
            staffUpdateResult.textContent = data.message;
        }
    } catch (error) {
        console.error('Có lỗi xảy ra:', error);
    };
}

async function addStaffInfo( staffUserName, staffPassword, staffFullName) {
    const staffAddResult = document.getElementById('staffAddResult');
    try {
        const response = await fetch('http://localhost:3000/addStaffInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ staffUserName, staffPassword, staffFullName })
        })
        const data = await response.json();
        if (response.status === 200) {
            staffAddResult.textContent = data.message;
        } else if (response.status === 500) {
            staffAddResult.textContent = data.message;
        }    
    } catch (error) {
        staffAddResult.textContent = data.message;
        console.error('Có lỗi xảy ra:', error);
    }  
}

async function deleteStaffInfo() {
    const staffDeleteResult = document.getElementById('staffDeleteResult');
    const staffUserName = document.getElementById('deleteStaffUserName').value;
    try {
        const response = await fetch(`http://localhost:3000/deleteStaffInfo/${staffUserName}`, {
        method: 'DELETE',
        })
        const data = await response.json();
        if (response.status === 200) {
            staffDeleteResult.textContent = data.message;
        } else if (response.status === 404) {
            staffDeleteResult.textContent = data.message;
        } else if (response.status === 500) {
            staffDeleteResult.textContent = data.message;
        }
    } catch(error) {
        console.error('Có lỗi xảy ra:', error);
    }
}

//dentist
async function getAllDentistsInfo() {
    const allDentistsInfo = document.getElementById('allDentistsInfo');
    try {
        const response = await fetch('http://localhost:3000/getAllDentistsInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        if (response.status === 200) {            
            allDentistsInfo.innerHTML = ''; 
             

      const dentistsTable = document.createElement('table');
      dentistsTable.setAttribute('id', 'Table')

      // Create table header
      const headerRow = document.createElement('tr');
      headerRow.innerHTML = `
        <th>Dentist User Name</th>
        <th>Password</th>
        <th>Dentist Name</th>`;

        dentistsTable.appendChild(headerRow);
        
        data.forEach(staff => {
          // Create a new row for each dentist
          const row = document.createElement('tr');
          row.innerHTML = `
      <td>${staff.dentistUserName}</td>
      <td>${staff.dentistPassword}</td>
      <td>${staff.dentistFullName}</td>
    `;
  
          // Append the row to the table
          dentistsTable.appendChild(row);
        });
        allDentistsInfo.appendChild(dentistsTable)
      } else {
  
        allDentistsInfo.innerHTML = data.message;
      }
    } catch (error)  {
        console.error('Có lỗi xảy ra khi lấy thông tin nhân viên', error);
        allDentistsInfo.innerHTML = data.message;
    };
}

async function getDentistInfo(dentistUserName) {
    const dentistInfo = document.getElementById('getDentistInfo');
    try {
        const response = await fetch('http://localhost:3000/getDentistInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ dentistUserName }) 
        })
        const data = await response.json();
        if (response.status === 200) {  
            dentistInfo.innerHTML = `  
                                    <h3>Dentist information</h3>
                                    <p>Dentist username: ${data.dentistUserName}</p>
                                    <p>Dentist password: ${data.dentistPassword}</p>
                                    <p>Dentist name: ${data.dentistFullName}</p>
                                    `;
        } else {
            dentistInfo.innerHTML = data.message;
        }
    } catch (error) {
        dentistInfo.innerHTML = data.message;
        console.error('Có lỗi xảy ra khi lấy thông tin nha sĩ', error);
    };
}
  
async function updateDentistInfo() {
    const dentistUpdateResult = document.getElementById('dentistUpdateResult');
    const enterDentistUserName = document.getElementById('enterDentistUserName').value;
    const updateDentistUserName = document.getElementById('updateDentistUserName').value;
    const dentistPassword = document.getElementById('updateDentistPassword').value;    
    const dentistFullName = document.getElementById('updateDentistFullName').value;
    try {
        const response = await fetch('http://localhost:3000/updateDentistInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ enterDentistUserName, updateDentistUserName, dentistPassword, dentistFullName })
        })
        const data = await response.json();
        if (response.status === 200) {
            dentistUpdateResult.textContent = data.message;
        } else if (response.status === 404 ) {
            dentistUpdateResult.textContent = data.message;
        } else if (response.status === 500) {
            dentistUpdateResult.textContent = data.message;
        }
    } catch (error) {
        console.error('Có lỗi xảy ra:', error);
    };
}

async function addDentistInfo(dentistUserName, dentistPassword, dentistFullName ) {
    const dentistAddResult = document.getElementById('dentistAddResult');
    try {
        const response = await fetch('http://localhost:3000/addDentistInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ dentistUserName, dentistPassword, dentistFullName })
        })
        const data = await response.json();
        if (response.status === 200) {
            dentistAddResult.textContent = data.message;
        } else if (response.status === 500) {
            dentistAddResult.textContent = data.message;
        }    
    } catch (error) {
        dentistAddResult.textContent = data.message;
        console.error('Có lỗi xảy ra:', error);
    }  
}

async function deleteDentistInfo() {
    const dentistDeleteResult = document.getElementById('dentistDeleteResult');
    const dentistUserName = document.getElementById('deleteDentistUserName').value;
    try {
        const response = await fetch(`http://localhost:3000/deleteDentistInfo/${dentistUserName}`, {
        method: 'DELETE',
        })
        const data = await response.json();
        if (response.status === 200) {
            dentistDeleteResult.textContent = data.message;
        } else if (response.status === 404) {
            dentistDeleteResult.textContent = data.message;
        } else if (response.status === 500) {
            dentistDeleteResult.textContent = data.message;
        }
    } catch(error) {
        console.error('Có lỗi xảy ra:', error);
    }
}

//drug
async function getAllDrugsInfo() {
    const allDrugsInfo = document.getElementById('allDrugsInfo');
    try {
        const response = await fetch('http://localhost:3000/getAllDrugsInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        if (response.status === 200) {            
            allDrugsInfo.innerHTML = ''; 
            const drugsTable = document.createElement('table');
            drugsTable.setAttribute('id', 'Table')
      
            // Create table header
            const headerRow = document.createElement('tr');
            headerRow.innerHTML = `
              <th>Drug ID</th>
              <th>Drug Name</th>
              <th>Indication</th>
              <th>Stock Number</th>
              <th>Price</th>`;
      
              drugsTable.appendChild(headerRow);
              
              data.forEach(staff => {
                // Create a new row for each staff
                const row = document.createElement('tr');
                row.innerHTML = `
            <td>${staff.drugId}</td>
            <td>${staff.drugName}</td>
            <td>${staff.indication}</td>
            <td>${staff.stockNumber}</td>
            <td>${staff.price + "$"}</td>
          `;
        
                // Append the row to the table
                drugsTable.appendChild(row);
              });
              allDrugsInfo.appendChild(drugsTable)
            } else {
        
              allDrugsInfo.innerHTML = data.message;
            }
          } catch (error)  {
              console.error('Có lỗi xảy ra khi lấy thông tin drug', error);
              allDrugsInfo.innerHTML = data.message;
          };
}

async function getDrugInfo(drugName) {
    const drugInfo = document.getElementById('getDrugInfo');
    try {
        const response = await fetch('http://localhost:3000/getDrugInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ drugName }) 
        })
        const data = await response.json();
        if (response.status === 200) {  
            drugInfo.innerHTML = `  
                                    <h3>Drug information</h3>
                                    <p>Drug Id: ${data.drugId}</p>
                                    <p>Drug name: ${data.drugName}</p>
                                    <p>Indication: ${data.indication}</p>
                                    <p>Stock number: ${data.stockNumber}</p>
                                    <p>Price: ${data.price}$</p>`;
        } else {
            drugInfo.innerHTML = data.message;
        }
    } catch (error) {
        drugInfo.innerHTML = data.message;
        console.error('Có lỗi xảy ra khi lấy thông tin thuốc', error);
    };
}
  
async function updateDrugInfo() {
    const drugUpdateResult = document.getElementById('drugUpdateResult');
    const enterDrugName = document.getElementById('enterDrugName').value;
    const drugName = document.getElementById('updateDrugName').value;
    const indication = document.getElementById('updateIndication').value;
    const stockNumber = document.getElementById('updateStockNumber').value;
    const price = document.getElementById('updatePrice').value;
    try {
        const response = await fetch('http://localhost:3000/updateDrugInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ enterDrugName, drugName, indication, stockNumber, price})
        })
        const data = await response.json();
        if (response.status === 200) {
            drugUpdateResult.textContent = data.message;
        } else if (response.status === 404 ) {
            drugUpdateResult.textContent = data.message;
        } else if (response.status === 500) {
            drugUpdateResult.textContent = data.message;
        }
    } catch (error) {
        console.error('Có lỗi xảy ra', error);
    };
}

async function addDrugInfo(drugName, indication, stockNumber, price) {
    const drugAddResult = document.getElementById('drugAddResult');
    try {
        const response = await fetch('http://localhost:3000/addDrugInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ drugName, indication, stockNumber, price})
        })
        const data = await response.json();
        if (response.status === 200) {
            drugAddResult.textContent = data.message;
        } else if (response.status === 500) {
            drugAddResult.textContent = data.message;
        }    
    } catch (error) {
        drugAddResult.textContent = data.message;
        console.error('Có lỗi xảy ra', error);
    }  
}

async function deleteDrugInfo() {
    const drugDeleteResult = document.getElementById('drugDeleteResult');
    const drugName = document.getElementById('deleteDrugName').value;
    try {
        const response = await fetch(`http://localhost:3000/deleteDrugInfo/${drugName}`, {
        method: 'DELETE',
        })
        const data = await response.json();
        if (response.status === 200) {
            drugDeleteResult.textContent = data.message;
        } else if (response.status === 404) {
            drugDeleteResult.textContent = data.message;
        } else if (response.status === 500) {
            drugDeleteResult.textContent = data.message;
        }
    } catch(error) {
        console.error('Có lỗi xảy ra', error);
    }
}

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  
  function closeModal() {
    document.getElementById("myModal").style.display = "none";
  }

module.exports = { getAllStaffsInfo, getStaffInfo, updateStaffInfo, addStaffInfo, deleteStaffInfo };
module.exports = { getAllDentistsInfo, getDentistInfo, updateDentistInfo, addDentistInfo, deleteDentistInfo };
module.exports = { getAllDrugsInfo, getDrugInfo, updateDrugInfo, addDrugInfo, deleteDrugInfo };
