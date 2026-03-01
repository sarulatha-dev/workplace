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
            { id: "e4", type: "voice", text: "Practice your email sign-off tone:", phrase: "Thank you for your time, and I look forward to your feedback.", hint: "Say it with a warm and appreciative tone." }
        ]
    },
    meeting: {
        title: "Meeting Mastery",
        questions: [
            { id: "m1", type: "mcq", text: "You're 2 minutes late to a Zoom call. What's the best etiquette?", options: ["Announce yourself loudly", "Slip in quietly and apologize in chat if needed", "Pretend your internet died", "Stay muted the whole time"], correctAnswer: 1, hint: "Minimize disruption to the person currently speaking." },
            { id: "m2", type: "matching", text: "Match the meeting jargon to its meaning:", pairs: [{ left: "Circle Back", right: "Discuss this later" }, { left: "Hard Stop", right: "Must leave at a specific time" }, { left: "Take it Offline", right: "Move to a private chat" }, { left: "Low Hanging Fruit", right: "Easy tasks to finish" }], hint: "Corporate speak is just a puzzle Jasa loves." },
            { id: "m3", type: "typing", text: "How do you politely interrupt a rambling speaker?", expected: "Excuse me, I'd like to add a quick point to what you just shared.", hint: "Acknowledge what they shared before adding your point." },
            { id: "m4", type: "voice", text: "Practice opening a meeting:", phrase: "Welcome everyone. Let's start by reviewing today's agenda.", hint: "Speak with authority but remain welcoming." }
        ]
    },
    comm: {
        title: "Clear Communication",
        questions: [
            { id: "c1", type: "voice", text: "Practice your professional introduction!", phrase: "Hello team, I am excited to collaborate with you all on this project.", hint: "Speak clearly and maintain a confident, warm tone." },
            { id: "c2", type: "typing", text: "Translate: 'u guys free for a call?'", expected: "Does the team have availability for a brief sync later today?", hint: "Replace 'u guys' with 'team' and 'free' with 'availability'." },
            { id: "c3", type: "mcq", text: "A colleague misunderstood your message. How do you clarify?", options: ["Say 'You didn't read it right.'", "Say 'Let me rephrase that.'", "Ignore them.", "Tell their manager."], correctAnswer: 1, hint: "Take ownership of communication clarity." },
            { id: "c4", type: "matching", text: "Match the communication style to the scenario:", pairs: [{ left: "Slack/Teams", right: "Quick questions" }, { left: "Email", right: "Formal requests or records" }, { left: "Video Call", right: "Complex brainstorming" }, { left: "In-Person", right: "Sensitive feedback" }], hint: "Choose the right medium for the message." }
        ]
    },
    dress: {
        title: "Office Image",
        questions: [
            { id: "d1", type: "mcq", text: "You're attending a 'Business Casual' networking event. What's the safest bet?", options: ["A full tuxedo", "Clean chinos and a polo or button-down", "Gym shorts and a hoodie", "A Hawaiian shirt"], correctAnswer: 1, hint: "Casual but polished is the goal." },
            { id: "d2", type: "typing", text: "A colleague asks if it's okay to wear flip-flops. How do you respond?", expected: "I recommend checking the company dress code policy to be sure.", hint: "Direct them to the official policy to stay neutral." },
            { id: "d3", type: "matching", text: "Match the dress code to the description:", pairs: [{ left: "Business Formal", right: "Full suit and tie" }, { left: "Business Casual", right: "Slacks and a blouse/button-down" }, { left: "Smart Casual", right: "Dark jeans and a blazer" }, { left: "Casual", right: "Clean t-shirt and sneakers" }], hint: "Different events require different levels of formality." },
            { id: "d4", type: "voice", text: "Practice complimenting a colleague's presentation, not just their appearance:", phrase: "Great job on the presentation today, your slides were very clear.", hint: "Focus on professional achievements." }
        ]
    },
    ethics: {
        title: "Career Ethics",
        questions: [
            { id: "eth1", type: "mcq", text: "You overhear a colleague sharing confidential project details in the elevator. What do you do?", options: ["Join the gossip", "Record them for blackmail", "Politely remind them in private about the NDA", "Post it on social media"], correctAnswer: 2, hint: "Protect the company's data while maintaining colleague relationships." },
            { id: "eth2", type: "matching", text: "Match the ethical concept to its definition:", pairs: [{ left: "Conflict of Interest", right: "Personal gain over company duty" }, { left: "NDA", right: "Agreement to not share secrets" }, { left: "Whistleblowing", right: "Reporting illegal activity" }, { left: "Plagiarism", right: "Taking credit for others' work" }], hint: "Ethics vocabulary is critical for professional safety." },
            { id: "eth3", type: "typing", text: "How do you decline a gift from a vendor that violates policy?", expected: "Thank you for the thought, but company policy prevents me from accepting gifts.", hint: "Be appreciative but firm about the policy." },
            { id: "eth4", type: "voice", text: "Practice raising a concern to HR:", phrase: "I would like to confidentially discuss a situation that occurred on my team.", hint: "Maintain a professional, discreet tone." }
        ]
    }
};
