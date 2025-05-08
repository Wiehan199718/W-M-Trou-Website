document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("rsvp-form");
    const attendingSelect = document.getElementById("attending");
    const familyDiv = document.getElementById("family-div");
    const messageDiv = document.getElementById("message-div");
    const emailDiv = document.getElementById("email-div");
    const formMessage = document.getElementById('form-message');
    const submitButton = document.getElementById('submit-button');

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

        /*const name = document.getElementById("name").value.trim();
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
        toggleVisibility(); // Reset visibility after form reset */

        submitButton.disabled = true; // Disable button during submission
        formMessage.textContent = 'Sending RSVP...';
        formMessage.className = 'form-message'; // Reset classes

        // **IMPORTANT: Replace this URL with your actual Google Apps Script Web App URL**
        const googleAppsScriptUrl = 'https://script.google.com/macros/s/AKfycbykghww1ae0hcAyVgHXivXQNUdHpM7jzWPpXm8jXNW4XZw7kPf36TH7SJf49VNxaV7nyw/exec';

        // Create a FormData object from the form
        const formData = new FormData(form);

        // Convert FormData to a plain object for easier handling in Apps Script (optional but common)
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Add a timestamp (optional but useful)
        data.timestamp = new Date().toISOString();

        // Send the data to Google Apps Script
        fetch(googleAppsScriptUrl, {
            method: 'POST',
            // Use 'no-cors' mode if your Apps Script doesn't handle CORS preflight (simpler setup)
            // mode: 'no-cors', // Use this if you get CORS errors initially
            // OR handle CORS properly in Apps Script and remove 'mode: no-cors'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data) // Send data as JSON
             // If using 'no-cors', you might need to send as FormData directly or URL-encoded string
             // body: formData // Alternative if not sending JSON
        })
        .then(response => {
             // Note: With 'no-cors', the response will be opaque, meaning you can't read its content or status directly.
             // You'll have to rely on the fact that the request was sent.
             // If you *don't* use 'no-cors' and handle CORS in Apps Script:
             if (response.ok) {
                 return response.json(); // Or response.text() depending on what your script returns
             } else {
                 // Try to get error details if possible
                  return response.text().then(text => { throw new Error('Network response was not ok: ' + text) });
             }
        })
        .then(result => {
            // This block runs if the fetch was successful *and* you are NOT using 'no-cors'
            console.log('Success:', result); // Log success details from Apps Script
            formMessage.textContent = 'Thank you for your RSVP!';
            formMessage.className = 'form-message success'; // Add success class
            rsvpForm.reset(); // Clear the form
            additionalFields.classList.add('hidden'); // Hide extra fields again
        })
        .catch(error => {
            console.error('Error submitting form:', error);
            formMessage.textContent = 'There was an error sending your RSVP. Please try again or contact us directly.';
            formMessage.className = 'form-message error'; // Add error class
        })
        .finally(() => {
            submitButton.disabled = false; // Re-enable the button
             // If using 'no-cors', you might assume success here or provide a less specific success message
             // as you can't confirm it from the response.
             // Example for 'no-cors':
            // if (googleAppsScriptUrl !== 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE') { // Check if URL was replaced
            //     formMessage.textContent = 'Thank you! Your RSVP has been sent.';
            //     formMessage.className = 'form-message success';
            //      rsvpForm.reset();
            //      additionalFields.classList.add('hidden');
            // } else {
            //     formMessage.textContent = 'Setup Error: Google Apps Script URL not configured.';
            //     formMessage.className = 'form-message error';
            });

    });
});