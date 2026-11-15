// CareerConnect - Job Board Portal

const searchInput = document.getElementById("searchInput");
const locationFilter = document.getElementById("locationFilter");
const searchBtn = document.getElementById("searchBtn");
const jobContainer = document.getElementById("jobContainer");

const STORAGE_KEY = "careerConnectJobs";

// Default job listings
const defaultJobs = [
    {
        id: "default-1",
        title: "Frontend Developer",
        company: "Tech Solutions",
        location: "Hyderabad",
        salary: "₹4–6 LPA"
    },
    {
        id: "default-2",
        title: "Python Developer",
        company: "CodeTech",
        location: "Bangalore",
        salary: "₹5–8 LPA"
    },
    {
        id: "default-3",
        title: "Web Developer Intern",
        company: "Innovate Labs",
        location: "Remote",
        salary: "₹15,000/month"
    }
];

// Load jobs added by admin
function getAllJobs() {
    const savedJobs = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
    );

    return [...defaultJobs, ...savedJobs];
}

// Display jobs on homepage
function displayJobs() {

    const searchText = searchInput.value.toLowerCase().trim();
    const selectedLocation = locationFilter.value.toLowerCase();

    const jobs = getAllJobs();

    // Filter jobs by role and location
    const filteredJobs = jobs.filter(function(job) {

        const matchesRole = job.title
            .toLowerCase()
            .includes(searchText);

        const matchesLocation =
            selectedLocation === "" ||
            job.location.toLowerCase() === selectedLocation;

        return matchesRole && matchesLocation;
    });

    // Clear existing job cards
    jobContainer.innerHTML = "";

    // No results message
    if (filteredJobs.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No jobs found. Try another search.";
        message.style.color = "red";
        message.style.gridColumn = "1 / -1";

        jobContainer.appendChild(message);
        return;
    }

    // Create job cards
    filteredJobs.forEach(function(job) {

        const card = document.createElement("div");
        card.className = "job-card";

        const title = document.createElement("h3");
        title.textContent = job.title;

        const company = document.createElement("p");
        company.textContent = "Company: " + job.company;

        const location = document.createElement("p");
        location.textContent = "Location: " + job.location;

        const salary = document.createElement("p");
        salary.textContent = "Salary: " + job.salary;

        const applyButton = document.createElement("a");
        applyButton.className = "btn";
        applyButton.textContent = "Apply Now";
        applyButton.href =
            "apply.html?job=" + encodeURIComponent(job.title);

        card.append(
            title,
            company,
            location,
            salary,
            applyButton
        );

        jobContainer.appendChild(card);
    });
}

// Search button
searchBtn.addEventListener("click", displayJobs);

// Real-time role filtering
searchInput.addEventListener("input", displayJobs);

// Real-time location filtering
locationFilter.addEventListener("change", displayJobs);

// Display jobs when page loads
displayJobs();