const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

var { conn } = require('./connect');

app.post('/getAllPatientsInfo', async function (req, res) {
  const pool = await conn;
  const sqlString = "SELECT * FROM Patient";
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    const patients = result.recordset;
    if (result.recordset[0]) {
      res.status(200).json(patients);
    } else {
      res.status(404).json({ message: 'Không có thông tin bệnh nhân' });
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy thông tin bệnh nhân:', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin bệnh nhân' });
  }
});

app.post('/getPatientInfo', async function (req, res) {
  const { patientPhoneNumber } = req.body;
  const pool = await conn;
  const sqlString =
    `SELECT * FROM Patient  WHERE patientPhoneNumber = '${patientPhoneNumber}'`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    const patient = result.recordset[0];
    if (patient) {
      res.status(200).json(patient);
    } else {
      res.status(404).json({ message: 'Không tìm thấy thông tin bệnh nhân' });
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy thông tin bệnh nhân:', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin bệnh nhân' });
  }
});

app.post('/updatePatientInfo', async function (req, res) {
  const { patientPhoneNumber, patientFullName, patientEmail, patientAddress, patientAge, patientGender } = req.body;
  const patientAgeInt = parseInt(patientAge);
  const pool = await conn;
  const sqlString = `
  UPDATE Patient 
  SET patientFullName = '${patientFullName}',
      patientEmail = '${patientEmail}',
      patientAddress = '${patientAddress}',
      patientAge = ${patientAgeInt},
      patientGender = '${patientGender}'                         
  WHERE patientPhoneNumber = '${patientPhoneNumber}'`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    if (result.rowsAffected[0] === 1) {
      res.status(200).json({ message: 'Thông tin bệnh nhân đã được cập nhật.' });
    } else if (result.rowsAffected[0] === 0) {
      res.status(404).json({ message: 'Không tìm thấy bệnh nhân cần cập nhật' });
    } else {
      res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật thông tin bệnh nhân' });
    }
  } catch (error) {
    console.error('PhoneNumber bệnh nhân đã tồn tại', error);
    res.status(500).json({ message: 'PhoneNumber bệnh nhân đã tồn tại' });
  };
});

app.post('/addPatientInfo', async function (req, res) {
  const { patientPhoneNumber, patientFullName, patientEmail, patientAddress, patientAge, patientGender } = req.body;
  const patientAgeInt = parseInt(patientAge);
  const pool = await conn;
  const sqlString = `
  INSERT INTO Patient (patientPhoneNumber, patientFullName, patientEmail, patientAddress, patientAge, patientGender)
  VALUES ('${patientPhoneNumber}', '${patientFullName}', '${patientEmail}', '${patientAddress}', ${patientAgeInt}, '${patientGender}')`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ message: 'Thông tin bệnh nhân đã được thêm.' });
    } else {
      res.status(500).json({ message: 'Có lỗi xảy ra khi thêm thông tin bệnh nhân' });
    }
  } catch (error) {
    console.error('PhoneNumber bệnh nhân đã tồn tại', error);
    res.status(500).json({ message: 'PhoneNumber bệnh nhân đã tồn tại' });
  }
});


app.post('/getAllStaffsInfo', async function (req, res) {
  const pool = await conn;
  const sqlString = "SELECT * FROM Staff";
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    const staffs = result.recordset;
    if (result.recordset[0]) {
      res.status(200).json(staffs);
    } else {
      res.status(404).json({ message: 'Không có thông tin nhân viên' });
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy thông tin nhân viên', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin nhân viên' });
  }
});

app.post('/getStaffInfo', async function (req, res) {
  const { staffUserName } = req.body;
  const pool = await conn;
  const sqlString =
    `SELECT * FROM Staff  WHERE staffUserName = '${staffUserName}'`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    const staff = result.recordset[0];
    if (staff) {
      res.status(200).json(staff);
    } else {
      res.status(404).json({ message: 'Không tìm thấy thông tin nhân viên' });
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy thông tin nhân viên', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin nhân viên' });
  }
});

app.post('/updateStaffInfo', async function (req, res) {
  const { staffUserName, staffPassword, staffFullName } = req.body;
  const pool = await conn;
  const sqlString = `
  UPDATE Staff 
  SET staffFullName = '${staffFullName}',
      staffPassword = '${staffPassword}'                     
  WHERE staffUserName = '${staffUserName}'`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    if (result.rowsAffected[0] === 1) {
      res.status(200).json({ message: 'Thông tin nhân viên đã được cập nhật.' });
    } else if (result.rowsAffected[0] === 0) {
      res.status(404).json({ message: 'Không tìm thấy nhân viên cần cập nhật' });
    } else {
      res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật thông tin nhân viên' });
    }
  } catch (error) {
    console.error('Username nhân viên đã tồn tại', error);
    res.status(500).json({ message: 'Username nhân viên đã tồn tại' });
  };
});

app.post('/addStaffInfo', async function (req, res) {
  const { staffUserName, staffPassword, staffFullName } = req.body;
  const pool = await conn;
  const sqlString = `
  INSERT INTO Account (username, password, accountType)
  VALUES ('${staffUserName}', '${staffPassword}', 'Staff') 

  INSERT INTO Staff (staffUserName, staffPassword, staffFullName)
  VALUES ('${staffUserName}', '${staffPassword}', '${staffFullName}')`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ message: 'Thông tin nhân viên đã được thêm.' });
    } else {
      res.status(500).json({ message: 'Có lỗi xảy ra khi thêm thông tin nhân viên' });
    }
  } catch (error) {
    console.error('Username nhân viên đã tồn tại', error);
    res.status(500).json({ message: 'Username nhân viên đã tồn tại' });
  }
});


app.post('/getAllDentistsInfo', async function (req, res) {
  const pool = await conn;
  const sqlString = "SELECT * FROM Dentist";
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    const dentists = result.recordset;
    if (result.recordset[0]) {
      res.status(200).json(dentists);
    } else {
      res.status(404).json({ message: 'Không có thông tin nha sĩ' });
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy thông tin nha sĩ', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin nha sĩ' });
  }
});

app.post('/getDentistInfo', async function (req, res) {
  const { dentistUserName } = req.body;
  const pool = await conn;
  const sqlString =
    `SELECT * FROM Dentist  WHERE dentistUserName = '${dentistUserName}'`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    const dentist = result.recordset[0];
    if (dentist) {
      res.status(200).json(dentist);
    } else {
      res.status(404).json({ message: 'Không tìm thấy thông tin nha sĩ' });
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy thông tin nha sĩ', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin nha sĩ' });
  }
});

app.post('/updateDentistInfo', async function (req, res) {
  const { dentistUserName, dentistPassword, dentistFullName } = req.body;
  const pool = await conn;
  const sqlString = `
  UPDATE Dentist 
  SET dentistFullName = '${dentistFullName}',
      dentistPassword = '${dentistPassword}'                         
  WHERE dentistUserName = '${dentistUserName}'`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    if (result.rowsAffected[0] === 1) {
      res.status(200).json({ message: 'Thông tin nha sĩ đã được cập nhật' });
    } else if (result.rowsAffected[0] === 0) {
      res.status(404).json({ message: 'Không tìm thấy nha sĩ cần cập nhật' });
    } else {
      res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật thông tin nha sĩ' });
    }
  } catch (error) {
    console.error('Username nha sĩ đã tồn tại', error);
    res.status(500).json({ message: 'Username nha sĩ đã tồn tại' });
  };
});

