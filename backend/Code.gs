/* =========================================
   CONFIGURATION
   ========================================= */
const RESEND_API_KEY = "re_YbBNGonM_BYAnDJBN4PEoVZWLg44oqPu7"; 
const APP_NAME = "EduManager";
const SPREADSHEET_ID = "1zI1JXrX9OUjWfVbIsy-Pjrb_R0CUV27rf96xujQHCiM"; // User Provided Sheet

/* =========================================
   INITIAL SETUP (Run this function once)
   ========================================= */
function initialSetup() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  
  const schemas = {
    "Auth_Users": ["UserID", "Email", "Mobile", "PasswordHash", "Role", "Status", "ResetToken", "TokenExpiry"],
    "Students": ["RegNo", "Name", "DOB", "Gender", "Course", "Year", "Email", "Address", "Mobile", "ParentContact", "Status"],
    "Teachers": ["TeacherID", "Name", "Email", "Mobile", "Dept", "Designation", "DateJoined"],
    "Email_Logs": ["Timestamp", "Recipient", "Subject", "Status", "TriggeredBy_UserID"],
    "Attendance": ["Date", "StudentID", "Status", "Course"],
    "Results": ["ExamName", "StudentID", "Course", "Subject", "Marks", "Total", "Grade"],
    "Courses": ["CourseID", "Name", "FullName", "Duration", "Fees"],
    "Events": ["EventID", "Title", "Date", "Description", "Type"]
  };

  Object.keys(schemas).forEach(sheetName => {
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      sheet.deleteRows(2, sheet.getMaxRows() - 2); // Cleanup default rows
      sheet.appendRow(schemas[sheetName]); 
      // Style headers
      sheet.getRange(1, 1, 1, schemas[sheetName].length).setFontWeight("bold").setBackground("#f3f4f6");
    } else {
       if (sheet.getLastRow() === 0) {
         sheet.appendRow(schemas[sheetName]);
         sheet.getRange(1, 1, 1, schemas[sheetName].length).setFontWeight("bold").setBackground("#f3f4f6");
       }
    }
  });

  // --- CREATE DEFAULT ADMIN ---
  const authSheet = ss.getSheetByName("Auth_Users");
  const data = authSheet.getDataRange().getValues();
  const adminEmail = "priyadharshini02763@gmail.com";
  
  // Check if admin email exists in column 2 (index 1)
  const adminExists = data.some(row => row[1] === adminEmail);
  
  if (!adminExists) {
    const passHash = hashPassword("123456");
    // [UserID, Email, Mobile, PasswordHash, Role, Status, ResetToken, TokenExpiry]
    authSheet.appendRow(["ADM001", adminEmail, "0000000000", passHash, "Admin", "Active", "", ""]);
  }
  
  return "Database Setup Complete & Admin Created.";
}

/* =========================================
   MAIN ROUTER (doPost)
   ========================================= */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;

    // Run setup if needed (lazy check, but initialSetup() is better manually)
    // --- AUTH ---
    if (action === 'login') return sendJSON(loginUser(data));
    if (action === 'registerStudent') return sendJSON(registerStudent(data));
    if (action === 'forgotPassword') return sendJSON(forgotPassword(data));
    if (action === 'resetPassword') return sendJSON(resetPassword(data));

    // --- ADMIN / TEACHER ACTIONS ---
    if (action === 'approveUser') return sendJSON(approveUser(data));
    if (action === 'sendBulkEmails') return sendJSON(sendBulkEmails(data));
    if (action === 'getEmailLogs') return sendJSON(getEmailLogs());
    
    // --- DATA MODULES ---
    if (action === 'getStudents') return sendJSON(getStudents(data));
    if (action === 'updateStudent') return sendJSON(updateStudent(data));
    
    return sendJSON({ status: 'error', message: 'Invalid Action' });
  } catch (error) {
    return sendJSON({ status: 'error', message: error.toString() });
  } finally {
    lock.releaseLock();
  }
}

/* =========================================
   HELPER FUNCTIONS
   ========================================= */
