const initialTPDisplayState = {};
const initialMRDisplayState = {};

window.onload = function () {
    if ((!sessionStorage.getItem('loggedInUser')) || (sessionStorage.getItem('accountType') !== 'Dentist')) {
        window.location.href = 'login.html';
    }

    const hiddenTPElements = document.querySelectorAll('.hiddenForAddTreatmentPlan');
    hiddenTPElements.forEach(element => {
        initialTPDisplayState[element.id] = window.getComputedStyle(element).display;
    });

    const hiddenMRElements = document.querySelectorAll('.hiddenForAddMedicalRecord');
    hiddenMRElements.forEach(element => {
        initialMRDisplayState[element.id] = window.getComputedStyle(element).display;
    });

};

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

async function displayDentistsForMedical(date, time, clinicName) {
    try {
        const response = await fetch('http://localhost:3000/displayAvailableDentists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ date, time, clinicName })
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
    } catch (error) {
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
        setTimeout(`addToothResult.innerHTML = ''`, 3001);
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
        setTimeout(`addToothResult.innerHTML = ''`, 3001);
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
            setTimeout(`addDrugResult.innerHTML = ''`, 3001);
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
            setTimeout(`addDrugResult.innerHTML = ''`, 3001);
            setTimeout(`addDrugResult.style.display = 'block'`, 3002);
        }
    } else {
        document.getElementById(`addDrug`).innerHTML = '';
        addDrugResult.innerHTML = '';
        addDrugResult.innerHTML = `Đã có thuốc hoặc đã chống chỉ chỉ định thuốc ${drugName} trong liệu trình`;
        setTimeout(`addDrugResult.style.display = 'none'`, 3000);
        setTimeout(`addDrugResult.innerHTML = ''`, 3001);
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
    description, note, toothsId, toothsFaceName, drugsId, drugsName, drugsQuantity, drugsContraindicationId, drugsContraindicationName) {

    let exists = selectedTreatmentPlansDate.some((date, index) =>
        date === treatmentPlanDate &&
        selectedTreatmentPlansClinicName[index] === clinicName &&

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
        treatmentPlanAddResult.innerHTML = 'Đã tồn tại kế hoạch điều trị';
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
    generalMedicalInfoParagraph.textContent = `Patient phone number: ${patientPhoneNumber} - Examination Date: ${examinationDate} - ExaminationTime: ${examinationTime} - Oral Health: ${oralHealth} - Allergies: ${allergies}`;
    medicalRecordDiv.appendChild(generalMedicalInfoParagraph);

    for (let i = 0; i < treatmentPlansDate.length; i++) {
        const treatmentPlanDiv = document.createElement('div');
        treatmentPlanDiv.classList.add('treatment-plan');

        const treatmentPlanInfo = document.createElement('p');
        treatmentPlanInfo.textContent = `Treatment plan ${i + 1}:`;
        const generalTreatmentPlanInfoParagraph = document.createElement('p');
        generalTreatmentPlanInfoParagraph.textContent = `Date: ${treatmentPlansDate[i]} - Time: ${treatmentPlansTime[i]} - Clinic: ${treatmentPlansClinicName[i]} - Dentist: ${treatmentPlansDentistFullName[i]} - Treatment: ${treatmentPlansTreatmentName[i]} - Description: ${treatmentPlansDescription[i]} - Note: ${treatmentPlansNote[i]} - Status: 'Plan'`;

        treatmentPlanDiv.appendChild(treatmentPlanInfo);
        treatmentPlanDiv.appendChild(generalTreatmentPlanInfoParagraph);

        for (let j = 0; j < treatmentPlansToothsId[i].length; j++) {
            const toothInfoParagraph = document.createElement('p');
            toothInfoParagraph.textContent = `Tooth: ${treatmentPlansToothsId[i][j]} - Face: ${treatmentPlansToothsFaceName[i][j]}`;
            treatmentPlanDiv.appendChild(toothInfoParagraph);
        }

        for (let j = 0; j < treatmentPlansDrugsName[i].length; j++) {
            const drugInfoParagraph = document.createElement('p');
            drugInfoParagraph.textContent = `Drug: ${treatmentPlansDrugsName[i][j]} - Quantity: ${treatmentPlansDrugsQuantity[i][j]}`;
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
    treatmentPlansToothsId, treatmentPlansToothsFaceName, treatmentPlansDrugsId, treatmentPlansDrugsName, treatmentPlansDrugsQuantity, treatmentPlansDrugsContraindicationId) {
    // const totalAmount = await calculateTotalAmount(treatmentPlansTreatmentId, treatmentPlansToothsFaceName, treatmentPlansDrugsName, treatmentPlansDrugsQuantity);

    try {
        const response = await fetch('http://localhost:3000/addPatientMedicalRecord', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                patientPhoneNumber, examinationDate, examinationTime, oralHealth, allergies,
                treatmentPlansDate, treatmentPlansTime, treatmentPlansClinicName, treatmentPlansDentistUserName, treatmentPlansTreatmentId, treatmentPlansDescription, treatmentPlansNote,
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

async function getPatientMedicalRecordInfo(patientPhoneNumber) {
    try {
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
            const patientDiv = document.createElement('div');
            patientDiv.textContent = 'PATIENT MEDICAL RECORDS AND PAYMENT INFOMATION';
            patientDiv.classList.add('patient-info');

            const patientGeneralInfoParagraph = document.createElement('p');
            patientGeneralInfoParagraph.textContent = `Full name: ${data.patientInfo.patientFullName} - Age: ${data.patientInfo.patientAge} - Gender: ${data.patientInfo.patientGender}`;
            patientDiv.appendChild(patientGeneralInfoParagraph);

            getPatientMedicalRecordInfoResult.appendChild(patientDiv);

            for (let i = 0; i < data.medicalRecordsInfo.length; i++) {
                const medicalRecordDiv = document.createElement('div');
                medicalRecordDiv.textContent = `Medical record Id: ${data.medicalRecordsInfo[i].medicalRecordId}`;
                medicalRecordDiv.classList.add('medical-record');

                const medicalRecordGeneralInfoParagraph = document.createElement('p');
                const examDate = new Date(data.medicalRecordsInfo[i].examinationDate);
                const formattedExamDate = `${examDate.getDate().toString().padStart(2, '0')}/${(examDate.getMonth() + 1).toString().padStart(2, '0')}/${examDate.getFullYear()}`;
                const examTime = new Date(data.medicalRecordsInfo[i].examinationTime);
                const formattedExamTime = `${examTime.getUTCHours().toString().padStart(2, '0')}:${examTime.getUTCMinutes().toString().padStart(2, '0')}`;
                medicalRecordGeneralInfoParagraph.textContent = `Examination date: ${formattedExamDate} - Examination time: ${formattedExamTime} - Oral health: ${data.medicalRecordsInfo[i].oralHealth} - Allergies: ${data.medicalRecordsInfo[i].allergies}`;
                medicalRecordDiv.appendChild(medicalRecordGeneralInfoParagraph);

                for (let j = 0; j < data.treatmentPlansDate.length; j++) {
                    const treatmentPlanDiv = document.createElement('div');
                    treatmentPlanDiv.textContent = `Treatment plan ${j + 1} ( Id: ${data.treatmentPlansId[j]} ):`;
                    treatmentPlanDiv.classList.add('treatment-plan');

                    const date = new Date(data.treatmentPlansDate[j]);
                    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
                    const time = new Date(data.treatmentPlansTime[j]);
                    const formattedTime = `${time.getUTCHours().toString().padStart(2, '0')}:${time.getUTCMinutes().toString().padStart(2, '0')}`;
                    const generalTreatmentPlanInfoParagraph = document.createElement('p');
                    generalTreatmentPlanInfoParagraph.textContent = `Date: ${formattedDate} - Time: ${formattedTime} - Clinic: ${data.treatmentPlansClinicName[i]} - Dentist: ${data.treatmentPlansDentistFullName[i]} - Treatment: ${data.treatmentPlansTreatmentName[i]} - Description: ${data.treatmentPlansDescription[i]} - Note: ${data.treatmentPlansNote[i]} - Status: ${data.treatmentPlansStatus[i]}`;

                    treatmentPlanDiv.appendChild(generalTreatmentPlanInfoParagraph);

                    for (let k = 0; k < data.treatmentPlansToothsId[j].length; k++) {
                        const toothInfoParagraph = document.createElement('p');
                        toothInfoParagraph.textContent = `Tooth: ${data.treatmentPlansToothsId[j][k]} - Face: ${data.treatmentPlansToothsFaceName[j][k]}`;
                        treatmentPlanDiv.appendChild(toothInfoParagraph);
                    }
                    for (let k = 0; k < data.treatmentPlansDrugsName[j].length; k++) {
                        const drugInfoParagraph = document.createElement('p');
                        drugInfoParagraph.textContent = `Drug: ${data.treatmentPlansDrugsName[j][k]} - Quantity: ${data.treatmentPlansDrugsQuantity[j][k]}`;
                        treatmentPlanDiv.appendChild(drugInfoParagraph);
                    }

                    for (let k = 0; k < data.treatmentPlansDrugsContraindicationName[j].length; k++) {
                        const drugContraindicationInfoParagraph = document.createElement('p');
                        drugContraindicationInfoParagraph.textContent = `Contraindication drug: ${data.treatmentPlansDrugsContraindicationName[j][k]}`;
                        treatmentPlanDiv.appendChild(drugContraindicationInfoParagraph);
                    }

                    medicalRecordDiv.appendChild(treatmentPlanDiv);
                    getPatientMedicalRecordInfoResult.appendChild(medicalRecordDiv);
                }

                const receiptDiv = document.createElement('div');
                receiptDiv.textContent = `Payment information of medical record ${data.medicalRecordsInfo[i].medicalRecordId}:`;
                receiptDiv.classList.add('receipt');

                const receiptInfoParagraph = document.createElement('p');
                receiptInfoParagraph.textContent = `Receipt Id: ${data.receiptsInfo[i].receiptId} - Total amount: ${data.receiptsInfo[i].totalAmount} - Total paid amount: ${data.receiptsInfo[i].totalPaidAmount} - Change amount: ${data.receiptsInfo[i].changeAmount} - Status: ${data.receiptsInfo[i].paymentStatus}`;
                receiptDiv.appendChild(receiptInfoParagraph);
                getPatientMedicalRecordInfoResult.appendChild(receiptDiv);

                for (let j = 0; j < data.receiptsInfo[i].length; j++) {
                    if (data.paymentReceiptsDate.length > 0) {
                        console.log('toi day');
                        const paymentReceiptDiv = document.createElement('div');
                        paymentReceiptDiv.classList.add('payment-receipt');

                        const paymentReceiptInfo = document.createElement('p');
                        paymentReceiptInfo.textContent = `Payment details ${j + 1}:`;
                        const paymentDate = new Date(data.paymentReceiptsDate[j]);
                        const formattedPaymentDate = `${paymentDate.getDate().toString().padStart(2, '0')}/${(paymentDate.getMonth() + 1).toString().padStart(2, '0')}/${paymentDate.getFullYear()}`;
                        const paymentTime = new Date(data.paymentReceiptsTime[j]);
                        const formattedPaymentTime = `${paymentTime.getUTCHours().toString().padStart(2, '0')}:${paymentTime.getUTCMinutes().toString().padStart(2, '0')}`;
                        const paymentReceiptInfoParagraph = document.createElement('p');
                        paymentReceiptInfoParagraph.textContent = `Payment date: ${formattedPaymentDate} - Payment time: ${formattedPaymentTime} - Staff full name: ${data.paymentReceiptsStaffFullName[j]} - Payment type: ${data.paymentReceiptsType[j]}`;

                        paymentReceiptDiv.appendChild(paymentReceiptInfoParagraph);
                        receiptDiv.appendChild(paymentReceiptDiv);
                        getPatientMedicalRecordInfoResult.appendChild(receiptDiv);
                    } else {
                        const paymentReceiptDiv = document.createElement('div');
                        paymentReceiptDiv.classList.add('payment-receipt');

                        const paymentReceiptInfoParagraph = document.createElement('p');
                        paymentReceiptInfoParagraph.textContent = 'Chưa thực hiện thanh toán';

                        paymentReceiptDiv.appendChild(paymentReceiptInfoParagraph);
                        receiptDiv.appendChild(paymentReceiptDiv);
                        getPatientMedicalRecordInfoResult.appendChild(receiptDiv);
                    }
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
            body: JSON.stringify({ patientPhoneNumber, selectedDatePatientPhoneNumber })
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
    } catch (error) {
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
            body: JSON.stringify({ clinicName, selectedDateClinic })
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
    } catch (error) {
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
            body: JSON.stringify({ dentistUserName, selectedDateDentistUserName })
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
    } catch (error) {
        console.error('Có lỗi xảy ra:', error);
    };
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

module.exports = { restoreInitialTPDisplayState, restoreInitialMRDisplayState, resetTPForm, resetMRForm };
module.exports = { displayDentistsForAddAppointment, displayDentistsForUpdateAppointment, displayDentistsForMedical};
module.exports = { getAppointmentsByPatientPhoneNumber, getAppointmentsByClinicName, getAppointmentsByDentistUserName};

module.exports = { addTreatmentPlan, displayMedicalRecordInfo, addPatientMedicalRecord, getPatientMedicalRecordInfo, 
    searchTooth, searchDrug, searchDrugContraindication, addTooth, addDrug, addDrugContraindication, calculateTotalAmount};

module.exports = { selectedTreatmentPlansDate, selectedTreatmentPlansTime, selectedTreatmentPlansClinicName, selectedTreatmentPlansDentistUserName, selectedTreatmentPlansDentistFullName, 
                selectedTreatmentPlansTreatmentId, selectedTreatmentPlansTreatmentName, selectedTreatmentPlansDescription, selectedTreatmentPlansNote,
                selectedTreatmentPlansToothsId, selectedTreatmentPlansToothsFaceName, selectedTreatmentPlansDrugsId, selectedTreatmentPlansDrugsName, 
                selectedTreatmentPlansDrugsQuantity, selectedTreatmentPlansDrugsContraindicationId, selectedTreatmentPlansDrugsContraindicationName};
  




