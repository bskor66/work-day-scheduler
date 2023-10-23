var hourSlotArr = [];

var currentTime = dayjs();
// Test different hours
// currentTime = currentTime.hour(12);
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

function updateHeader() {
	$("#currentDay").text(currentTime.format("MMM D, YYYY h:mm A"));
}

$(function () {
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

	updateHeader();
	setInterval(updateHeader, 1000);
});
