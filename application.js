// Get selected job from URL
const urlParams = new URLSearchParams(window.location.search);
const selectedJob = urlParams.get("job");

// Display selected job
const selectedJobElement = document.getElementById("selectedJob");

if (selectedJob) {
    selectedJobElement.textContent = selectedJob;
} else {
    selectedJobElement.textContent = "Not Selected";
}

const applicationForm = document.getElementById("applicationForm");
const successMessage = document.getElementById("successMessage");

applicationForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const resume = document.getElementById("resume").files[0];

    // Validate full name
    if (name.length < 3) {
        alert("Name must contain at least 3 characters.");
        return;
    }

    // Validate phone number
    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }

    // Validate resume
    if (!resume || !resume.name.toLowerCase().endsWith(".pdf")) {
        alert("Please upload a PDF resume.");
        return;
    }

    // Demo submission
    successMessage.textContent =
        "Application submitted successfully! (Demo only)";

    applicationForm.reset();

});