import React, { useState } from 'react';
import { ChevronRight, Clock, Target, Users, Wrench, BarChart3 } from 'lucide-react';

const AutomationQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = [
    {
      id: 'timeWaster',
      title: "What's your biggest daily time-waster?",
      options: [
        { value: 'dataEntry', text: 'Manual data entry and spreadsheet updates', weight: { task: 3, digital: 1 } },
        { value: 'leads', text: 'Following up with leads and managing sales pipeline', weight: { sales: 3, task: 1 } },
        { value: 'meetings', text: 'Scheduling meetings and routing documents', weight: { office: 3, task: 1 } },
        { value: 'email', text: 'Managing email campaigns and customer communications', weight: { emailMarketing: 3, office: 1 } },
        { value: 'systems', text: 'Connecting different software tools and databases', weight: { digital: 3, business: 1 } },
        { value: 'hr', text: 'HR paperwork and employee processes', weight: { hr: 3, office: 1 } },
        { value: 'it', text: 'Managing IT infrastructure and deployments', weight: { it: 3, business: 1 } }
      ]
    },
    {
      id: 'timeSpent',
      title: "How many hours per week does your team spend on repetitive tasks?",
      options: [
        { value: '1-10', text: '1-10 hours', weight: { task: 1, office: 1 } },
        { value: '11-25', text: '11-25 hours', weight: { task: 2, office: 2, sales: 1 } },
        { value: '26-40', text: '26-40 hours', weight: { business: 2, digital: 2, hr: 1 } },
        { value: '40+', text: '40+ hours', weight: { business: 3, digital: 2, it: 1 } }
      ]
    },
    {
      id: 'businessGoal',
      title: "What's your primary business goal right now?",
      options: [
        { value: 'costs', text: 'Reduce operational costs', weight: { task: 2, office: 2, hr: 1 } },
        { value: 'revenue', text: 'Increase sales and revenue', weight: { sales: 3, emailMarketing: 2 } },
        { value: 'productivity', text: 'Improve team productivity', weight: { office: 2, task: 2, hr: 1 } },
        { value: 'scale', text: 'Scale operations without hiring', weight: { business: 3, digital: 2 } },
        { value: 'customer', text: 'Better customer experience', weight: { emailMarketing: 2, sales: 2, digital: 1 } },
        { value: 'compliance', text: 'Compliance and risk management', weight: { hr: 2, business: 2, office: 1 } }
      ]
    },
    {
      id: 'tools',
      title: "Which tools does your team use most?",
      options: [
        { value: 'spreadsheets', text: 'Excel, Google Sheets, basic databases', weight: { task: 3, digital: 1 } },
        { value: 'crm', text: 'CRM systems (Salesforce, HubSpot, Pipedrive)', weight: { sales: 3, digital: 2 } },
        { value: 'office', text: 'Email, calendar, document management', weight: { office: 3, emailMarketing: 1 } },
        { value: 'marketing', text: 'Email marketing platforms (Mailchimp, Klaviyo)', weight: { emailMarketing: 3, digital: 1 } },
        { value: 'multiple', text: 'Multiple software tools that don\'t talk to each other', weight: { digital: 3, business: 2 } },
        { value: 'hrSystems', text: 'HR systems (BambooHR, Workday)', weight: { hr: 3, business: 1 } },
        { value: 'devOps', text: 'Servers, cloud platforms, development tools', weight: { it: 3, business: 1 } }
      ]
    },
    {
      id: 'teamSize',
      title: "What's your team size?",
      options: [
        { value: 'solo', text: 'Just me (solopreneur)', weight: { task: 2, emailMarketing: 1 } },
        { value: 'small', text: '2-10 employees', weight: { office: 2, sales: 2, task: 1 } },
        { value: 'medium', text: '11-50 employees', weight: { hr: 2, business: 2, digital: 1 } },
        { value: 'large', text: '50+ employees', weight: { business: 3, hr: 3, it: 2 } }
      ]
    }
  ];

  const specialists = {
    task: {
      title: 'Task Automation Expert',
      description: 'Transform mind-numbing data entry into automated workflows that run while you sleep.',
      savings: '10-15 hours per week',
      icon: <Wrench className="w-8 h-8" />,
      color: 'bg-blue-500'
    },
    sales: {
      title: 'Sales Automation Specialist',
      description: 'Never lose another hot lead to spreadsheet chaos or missed follow-ups.',
      savings: '15-20 hours per week',
      icon: <Target className="w-8 h-8" />,
      color: 'bg-green-500'
    },
    office: {
      title: 'Office Automation Specialist',
      description: 'Walk into an office that runs itself—documents route automatically, meetings schedule without email tennis.',
      savings: '20-25 hours per week',
      icon: <Users className="w-8 h-8" />,
      color: 'bg-purple-500'
    },
    emailMarketing: {
      title: 'Email Marketing Automation Specialist',
      description: 'Email campaigns that read your customers\' minds—delivering precisely the right message at the perfect moment.',
      savings: '8-12 hours per week',
      icon: <BarChart3 className="w-8 h-8" />,
      color: 'bg-orange-500'
    },
    digital: {
      title: 'Digital Automation Specialist',
      description: 'Get a crystal-clear view of every customer touchpoint with zero manual data wrangling.',
      savings: '12-18 hours per week',
      icon: <BarChart3 className="w-8 h-8" />,
      color: 'bg-cyan-500'
    },
    hr: {
      title: 'HR Automation Specialist',
      description: 'New hires get fully onboarded before their first day, leave requests approve instantly.',
      savings: '10-15 hours per week',
      icon: <Users className="w-8 h-8" />,
      color: 'bg-pink-500'
    },
    business: {
      title: 'Business Process Automation Specialist',
      description: 'Your entire business operates like a well-oiled machine—every process connected, every handoff seamless.',
      savings: '25-40 hours per week',
      icon: <Target className="w-8 h-8" />,
      color: 'bg-indigo-500'
    },
    it: {
      title: 'IT Automation Specialist',
      description: 'Deploy applications with a single click, servers that provision themselves.',
      savings: '15-25 hours per week',
      icon: <Wrench className="w-8 h-8" />,
      color: 'bg-gray-600'
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAnswerSelect = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setShowEmailForm(true);
      }, 300);
    }
  };

  const calculateResult = () => {
    const scores = {};
    
    Object.values(answers).forEach(answer => {
      if (answer.weight) {
        Object.entries(answer.weight).forEach(([specialist, points]) => {
          scores[specialist] = (scores[specialist] || 0) + points;
        });
      }
    });

    const topSpecialist = Object.entries(scores).reduce((a, b) => 
      scores[a[0]] > scores[b[0]] ? a : b
    )[0];

    return topSpecialist;
  };

  const saveQuizData = async () => {
    const result = calculateResult();
    const quizData = {
      email: email,
      answers: answers,
      recommendedSpecialist: result,
      completedAt: new Date().toISOString(),
      estimatedSavings: specialists[result].savings
    };

    try {
      // Replace this URL with your actual API endpoint
      const response = await fetch('https://i43-j.app.n8n.cloud/webhook-test/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData)
      });

      if (!response.ok) {
        throw new Error('Failed to save quiz data');
      }

      const savedData = await response.json();
      console.log('Quiz data saved successfully:', savedData);
      return true;
    } catch (error) {
      console.error('Error saving quiz data:', error);
      // You might want to show an error message to the user here
      return false;
    }
  };

  const handleEmailSubmit = async () => {
    // Clear previous errors
    setEmailError('');
    
    // Validate email
    if (!email.trim()) {
      setEmailError('Email address is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const saved = await saveQuizData();
      
      if (saved) {
        setShowResults(true);
        setShowEmailForm(false);
      } else {
        setEmailError('Failed to save your results. Please try again.');
      }
    } catch (error) {
      setEmailError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setEmail('');
    setShowEmailForm(false);
    setEmailError('');
    setIsSubmitting(false);
  };

  if (showResults) {
    const result = calculateResult();
    const specialist = specialists[result];
    
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <div className={`${specialist.color} text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4`}>
            {specialist.icon}
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Perfect Match:</h2>
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">{specialist.title}</h3>
          <p className="text-lg text-gray-600 mb-6">{specialist.description}</p>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center">
              <Clock className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-green-800 font-semibold">Estimated Time Savings: {specialist.savings}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Book Free Consultation
            </button>
            <button 
              onClick={resetQuiz}
              className="w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showEmailForm) {
    return (
      <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Almost Done!</h2>
          <p className="text-gray-600">Enter your email to see your personalized automation recommendation</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(''); // Clear error when user types
              }}
              placeholder="Enter your email address"
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                emailError ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isSubmitting}
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>
          
          <button
            onClick={handleEmailSubmit}
            disabled={isSubmitting}
            className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
          >
            {isSubmitting ? 'Saving...' : 'See My Results'}
            {!isSubmitting && <ChevronRight className="w-5 h-5 ml-2" />}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Which Automation Do You Need?</h1>
        <p className="text-gray-600">Take our 60-second quiz to discover which automation will save you the most time and money</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Current Question */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {questions[currentQuestion].title}
        </h2>
        
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(questions[currentQuestion].id, option)}
              className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-700 group-hover:text-blue-700">{option.text}</span>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Back Button */}
      {currentQuestion > 0 && (
        <button
          onClick={() => setCurrentQuestion(currentQuestion - 1)}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          ← Back
        </button>
      )}
    </div>
  );
};

export default AutomationQuiz;
