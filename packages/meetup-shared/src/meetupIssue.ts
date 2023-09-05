import { safeParseAsync } from "valibot";
import { type MeetupFormValues, meetupFormValuesSchema } from "./meetupForm";

export function getMeetupIssueBody(meetup: MeetupFormValues) {
	return `
### Meetup title

${meetup.title}

### Date

${meetup.date}

### Time

${meetup.time}

### Street address

${meetup.location}

### Maps link for address

${meetup.locationLink}

### Organizer

${meetup.organizer}

### Organizer link

${meetup.organizerLink}

### Signup link for meetup

${meetup.signupLink}

### Description

${meetup.description}`;
}

export function parseMeetupIssueBody(body: string) {
	const unverifiedMeetupFormValues = {
		title: getValueFromBody(body, "Meetup title"),
		date: getValueFromBody(body, "Date"),
		time: getValueFromBody(body, "Time"),
		location: getValueFromBody(body, "Street address"),
		locationLink: getValueFromBody(body, "Maps link for address"),
		organizer: getValueFromBody(body, "Organizer"),
		organizerLink: getValueFromBody(body, "Organizer link"),
		signupLink: getValueFromBody(body, "Signup link for meetup"),
		description: getRestAfterTitle(body, "Description"),
	};

	return safeParseAsync(meetupFormValuesSchema, unverifiedMeetupFormValues);
}

function getValueFromBody(body: string, title: string) {
	const regex = new RegExp(
		`### ${title}\\s*\\n\\s*([\\s\\S]*?)\\s*\\n\\s*###`,
	);
	const match = body.match(regex);

	if (match) {
		return match[1];
	}

	return null;
}

function getRestAfterTitle(body: string, title: string) {
	const regex = new RegExp(`### ${title}\\s*\\n\\s*([\\s\\S]*)`);
	const match = body.match(regex);

	if (match) {
		return match[1];
	}

	return null;
}
