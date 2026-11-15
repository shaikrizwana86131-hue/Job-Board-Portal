const jobForm = document.getElementById("jobForm");
const adminJobList = document.getElementById("adminJobList");
const adminMessage = document.getElementById("adminMessage");

const STORAGE_KEY = "careerConnectJobs";

// Load saved jobs
let jobs = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

// Display jobs
function displayJobs() {
    adminJobList.innerHTML = "";

    if (jobs.length === 0) {
        adminJobList.textContent = "No jobs added yet.";
        return;
    }

    jobs.forEach(function(job) {
        const card = document.createElement("div");
        card.className = "admin-job-card";

        const title = document.createElement("h3");
        title.textContent = job.title;

        const company = document.createElement("p");
        company.textContent = "Company: " + job.company;

        const location = document.createElement("p");
        location.textContent = "Location: " + job.location;

        const salary = document.createElement("p");
        salary.textContent = "Salary: " + job.salary;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function() {
            jobs = jobs.filter(item => item.id !== job.id);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
            displayJobs();
        });

        card.append(title, company, location, salary, deleteButton);
        adminJobList.appendChild(card);
    });
}

// Add new job
jobForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const newJob = {
        id: crypto.randomUUID(),
        title: document.getElementById("jobTitle").value.trim(),
        company: document.getElementById("company").value.trim(),
        location: document.getElementById("location").value,
        salary: document.getElementById("salary").value.trim()
    };

    if (!newJob.title || !newJob.company ||
        !newJob.location || !newJob.salary) {
        adminMessage.textContent = "Please fill all fields.";
        return;
    }

    jobs.push(newJob);

    // Save jobs in browser
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));

    adminMessage.textContent = "Job added successfully!";

    jobForm.reset();
    displayJobs();
});

// Show saved jobs on page load
displayJobs();