function sendJSON(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheet(name) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    // Fallback: create if missing during runtime
    initialSetup();
    sheet = ss.getSheetByName(name);
  }
  return sheet;
}

function hashPassword(password) {
  const rawHash = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, password);
  let txtHash = '';
  for (let i = 0; i < rawHash.length; i++) {
    let hashVal = rawHash[i];
    if (hashVal < 0) hashVal += 256;
    if (hashVal.toString(16).length == 1) txtHash += '0';
    txtHash += hashVal.toString(16);
  }
  return txtHash;
}

/* =========================================
   AUTH SYSTEM
   ========================================= */
function loginUser(data) {
  const sheet = getSheet("Auth_Users");
  const rows = sheet.getDataRange().getValues();
  const hashedPassword = hashPassword(data.password);
  
  // Skip header, find user
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i]; // [UserID, Email, Mobile, PasswordHash, Role, Status, ResetToken, TokenExpiry]
    if (row[1] === data.email && row[3] === hashedPassword) {
      if (row[5] !== 'Active') return { status: 'error', message: 'Account is ' + row[5] };
      return { 
        status: 'success', 
        user: { id: row[0], email: row[1], role: row[4], name: 'User' } // Fetch name from Students/Teachers table ideally
      };
    }
  }
  return { status: 'error', message: 'Invalid credentials' };
}

function registerStudent(data) {
  const authSheet = getSheet("Auth_Users");
  const studentSheet = getSheet("Students");
  
  // Check if email exists
  const users = authSheet.getDataRange().getValues();
  if (users.some(r => r[1] === data.email)) return { status: 'error', message: 'Email already registered' };
  
  const width = studentSheet.getLastColumn();
  const newId = "STU" + new Date().getTime();
  const hashedPassword = hashPassword(data.password);
  
  // Auth_Users: [UserID, Email, Mobile, PasswordHash, Role, Status, ResetToken, TokenExpiry]
  authSheet.appendRow([newId, data.email, data.mobile, hashedPassword, 'Student', 'Pending', '', '']);
  
  // Students: [RegNo, Name, DOB, Gender, Course, Year, Email, Address, Mobile, ParentContact, Status]
  studentSheet.appendRow([newId, data.name, data.dob, data.gender, data.course, data.year, data.email, data.address, data.mobile, data.parentContact, 'Pending']);
  
  // Send Pending Email
  sendEmailResend(data.email, "Registration Received", 
    `<h1>Welcome to EduManager</h1><p>Your registration for ${data.course} is pending approval.</p>`);
    
  return { status: 'success', message: 'Registration pending approval' };
}

function approveUser(data) {
  const sheet = getSheet("Auth_Users");
  const rows = sheet.getDataRange().getValues();
  let found = false;
  let userEmail = "";
  
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === data.userId) { // Match ID
      sheet.getRange(i + 1, 6).setValue('Active'); // Update Status
      userEmail = rows[i][1];
      found = true;
      break;
    }
  }
  
  if (found) {
    // Also update Student sheet status
    const stuSheet = getSheet("Students");
    const stuRows = stuSheet.getDataRange().getValues();
    for(let i=1; i<stuRows.length; i++) {
      if(stuRows[i][0] === data.userId) {
         stuSheet.getRange(i+1, 11).setValue('Active');
         break;
      }
    }

    sendEmailResend(userEmail, "Registration Approved", 
      `<h1>You are Approved!</h1><p>You can now login to the portal.</p>`, "Admin");
    return { status: 'success', message: 'User approved' };
  }
  return { status: 'error', message: 'User not found' };
}

/* =========================================
   RESEND API + LOGGING SYSTEM
   ========================================= */
