document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("rsvp-form");
    const attendingSelect = document.getElementById("attending");
    const familyDiv = document.getElementById("family-div");
    const messageDiv = document.getElementById("message-div");
    const emailDiv = document.getElementById("email-div");

    // Function to toggle visibility based on attending selection
    const toggleVisibility = () => {
        if (attendingSelect.value === "yes") {
            familyDiv.style.display = "block";
            messageDiv.style.display = "block";
            emailDiv.style.display = "block";
        } else {
            familyDiv.style.display = "none";
            messageDiv.style.display = "none";
            emailDiv.style.display = "none";
        }
    };

    // Initial check on page load
    toggleVisibility();

    // Add event listener to handle changes in the dropdown
    attendingSelect.addEventListener("change", toggleVisibility);

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        // Get form values
        const name = document.getElementById("name").value.trim();
        const attending = attendingSelect.value;
        const email = document.getElementById("email").value.trim();
        const family = document.getElementById("family").value.trim();
        const message = document.getElementById("message").value.trim();

        // Validate inputs
        if (!name || !attending || !email) {
            alert("Vul asseblief alle vereiste velde in.");
            return;
        }

        // Log the form data (you can replace this with an AJAX request to send the data to a server)
        console.log("RSVP Details:");
        console.log("Name:", name);
        console.log("Attending:", attending);
        console.log("Email:", email);
        console.log("Family:", family);
        console.log("Message:", message);

        // Show a success message
        alert("Dankie! Jou RSVP is gestuur.");
        
        // Optionally, reset the form
        form.reset();
        toggleVisibility(); // Reset visibility after form reset
    });
});