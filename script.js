const studentTable = document.getElementById("student-table");
const editStudentButton = document.getElementById("editStudentButton");
const addRecordModal = document.getElementById("addRecordModal");
const editStudentModal = document.getElementById("editStudentModal");
const addRecordButton = document.getElementById("addRecordButton");
const addRecordForm = document.getElementById("addRecordForm");
const editStudentForm = document.getElementById("editStudentForm");
let studentToEditId;

addRecordForm.onclick = (e) => e.stopPropagation();
editStudentForm.onclick = (e) => e.stopPropagation();

addRecordButton.onclick = () => {
  addRecordModal.classList.toggle("show");
};

function displayStudents() {
  const localStorage = window.localStorage;
  const students = JSON.parse(localStorage.getItem("students")) || [];

  const studentsHtml = students.map(
    (student) => `<tr>
              <td>${student.id}</td>
              <td>${student.matNumber}</td>
              <td>${student.firstName}</td>
              <td>${student.lastName}</td>
              <td>${student.DOB}</td>
              <td>${student.gender}</td>
              <td>${Number(student.CGPA).toFixed(2)}</td>
              <td><button onClick="openEditStudentModal(${student.id})"><svg
                        height="20"
                        width="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                            stroke="rgb(0, 140, 255)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 22786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                            stroke="rgb(0, 140, 255)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </g>
                      </svg></button><button  onclick="deleteStudent(1)"><svg
              height="20"
              width="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M10 12V17"
                  stroke="red"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M14 12V17"
                  stroke="red"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M4 7H20"
                  stroke="red"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                  stroke="red"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                  stroke="red"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg></button></td>
            </tr>`
  );

  studentTable.innerHTML = studentsHtml.join("");
}

addRecordModal.onclick = () => {
  addRecordModal.classList.toggle("show");
};

editStudentModal.onclick = () => {
  editStudentModal.classList.toggle("show");
};

addRecordForm.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const students = JSON.parse(localStorage.getItem("students")) || [];

  const newStudent = {
    // id: crypto.randomUUID().split("-").at(-1),
    id: students.length + 1,
    matNumber: formData.get("mat-number"),
    firstName: formData.get("first-name"),
    lastName: formData.get("last-name"),
    DOB: formData.get("DOB"),
    gender: formData.get("gender"),
    CGPA: formData.get("CGPA"),
  };

  students.push(newStudent);
  addRecordModal.classList.remove("show");
  window.localStorage.setItem("students", JSON.stringify(students));
  displayStudents();
};

editStudentForm.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  let students = JSON.parse(localStorage.getItem("students")) || [];
  const studentToEditIndex = students.findIndex(
    (student) => student.id === studentToEditId
  );
  let studentToEdit = students[studentToEditIndex];
  if (studentToEdit) {
    const matNumber = formData.get("mat-number");
    const firstName = formData.get("first-name");
    const lastName = formData.get("last-name");
    const DOB = formData.get("DOB");
    const gender = formData.get("gender");
    const CGPA = formData.get("CGPA");
    students[studentToEditIndex] = {
      ...studentToEdit,
      matNumber,
      firstName,
      lastName,
      DOB,
      gender,
      CGPA,
    };
    editStudentModal.classList.remove("show");
    window.localStorage.setItem("students", JSON.stringify(students));
  }
  displayStudents();
};

function openEditStudentModal(id) {
  editStudentModal.classList.toggle("show");
  studentToEditId = id;
  const matNumberField = document.getElementById("edit-mat-number");
  const firstNameField = document.getElementById("edit-first-name");
  const lastNameField = document.getElementById("edit-last-name");
  const DOBField = document.getElementById("edit-DOB");
  const genderField = document.getElementById("edit-gender");
  const CGPAField = document.getElementById("edit-CGPA");
  let students = JSON.parse(localStorage.getItem("students")) || [];
  const studentToEdit = students.find((student) => student.id === id);
  matNumberField.value = studentToEdit.matNumber;
  firstNameField.value = studentToEdit.firstName;
  lastNameField.value = studentToEdit.lastName;
  DOBField.value = studentToEdit.DOB;
  genderField.value = studentToEdit.gender;
  CGPAField.value = Number(studentToEdit.CGPA).toFixed(2);
}

function deleteStudent(id) {
  let students = JSON.parse(localStorage.getItem("students")) || [];
  if (students.length) {
    students = students.filter((student) => student.id !== id);
    window.localStorage.setItem("students", JSON.stringify(students));
  }
  displayStudents();
}

displayStudents();