app.post('/addDentistInfo', async function (req, res) {
  const { dentistUserName, dentistPassword, dentistFullName } = req.body;
  const pool = await conn;
  const sqlString = `
  INSERT INTO Account (username, password, accountType)
  VALUES ('${dentistUserName}', '${dentistPassword}', 'Dentist') 

  INSERT INTO Dentist (dentistUserName, dentistPassword, dentistFullName)
  VALUES ('${dentistUserName}','${dentistPassword}', '${dentistFullName}')`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ message: 'Thông tin nha sĩ đã được thêm' });
    } else {
      res.status(500).json({ message: 'Có lỗi xảy ra khi thêm thông tin nha sĩ' });
    }
  } catch (error) {
    console.error('Username nha sĩ đã tồn tại', error);
    res.status(500).json({ message: 'Username nha sĩ đã tồn tại' });
  }
});



app.post('/getAllDrugsInfo', async function (req, res) {
  const pool = await conn;
  const sqlString = "SELECT * FROM Drug";
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    const drugs = result.recordset;
    if (result.recordset[0]) {
      res.status(200).json(drugs);
    } else {
      res.status(404).json({ message: 'Không có thông tin thuốc' });
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy thông tin thuốc', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin thuốc' });
  }
});

app.post('/getDrugInfo', async function (req, res) {
  const { drugName } = req.body;
  const pool = await conn;
  const sqlString =
    `SELECT * FROM Drug  WHERE drugName = '${drugName}'`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    const drug = result.recordset[0];
    if (drug) {
      res.status(200).json(drug);
    } else {
      res.status(404).json({ message: 'Không tìm thấy thông tin thuốc' });
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy thông tin thuốc', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin thuốc' });
  }
});

app.post('/updateDrugInfo', async function (req, res) {
  const { enterDrugName, drugName, indication, stockNumber, price } = req.body;
  const pool = await conn;
  const sqlString = `
  UPDATE Drug 
  SET drugName = '${drugName}',
      indication = '${indication}',
      stockNumber = '${stockNumber}',
      price = '${price}'         
  WHERE drugName = '${enterDrugName}'
  `;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    if (result.rowsAffected[0] === 1) {
      res.status(200).json({ message: 'Thông tin thuốc đã được cập nhật' });
    } else if (result.rowsAffected[0] === 0) {
      res.status(404).json({ message: 'Không tìm thấy thuốc cần cập nhật' });
    } else {
      res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật thông tin thuốc' });
    }
  } catch (error) {
    console.error('Tên thuốc đã tồn tại', error);
    res.status(500).json({ message: 'Tên thuốc đã tồn tại' });
  };
});

app.post('/addDrugInfo', async function (req, res) {
  const { drugName, indication, stockNumber, price } = req.body;
  const stockNumberInt = parseInt(stockNumber);
  const priceInt = parseInt(price);
  const pool = await conn;
  const sqlString = `
  INSERT INTO Drug (drugName, indication, stockNumber, price)
  VALUES ('${drugName}', '${indication}', ${stockNumberInt}, ${priceInt})`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ message: 'Thông tin thuốc đã được thêm' });
    } else {
      res.status(500).json({ message: 'Có lỗi xảy ra khi thêm thông tin thuốc' });
    }
  } catch (error) {
    console.error('Số lượng tồn kho không hợp lệ', error);
    res.status(500).json({ message: 'Số lượng tồn kho không hợp lệ' });
  }
});

app.delete('/deleteDrugInfo/:drugName', async function (req, res) {
  const drugName = req.params.drugName;
  const pool = await conn;
  const sqlString = `DELETE FROM Drug WHERE drugName = '${drugName}'`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    if (result.rowsAffected[0] === 1) {
      res.status(200).json({ message: 'Thông tin thuốc đã được xóa' });
    } else {
      res.status(404).json({ message: 'Thuốc không tồn tại' });
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi xóa thông tin thuốc', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi xóa thông tin thuốc' });
  }
});

app.post('/Login', async function (req, res) {
  const { username, password } = req.body;
  const pool = await conn;
  const sqlString =
    `SELECT accountType FROM Account WHERE username = '${username}' AND password = '${password}'`;

  if (password !== ' ') {
    try {
      const request = pool.request();
      const result = await request.query(sqlString);
      if (result.recordset[0]) {
        if (result.recordset[0].accountType === 'Admin') {
          res.status(200).json('Admin');
        } else if (result.recordset[0].accountType === 'Staff') {
          res.status(200).json('Staff');
        } else if (result.recordset[0].accountType === 'Dentist') {
          res.status(200).json('Dentist');
        }
      } else {
        res.status(404).json({ message: 'Thông tin đăng nhập không chính xác' });
      }
    } catch (error) {
      console.error('Có lỗi xảy ra khi kiểm tra đăng nhập', error);
      res.status(500).json({ message: 'Có lỗi xảy ra khi kiểm tra đăng nhập' });
    }
  } else {
    res.status(404).json({ message: 'Thông tin đăng nhập không chính xác' });
  }
});

app.post('/displayAvailableDentists', async function (req, res) {
  const { date, time, clinicName } = req.body;
  const pool = await conn;
  const sqlString = ` SELECT d.dentistUserName, d.dentistFullName
                      FROM Dentist d JOIN workSchedule ws ON d.dentistUserName = ws.dentistUserName
                      WHERE ws.workingDate = '${date}'
                      AND ws.clinicName = '${clinicName}'
                      AND ws.startTime <= '${time}' 
                      AND ws.endTime > '${time}'
                      AND ws.busyStatus = 'Free' `;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    const dentists = result.recordset;
    if (result.rowsAffected[0] > 0) {
      res.status(200).json(dentists);
    } else {
      res.status(404).json({ message: 'Không tìm thấy bác sĩ phù hợp' });
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy thông tin bác sĩ', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin bác sĩ' });
  }
});

app.post('/searchTooth', async function (req, res) {
  const { toothId } = req.body;
  const pool = await conn;
  const sqlString = `SELECT toothId FROM Tooth WHERE toothId = ${parseInt(toothId)}`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    const tooth = result.recordset;
    if (result.recordset[0]) {
      res.status(200).json(tooth);
    } else {
      res.status(404).json({ message: 'Không có thông tin răng' });
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy thông tin răng', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin răng' });
  }
});

app.post('/searchDrug', async function (req, res) {
  const { drugName } = req.body;
  const pool = await conn;
  const sqlString = `SELECT drugId, drugName, stockNumber FROM Drug WHERE drugName = '${drugName}' AND stockNumber > 0`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    const drug = result.recordset;
    if (result.recordset[0]) {
      res.status(200).json(drug);
    } else {
      res.status(404).json({ message: 'Không có thông tin thuốc hoặc hết hàng' });
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy thông tin thuốc', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin thuốc' });
  }
});

