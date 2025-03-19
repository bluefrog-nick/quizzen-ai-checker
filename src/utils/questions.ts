
export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export interface Option {
  id: string;
  text: string;
  value: number;
}

export const questions: Question[] = [
  {
    id: 1,
    text: "How would you describe your organization's current data infrastructure?",
    options: [
      { id: "1-1", text: "We don't have a formal data infrastructure in place", value: 1 },
      { id: "1-2", text: "We collect data but it's stored in different systems with little integration", value: 2 },
      { id: "1-3", text: "We have centralized data storage but limited analysis capabilities", value: 3 },
      { id: "1-4", text: "We have a well-organized data infrastructure with data governance policies", value: 4 },
      { id: "1-5", text: "We have a robust data infrastructure with real-time analytics capabilities", value: 5 }
    ]
  },
  {
    id: 2,
    text: "How would you rate the quality and accessibility of data in your organization?",
    options: [
      { id: "2-1", text: "Our data is often incomplete, outdated, or inaccurate", value: 1 },
      { id: "2-2", text: "We have some good data, but it's difficult to access and use", value: 2 },
      { id: "2-3", text: "We have good quality data in some areas but not consistently", value: 3 },
      { id: "2-4", text: "Most of our important data is high quality and accessible", value: 4 },
      { id: "2-5", text: "We have high-quality, well-structured data that's easily accessible", value: 5 }
    ]
  },
  {
    id: 3,
    text: "What level of technical expertise related to AI exists within your organization?",
    options: [
      { id: "3-1", text: "We have no AI expertise in-house", value: 1 },
      { id: "3-2", text: "We have some general IT expertise but limited AI knowledge", value: 2 },
      { id: "3-3", text: "We have data analysts but limited machine learning expertise", value: 3 },
      { id: "3-4", text: "We have some AI/ML specialists on our team", value: 4 },
      { id: "3-5", text: "We have a dedicated AI team with specialized expertise", value: 5 }
    ]
  },
  {
    id: 4,
    text: "How would you describe your organization's current use of automation?",
    options: [
      { id: "4-1", text: "We do most things manually with minimal automation", value: 1 },
      { id: "4-2", text: "We've automated some basic tasks but most processes are manual", value: 2 },
      { id: "4-3", text: "We've automated several key processes but opportunities remain", value: 3 },
      { id: "4-4", text: "We have significant automation across many business areas", value: 4 },
      { id: "4-5", text: "We've automated most routine tasks and continuously improve our automation", value: 5 }
    ]
  },
  {
    id: 5,
    text: "How would you describe your organization's leadership support for AI initiatives?",
    options: [
      { id: "5-1", text: "Leadership shows little interest in AI", value: 1 },
      { id: "5-2", text: "Leadership is curious but hasn't committed resources", value: 2 },
      { id: "5-3", text: "Leadership supports limited AI experimentation", value: 3 },
      { id: "5-4", text: "Leadership actively encourages AI adoption", value: 4 },
      { id: "5-5", text: "Leadership champions AI as a strategic priority", value: 5 }
    ]
  },
  {
    id: 6,
    text: "How would you rate your organization's current investment in AI technologies?",
    options: [
      { id: "6-1", text: "We haven't invested in AI at all", value: 1 },
      { id: "6-2", text: "We've made minimal investments in AI tools", value: 2 },
      { id: "6-3", text: "We've invested in some AI solutions but not systematically", value: 3 },
      { id: "6-4", text: "We've made significant AI investments in key areas", value: 4 },
      { id: "6-5", text: "AI investment is a major part of our technology budget", value: 5 }
    ]
  },
  {
    id: 7,
    text: "How well does your organization manage change when implementing new technologies?",
    options: [
      { id: "7-1", text: "We struggle with technology changes and face significant resistance", value: 1 },
      { id: "7-2", text: "We implement changes but with difficulty and limited adoption", value: 2 },
      { id: "7-3", text: "We can implement changes but adoption is sometimes slow", value: 3 },
      { id: "7-4", text: "We manage change effectively with good adoption rates", value: 4 },
      { id: "7-5", text: "We excel at implementing new technologies with high adoption rates", value: 5 }
    ]
  },
  {
    id: 8,
    text: "How would you describe your organization's approach to AI ethics and governance?",
    options: [
      { id: "8-1", text: "We haven't considered AI ethics or governance", value: 1 },
      { id: "8-2", text: "We're aware of ethical concerns but have no formal policies", value: 2 },
      { id: "8-3", text: "We have basic guidelines for ethical AI use", value: 3 },
      { id: "8-4", text: "We have developed comprehensive AI ethics policies", value: 4 },
      { id: "8-5", text: "We have robust AI governance frameworks and ethics committees", value: 5 }
    ]
  },
  {
    id: 9,
    text: "How aligned is AI with your organization's business strategy?",
    options: [
      { id: "9-1", text: "AI isn't part of our business strategy", value: 1 },
      { id: "9-2", text: "AI is mentioned but not integrated into our strategy", value: 2 },
      { id: "9-3", text: "AI is recognized as important but not central to our strategy", value: 3 },
      { id: "9-4", text: "AI is a significant component of our business strategy", value: 4 },
      { id: "9-5", text: "AI is central to our business strategy and competitive advantage", value: 5 }
    ]
  },
  {
    id: 10,
    text: "How would you rate your organization's understanding of potential AI use cases?",
    options: [
      { id: "10-1", text: "We have little awareness of how AI could be applied", value: 1 },
      { id: "10-2", text: "We're aware of some general applications but not specific to our business", value: 2 },
      { id: "10-3", text: "We've identified some specific use cases for our business", value: 3 },
      { id: "10-4", text: "We have a clear understanding of multiple valuable AI use cases", value: 4 },
      { id: "10-5", text: "We continuously identify and prioritize AI use cases across the organization", value: 5 }
    ]
  },
  {
    id: 11,
    text: "How would you describe your customer data collection and utilization?",
    options: [
      { id: "11-1", text: "We collect minimal customer data", value: 1 },
      { id: "11-2", text: "We collect basic customer data but don't use it systematically", value: 2 },
      { id: "11-3", text: "We collect good customer data and use it for basic insights", value: 3 },
      { id: "11-4", text: "We have comprehensive customer data that informs multiple decisions", value: 4 },
      { id: "11-5", text: "We have rich customer data that drives personalization and predictive capabilities", value: 5 }
    ]
  },
  {
    id: 12,
    text: "How would you rate your organization's IT infrastructure in terms of supporting AI initiatives?",
    options: [
      { id: "12-1", text: "Our IT infrastructure is outdated and would struggle to support AI", value: 1 },
      { id: "12-2", text: "Our infrastructure has basic capabilities but significant upgrades would be needed", value: 2 },
      { id: "12-3", text: "Our infrastructure could support basic AI applications with some upgrades", value: 3 },
      { id: "12-4", text: "Our infrastructure is fairly modern and could support most AI applications", value: 4 },
      { id: "12-5", text: "Our infrastructure is modern, cloud-based, and well-suited for AI applications", value: 5 }
    ]
  },
  {
    id: 13,
    text: "How would you describe your organization's approach to innovation?",
    options: [
      { id: "13-1", text: "We tend to avoid risks and stick with established methods", value: 1 },
      { id: "13-2", text: "We occasionally try new approaches but prefer proven methods", value: 2 },
      { id: "13-3", text: "We're open to innovation in some areas of the business", value: 3 },
      { id: "13-4", text: "We actively encourage innovation across most of the organization", value: 4 },
      { id: "13-5", text: "Innovation is central to our culture and business model", value: 5 }
    ]
  },
  {
    id: 14,
    text: "How would you rate your organization's cross-departmental collaboration?",
    options: [
      { id: "14-1", text: "Departments typically work in silos with minimal collaboration", value: 1 },
      { id: "14-2", text: "There's some collaboration but primarily within departments", value: 2 },
      { id: "14-3", text: "We have moderate cross-departmental collaboration on important projects", value: 3 },
      { id: "14-4", text: "We collaborate well across departments in most situations", value: 4 },
      { id: "14-5", text: "We have excellent cross-departmental collaboration with shared goals", value: 5 }
    ]
  },
  {
    id: 15,
    text: "How prepared is your organization to deal with the workforce changes that AI might bring?",
    options: [
      { id: "15-1", text: "We haven't considered workforce implications of AI", value: 1 },
      { id: "15-2", text: "We're aware that changes might be needed but haven't planned for them", value: 2 },
      { id: "15-3", text: "We've started discussions about workforce changes and some basic planning", value: 3 },
      { id: "15-4", text: "We have plans for reskilling and workforce transition", value: 4 },
      { id: "15-5", text: "We have comprehensive strategies for workforce evolution alongside AI", value: 5 }
    ]
  }
];
