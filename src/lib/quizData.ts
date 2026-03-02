import { QuestionType } from "@/components/QuizEngine";

export interface Question {
    id: string;
    type: QuestionType;
    text: string;
    options?: string[];
    correctAnswer?: number;
    expected?: string;
    pairs?: { left: string, right: string }[];
    phrase?: string;
    hint: string;
}

export interface QuizLevel {
    title: string;
    questions: Question[];
}

export const QUIZ_DATA: Record<string, QuizLevel> = {
    email: {
        title: "Email Etiquette",
        questions: [
            { id: "e1", type: "mcq", text: "A client sends a long, angry email. What is your first move?", options: ["Reply with matching energy", "Ignore it until Monday", "Take a breath and draft a neutral fact-based response", "Forward to the CEO"], correctAnswer: 2, hint: "De-escalation is a superpower in written communication." },
            { id: "e2", type: "typing", text: "Fix this: 'lol k talk later'", expected: "I understand. Let's discuss this further during our next scheduled sync.", hint: "Translate 'lol k' into professional acknowledgement." },
            { id: "e3", type: "matching", text: "Match the email jargon to its meaning:", pairs: [{ left: "EOD", right: "End of Day" }, { left: "OOO", right: "Out of Office" }, { left: "TL;DR", right: "Too Long; Didn't Read" }, { left: "FYI", right: "For Your Information" }], hint: "Corporate acronyms are essential for quick emails." },
            { id: "e4", type: "voice", text: "Practice your email sign-off tone:", phrase: "Thank you for your time, and I look forward to your feedback.", hint: "Say it with a warm and appreciative tone." },
            { id: "e5", type: "mcq", text: "What is the best way to handle a long email chain with multiple topics?", options: ["Reply to everything at once", "Break it into separate threads with clear subject lines", "Call their manager", "Delete the chain and start over"], correctAnswer: 1, hint: "Clarity and organization prevent information overload." },
            { id: "e6", type: "matching", text: "Match the recipient field to its typical use case:", pairs: [{ left: "To:", right: "Direct action required" }, { left: "Cc:", right: "Kept in the loop" }, { left: "Bcc:", right: "Private inclusion (use sparingly)" }, { left: "Forward:", right: "Sharing with a new party" }], hint: "Recipient management is key to email etiquette." },
            { id: "e7", type: "typing", text: "Professionalize: 'Can you do this now? I need it asap.'", expected: "Would you be able to prioritize this request? I would appreciate having it completed as soon as possible.", hint: "Add politeness and use professional prioritization language." },
            { id: "e8", type: "voice", text: "How do you explain a delay professionally?", phrase: "My apologies for the delay, I wanted to ensure all data was accurately verified.", hint: "Focus on the quality/accuracy rather than the delay itself." },
            { id: "e9", type: "mcq", text: "When should you use 'Reply All'?", options: ["Always, to be transparent", "Only when everyone on the thread needs the update", "Never, it creates spam", "Only for social chat"], correctAnswer: 1, hint: "Respecting people's inboxes is a professional virtue." }
        ]
    },
    meeting: {
        title: "Meeting Mastery",
        questions: [
            { id: "m1", type: "mcq", text: "You're 2 minutes late to a Zoom call. What's the best etiquette?", options: ["Announce yourself loudly", "Slip in quietly and apologize in chat if needed", "Pretend your internet died", "Stay muted the whole time"], correctAnswer: 1, hint: "Minimize disruption to the person currently speaking." },
            { id: "m2", type: "matching", text: "Match the meeting jargon to its meaning:", pairs: [{ left: "Circle Back", right: "Discuss this later" }, { left: "Hard Stop", right: "Must leave at a specific time" }, { left: "Take it Offline", right: "Move to a private chat" }, { left: "Low Hanging Fruit", right: "Easy tasks to finish" }], hint: "Corporate speak is just a puzzle Jasa loves." },
            { id: "m3", type: "typing", text: "How do you politely interrupt a rambling speaker?", expected: "Excuse me, I'd like to add a quick point to what you just shared.", hint: "Acknowledge what they shared before adding your point." },
            { id: "m4", type: "voice", text: "Practice opening a meeting:", phrase: "Welcome everyone. Let's start by reviewing today's agenda.", hint: "Speak with authority but remain welcoming." },
            { id: "m5", type: "mcq", text: "The meeting is over time but you have an urgent question. What do you do?", options: ["Keep everyone hostage", "Ask in the chat or email the organizer later", "Start talking over the host", "Leave without saying anything"], correctAnswer: 1, hint: "Respecting people's 'Hard Stop' is critical." },
            { id: "m6", type: "matching", text: "Match the meeting component to its purpose:", pairs: [{ left: "Agenda", right: "The plan for the call" }, { left: "Minutes", right: "The record of what happened" }, { left: "Action Items", right: "Tasks assigned to people" }, { left: "AOB", right: "Any other business/final thoughts" }], hint: "Meeting documentation ensures productivity follows the talk." },
            { id: "m7", type: "typing", text: "Politely ask someone to mute: 'ur mic is loud'", expected: "Pardon the interruption, but there might be some background noise on your line. Could you please mute your microphone?", hint: "Focus on the noise, not the person." },
            { id: "m8", type: "voice", text: "Practice closing a meeting professionally:", phrase: "Thank you everyone for your contributions. I'll send out the action items by EOD.", hint: "End with a clear next step and appreciation." },
            { id: "m9", type: "mcq", text: "Is it okay to multi-task (emails/slack) during a video call?", options: ["Yes, I'm a pro", "No, it lowers your focus and is visible to others", "Only if your camera is off", "Only if it's social"], correctAnswer: 1, hint: "Active listening requires full presence." }
        ]
    },
    comm: {
        title: "Clear Communication",
        questions: [
            { id: "c1", type: "voice", text: "Practice your professional introduction!", phrase: "Hello team, I am excited to collaborate with you all on this project.", hint: "Speak clearly and maintain a confident, warm tone." },
            { id: "c2", type: "typing", text: "Translate: 'u guys free for a call?'", expected: "Does the team have availability for a brief sync later today?", hint: "Replace 'u guys' with 'team' and 'free' with 'availability'." },
            { id: "c3", type: "mcq", text: "A colleague misunderstood your message. How do you clarify?", options: ["Say 'You didn't read it right.'", "Say 'Let me rephrase that.'", "Ignore them.", "Tell their manager."], correctAnswer: 1, hint: "Take ownership of communication clarity." },
            { id: "c4", type: "matching", text: "Match the communication style to the scenario:", pairs: [{ left: "Slack/Teams", right: "Quick questions" }, { left: "Email", right: "Formal requests or records" }, { left: "Video Call", right: "Complex brainstorming" }, { left: "In-Person", right: "Sensitive feedback" }], hint: "Choose the right medium for the message." },
            { id: "c5", type: "mcq", text: "You need to give tough feedback to a peer. What's the best approach?", options: ["Publicly on Slack", "A private, 1-on-1 meeting focused on growth", "An anonymous sticky note", "Ghost them"], correctAnswer: 1, hint: "Empathy and privacy are essential for feedback logic." },
            { id: "c6", type: "typing", text: "Professionalize: 'I don't like this idea at all.'", expected: "I have some concerns regarding this approach. Could we explore some alternative options together?", hint: "Focus on the 'approach' and suggest collaboration." },
            { id: "c7", type: "voice", text: "Practice asking for clarification:", phrase: "Just to ensure I'm aligned, could you please elaborate on the next steps?", hint: "Use 'aligned' and 'elaborate' for professional clarity." },
            { id: "c8", type: "matching", text: "Match the feedback type to its delivery:", pairs: [{ left: "Constructive", right: "Focused on improvement" }, { left: "Positive", right: "Highlighting success" }, { left: "Vague", right: "Confusing and unhelpful" }, { left: "Actionable", right: "Includes clear next steps" }], hint: "Feedback must be clear to be useful." },
            { id: "c9", type: "mcq", text: "What is 'Active Listening'?", options: ["Waiting for your turn to talk", "Focusing fully on the speaker and confirming understanding", "Taking notes on everything word-for-word", "Nodding while checking phone"], correctAnswer: 1, hint: "Confirming understanding is the goal of active listening." }
        ]
    },
    dress: {
        title: "Office Image",
        questions: [
            { id: "d1", type: "mcq", text: "You're attending a 'Business Casual' networking event. What's the safest bet?", options: ["A full tuxedo", "Clean chinos and a polo or button-down", "Gym shorts and a hoodie", "A Hawaiian shirt"], correctAnswer: 1, hint: "Casual but polished is the goal." },
            { id: "d2", type: "typing", text: "A colleague asks if it's okay to wear flip-flops. How do you respond?", expected: "I recommend checking the company dress code policy to be sure.", hint: "Direct them to the official policy to stay neutral." },
            { id: "d3", type: "matching", text: "Match the dress code to the description:", pairs: [{ left: "Business Formal", right: "Full suit and tie" }, { left: "Business Casual", right: "Slacks and a blouse/button-down" }, { left: "Smart Casual", right: "Dark jeans and a blazer" }, { left: "Casual", right: "Clean t-shirt and sneakers" }], hint: "Different events require different levels of formality." },
            { id: "d4", type: "voice", text: "Practice complimenting a colleague's presentation, not just their appearance:", phrase: "Great job on the presentation today, your slides were very clear.", hint: "Focus on professional achievements." },
            { id: "d5", type: "mcq", text: "What should be visible in your video call background?", options: ["A messy bed", "A clean, professional or neutral background", "Your entire DVD collection", "A bright window behind you"], correctAnswer: 1, hint: "Your background is part of your professional image." },
            { id: "d6", type: "matching", text: "Match the body language to its interpretation:", pairs: [{ left: "Crossed Arms", right: "Defensive or closed-off" }, { left: "Eye Contact", right: "Confident and engaged" }, { left: "Fidgeting", right: "Anxious or distracted" }, { left: "Leaning In", right: "Interested and attentive" }], hint: "Body language speaks louder than words in-person." },
            { id: "d7", type: "typing", text: "Fix this: 'I'll just wear the same shirt from yesterday.'", expected: "I'll ensure I'm professionally dressed and refreshed for tomorrow's client meeting.", hint: "Focus on 'client-ready' standards." },
            { id: "d8", type: "voice", text: "Practice greeting a client at the office:", phrase: "Welcome to our office. It's a pleasure to finally meet you in person.", hint: "Warm, slow, and welcoming tone." },
            { id: "d9", type: "mcq", text: "Safe eye contact in a virtual meeting means:", options: ["Staring at your own self-view", "Looking into the camera lens occasionally", "Looking at your keyboard", "Staring at the wall"], correctAnswer: 1, hint: "The camera is the person's 'eyes' in a video call." }
        ]
    },
    ethics: {
        title: "Career Ethics",
        questions: [
            { id: "eth1", type: "mcq", text: "You overhear a colleague sharing confidential project details in the elevator. What do you do?", options: ["Join the gossip", "Record them for blackmail", "Politely remind them in private about the NDA", "Post it on social media"], correctAnswer: 2, hint: "Protect the company's data while maintaining colleague relationships." },
            { id: "eth2", type: "matching", text: "Match the ethical concept to its definition:", pairs: [{ left: "Conflict of Interest", right: "Personal gain over company duty" }, { left: "NDA", right: "Agreement to not share secrets" }, { left: "Whistleblowing", right: "Reporting illegal activity" }, { left: "Plagiarism", right: "Taking credit for others' work" }], hint: "Ethics vocabulary is critical for professional safety." },
            { id: "eth3", type: "typing", text: "How do you decline a gift from a vendor that violates policy?", expected: "Thank you for the thought, but company policy prevents me from accepting gifts.", hint: "Be appreciative but firm about the policy." },
            { id: "eth4", type: "voice", text: "Practice raising a concern to HR:", phrase: "I would like to confidentially discuss a situation that occurred on my team.", hint: "Maintain a professional, discreet tone." },
            { id: "eth5", type: "mcq", text: "A friend at work asks you to log into their computer for them using their password. What do you do?", options: ["Do it, they're a friend", "Politely decline and mention security policy", "Report them to security immediately", "Give them your password too"], correctAnswer: 1, hint: "Security and credentials are non-negotiable professional boundaries." },
            { id: "eth6", type: "matching", text: "Match the ethical term to its core value:", pairs: [{ left: "Transparency", right: "Being open and honest" }, { left: "Integrity", right: "Doing the right thing alone" }, { left: "Fairness", right: "Treating everyone equally" }, { left: "Responsibility", right: "Owning your mistakes" }], hint: "Ethics are the foundation of trust." },
            { id: "eth7", type: "typing", text: "Fix this error of judgement: 'I'll just take credit for this slide.'", expected: "I want to ensure the team receives proper credit for their contributions to this presentation.", hint: "Professionalism means sharing credit." },
            { id: "eth8", type: "voice", text: "How to admit a mistake gracefully:", phrase: "I apologize for the error. I've corrected it and implemented a check to prevent it future recurrence.", hint: "Apologize, correct, and prevent." },
            { id: "eth9", type: "mcq", text: "Should you post pictures of sensitive client data on your social media 'work day' vlog?", options: ["Yes, if it's a cool project", "Never, it's a major data breach and firing offense", "Only if it's blurred (mostly)", "Only for friends"], correctAnswer: 1, hint: "Confidentiality extends to your social media life." }
        ]
    }
};
