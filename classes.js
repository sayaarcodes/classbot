let primaryLink = "https://meet.google.com/bxp-nogj-nhn?authuser=0&hs=179"

let secondaryLinks = [{
    name: 'Biology',
    link: 'https://meet.google.com/ide-orhh-uok?authuser=0&hs=179'
},
{
    name: 'Computer Science',
    link: 'https://meet.google.com/lookup/dau3v6rwn3?authuser=0&hs=179'
},
{
    name: 'Business',
    link: 'https://meet.google.com/bxp-nogj-nhn?authuser=0&hs=179'
}
];

let routine = [{
    name: 'Sunday',
    classes: [{
        name: 'Bangla',
        startTime: `${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date())} ${(new Date()).getDate()}, ${(new Date()).getFullYear()} 08:40:00`,
        links: primaryLink
    }
    ]
},
{
    name: 'Monday',
    classes: [{
        name: 'Maths D',
        startTime: `${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date())} ${(new Date()).getDate()}, ${(new Date()).getFullYear()} 08:40:00`,
        links: primaryLink
    },
    {
        name: 'Biology',
        startTime: `${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date())} ${(new Date()).getDate()}, ${(new Date()).getFullYear()} 09:30:00`,
        links: secondaryLinks[0].link
    },
    {
        name: 'Additional Maths',
        startTime: `${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date())} ${(new Date()).getDate()}, ${(new Date()).getFullYear()} 10:20:00`,
        links: primaryLink
    },
    {
        name: 'Chemistry',
        startTime: `${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date())} ${(new Date()).getDate()}, ${(new Date()).getFullYear()} 11:20:00`,
        links: primaryLink
    },
    {
        name: 'Computer Science',
        startTime: `${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date())} ${(new Date()).getDate()}, ${(new Date()).getFullYear()} 12:10:00`,
        links: secondaryLinks[1].link
    }
    ]
},
{
    name: 'Tuesday',
    classes: [{
        name: 'Maths D',
        startTime: `${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date())} ${(new Date()).getDate()}, ${(new Date()).getFullYear()} 08:40:00`,
        links: primaryLink
    },
    {
        name: 'Physics',
        startTime: `${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date())} ${(new Date()).getDate()}, ${(new Date()).getFullYear()} 09:30:00`,
        links: primaryLink
    },
    {
        name: 'Bangla',
        startTime: `${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date())} ${(new Date()).getDate()}, ${(new Date()).getFullYear()} 10:20:00`,
        links: primaryLink
    },
    {
        name: 'English',
        startTime: `${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date())} ${(new Date()).getDate()}, ${(new Date()).getFullYear()} 11:20:00`,
        links: primaryLink
    },
    {
        name: 'Biology',
        startTime: `${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date())} ${(new Date()).getDate()}, ${(new Date()).getFullYear()} 12:10:00`,
        links: secondaryLinks[0].link
    }
    ]
},
{
    name: 'Wednesday',
    classes: [{
        name: 'Additional Maths',
        startTime: `${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date())} ${(new Date()).getDate()}, ${(new Date()).getFullYear()} 09:30:00`,
        links: primaryLink
    },
    {
        name: 'English',
        startTime: `${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date())} ${(new Date()).getDate()}, ${(new Date()).getFullYear()} 10:20:00`,
        links: primaryLink
    },
    {
        name: 'Biology Lab',
        startTime: `${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date())} ${(new Date()).getDate()}, ${(new Date()).getFullYear()} 11:20:00`,
        links: secondaryLinks[0].link
    },
    {
        name: 'Chemistry Lab',
        startTime: `${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date())} ${(new Date()).getDate()}, ${(new Date()).getFullYear()} 12:10:00`,
        links: primaryLink
    },
    {
        name: 'Maths D',
        startTime: `${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date())} ${(new Date()).getDate()}, ${(new Date()).getFullYear()} 13:00:00`,
        links: primaryLink
    }
    ]
},
{
    name: 'Thursday',
    classes: [{
        name: 'Bangla',
        startTime: `${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date())} ${(new Date()).getDate()}, ${(new Date()).getFullYear()} 08:40:00`,
        links: primaryLink
    },
    {
        name: 'Additional Maths',
        startTime: `${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date())} ${(new Date()).getDate()}, ${(new Date()).getFullYear()} 09:30:00`,
        links: primaryLink
    },
    {
        name: 'English',
        startTime: `${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date())} ${(new Date()).getDate()}, ${(new Date()).getFullYear()} 10:20:00`,
        links: primaryLink
    },
    {
        name: 'Maths D',
        startTime: `${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date())} ${(new Date()).getDate()}, ${(new Date()).getFullYear()} 11:20:00`,
        links: primaryLink
    }
    ]
}
];

module.exports = { classRoutine: routine }