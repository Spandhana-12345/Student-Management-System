// ==========================================
// Student Management System
// Week 5 - Task 5
// Project Features
// ==========================================


// ==========================================
// 1. Student Data
// ==========================================

let students = [

    {
        id: 1,
        name: "Spandhana",
        email: "spandhana@example.com",
        course: "CSE (AI-ML)",
        marks: 85
    },

    {
        id: 2,
        name: "Rahul",
        email: "rahul@example.com",
        course: "CSE",
        marks: 72
    },

    {
        id: 3,
        name: "Priya",
        email: "priya@example.com",
        course: "ECE",
        marks: 46
    }

];

let nextStudentId = 4;

let editingId = null;


// ==========================================
// 2. Selecting HTML Elements
// ==========================================

const studentForm = document.getElementById("studentForm");

const studentName = document.getElementById("studentName");

const studentEmail = document.getElementById("studentEmail");

const studentCourse = document.getElementById("studentCourse");

const studentMarks = document.getElementById("studentMarks");

const searchInput = document.getElementById("searchInput");

const courseFilter = document.getElementById("courseFilter");

const resultFilter = document.getElementById("resultFilter");

const sortMarks = document.getElementById("sortMarks");

const studentList = document.getElementById("studentList");

const studentCount = document.getElementById("studentCount");

const totalStudents = document.getElementById("totalStudents");

const averageMarks = document.getElementById("averageMarks");

const highestMarks = document.getElementById("highestMarks");

const noRecords = document.getElementById("noRecords");


// ==========================================
// 3. Calculate Result
// ==========================================

function calculateResult(marks) {

    if (marks >= 50) {

        return "Pass";

    } else {

        return "Fail";

    }

}


// ==========================================
// 4. Create Student Card
// ==========================================

function createStudentCard(student) {

    const card = document.createElement("article");

    card.className = "student-card";


    // Header

    const cardHeader = document.createElement("div");

    cardHeader.className = "student-card-header";


    const name = document.createElement("h3");

    name.textContent = student.name;


    const status = document.createElement("span");

    status.className = "status-badge";

    status.textContent = calculateResult(student.marks);


    if (student.marks < 50) {

        status.style.backgroundColor = "#f2dede";

        status.style.color = "#a94442";

    }


    cardHeader.appendChild(name);

    cardHeader.appendChild(status);


    // Details

    const details = document.createElement("div");

    details.className = "student-details";


    const email = document.createElement("p");

    email.innerHTML =
        "<strong>Email:</strong> " + student.email;


    const course = document.createElement("p");

    course.innerHTML =
        "<strong>Course:</strong> " + student.course;


    const marks = document.createElement("p");

    marks.innerHTML =
        "<strong>Marks:</strong> " + student.marks;


    details.appendChild(email);

    details.appendChild(course);

    details.appendChild(marks);


    // Buttons

    const buttons = document.createElement("div");

    buttons.className = "card-buttons";


    const editButton = document.createElement("button");

    editButton.type = "button";

    editButton.className = "btn btn-edit";

    editButton.textContent = "Edit";


    const deleteButton = document.createElement("button");

    deleteButton.type = "button";

    deleteButton.className = "btn btn-delete";

    deleteButton.textContent = "Delete";


    // Edit button

    editButton.addEventListener("click", function () {

        editStudent(student.id);

    });


    // Delete button

    deleteButton.addEventListener("click", function () {

        deleteStudent(student.id);

    });


    buttons.appendChild(editButton);

    buttons.appendChild(deleteButton);


    card.appendChild(cardHeader);

    card.appendChild(details);

    card.appendChild(buttons);


    return card;

}


// ==========================================
// 5. Display Students
// ==========================================

function displayStudents(studentData = students) {

    studentList.innerHTML = "";

    studentCount.textContent = studentData.length;

    updateStatistics();


    if (studentData.length === 0) {

        noRecords.style.display = "block";

        noRecords.textContent =
            "No student records found.";

        studentList.appendChild(noRecords);

        return;

    }


    noRecords.style.display = "none";


    // Loop through the filtered students

    studentData.forEach(function (student) {

        const card = createStudentCard(student);

        studentList.appendChild(card);

    });

}


// ==========================================
// 6. Update Statistics
// ==========================================

function updateStatistics() {

    // Total student count

    totalStudents.textContent = students.length;


    // Calculate average

    if (students.length === 0) {

        averageMarks.textContent = "0";

        highestMarks.textContent = "0";

        return;

    }


    let total = 0;


    for (let i = 0; i < students.length; i++) {

        total += students[i].marks;

    }


    const average = total / students.length;

    averageMarks.textContent = average.toFixed(2);


    // Find highest marks

    const highestStudent = students.reduce(

        function (highest, student) {

            if (student.marks > highest.marks) {

                return student;

            }

            return highest;

        }

    );


    highestMarks.textContent =
        highestStudent.marks;

}


// ==========================================
// 7. Add / Update Student
// ==========================================

studentForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const name = studentName.value.trim();

    const email = studentEmail.value.trim();

    const course = studentCourse.value;

    const marks = Number(studentMarks.value);


    // ==========================================
    // Form Validation
    // ==========================================

    if (name === "") {

        alert("Please enter the student name.");

        studentName.focus();

        return;

    }


    if (email === "") {

        alert("Please enter the email address.");

        studentEmail.focus();

        return;

    }


    if (course === "") {

        alert("Please select a course.");

        studentCourse.focus();

        return;

    }


    if (studentMarks.value === "") {

        alert("Please enter the marks.");

        studentMarks.focus();

        return;

    }


    if (marks < 0 || marks > 100) {

        alert("Marks must be between 0 and 100.");

        studentMarks.focus();

        return;

    }


    // ==========================================
    // Update Student
    // ==========================================

    if (editingId !== null) {

        const student = students.find(function (item) {

            return item.id === editingId;

        });


        if (student) {

            student.name = name;

            student.email = email;

            student.course = course;

            student.marks = marks;

            alert("Student updated successfully.");

        }


        editingId = null;


        studentForm.querySelector(
            'button[type="submit"]'
        ).textContent = "Add Student";

    }


    // ==========================================
    // Add New Student
    // ==========================================

    else {

        const newStudent = {

            id: nextStudentId++,

            name: name,

            email: email,

            course: course,

            marks: marks

        };


        students.push(newStudent);


        alert("Student added successfully.");

    }


    studentForm.reset();

    applyFilters();

});


// ==========================================
// 8. Edit Student
// ==========================================

function editStudent(id) {

    const student = students.find(function (item) {

        return item.id === id;

    });


    if (!student) {

        return;

    }


    studentName.value = student.name;

    studentEmail.value = student.email;

    studentCourse.value = student.course;

    studentMarks.value = student.marks;


    editingId = id;


    studentForm.querySelector(
        'button[type="submit"]'
    ).textContent = "Update Student";


    document.getElementById(
        "add-student"
    ).scrollIntoView({

        behavior: "smooth"

    });

}


// ==========================================
// 9. Delete Student
// ==========================================

function deleteStudent(id) {

    const student = students.find(function (item) {

        return item.id === id;

    });


    if (!student) {

        return;

    }


    const confirmation = confirm(
        "Delete " + student.name + "?"
    );


    if (!confirmation) {

        return;

    }


    students = students.filter(function (student) {

        return student.id !== id;

    });


    alert("Student deleted successfully.");


    applyFilters();

}


// ==========================================
// 10. Search, Filter and Sort
// ==========================================

function applyFilters() {

    let filteredStudents = [...students];


    // ==========================================
    // Search by Name
    // ==========================================

    const searchText =
        searchInput.value.trim().toLowerCase();


    if (searchText !== "") {

        filteredStudents = filteredStudents.filter(
            function (student) {

                return student.name
                    .toLowerCase()
                    .includes(searchText);

            }
        );

    }


    // ==========================================
    // Filter by Course
    // ==========================================

    const selectedCourse =
        courseFilter.value;


    if (selectedCourse !== "all") {

        filteredStudents = filteredStudents.filter(
            function (student) {

                return student.course === selectedCourse;

            }
        );

    }


    // ==========================================
    // Filter by Result
    // ==========================================

    const selectedResult =
        resultFilter.value;


    if (selectedResult !== "all") {

        filteredStudents = filteredStudents.filter(
            function (student) {

                return calculateResult(student.marks)
                    === selectedResult;

            }
        );

    }


    // ==========================================
    // Sort by Marks
    // ==========================================

    if (sortMarks.value === "high") {

        filteredStudents.sort(
            function (a, b) {

                return b.marks - a.marks;

            }
        );

    }


    if (sortMarks.value === "low") {

        filteredStudents.sort(
            function (a, b) {

                return a.marks - b.marks;

            }
        );

    }


    // Display final result

    displayStudents(filteredStudents);

}


// ==========================================
// 11. Input Event
// ==========================================

searchInput.addEventListener(
    "input",
    function () {

        applyFilters();

    }
);


// ==========================================
// 12. Course Filter Change Event
// ==========================================

courseFilter.addEventListener(
    "change",
    function () {

        applyFilters();

    }
);


// ==========================================
// 13. Result Filter Change Event
// ==========================================

resultFilter.addEventListener(
    "change",
    function () {

        applyFilters();

    }
);


// ==========================================
// 14. Sorting Change Event
// ==========================================

sortMarks.addEventListener(
    "change",
    function () {

        applyFilters();

    }
);


// ==========================================
// 15. Reset Form
// ==========================================

studentForm.addEventListener(
    "reset",
    function () {

        editingId = null;


        setTimeout(function () {

            studentForm.querySelector(
                'button[type="submit"]'
            ).textContent = "Add Student";

        }, 0);

    }
);


// ==========================================
// 16. Initial Display
// ==========================================

displayStudents();


// ==========================================
// 17. Console Message
// ==========================================

console.log(
    "Student Management System is ready!"
);