app.post('/addPatientMedicalRecord', async function (req, res) {
  const { patientPhoneNumber, examinationDate, examinationTime, oralHealth, allergies,
    treatmentPlansDate, treatmentPlansTime, treatmentPlansClinicName, treatmentPlansDentistUserName, treatmentPlansTreatmentId, treatmentPlansDescription, treatmentPlansNote,
    treatmentPlansToothsId, treatmentPlansToothsFaceName, treatmentPlansDrugsId, treatmentPlansDrugsQuantity, treatmentPlansDrugsContraindicationId,
  } = req.body; // totalAmount
  const pool = await conn;

  const sqlString = `
  INSERT INTO medicalRecord (patientPhoneNumber, examinationDate, examinationTime, oralHealth, allergies)
  VALUES ('${patientPhoneNumber}', '${examinationDate}', '${examinationTime}', '${oralHealth}', '${allergies}')

  SELECT medicalRecordId 
  FROM medicalRecord
  WHERE patientPhoneNumber = '${patientPhoneNumber}' 
  AND examinationDate = '${examinationDate}' 
  AND examinationTime = '${examinationTime}'`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    const medicalRecordId = result.recordset[0].medicalRecordId;
    if (medicalRecordId) {
      // const totalAmountInt = parseInt(totalAmount);
      // const totalPaidAmount = 0;
      // const changeAmount = 0;
      // const sqlString = `
      // INSERT INTO Receipt (medicalRecordId, totalAmount, totalPaidAmount, changeAmount, paymentStatus)
      // VALUES ('${medicalRecordId}', ${totalAmountInt}, ${totalPaidAmount}, ${changeAmount}, 'Uncomplete')`;
      // await request.query(sqlString);

      for (let i = 0; i < treatmentPlansDate.length; i++) {
        const treatmentPlanDate = treatmentPlansDate[i];
        const treatmentPlanTime = treatmentPlansTime[i];
        const treatmentPlanClinicName = treatmentPlansClinicName[i];
        const treatmentPlanDentistUserName = treatmentPlansDentistUserName[i];
        const treatmentPlanTreatmentIdInt = parseInt(treatmentPlansTreatmentId[i]);
        const treatmentPlanDescription = treatmentPlansDescription[i];
        const treatmentPlanNote = treatmentPlansNote[i];

        const sqlString = `
        INSERT INTO treatmentPlan (treatmentPlanDate, treatmentPlanTime, clinicName, dentistUserName, treatmentId, description, note, treatmentPlanStatus) 
        VALUES ('${treatmentPlanDate}', '${treatmentPlanTime}', '${treatmentPlanClinicName}','${treatmentPlanDentistUserName}', ${treatmentPlanTreatmentIdInt}, '${treatmentPlanDescription}', '${treatmentPlanNote}', 'Plan') 
        
        INSERT INTO scheduleAppointment (patientPhoneNumber, appointmentDate, appointmentTime, clinicName, dentistUserName, note, appointmentStatus )
        VALUES ('${patientPhoneNumber}', '${treatmentPlanDate}', '${treatmentPlanTime}', '${treatmentPlanClinicName}', '${treatmentPlanDentistUserName}', 'Treatment plan', 'Re-examination')
        
        UPDATE workSchedule
        SET busyStatus = 'Busy'
        WHERE workingDate = '${treatmentPlanDate}'
        AND clinicName = '${treatmentPlanClinicName}'
        AND dentistUserName = '${treatmentPlanDentistUserName}'
        AND startTime <= '${treatmentPlanTime}'
        AND endTime > '${treatmentPlanTime}'`;
        await request.query(sqlString);

        const sqlString1 = `
        SELECT treatmentPlanId 
        FROM treatmentPlan 
        WHERE treatmentPlanDate = '${treatmentPlanDate}'
        AND treatmentPlanTime = '${treatmentPlanTime}'
        AND clinicName = '${treatmentPlanClinicName}'
        AND dentistUserName  = '${treatmentPlanDentistUserName}'`;
        const result = await request.query(sqlString1);
        const treatmentPlanId = result.recordset[0].treatmentPlanId;

        const sqlString2 = `
        INSERT INTO medicalRecordTreatmentPlans (medicalRecordId, treatmentPlanId)
        VALUES ('${medicalRecordId}', '${treatmentPlanId}')`;
        await request.query(sqlString2);

        for (let j = 0; j < treatmentPlansToothsId[i].length; j++) {
          const toothId = parseInt(treatmentPlansToothsId[i][j]);
          const toothFaceName = treatmentPlansToothsFaceName[i][j];
          const sqlString = `
          INSERT INTO treatmentPlanTooths (treatmentPlanId, toothId, toothFaceName)
          VALUES ('${treatmentPlanId}', ${toothId}, '${toothFaceName}')`;
          await request.query(sqlString);
        }

        for (let j = 0; j < treatmentPlansDrugsId[i].length; j++) {
          const drugId = parseInt(treatmentPlansDrugsId[i][j]);
          const drugQuantity = parseInt(treatmentPlansDrugsQuantity[i][j]);
          const sqlString = `
          INSERT INTO treatmentPlanDrugs (treatmentPlanId, drugId, quantity)
          VALUES ('${treatmentPlanId}', ${drugId}, ${drugQuantity})
          
          UPDATE Drug
          SET stockNumber = stockNumber - ${drugQuantity}
          WHERE drugId = ${drugId}`;
          await request.query(sqlString);
        }

        for (let j = 0; j < treatmentPlansDrugsContraindicationId[i].length; j++) {
          const drugContraindicationId = parseInt(treatmentPlansDrugsContraindicationId[i][j]);
          const sqlString = `
          INSERT INTO treatmentPlanDrugsContraindication (treatmentPlanId, drugContraindicationId)
          VALUES ('${treatmentPlanId}', ${drugContraindicationId})`;
          await request.query(sqlString);
        }
      }
      res.status(200).json({ message: 'Thông tin hồ sơ bệnh nhân đã được thêm' });
    } else {
      res.status(500).json({ message: 'Có lỗi xảy ra khi thêm hồ sơ' });
    }
  } catch (error) {
    console.error('Hồ sơ đã tồn tại hoặc có lỗi xảy ra khi thêm hồ sơ', error);
    res.status(500).json({ message: 'Hồ sơ đã tồn tại hoặc có lỗi xảy ra khi thêm hồ sơ' });
  }
});

