async function Login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  try {
    const response = await fetch(`http://localhost:3000/Login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (response.status === 200) {
      if (data === 'Admin') {
          sessionStorage.setItem('loggedInUser', username);
          sessionStorage.setItem('accountType', 'Admin');
          window.location.href = 'admin.html';
      } else if (data === 'Staff') {
          sessionStorage.setItem('loggedInUser', username);
          sessionStorage.setItem('accountType', 'Staff');
          window.location.href = 'staff.html';
      } else if (data === 'Dentist') {
          sessionStorage.setItem('loggedInUser', username);
          sessionStorage.setItem('accountType', 'Dentist');
          window.location.href = 'dentist.html';  
      }
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Có lỗi xảy ra:', error);
  }
}


module.exports =  { Login};