// Signup
document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  const res = await fetch('http://localhost:5000/Mentor/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const result = await res.json();
  alert(JSON.stringify(result));
});

// Login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  const res = await fetch('http://localhost:5000/Mentor/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const result = await res.json();
  alert(`Welcome ${result.First_name || 'Mentor'}!`);
});

// Upload Course
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const res = await fetch('http://localhost:5000/course/upload', {
    method: 'POST',
    body: formData
  });
  const result = await res.json();
  alert('Course uploaded!');
});

// Load Courses
async function fetchCourses() {
  const res = await fetch('http://localhost:5000/course');
  const courses = await res.json();
  const courseList = document.getElementById('courseList');
  courseList.innerHTML = courses.map(course => `
    <div>
      <h3>${course.title}</h3>
      <p>${course.description}</p>
      <p><strong>Mentor:</strong> ${course.mentor.First_name} ${course.mentor.Last_name}</p>
      <video width="320" height="240" controls>
        <source src="${course.videoUrl}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
    <hr>
  `).join('');
}