app.post('/getPatientMedicalRecordInfo', async function (req, res) {
  const { patientPhoneNumber } = req.body;
  const pool = await conn;
  try {
    // mức 1: Patient
    const sqlString = `
    SELECT patientPhoneNumber, patientFullName, patientAge, patientGender
    FROM Patient
    WHERE patientPhoneNumber = '${patientPhoneNumber}'`;
    const request = pool.request();
    const patientResult = await request.query(sqlString);
    const patientInfo = patientResult.recordset[0];

    // mức 2: medicalRecord, receipt
    if (patientInfo) {
      let medicalRecordsInfo = [];
      const result = await request.query(`
      SELECT medicalRecordId, examinationDate, examinationTime, oralHealth, allergies
      FROM medicalRecord
      WHERE patientPhoneNumber = '${patientPhoneNumber}'`);
      const medicalRecordsResult = result.recordset;

      if (result.recordset[0]) {
        const medicalRecords = medicalRecordsResult.map(record => ({
          medicalRecordId: record.medicalRecordId,
          examinationDate: record.examinationDate,
          examinationTime: record.examinationTime,
          oralHealth: record.oralHealth,
          allergies: record.allergies,
        }))
        medicalRecordsInfo = medicalRecordsInfo.concat(medicalRecords);

        let receiptsInfo = [];
        const result = await request.query(`
        SELECT receiptId, totalAmount, totalPaidAmount, changeAmount, paymentStatus
        FROM Receipt r JOIN medicalRecord mr ON r.medicalRecordId = mr.medicalRecordId
        WHERE mr.patientPhoneNumber = '${patientPhoneNumber}'`);

        const receiptsResult = result.recordset;
        const receipts = receiptsResult.map(receipt => ({
          receiptId: receipt.receiptId,
          totalAmount: receipt.totalAmount,
          totalPaidAmount: receipt.totalPaidAmount,
          changeAmount: receipt.changeAmount,
          paymentStatus: receipt.paymentStatus,
        }))
        receiptsInfo = receiptsInfo.concat(receipts);

        for (const record of medicalRecords) {
          const treatmentPlansResult = await request.query(`
            SELECT tp.treatmentPlanId, tp.treatmentPlanDate, tp.treatmentPlanTime, tp.clinicName, d.dentistFullName, c.treatmentName, tp.description, tp.note, tp.treatmentPlanStatus
            FROM medicalRecordTreatmentPlans mrtp 
            JOIN treatmentPlan tp ON mrtp.treatmentPlanId = tp.treatmentPlanId
            JOIN Dentist d ON d.dentistUserName = tp.dentistUserName
            JOIN Category c ON tp.treatmentId = c.treatmentId
            WHERE mrtp.medicalRecordId = '${record.medicalRecordId}'`);

          const treatmentPlansInfo = [];
          for (const plan of treatmentPlansResult.recordset) {

            const toothResult = await request.query(`
              SELECT toothId, toothFaceName
              FROM treatmentPlanTooths
              WHERE treatmentPlanId = '${plan.treatmentPlanId}'`);
            const teeth = toothResult.recordset;

            const drugResult = await request.query(`
              SELECT d.drugName, tpd.quantity
              FROM treatmentPlanDrugs tpd JOIN Drug d ON tpd.drugId = d.drugId
              WHERE treatmentPlanId = '${plan.treatmentPlanId}'`);
            const drugs = drugResult.recordset;

            const drugContraindicationResult = await request.query(`
              SELECT d.drugName
              FROM treatmentPlanDrugsContraindication tpdc JOIN Drug d ON tpdc.drugContraindicationId = d.drugId
              WHERE treatmentPlanId = '${plan.treatmentPlanId}'`);
            const drugsContraindication = drugContraindicationResult.recordset;

            const treatmentPlanDetails = {
              treatmentPlanId: plan.treatmentPlanId,
              treatmentPlanDate: plan.treatmentPlanDate,
              treatmentPlanTime: plan.treatmentPlanTime,
              clinicName: plan.clinicName,
              dentistFullName: plan.dentistFullName,
              treatmentName: plan.treatmentName,
              description: plan.description,
              note: plan.note,
              treatmentPlanStatus: plan.treatmentPlanStatus,
              teeth,
              drugs,
              drugsContraindication,
            };
            treatmentPlansInfo.push(treatmentPlanDetails); // Push thông tin chi tiết vào mảng kế hoạch điều trị
          }

          if (!record.hasOwnProperty('treatmentPlans')) {
            record['treatmentPlans'] = treatmentPlansInfo;
          } else {
            // Nếu thuộc tính treatmentPlans đã tồn tại, ta sẽ tiếp tục xử lý với thông tin đã có
            record['treatmentPlans'] = record['treatmentPlans'].concat(treatmentPlansInfo);
          }
        }

        for (const receipt of receipts) {
          const paymentReceiptsResult = await request.query(`
          SELECT pr.paymentDate, pr.paymentTime, s.staffFullName, pr.paidAmount, pr.paymentType
          FROM paymentReceipt pr JOIN Staff s ON pr.staffUserName  = s.staffUserName 
          WHERE receiptId = '${receipt.receiptId}'`);

          let paymentsInfo = [];
          for (const payment of paymentReceiptsResult.recordset) {
            const paymentDetails = {
              paymentDate: payment.paymentDate,
              paymentTime: payment.paymentTime,
              staffFullName: payment.staffFullName,
              paidAmount: payment.paidAmount,
              paymentType: payment.paymentType
            };
            paymentsInfo.push(paymentDetails); 
          }

          if (!receipt.hasOwnProperty('payments')) {
            receipt['payments'] = paymentsInfo;
          } else {
            receipt['payments'] = receipt['payments'].concat(paymentsInfo);
          }
        }
        const allInfo = { patientInfo, medicalRecordsInfo, receiptsInfo };
        // console.log(allInfo);
        res.status(200).json(allInfo);

      } else {
        res.status(404).json({ message: 'Not found medical record information' });
      }
    } else {
      res.status(404).json({ message: 'Not found patient information' });
    }
  } catch (error) {
    console.error('Error when get patient medical record', error);
    res.status(404).json({ message: 'Error when get patient medical record' });
  }
});

app.post('/getAppointmentsByPatientPhoneNumber', async function (req, res) {
  const { patientPhoneNumber, selectedDatePatientPhoneNumber } = req.body;
  const pool = await conn;
  const sqlString = `
  SELECT sa.appointmentId, p.patientFullName, sa.patientPhoneNumber, sa.appointmentDate, sa.appointmentTime, sa.clinicName, d.dentistFullName, sa.note, sa.appointmentStatus 
  FROM scheduleAppointment  sa
  JOIN Patient p ON sa.patientPhoneNumber = p.patientPhoneNumber
  JOIN Dentist d ON d.dentistUserName = sa.dentistUserName
  WHERE sa.patientPhoneNumber = '${patientPhoneNumber}'
  AND sa.appointmentDate = '${selectedDatePatientPhoneNumber}'`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    const appointments = result.recordset;
    if (result.recordset[0]) {
      res.status(200).json(appointments);
    } else {
      res.status(404).json({ message: 'Không có thông tin cuộc hẹn' });
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy thông tin cuộc hẹn', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin cuộc hẹn' });
  }
});

