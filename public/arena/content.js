export const questions = [
    {
        id: 1,
        category: "Email Etiquette",
        question: "Is it appropriate to use ONLY CAPITAL LETTERS in a professional email?",
        options: ["Yes, for emphasis", "No, it's considered shouting", "Only in the subject line", "Only with close colleagues"],
        answer: 1,
        explanation: "Typing in all caps is widely recognized as 'shouting' in digital communication and is considered unprofessional."
    },
    {
        id: 2,
        category: "Virtual Meetings",
        question: "When joining a large virtual meeting late, what is the best etiquette?",
        options: ["Interrupt to apologize", "Wait for a pause to announce yourself", "Join silently and use the chat to say hello/catch up", "Leave and watch the recording later"],
        answer: 2,
        explanation: "Joining silently minimizes disruption. Using chat allows you to acknowledge your presence without interrupting the flow."
    },
    {
        id: 3,
        category: "Asynchronous Work",
        question: "What does 'Asynchronous Communication' mean?",
        options: ["Real-time talking on a call", "Communicating with a delay where people respond at their own pace", "Face-to-face office meetings", "Instant messaging back and forth"],
        answer: 1,
        explanation: "Asynchronous communication (like email or Slack messages) doesn't require both parties to be present at the same time."
    },
    {
        id: 4,
        category: "Digital Etiquette",
        question: "You receive an angry email. What is the best first step?",
        options: ["Reply immediately with equal energy", "Forward it to HR instantly", "Wait 24 hours to cool down before responding", "Delete it and pretend you never saw it"],
        answer: 2,
        explanation: "The '24-hour rule' helps prevent emotional responses that you might later regret."
    },
    {
        id: 5,
        category: "Meeting Dos & Don'ts",
        question: "True or False: It is okay to multi-task (check emails, etc.) during a video call if your camera is off.",
        options: ["True", "False"],
        answer: 1,
        explanation: "Multi-tasking reduces your concentration and engagement. Focus on the meeting to show respect for others' time."
    },
    {
        id: 6,
        category: "Hybrid Collaboration",
        question: "How should you handle an 'in-person' meeting when one team member is remote?",
        options: ["Proceed as usual, they can read the notes", "Record it but don't worry about real-time audio", "Use a hybrid setup (video call) and ensure the remote person can hear and be heard", "Cancel the meeting"],
        answer: 2,
        explanation: "Inclusivity is key. Ensure remote participants have the same access to information and discussion as those in the room."
    }
];

export const powerUps = [
    { name: "Double Points", effect: "multiply", value: 2, icon: "🚀" },
    { name: "Triple Points", effect: "multiply", value: 3, icon: "🔥" },
    { name: "Lose 10 Points", effect: "add", value: -10, icon: "💀" },
    { name: "Bankrupt!", effect: "set", value: 0, icon: "💸" },
    { name: "Steal 15 Points", effect: "steal", value: 15, icon: "🥷" }
];
