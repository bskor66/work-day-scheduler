var hourSlotArr = [];

var currentTime = dayjs().hour(13);
var currentHour = parseInt(currentTime.format("H"));

function timeDisplayFrom24(time24) {
	if (time24 > 12) {
		return `${time24 % 12} PM`;
	} else if (time24 === 12) {
		return "12 PM";
	} else {
		return `${time24} AM`;
	}
}

function saveEvent() {
	let eventDetails = $(this).siblings("textarea").first().val();
	let hour = $(this).parent().first().attr("id");
	localStorage.setItem(hour, eventDetails);
}

$(function () {
	// TODO: Add a listener for click events on the save button. This code should
	for (let i = 9; i < 18; i++) {
		let hourSlot = $('<div class="row time-block"></div>').attr(
			"id",
			`hour-${i}`
		);
		hourSlot.data.timeDisplay = timeDisplayFrom24(i);

		hourSlot.append(
			$('<div class="col-2 col-md-1 hour text-center py-3"></div>').text(
				hourSlot.data.timeDisplay
			)
		);
		textArea = $(
			'<textarea class="col-8 col-md-10 description" rows="3"> </textarea>'
		);
		textArea.val(localStorage.getItem(hourSlot.attr("id")));
		hourSlot.append(textArea);

		saveButton = $(
			'<button class="btn saveBtn col-2 col-md-1" aria-label="save"><i class="fas fa-save" aria-hidden="true"></i></button>'
		);
		hourSlot.append(saveButton);

		saveButton.on("click", saveEvent);
		hourSlotArr.push(hourSlot);
		$("#hour-container").append(hourSlot);
	}
	// use the id in the containing time-block as a key to save the user input in
	// local storage. HINT: What does `this` reference in the click listener
	// function? How can DOM traversal be used to get the "hour-x" id of the
	// time-block containing the button that was clicked? How might the id be
	// useful when saving the description in local storage?
	//

	for (hourSlot of hourSlotArr) {
		let hour = parseInt(hourSlot.attr("id").slice(5));

		if (hour > currentHour) {
			hourSlot.addClass("future");
		} else if (hour < currentHour) {
			hourSlot.addClass("past");
		} else {
			hourSlot.addClass("present");
		}
	}
	//
	// TODO: Add code to get any user input that was saved in localStorage and set
	// the values of the corresponding textarea elements. HINT: How can the id
	// attribute of each time-block be used to do this?
	//
	// TODO: Add code to display the current date in the header of the page.
});