app.post('/getAppointmentsByClinicName', async function (req, res) {
  const { clinicName, selectedDateClinic } = req.body;
  const pool = await conn;
  const sqlString = `
  SELECT sa.appointmentId, p.patientFullName, sa.patientPhoneNumber, sa.appointmentDate, sa.appointmentTime, sa.clinicName, d.dentistFullName, sa.note, sa.appointmentStatus 
  FROM scheduleAppointment  sa
  JOIN Patient p ON sa.patientPhoneNumber = p.patientPhoneNumber
  JOIN Dentist d ON d.dentistUserName = sa.dentistUserName
  WHERE sa.clinicName = '${clinicName}'
  AND sa.appointmentDate = '${selectedDateClinic}'`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    const appointments = result.recordset;
    if (result.recordset[0]) {
      res.status(200).json(appointments);
    } else {
      res.status(404).json({ message: 'Không có thông tin cuộc hẹn' });
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy thông tin cuộc hẹn', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin cuộc hẹn' });
  }
});

app.post('/getAppointmentsByDentistUserName', async function (req, res) {
  const { dentistUserName, selectedDateDentistUserName } = req.body;
  const pool = await conn;
  const sqlString = `
  SELECT sa.appointmentId, p.patientFullName, sa.patientPhoneNumber, sa.appointmentDate, sa.appointmentTime, sa.clinicName, d.dentistFullName, sa.note, sa.appointmentStatus 
  FROM scheduleAppointment  sa
  JOIN Patient p ON sa.patientPhoneNumber = p.patientPhoneNumber
  JOIN Dentist d ON d.dentistUserName = sa.dentistUserName
  WHERE sa.dentistUserName = '${dentistUserName}'
  AND sa.appointmentDate = '${selectedDateDentistUserName}'`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    const appointments = result.recordset;
    if (result.recordset[0]) {
      res.status(200).json(appointments);
    } else {
      res.status(404).json({ message: 'Không có thông tin cuộc hẹn' });
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy thông tin cuộc hẹn', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin cuộc hẹn' });
  }
});

app.post('/getAppointment', async function (req, res) {
  const { getAppointmentPatientPhoneNumber, getAppointmentDate, getAppointmentTime, getAppointmentClinicName } = req.body;
  console.log(req.body);
  const pool = await conn;
  const request = pool.request();
  var timeDown = '';
  var timeUp = '';
  if (getAppointmentTime === '06-08') {
    timeDown = '06:00';
    timeUp = '08:00';
  } else if (getAppointmentTime === '08-10') {
    timeDown = '08:00';
    timeUp = '10:00';
  } else if (getAppointmentTime === '13-15') {
    timeDown = '13:00';
    timeUp = '15:00';
  } else if (getAppointmentTime === '15-17') {
    timeDown = '15:00';
    timeUp = '17:00';
  }

  const sqlString = `
    SELECT sa.appointmentId, p.patientFullName, sa.patientPhoneNumber, sa.appointmentDate, sa.appointmentTime, sa.clinicName, d.dentistFullName, sa.note, sa.appointmentStatus 
    FROM scheduleAppointment sa
    JOIN Patient p ON sa.patientPhoneNumber = p.patientPhoneNumber
    JOIN Dentist d ON d.dentistUserName = sa.dentistUserName
    WHERE sa.patientPhoneNumber = '${getAppointmentPatientPhoneNumber}'
    AND sa.appointmentDate = '${getAppointmentDate}'
    AND sa.clinicName = '${getAppointmentClinicName}'
    AND sa.appointmentTime >= '${timeDown}'
    AND sa.appointmentTime < '${timeUp}'
  `;
  const result = await request.query(sqlString);
  const appointment = result.recordset[0];
  if (appointment) {
    res.status(200).json(appointment);
  } else {
    res.status(404).json({ message: 'Không có thông tin cuộc hẹn' });
  }
});

