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

        const name = document.getElementById("name").value.trim();
        const attending = attendingSelect.value;

        // Validate inputs
        if (!name || !attending) {
            alert("Vul asseblief alle vereiste velde in.");
            return;
        }

        if (attending === "no") {
            // Log the form data for "No" case
            console.log("RSVP Details:");
            console.log("Name:", name);
            console.log("Attending:", attending);

            // Show a success message
            alert("Dankie! Jou antwoord is gestuur.");
        } else if (attending === "yes") {
            const email = document.getElementById("email").value.trim();
            const family = document.getElementById("family").value.trim();
            const message = document.getElementById("message").value.trim();

            // Validate additional inputs for "Yes" case
            if (!email) {
                alert("Vul asseblief jou e-posadres in.");
                return;
            }

            // Log the form data for "Yes" case
            console.log("RSVP Details:");
            console.log("Name:", name);
            console.log("Attending:", attending);
            console.log("Email:", email);
            console.log("Family:", family);
            console.log("Message:", message);

            // Show a success message
            alert("Dankie! Jou RSVP is gestuur.");
        }

        // Optionally, reset the form
        form.reset();
        toggleVisibility(); // Reset visibility after form reset
    });
});