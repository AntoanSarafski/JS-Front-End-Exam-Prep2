const tasksUrl = `http://localhost:3030/jsonstore/tasks`;

const courseTypes = ["Long", "Medium", "Short"];

const loadButtonElement = document.querySelector("#load-course");
const addButtonElement = document.querySelector("#add-course");
const courseTitleElement = document.querySelector("#course-name");
const courseTypeElement = document.querySelector("#course-type");
const courseDescriptionElement = document.querySelector("#description");
const courseTeacherElement = document.querySelector("#teacher-name");

loadButtonElement.addEventListener("click", loadCourses);
addButtonElement.addEventListener("click", addCourse);

async function addCourse(e) {
  e.preventDefault();
  const title = courseTitleElement.value;
  const type = courseTypeElement.value;
  const description = courseDescriptionElement.value;
  const teacher = courseTeacherElement.value;

  const course = {
    title,
    type,
    description,
    teacher,
  };

  await fetch(tasksUrl, {
    method: "POST",
    body: JSON.stringify(course),
  });

  courseTitleElement.value = "";
  courseTypeElement.value = "";
  courseDescriptionElement.value = "";
  courseTeacherElement.value = "";

  await loadCourses();
}

async function loadCourses() {
  const response = await fetch(tasksUrl);
  const data = await response.json();

  const courses = Object.values(data);
  const courseListElement = document.querySelector("#list");

  for (const course of courses) {
    const courseElement = renderCourse(course);
    courseListElement.appendChild(courseElement);
  }
}

/* BETTER PERFORMANCE !!!

  const coursesFragment = document.createDocumentFragment();

  courses
    .map((course) => renderCourse(course))
    .forEach((courseElement) => coursesFragment.appendChild(courseElement));

  courseListElement.appendChild(coursesFragment);
  */

function renderCourse(course) {
  /* 
    <div class="container">
        <h2>JS Back-End</h2>
        <h3>John Brown</h3>
        <h3>Long</h3>
        <h4>JS Back-end responsible for managing the interchange of data between the server
            and the users</h4>
        <button class="edit-btn">Edit Course</button>
      <button class="finish-btn">Finish Course</button>
    </div> 
*/
  const headingElement = document.createElement("h2");
  headingElement.textContent = course.title;

  const teacherElement = document.createElement("h3");
  teacherElement.textContent = course.teacher;

  const typeElement = document.createElement("h3");
  typeElement.textContent = course.type;

  const descriptionElement = document.createElement("h4");
  descriptionElement.textContent = course.description;

  const editButtonElement = document.createElement("button");
  editButtonElement.className = "edit-btn";
  editButtonElement.textContent = "Edit Course";

  const finishButtonElement = document.createElement("button");
  finishButtonElement.className = "finish-btn";
  finishButtonElement.textContent = "Finish Course";

  const courseContainer = document.createElement("div");
  courseContainer.className = "container";
  courseContainer.appendChild(headingElement);
  courseContainer.appendChild(teacherElement);
  courseContainer.appendChild(typeElement);
  courseContainer.appendChild(descriptionElement);
  courseContainer.appendChild(editButtonElement);
  courseContainer.appendChild(finishButtonElement);

  return courseContainer;
}