app.post('/addAppointment', async function (req, res) {
  const { addAppointmentPatientPhoneNumber, addAppointmentPatientFullName, addAppointmentPatientEmail,
    addAppointmentPatientAddress, addAppointmentPatientAge, addAppointmentPatientGender, addAppointmentDate,
    addAppointmentTime, addAppointmentClinicName, addAppointmentDentistUserName } = req.body;
  const addAppointmentPatientAgeInt = parseInt(addAppointmentPatientAge);


  const pool = await conn;
  const request = pool.request();
  // check exist patient
  try {
    const result1 = await request.query(`
    SELECT patientPhoneNumber 
    FROM Patient 
    WHERE patientPhoneNumber = '${addAppointmentPatientPhoneNumber}'`);
    const patient = result1.recordset[0];

    // new patient
    if (!patient) {
      const sqlString_Add_and_Update_Info = `
      INSERT INTO Patient (patientPhoneNumber, patientFullName, patientEmail, patientAddress, patientAge, patientGender)
      VALUES ('${addAppointmentPatientPhoneNumber}', '${addAppointmentPatientFullName}', '${addAppointmentPatientEmail}', '${addAppointmentPatientAddress}', ${addAppointmentPatientAgeInt}, '${addAppointmentPatientGender}')
    
      INSERT INTO scheduleAppointment (patientPhoneNumber, appointmentDate, appointmentTime, clinicName, dentistUserName, note, appointmentStatus)
      VALUES ('${addAppointmentPatientPhoneNumber}', '${addAppointmentDate}', '${addAppointmentTime}', '${addAppointmentClinicName}', '${addAppointmentDentistUserName}', 'Appointment', 'New appointment')
      
      UPDATE workSchedule
      SET busyStatus = 'Busy'                       
      WHERE dentistUserName = '${addAppointmentDentistUserName}' 
      AND workingDate = '${addAppointmentDate}'
      AND clinicName = '${addAppointmentClinicName}'
      AND startTime <= '${addAppointmentTime}'
      AND endTime > '${addAppointmentTime}'`;
      try {
        const result2 = await request.query(sqlString_Add_and_Update_Info);
        if (result2.rowsAffected[0] > 0) {
          res.status(200).json({ message: 'Thêm thông tin bệnh nhân và lịch hẹn thành công' });
        } else {
          res.status(500).json({ message: 'Thêm thông tin bệnh nhân và lịch hẹn không thành công, vui lòng kiểm tra lại thông tin' });
        }
      } catch (error) {
        console.error('Có lỗi xảy ra khi thêm thông tin bệnh nhân và lịch hẹn', error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi thêm thông tin bệnh nhân và lịch hẹn' });
      }
      // old patient
    } else {
      // check duplicate schedule
      const sqlString_Check_Duplicate_Schedule = `
      SELECT sa.appointmentId, p.patientFullName, sa.patientPhoneNumber, sa.appointmentDate, sa.appointmentTime, sa.clinicName, d.dentistFullName, sa.note, sa.appointmentStatus 
      FROM scheduleAppointment sa
      JOIN workSchedule ws ON ws.workingDate = sa.appointmentDate
      JOIN Dentist d ON d.dentistUserName = sa.dentistUserName
      JOIN Patient p ON sa.patientPhoneNumber = p.patientPhoneNumber
      WHERE sa.patientPhoneNumber = '${addAppointmentPatientPhoneNumber}'
      AND sa.dentistUserName = '${addAppointmentDentistUserName}'
      AND sa.clinicName = '${addAppointmentClinicName}'
      AND sa.appointmentDate = '${addAppointmentDate}'
      AND ws.startTime <= '${addAppointmentTime}'
      AND ws.endTime > '${addAppointmentTime}'
      AND ws.busyStatus = 'Busy'`;
      console.log(sqlString_Check_Duplicate_Schedule);
      try {
        const result1 = await request.query(sqlString_Check_Duplicate_Schedule);
        const appointment = result1.recordset[0];
        // nếu đã có lịch hẹn trong khung giờ này
        if (appointment) {
          res.status(401).json(appointment);
        }
        //nếu chưa có lịch hẹn
        else {
          const sqlString_Add_Appointment = `
          INSERT INTO scheduleAppointment (patientPhoneNumber, appointmentDate, appointmentTime, clinicName, dentistUserName, note, appointmentStatus )
          VALUES ('${addAppointmentPatientPhoneNumber}', '${addAppointmentDate}', '${addAppointmentTime}', '${addAppointmentClinicName}', '${addAppointmentDentistUserName}', 'Appointment', 'New appointment')
          
          UPDATE workSchedule
          SET busyStatus = 'Busy'                       
          WHERE dentistUserName = '${addAppointmentDentistUserName}' 
          AND workingDate = '${addAppointmentDate}'
          AND clinicName = '${addAppointmentClinicName}'
          AND startTime <= '${addAppointmentTime}'
          AND endTime > '${addAppointmentTime}'`;
          try {
            const result2 = await request.query(sqlString_Add_Appointment);
            if (result2.rowsAffected[0] > 0) {
              res.status(200).json({ message: 'Thêm thông tin bệnh nhân và lịch hẹn thành công' });
            } else {
              res.status(500).json({ message: 'Thêm thông tin bệnh nhân và lịch hẹn không thành công, vui lòng kiểm tra lại thông tin' });
            }
          } catch (error) {
            console.error('Có lỗi xảy ra khi thêm thông tin bệnh nhân và lịch hẹn', error);
            res.status(500).json({ message: 'Có lỗi xảy ra khi thêm thông tin bệnh nhân và lịch hẹn' });
          }
        }
      } catch (error) {
        console.error('Có lỗi xảy ra khi thêm thông tin bệnh nhân và lịch hẹn', error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi thêm thông tin bệnh nhân và lịch hẹn' });
      }
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi thêm thông tin bệnh nhân và lịch hẹn', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi thêm thông tin bệnh nhân và lịch hẹn' });
  }
});

app.post('/findAppointment', async function (req, res) {
  const { findAppointmentId } = req.body;
  const pool = await conn;
  const request = pool.request();
  const sqlString = `
    SELECT appointmentId
    FROM scheduleAppointment
    WHERE appointmentId = '${findAppointmentId}'
  `;
  const result = await request.query(sqlString);
  const appointment = result.recordset[0];
  if (appointment) {
    res.status(200);
  } else {
    res.status(404).json({ message: `Not found appointment to update` });
  }
});

app.post('/updateAppointment', async function (req, res) {
  const { updateAppointmentId, updateAppointmentDate, updateAppointmentTime, updateAppointmentClinicName, updateAppointmentDentistUserName } = req.body;
  const pool = await conn;
  const request = pool.request();
  try {
    const result = await request.query(`
    SELECT appointmentDate, appointmentTime, clinicName, dentistUserName
    FROM scheduleAppointment 
    WHERE appointmentId = '${updateAppointmentId}'`);
    const appointment = result.recordset[0];
    if (appointment) {
      const result = await request.query(`
      UPDATE scheduleAppointment 
      SET appointmentDate = '${updateAppointmentDate}',
      appointmentTime = '${updateAppointmentTime}',
      clinicName = '${updateAppointmentClinicName}',
      dentistUserName = '${updateAppointmentDentistUserName}'
      WHERE appointmentId = '${updateAppointmentId}'
    
      UPDATE workSchedule 
      SET busyStatus = 'Free'
      WHERE dentistUserName = '${appointment.dentistUserName}'
      AND clinicName = '${appointment.clinicName}'
      AND workingDate = '${appointment.appointmentDate}'
      AND startTime <= '${appointment.appointmentTime}'
      AND endTime > '${appointment.appointmentTime}'
      `);
      if (result.rowsAffected[0] > 0) {
        const result = await request.query(`
        SELECT treatmentPlanId
        FROM treatmentPlan 
        WHERE treatmentPlanDate = '${appointment.appointmentDate}'
        AND treatmentPlanTime = '${appointment.appointmentTime}'
        AND clinicName = '${appointment.clinicName}'
        AND dentistUserName = '${appointment.dentistUserName}'
        `);
        const treatmentPlanId = result.recordset[0];
        if (treatmentPlanId) {
          const formattedDate = updateAppointmentDate.split('-').reverse().join('');
          const formattedTime = updateAppointmentTime.split(':').join('');
          const formattedId = `TP${formattedDate}${formattedTime}${updateAppointmentClinicName}${updateAppointmentDentistUserName.toUpperCase()}`;
          const result = await request.query(`
          UPDATE medicalRecordTreatmentPlans 
          SET treatmentPlanId = '${formattedId}'
          WHERE treatmentPlanId = '${treatmentPlanId}' 

          UPDATE treatmentPlan 
          SET treatmentPlanId = '${formattedId}',
          treatmentPlanDate = '${updateAppointmentDate}',
          treatmentPlanTime = '${updateAppointmentTime}',
          clinicName = '${updateAppointmentClinicName}',
          dentistUserName = '${updateAppointmentDentistUserName}'
          WHERE treatmentPlanId = '${treatmentPlanId}' 

          UPDATE treatmentPlanTooths
          SET treatmentPlanId = '${formattedId}'
          WHERE treatmentPlanId = '${treatmentPlanId}' 

          UPDATE treatmentPlanDrugs
          SET treatmentPlanId = '${formattedId}'
          WHERE treatmentPlanId = '${treatmentPlanId}' 

          UPDATE treatmentPlanDrugsContraindication
          SET treatmentPlanId = '${formattedId}'
          WHERE treatmentPlanId = '${treatmentPlanId}' 
          `);
          if (result.rowsAffected[0] > 0) {
            res.status(200).json({ message: 'Success update appointment' });
          } else {
            res.status(500).json({ message: 'Error when update appointment' });
          }
        } else {
          res.status(200).json({ message: 'Success update appointment' });
        }
      } else {
        res.status(500).json({ message: 'Error when update appointment' });
      }
    } else {
      res.status(404).json({ message: 'Not found appointment to update' });
    }
  } catch (error) {
    console.error('Error when update appointment', error);
    res.status(500).json({ message: 'Error when update appointment' });
  }
});

app.delete('/deleteAppointment/:deleteAppointmentId', async function (req, res) {
  const deleteAppointmentId = req.params.deleteAppointmentId;
  const pool = await conn;
  try {
    const result = await request.query(`
    SELECT appointmentDate, appointmentTime, clinicName, dentistUserName
    FROM scheduleAppointment 
    WHERE appointmentId = '${deleteAppointmentId}'
  
    DELETE FROM scheduleAppointment WHERE appointmentId = '${deleteAppointmentId}'`);
    const appointment = result.recordset[0];
    if (appointment) {
      const result = await request.query(`
      UPDATE workSchedule 
      SET busyStatus = 'Free'
      WHERE dentistUserName = '${appointment.dentistUserName}'
      AND clinicName = '${appointment.clinicName}'
      AND workingDate = '${appointment.appointmentDate}'
      AND startTime <= '${appointment.appointmentTime}'
      AND endTime > '${appointment.appointmentTime}'

      SELECT treatmentPlanId
      FROM treatmentPlan 
      WHERE treatmentPlanDate = '${appointment.appointmentDate}'
      AND treatmentPlanTime = '${appointment.appointmentTime}'
      AND clinicName = '${appointment.clinicName}'
      AND dentistUserName = '${appointment.dentistUserName}'
      `);
      const treatmentPlanId = result.recordset[0];
      if (treatmentPlanId) {
        const result = await request.query(`
        DELETE FROM medicalRecordTreatmentPlans WHERE treatmentPlanId = '${treatmentPlanId}'
        DELETE FROM treatmentPlan WHERE treatmentPlanId = '${treatmentPlanId}'
        DELETE FROM treatmentPlanTooths WHERE treatmentPlanId = '${treatmentPlanId}'
        DELETE FROM treatmentPlanDrugs WHERE treatmentPlanId = '${treatmentPlanId}'
        DELETE FROM treatmentPlanDrugsContraindication WHERE treatmentPlanId = '${treatmentPlanId}'
        `);
        if (result.rowsAffected[0] > 0) {
          res.status(200).json({ message: 'Success delete appointment' });
        } else {
          res.status(500).json({ message: 'Error when delete appointment' });
        }
      } else {
        res.status(200).json({ message: 'Success delete appointment' });
      }
    } else {
      res.status(404).json({ message: 'Not found appointment to delete' });
    }
  } catch (error) {
    console.error('Error when delete appointment', error);
    res.status(500).json({ message: 'Error when delete appointment' });
  }
});

app.post('/getReceiptInfo', async function (req, res) {
  const { patientPhoneNumber } = req.body;
  const pool = await conn;
  const request = pool.request();
  try {
    const patientResult = await request.query(`
    SELECT patientPhoneNumber
    FROM Patient
    WHERE patientPhoneNumber = '${patientPhoneNumber}'`);
    const patientInfo = patientResult.recordset[0];

    if (patientInfo) {
      let medicalRecordsInfo = [];
      const result = await request.query(`
        (SELECT medicalRecordId
        FROM medicalRecord 
        WHERE patientPhoneNumber = '${patientPhoneNumber}')
        `);
        // EXCEPT
        // (SELECT mr.medicalRecordId
        // FROM medicalRecord mr JOIN Receipt r ON mr.medicalRecordId = r.medicalRecordId
        // WHERE mr.patientPhoneNumber = '${patientPhoneNumber}'
        // AND r.paymentStatus = 'Completed')
      const medicalRecordsResult = result.recordset;
      const medicalRecords = medicalRecordsResult.map(record => ({ medicalRecordId: record.medicalRecordId }))
      medicalRecordsInfo = medicalRecordsInfo.concat(medicalRecords);

      let receiptsInfo = [];
      const result1 = await request.query(`
      SELECT receiptId, totalAmount, totalPaidAmount, changeAmount, paymentStatus
      FROM Receipt r JOIN medicalRecord mr ON r.medicalRecordId = mr.medicalRecordId
      WHERE mr.patientPhoneNumber = '${patientPhoneNumber}'`);
      const receiptsResult = result1.recordset;
      const receipts = receiptsResult.map(receipt => ({
        receiptId: receipt.receiptId,
        totalAmount: receipt.totalAmount,
        totalPaidAmount: receipt.totalPaidAmount,
        changeAmount: receipt.changeAmount,
        paymentStatus: receipt.paymentStatus,
      }))
      receiptsInfo = receiptsInfo.concat(receipts);

      if (result.recordset[0]) {
        for (const record of medicalRecords) {
          const treatmentPlansResult = await request.query(`
              SELECT tp.treatmentPlanId, c.treatmentName, c.price
              FROM medicalRecordTreatmentPlans mrtp 
              JOIN treatmentPlan tp ON mrtp.treatmentPlanId = tp.treatmentPlanId
              JOIN Category c ON tp.treatmentId = c.treatmentId
              WHERE mrtp.medicalRecordId = '${record.medicalRecordId}'`);
          const treatmentPlansInfo = [];
          for (const plan of treatmentPlansResult.recordset) {
            const toothResult = await request.query(`
                SELECT tpt.toothId, tpt.toothFaceName, tf.price
                FROM treatmentPlanTooths tpt JOIN toothFace tf ON tpt.toothFaceName = tf.toothFaceName
                WHERE treatmentPlanId = '${plan.treatmentPlanId}'`);
            const teeth = toothResult.recordset;

            const drugResult = await request.query(`
                    SELECT d.drugName, tpd.quantity, d.price
                    FROM treatmentPlanDrugs tpd JOIN Drug d ON tpd.drugId = d.drugId
                    WHERE treatmentPlanId = '${plan.treatmentPlanId}'`);
            const drugs = drugResult.recordset;

            const treatmentPlanDetails = {
              treatmentPlanId: plan.treatmentPlanId,
              treatmentName: plan.treatmentName,
              price: plan.price,
              teeth,
              drugs,
            };
            treatmentPlansInfo.push(treatmentPlanDetails); // Push thông tin chi tiết vào mảng kế hoạch điều trị
          }

          if (!record.hasOwnProperty('treatmentPlans')) {
            record['treatmentPlans'] = treatmentPlansInfo;
          } else {
            // Nếu thuộc tính treatmentPlans đã tồn tại, ta sẽ tiếp tục xử lý với thông tin đã có
            record['treatmentPlans'] = record['treatmentPlans'].concat(treatmentPlansInfo);
          }
        }

        for (const receipt of receipts) {
          const paymentReceiptsResult = await request.query(`
              SELECT pr.paymentDate, pr.paymentTime, s.staffFullName, pr.paidAmount, pr.paymentType
              FROM paymentReceipt pr JOIN Staff s ON pr.staffUserName  = s.staffUserName 
              WHERE receiptId = '${receipt.receiptId}'`);

          let paymentsInfo = [];
          for (const payment of paymentReceiptsResult.recordset) {
            console.log(paymentReceiptsResult.recordset);
            const paymentDetails = {
              paymentDate: payment.paymentDate,
              paymentTime: payment.paymentTime,
              staffFullName: payment.staffFullName,
              paidAmount: payment.paidAmount,
              paymentType: payment.paymentType
            };
            paymentsInfo.push(paymentDetails); 
          }

          if (!receipt.hasOwnProperty('payments')) {
            receipt['payments'] = paymentsInfo;
          } else {
            receipt['payments'] = receipt['payments'].concat(paymentsInfo);
          }
        }

        const allInfo = { patientInfo, medicalRecordsInfo, receiptsInfo};
        // console.log('receipt: );
        res.status(200).json(allInfo);
      } else {
        res.status(404).json({ message: 'Not found medical record infomation' });
      }

    } else {
      res.status(404).json({ message: 'Not found patient infomation' });
    }
  } catch (error) {
    console.error('Error when get receipt infomation', error);
    res.status(404).json({ message: 'Error when get receipt infomation' });
  }
});

app.post('/payReceipt', async function (req, res) {
  const { medicalRecordId, totalAmount, formattedDate, formattedTime, staffUserName, paidAmount, paymentType } = req.body;
  const totalAmountInt = parseInt(totalAmount);
  const paidAmountInt = parseInt(paidAmount);

  const pool = await conn;
  const request = pool.request();
  try {
    // Kiểm tra xem Receipt có tồn tại cho medicalRecordId không
    const receiptDetails = await request.query(`
      SELECT totalAmount, totalPaidAmount, changeAmount, paymentStatus
      FROM Receipt
      WHERE medicalRecordId = '${medicalRecordId}'`);

    let totalAmount = totalAmountInt;
    let totalPaidAmount = paidAmountInt;
    let changeAmount;
    let paymentStatus;

    let result;
    if (receiptDetails.recordset.length > 0) {
      // Nếu Receipt đã tồn tại, cập nhật thông tin của nó
      totalPaidAmount += receiptDetails.recordset[0].totalPaidAmount;
      changeAmount = (totalPaidAmount > totalAmount) ? (totalPaidAmount - totalAmount) : 0;
      paymentStatus = (totalPaidAmount >= totalAmount) ? 'Completed' : 'Uncomplete';

      // Update thông tin của Receipt
      result = await request.query(`
        UPDATE Receipt
        SET totalPaidAmount = ${totalPaidAmount}, 
        changeAmount = ${changeAmount}, 
        paymentStatus = '${paymentStatus}'
        WHERE medicalRecordId = '${medicalRecordId}'
        
        SELECT receiptId FROM Receipt WHERE medicalRecordId = '${medicalRecordId}' `);
    } else {
      // Nếu Receipt chưa tồn tại, tạo một bản ghi mới
      changeAmount = (totalPaidAmount > totalAmount) ? (totalPaidAmount - totalAmount) : 0;
      paymentStatus = (totalPaidAmount >= totalAmount) ? 'Completed' : 'Uncomplete';

      result = await request.query(`
        INSERT INTO Receipt (medicalRecordId, totalAmount, totalPaidAmount, changeAmount, paymentStatus)
        VALUES ('${medicalRecordId}', ${totalAmount}, ${totalPaidAmount}, ${changeAmount}, '${paymentStatus}')
        
        SELECT receiptId FROM Receipt WHERE medicalRecordId = '${medicalRecordId}'`);
    }
    const receiptId = result.recordset[0].receiptId;
    // Thêm thông tin thanh toán vào bảng paymentReceipt
    await request.query(`
      INSERT INTO paymentReceipt (receiptId, paymentDate, paymentTime, staffUserName, paidAmount, paymentType)
      VALUES (${receiptId}, '${formattedDate}', '${formattedTime}', '${staffUserName}', ${paidAmount}, '${paymentType}')`);

    // Lấy thông tin cập nhật sau khi thanh toán
    const updatedReceiptDetails = await request.query(`
      SELECT receiptId, totalPaidAmount, changeAmount, paymentStatus
      FROM Receipt
      WHERE medicalRecordId = '${medicalRecordId}'`);

    // Trả về thông tin cập nhật sau khi thanh toán cho việc hiển thị
    res.status(200).json(updatedReceiptDetails.recordset[0]);
    console.log(updatedReceiptDetails);
  } catch (error) {
    console.error('Error when processing payment', error);
    res.status(500).json({ message: 'Error processing payment' });
  }
});



app.post('/getAllAppointmentsInfo', async function (req, res) {
  const { patientPhoneNumber } = req.body;
  const pool = await conn;
  const sqlString = `
  SELECT sa.appointmentId, sa.patientPhoneNumber, sa.appointmentDate, sa.appointmentTime, sa.clinicName, d.dentistFullName, sa.note, sa.appointmentStatus
  FROM scheduleAppointment sa JOIN Dentist d ON sa.dentistUserName = d.dentistUserName
  WHERE sa.patientPhoneNumber = '${patientPhoneNumber}'`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    const appointments = result.recordset;
    if (result.recordset[0]) {
      res.status(200).json(appointments);
    } else {
      res.status(404).json({ message: 'Không có thông tin lịch hẹn' });
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy thông tin lịch hẹn:', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin lịch hẹn' });
  }
});

