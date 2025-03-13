// Booking form functionality
const bookingForm = document.getElementById('booking-form');
const formSteps = document.querySelectorAll('.form-step');
const summaryContent = document.getElementById('summary-content');

// Navigate between booking steps
function nextStep(currentStep) {
    document.getElementById(`step${currentStep}`).classList.remove('active');
    document.getElementById(`step${currentStep + 1}`).classList.add('active');
    updateSummary();
}

function prevStep(currentStep) {
    document.getElementById(`step${currentStep}`).classList.remove('active');
    document.getElementById(`step${currentStep - 1}`).classList.add('active');
}

// Update booking summary
function updateSummary() {
    let summary = '<h4>Your Appointment</h4>';
    let totalEstimate = 0;
    
    // Get selected services
    const selectedServices = [];
    document.querySelectorAll('input[name="services"]:checked').forEach(service => {
        let serviceName = service.nextElementSibling.textContent.split('$')[0].trim();
        let price = service.nextElementSibling.querySelector('.price').textContent;
        selectedServices.push({ name: serviceName, price: price });
        
        // Extract numeric value from price (e.g., "$45+" becomes 45)
        let priceValue = parseInt(price.replace(/\D/g,''));
        totalEstimate += priceValue;
    });
    
    // Get selected stylist
    const stylistInput = document.querySelector('input[name="stylist"]:checked');
    let selectedStylist = stylistInput ? stylistInput.value : '';
    
    // Get selected date and time
    const selectedDate = document.querySelector('.day.selected')?.getAttribute('data-date') || '';
    const selectedTime = document.querySelector('.time-slot.selected')?.textContent || '';
    
    // Build summary HTML
    if (selectedServices.length > 0) {
        summary += '<div class="summary-section"><h5>Services:</h5><ul>';
        selectedServices.forEach(service => {
            summary += `<li>${service.name} <span>${service.price}</span></li>`;
        });
        summary += '</ul></div>';
    }
    
    if (selectedStylist) {
        summary += `<div class="summary-section"><h5>Stylist:</h5><p>${selectedStylist}</p></div>`;
    }
    
    if (selectedDate && selectedTime) {
        summary += `<div class="summary-section"><h5>Date & Time:</h5><p>${selectedDate} at ${selectedTime}</p></div>`;
    }
    
    if (totalEstimate > 0) {
        summary += `<div class="summary-total"><h5>Estimated Total:</h5><p>$${totalEstimate}+</p><small>(Final price may vary based on hair length, condition, etc.)</small></div>`;
    }
    
    summaryContent.innerHTML = summary;
}

// Calendar functionality
function generateCalendar() {
    const calendarEl = document.getElementById('calendar-days');
    if (!calendarEl) return;
    
    const date = new Date();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    
    // Update month display
    document.getElementById('current-month').textContent = `${date.toLocaleString('default', { month: 'long' })} ${currentYear}`;
    
    // Clear previous calendar
    calendarEl.innerHTML = '';
    
    // Get first day of month and total days
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Add empty cells for days before the first of month
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('day', 'disabled');
        calendarEl.appendChild(emptyDay);
    }
    
    // Add days of month
    for (let i = 1; i <= daysInMonth; i++) {
        const dayEl = document.createElement('div');
        dayEl.classList.add('day');
        dayEl.textContent = i;
        
        // Format date string (e.g., "March 15, 2025")
        const dateObj = new Date(currentYear, currentMonth, i);
        const dateString = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        dayEl.setAttribute('data-date', dateString);
        
        // Disable past dates
        if (dateObj < new Date().setHours(0, 0, 0, 0)) {
            dayEl.classList.add('disabled');
        } else {
            dayEl.addEventListener('click', function() {
                // Remove selected class from all days
                document.querySelectorAll('.day').forEach(day => day.classList.remove('selected'));
                // Add selected class to clicked day
                this.classList.add('selected');
                // Update summary
                updateSummary();
            });
        }
        
        calendarEl.appendChild(dayEl);
    }
}

// Initialize time slot selection
function initTimeSlots() {
    const timeSlots = document.querySelectorAll('.time-slot');
    timeSlots.forEach(slot => {
        slot.addEventListener('click', function() {
            // Remove selected class from all time slots
            timeSlots.forEach(s => s.classList.remove('selected'));
            // Add selected class to clicked time slot
            this.classList.add('selected');
            // Update summary
            updateSummary();
        });
    });
}

// Initialize month navigation
function initMonthNavigation() {
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    
    if (prevMonthBtn && nextMonthBtn) {
        // Implementation would be more complex with actual date handling
        // This is simplified for this example
        prevMonthBtn.addEventListener('click', function() {
            alert('Previous month functionality would be implemented here');
        });
        
        nextMonthBtn.addEventListener('click', function() {
            alert('Next month functionality would be implemented here');
        });
    }
}

// Handle form submission
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // In a real implementation, you would send the form data to a server
        // For this example, we'll just show an alert
        alert('Thank you for booking with Style Hair Do! Your appointment has been confirmed.');
        
        // Optionally, you could redirect to a confirmation page
        // window.location.href = 'confirmation.html';
    });
}

// Initialize service selection change events
document.querySelectorAll('input[name="services"]').forEach(service => {
    service.addEventListener('change', updateSummary);
});

// Initialize stylist selection change events
document.querySelectorAll('input[name="stylist"]').forEach(stylist => {
    stylist.addEventListener('change', updateSummary);
});

// Initialize booking page elements
document.addEventListener('DOMContentLoaded', function() {
    generateCalendar();
    initTimeSlots();
    initMonthNavigation();
    
    // Initial summary update
    updateSummary();
});
