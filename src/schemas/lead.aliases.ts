interface LeadFieldAliases {
    firstName: string[];
    lastName: string[];
    email: string[];
    phone: string[];
    company: string[];
    jobTitle: string[];
    source: string[];
    message: string[];
}

export const LEAD_FIELD_ALIASES: LeadFieldAliases = {
    firstName: [
        "firstName",
        "first_name",
        "FirstName",
        "First Name",
        "firstname",
        "name",
        "Name",
        "full_name",
        "Full Name",
    ],

    lastName: [
        "lastName",
        "last_name",
        "LastName",
        "Last Name",
        "lastname",
        "surname",
        "Surname",
        "family_name",
    ],

    email: [
        "email",
        "Email",
        "email_address",
        "Email Address",
        "e-mail",
        "mail",
    ],

    phone: [
        "phone",
        "Phone",
        "mobile",
        "Mobile",
        "phone_number",
        "Phone Number",
        "contact",
        "Contact Number",
    ],

    company: [
        "company",
        "Company",
        "organization",
        "shop",
        "business",
        "Business",
    ],

    jobTitle: [
        "jobTitle",
        "job_title",
        "designation",
        "Designation",
        "role",
    ],

    source: [
        "source",
        "Source",
        "lead_source",
        "Lead Source",
        "campaign",
    ],

    message: [
        "message",
        "Message",
        "description",
        "Description",
        "comments",
        "Comments",
        "note",
        "Note",
    ],
} as const;