function sendEmailResend(to, subject, htmlBody, triggeredBy = "System") {
  const url = "https://api.resend.com/emails";
  
  const payload = {
    "from": "Academics <onboarding@resend.dev>", 
    "to": [to],
    "subject": subject,
    "html": htmlBody
  };

  const options = {
    "method": "post",
    "headers": {
      "Authorization": "Bearer " + RESEND_API_KEY,
      "Content-Type": "application/json"
    },
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true
  };

  let status = "Success";
  try {
    const response = UrlFetchApp.fetch(url, options);
    if(response.getResponseCode() >= 400) {
       status = "Failed: " + response.getContentText();
    }
  } catch (e) {
    status = "Failed: " + e.toString();
  }
  
  Logger.log(status);
  logEmailToSheet(to, subject, status, triggeredBy);
  return status === "Success";
}

function logEmailToSheet(recipient, subject, status, actor) {
  const sheet = getSheet("Email_Logs");
  sheet.appendRow([new Date(), recipient, subject, status, actor]);
}

function getEmailLogs() {
  const sheet = getSheet("Email_Logs");
  const rows = sheet.getDataRange().getValues();
  return rows.slice(1).reverse().slice(0, 50); // Newest first
}

function sendBulkEmails(data) {
  // data.recipients = [{email: '...'}, ...], data.subject, data.body
  const recipients = data.recipients;
  let count = 0;
  
  recipients.forEach(u => {
    sendEmailResend(u.email, data.subject, data.body, data.actor);
    count++;
  });
  
  return { status: 'success', message: `Sent ${count} emails` };
}

/* =========================================
   PASSCODE RESET
   ========================================= */
function forgotPassword(data) {
  const sheet = getSheet("Auth_Users");
  const rows = sheet.getDataRange().getValues();
  
  for(let i=1; i<rows.length; i++) {
    if(rows[i][1] === data.email) {
      const otp = Math.floor(100000 + Math.random() * 900000);
      const expiry = new Date().getTime() + 3600000; // 1 hr
      
      sheet.getRange(i+1, 7).setValue(otp);
      sheet.getRange(i+1, 8).setValue(expiry);
      
      sendEmailResend(data.email, "Password Reset OTP", 
        `<p>Your OTP is <b>${otp}</b>. It expires in 1 hour.</p>`);
      return { status: 'success', message: 'OTP sent' };
    }
  }
  return { status: 'error', message: 'Email not found' };
}

function resetPassword(data) {
  const sheet = getSheet("Auth_Users");
  const rows = sheet.getDataRange().getValues();
  
  for(let i=1; i<rows.length; i++) {
    if(rows[i][1] === data.email) {
      const storedOtp = rows[i][6];
      const expiry = rows[i][7];
      
      if(String(storedOtp) === String(data.otp) && new Date().getTime() < expiry) {
         const newHash = hashPassword(data.newPassword);
         sheet.getRange(i+1, 4).setValue(newHash);
         sheet.getRange(i+1, 7).setValue(""); // Clear OTP
         return { status: 'success', message: 'Password Reset Successful' };
      }
      return { status: 'error', message: 'Invalid or Expired OTP' };
    }
  }
  return { status: 'error', message: 'User not found' };
}

/* =========================================
   STUDENT DATA
   ========================================= */
function getStudents(data) {
  const sheet = getSheet("Students");
  const rows = sheet.getDataRange().getValues();
  const headers = rows[0];
  const students = rows.slice(1).map(r => {
    let obj = {};
    headers.forEach((h, i) => obj[h] = r[i]);
    return obj;
  });
  
  // Filter if needed
  if(data.course) {
    return students.filter(s => s.Course === data.course);
  }
  return students;
}

function updateStudent(data) {
  const sheet = getSheet("Students");
  const rows = sheet.getDataRange().getValues();
  
  for(let i=1; i<rows.length; i++) {
    if(rows[i][0] === data.regNo) {
       // Update logic (simplified for Parents/Contact)
       if(data.parentContact) sheet.getRange(i+1, 10).setValue(data.parentContact);
       if(data.mobile) sheet.getRange(i+1, 9).setValue(data.mobile);
       if(data.address) sheet.getRange(i+1, 8).setValue(data.address);
       return { status: 'success', message: 'Updated' };
    }
  }
  return { status: 'error', message: 'Student not found' };
}