app.post('/getDentistsWorkScheduleInfo', async function (req, res) {
  const pool = await conn;
  const sqlString = `SELECT * FROM workSchedule`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    const schedules = result.recordset;
    if (result.recordset[0]) {
      res.status(200).json(schedules);
    } else {
      res.status(404).json({ message: 'Not found dentists work schedule information' });
    }
  } catch (error) {
    console.error('Error when get dentists work schedule information', error);
    res.status(500).json({ message: 'Error when get dentists work schedule information' });
  }
});

app.post('/reportTreatmentPlans', async function (req, res) {
  const { selectedStartDate, selectedEndDate } = req.body;
  const pool = await conn;
  const sqlString = `
  select * from treatmentPlan
  where treatmentPlanDate between '${selectedStartDate}' and '${selectedEndDate}'
  order by treatmentPlanDate, dentistUserName`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    const treatmentPlans = result.recordset;
    if (result.recordset[0]) {
      res.status(200).json(treatmentPlans);
    } else {
      res.status(404).json({ message: 'Not found treatment plan information' });
    }
  } catch (error) {
    console.error('Error when report treatment plans', error);
    res.status(500).json({ message: 'Error when report treatment plans' });
  }
});

app.post('/reportAppointments', async function (req, res) {
  const { selectedStartDate, selectedEndDate } = req.body;
  const pool = await conn;
  const sqlString = `
  select * from scheduleAppointment
  where appointmentDate between '${selectedStartDate}' and '${selectedEndDate}'
  order by appointmentDate, dentistUserName`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    const appointments = result.recordset;
    if (result.recordset[0]) {
      res.status(200).json(appointments);
    } else {
      res.status(404).json({ message: 'Not found appointment information' });
    }
  } catch (error) {
    console.error('Error when report appointments', error);
    res.status(500).json({ message: 'Error when report appointments' });
  }
});

app.post('/updateOralHealth', async function (req, res) {
  const { medicalRecordId, oralHealth } = req.body;
  const pool = await conn;
  const sqlString = `
  UPDATE medicalRecord 
  SET oralHealth = '${oralHealth}'  
  WHERE medicalRecordId = '${medicalRecordId}'`;
  try {
    const request = pool.request();
    const result = await request.query(sqlString);
    if (result.rowsAffected[0] === 1) {
      res.status(200).json({ message: 'Success update oral health' });
    } else if (result.rowsAffected[0] === 0) {
      res.status(404).json({ message: 'Not found medical record to update' });
    } 
  } catch (error) {
    console.error('Error when update oral health', error);
  };
});


app.listen(3000, function () {
  console.log("Server listen at port 3000");
});
