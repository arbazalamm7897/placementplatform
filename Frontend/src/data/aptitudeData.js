export const aptitudeSections = [
  {
    slug: "quantitative",
    title: "Quantitative Aptitude",
    shortDescription:
      "Arithmetic, percentages, ratios, profit and loss, averages, and time-speed-distance.",
    intro:
      "Quantitative aptitude is a core placement topic because it tests calculation speed, pattern recognition, and word-problem translation. Focus on formulas, approximation, and clean setup before solving.",
    tips: [
      "Write the relationship first, then substitute values.",
      "Use percentages and ratios interchangeably when it simplifies the problem.",
      "Check units carefully in time, work, and distance questions.",
    ],
    questions: [
      {
        question:
          "A number is increased by 20% and then decreased by 20%. What is the overall percentage change?",
        answer: "The overall result is a 4% decrease.",
        explanation:
          "Assume the number is 100. After a 20% increase it becomes 120. After a 20% decrease it becomes 96, so the net change is -4%.",
      },
      {
        question:
          "The ratio of boys to girls in a class is 3:2. If there are 20 girls, how many boys are there?",
        answer: "There are 30 boys.",
        explanation:
          "If 2 parts correspond to 20 girls, then 1 part is 10. So 3 parts correspond to 30 boys.",
      },
      {
        question:
          "A shopkeeper marks an item at Rs. 2,000 and gives a 10% discount. What is the selling price?",
        answer: "The selling price is Rs. 1,800.",
        explanation:
          "10% of 2,000 is 200. Subtract the discount from the marked price: 2,000 - 200 = 1,800.",
      },
      {
        question:
          "A train travels 180 km in 3 hours. What is its average speed?",
        answer: "The average speed is 60 km/h.",
        explanation:
          "Average speed = total distance / total time = 180 / 3 = 60 km/h.",
      },
      {
        question:
          "A can complete a work in 10 days and B can complete it in 15 days. In how many days can they finish it together?",
        answer: "They finish the work together in 6 days.",
        explanation:
          "A's one-day work is 1/10 and B's is 1/15. Together they do 1/10 + 1/15 = 1/6 of the work per day.",
      },
      {
        question:
          "The average of five numbers is 24. If one number is removed, the average of the remaining four is 21. What was the removed number?",
        answer: "The removed number was 36.",
        explanation:
          "Sum of five numbers = 5 x 24 = 120. Sum of remaining four = 4 x 21 = 84. Removed number = 120 - 84 = 36.",
      },
      {
        question:
          "If the simple interest on a sum for 2 years at 5% per annum is Rs. 500, what is the principal?",
        answer: "The principal is Rs. 5,000.",
        explanation:
          "Simple interest = (P x R x T) / 100. So 500 = (P x 5 x 2) / 100, which gives P = 5,000.",
      },
      {
        question:
          "A person buys an article for Rs. 800 and sells it for Rs. 920. Find the profit percentage.",
        answer: "The profit percentage is 15%.",
        explanation:
          "Profit = 920 - 800 = 120. Profit percentage = (120 / 800) x 100 = 15%.",
      },
    ],
  },
  {
    slug: "logical",
    title: "Logical Reasoning",
    shortDescription:
      "Series, coding-decoding, arrangements, assumptions, and analytical logic.",
    intro:
      "Logical reasoning questions reward structured thinking more than memorized formulas. Break the problem into rules, constraints, and eliminations before looking at answer options.",
    tips: [
      "Write clues one by one and eliminate impossible cases early.",
      "In arrangements, draw a small table or slots diagram.",
      "For series, check differences, ratios, positions, and alternation patterns.",
    ],
    questions: [
      {
        question: "Find the next term in the series: 2, 6, 12, 20, 30, ?",
        answer: "The next term is 42.",
        explanation:
          "The differences are 4, 6, 8, 10. The next difference is 12, so 30 + 12 = 42.",
      },
      {
        question:
          "If CAT is coded as 24 and DOG is coded as 26, then how is BAT coded using the same logic?",
        answer: "BAT is coded as 23.",
        explanation:
          "Use letter positions: B = 2, A = 1, T = 20. Total = 23.",
      },
      {
        question:
          "A is taller than B, B is taller than C, and C is taller than D. Who is the tallest?",
        answer: "A is the tallest.",
        explanation:
          "The comparisons form a clear descending order: A > B > C > D.",
      },
      {
        question:
          "Five friends sit in a row. If P is to the immediate left of Q and R is to the immediate right of Q, who sits in the middle among P, Q, and R?",
        answer: "Q sits in the middle.",
        explanation:
          "The order must be P, Q, R. So Q is between P and R.",
      },
      {
        question:
          "Choose the odd one out: Triangle, Square, Circle, Cube",
        answer: "Cube is the odd one out.",
        explanation:
          "Triangle, square, and circle are 2D figures. Cube is a 3D shape.",
      },
      {
        question:
          "If all roses are flowers and some flowers are red, which conclusion is definitely true?",
        answer: "All roses are flowers.",
        explanation:
          "The second statement says only some flowers are red. The guaranteed conclusion from the premises is that all roses are flowers.",
      },
      {
        question:
          "Find the missing term: AZ, BY, CX, DW, ?",
        answer: "EV is the missing term.",
        explanation:
          "The first letter moves forward A, B, C, D, E while the second letter moves backward Z, Y, X, W, V.",
      },
      {
        question:
          "Statement: No engineer is lazy. Some students are engineers. Conclusion: Some students are not lazy. Is the conclusion valid?",
        answer: "Yes, the conclusion is valid.",
        explanation:
          "If some students are engineers and no engineer is lazy, then those students who are engineers are definitely not lazy.",
      },
    ],
  },
  {
    slug: "verbal",
    title: "Verbal Ability",
    shortDescription:
      "Grammar, vocabulary, reading-based reasoning, sentence correction, and usage.",
    intro:
      "Verbal ability helps in online tests and interviews because it reflects clarity of thought and communication. Practice grammar rules, contextual vocabulary, and concise comprehension.",
    tips: [
      "Read the full sentence before focusing on grammar options.",
      "Look for subject-verb agreement and tense consistency first.",
      "In reading-based questions, answer only from the passage, not assumptions.",
    ],
    questions: [
      {
        question:
          "Choose the correct sentence: (A) She do her work sincerely. (B) She does her work sincerely.",
        answer: "Option B is correct.",
        explanation:
          "With a third-person singular subject like 'She', the verb should be 'does'.",
      },
      {
        question:
          "What is the synonym of 'brief'?",
        answer: "A suitable synonym is 'short'.",
        explanation:
          "Brief means concise or short in duration or expression.",
      },
      {
        question:
          "Fill in the blank: He has been working here ____ 2022.",
        answer: "The correct word is 'since'.",
        explanation:
          "'Since' is used for a point in time, while 'for' is used for a duration.",
      },
      {
        question:
          "Identify the error: 'Neither the manager nor the employees was ready.'",
        answer: "The verb should be 'were' instead of 'was'.",
        explanation:
          "When subjects are joined by 'neither...nor', the verb agrees with the subject nearest to it. Here 'employees' is plural, so 'were' is correct.",
      },
      {
        question:
          "What is the antonym of 'expand'?",
        answer: "A suitable antonym is 'contract'.",
        explanation:
          "Expand means to increase in size; contract means to become smaller or narrower.",
      },
      {
        question:
          "Choose the correct preposition: She is good ____ mathematics.",
        answer: "The correct preposition is 'at'.",
        explanation:
          "The standard phrase is 'good at' something.",
      },
      {
        question:
          "Rearrange for a meaningful sentence: (1) the company (2) launched (3) a new product (4) yesterday",
        answer: "The company launched a new product yesterday.",
        explanation:
          "The natural sentence order is subject + verb + object + time expression.",
      },
      {
        question:
          "Choose the correct word: The committee ____ its decision tomorrow.",
        answer: "The correct word is 'will announce'.",
        explanation:
          "The sentence refers to future time using 'tomorrow', so future tense fits best.",
      },
    ],
  },
  {
    slug: "data-interpretation",
    title: "Data Interpretation",
    shortDescription:
      "Tables, charts, percentages, comparisons, and decision-making from numerical data.",
    intro:
      "Data Interpretation is about reading numbers quickly and converting them into comparisons, ratios, and trends. Accuracy matters more than speed at first, but repeated practice improves both.",
    tips: [
      "Read the chart labels and units before calculating.",
      "Estimate first when options are far apart.",
      "Use percentage change and ratio shortcuts to save time.",
    ],
    questions: [
      {
        question:
          "A company's sales were 200 units in January and 260 units in February. What is the percentage increase?",
        answer: "The percentage increase is 30%.",
        explanation:
          "Increase = 260 - 200 = 60. Percentage increase = (60 / 200) x 100 = 30%.",
      },
      {
        question:
          "If Team A scored 480 points and Team B scored 600 points, what is the ratio of A to B?",
        answer: "The ratio is 4:5.",
        explanation:
          "480:600 simplifies by dividing both values by 120, giving 4:5.",
      },
      {
        question:
          "A pie chart shows 25% of expenses go to rent. If total expenses are Rs. 80,000, how much is spent on rent?",
        answer: "Rs. 20,000 is spent on rent.",
        explanation:
          "25% of 80,000 = 20,000.",
      },
      {
        question:
          "The production of a factory was 1,200 units in Q1 and 1,500 units in Q2. How many extra units were produced in Q2?",
        answer: "300 extra units were produced.",
        explanation:
          "Difference = 1,500 - 1,200 = 300.",
      },
      {
        question:
          "If the values in a bar graph are 40, 60, 80, and 100, what is their average?",
        answer: "The average is 70.",
        explanation:
          "Average = (40 + 60 + 80 + 100) / 4 = 280 / 4 = 70.",
      },
      {
        question:
          "A table shows profit in two years: Rs. 90,000 and Rs. 1,08,000. Find the percentage increase.",
        answer: "The percentage increase is 20%.",
        explanation:
          "Increase = 18,000. Percentage increase = (18,000 / 90,000) x 100 = 20%.",
      },
      {
        question:
          "Out of 500 students, 320 passed. What percentage of students passed?",
        answer: "64% of students passed.",
        explanation:
          "Pass percentage = (320 / 500) x 100 = 64%.",
      },
      {
        question:
          "The monthly revenue figures are 50, 55, 65, and 70 lakhs. What is the total revenue?",
        answer: "The total revenue is 240 lakhs.",
        explanation:
          "Add all four values: 50 + 55 + 65 + 70 = 240.",
      },
    ],
  },
];

export const aptitudeMockTest = [
  {
    section: "Quantitative Aptitude",
    question: "If the cost price of an item is Rs. 500 and the profit is 20%, what is the selling price?",
    options: ["Rs. 550", "Rs. 600", "Rs. 620", "Rs. 650"],
    correctOption: 1,
    explanation: "20% of 500 is 100, so selling price is 600.",
  },
  {
    section: "Quantitative Aptitude",
    question: "A number is increased by 25% and becomes 250. What was the original number?",
    options: ["180", "190", "200", "220"],
    correctOption: 2,
    explanation: "Original number = 250 / 1.25 = 200.",
  },
  {
    section: "Quantitative Aptitude",
    question: "The ratio of A:B is 4:5. If A is 48, what is B?",
    options: ["52", "56", "60", "64"],
    correctOption: 2,
    explanation: "If 4 parts are 48, then 1 part is 12. So B = 5 x 12 = 60.",
  },
  {
    section: "Quantitative Aptitude",
    question: "A train covers 240 km in 4 hours. What is its average speed?",
    options: ["50 km/h", "55 km/h", "60 km/h", "65 km/h"],
    correctOption: 2,
    explanation: "Speed = distance / time = 240 / 4 = 60 km/h.",
  },
  {
    section: "Quantitative Aptitude",
    question: "A and B can complete a work in 12 and 18 days respectively. How many days together?",
    options: ["6.2 days", "7.2 days", "8 days", "9 days"],
    correctOption: 1,
    explanation: "Combined work = 1/12 + 1/18 = 5/36, so time = 36/5 = 7.2 days.",
  },
  {
    section: "Quantitative Aptitude",
    question: "The average of 8 numbers is 18. If one number is removed, the average becomes 16. What is the removed number?",
    options: ["28", "30", "32", "34"],
    correctOption: 2,
    explanation: "Sum of 8 numbers = 144. Sum of 7 numbers = 112. Difference = 32.",
  },
  {
    section: "Quantitative Aptitude",
    question: "If simple interest on Rs. 2,000 at 5% per annum is calculated for 3 years, what is the interest?",
    options: ["Rs. 250", "Rs. 300", "Rs. 350", "Rs. 400"],
    correctOption: 1,
    explanation: "SI = (P x R x T) / 100 = (2000 x 5 x 3) / 100 = 300.",
  },
  {
    section: "Quantitative Aptitude",
    question: "A person buys an article for Rs. 800 and sells it for Rs. 920. What is the profit percentage?",
    options: ["12%", "15%", "18%", "20%"],
    correctOption: 1,
    explanation: "Profit = 120, so profit percentage = 120/800 x 100 = 15%.",
  },
  {
    section: "Quantitative Aptitude",
    question: "If 15 men can do a work in 12 days, how many men are needed to do it in 9 days?",
    options: ["18", "20", "22", "24"],
    correctOption: 1,
    explanation: "Men x days stays constant, so 15 x 12 = M x 9. Hence M = 20.",
  },
  {
    section: "Quantitative Aptitude",
    question: "What is 35% of 480?",
    options: ["156", "162", "168", "172"],
    correctOption: 2,
    explanation: "35% of 480 = 0.35 x 480 = 168.",
  },
  {
    section: "Quantitative Aptitude",
    question: "A sum amounts to Rs. 4,620 in 2 years at 10% simple interest. What is the principal?",
    options: ["Rs. 3,600", "Rs. 3,750", "Rs. 3,850", "Rs. 4,000"],
    correctOption: 2,
    explanation: "Amount = P + 20% of P = 1.2P. So P = 4620 / 1.2 = 3850.",
  },
  {
    section: "Quantitative Aptitude",
    question: "The average of 10 numbers is 50. What is their total sum?",
    options: ["450", "480", "500", "520"],
    correctOption: 2,
    explanation: "Total sum = average x count = 50 x 10 = 500.",
  },
  {
    section: "Quantitative Aptitude",
    question: "A discount of 15% on Rs. 1,200 gives what selling price?",
    options: ["Rs. 980", "Rs. 1,000", "Rs. 1,020", "Rs. 1,040"],
    correctOption: 2,
    explanation: "Discount = 180, so selling price = 1200 - 180 = 1020.",
  },
  {
    section: "Quantitative Aptitude",
    question: "If 3x = 27, what is the value of x?",
    options: ["6", "7", "8", "9"],
    correctOption: 3,
    explanation: "Divide both sides by 3 to get x = 9.",
  },
  {
    section: "Quantitative Aptitude",
    question: "What is the compound interest on Rs. 1,000 for 2 years at 10% per annum?",
    options: ["Rs. 200", "Rs. 210", "Rs. 220", "Rs. 240"],
    correctOption: 1,
    explanation: "Amount = 1000 x 1.1 x 1.1 = 1210. CI = 1210 - 1000 = 210.",
  },
  {
    section: "Quantitative Aptitude",
    question: "If the ratio of two numbers is 7:9 and their sum is 96, what is the larger number?",
    options: ["42", "48", "54", "60"],
    correctOption: 2,
    explanation: "Total parts = 16. One part = 96/16 = 6. Larger number = 9 x 6 = 54.",
  },
  {
    section: "Quantitative Aptitude",
    question: "A car travels 150 km at 50 km/h. How much time does it take?",
    options: ["2 hours", "2.5 hours", "3 hours", "3.5 hours"],
    correctOption: 2,
    explanation: "Time = distance / speed = 150 / 50 = 3 hours.",
  },
  {
    section: "Quantitative Aptitude",
    question: "What is the median of 2, 4, 6, 8, 10?",
    options: ["4", "5", "6", "7"],
    correctOption: 2,
    explanation: "The middle value in the ordered list is 6.",
  },
  {
    section: "Quantitative Aptitude",
    question: "A boat goes 30 km downstream in 2 hours. What is its downstream speed?",
    options: ["12 km/h", "14 km/h", "15 km/h", "18 km/h"],
    correctOption: 2,
    explanation: "Speed = distance / time = 30 / 2 = 15 km/h.",
  },
  {
    section: "Quantitative Aptitude",
    question: "If 18 is 30% of a number, what is the number?",
    options: ["50", "60", "70", "80"],
    correctOption: 1,
    explanation: "Number = 18 / 0.3 = 60.",
  },
  {
    section: "Quantitative Aptitude",
    question: "A and B invest Rs. 4,000 and Rs. 6,000 in a business. What is their profit-sharing ratio?",
    options: ["2:3", "3:2", "4:5", "5:6"],
    correctOption: 0,
    explanation: "Profit ratio follows investment ratio, so 4000:6000 = 2:3.",
  },
  {
    section: "Quantitative Aptitude",
    question: "What is the HCF of 24 and 36?",
    options: ["6", "8", "10", "12"],
    correctOption: 3,
    explanation: "The greatest common factor of 24 and 36 is 12.",
  },
  {
    section: "Quantitative Aptitude",
    question: "What is the LCM of 8 and 12?",
    options: ["16", "20", "24", "36"],
    correctOption: 2,
    explanation: "The least common multiple of 8 and 12 is 24.",
  },
  {
    section: "Quantitative Aptitude",
    question: "If one angle of a triangle is 90° and another is 35°, what is the third angle?",
    options: ["45°", "55°", "60°", "65°"],
    correctOption: 1,
    explanation: "Angles of a triangle sum to 180°, so third angle = 180 - 90 - 35 = 55°.",
  },
  {
    section: "Quantitative Aptitude",
    question: "A shopkeeper gains 25% by selling an article for Rs. 500. What is the cost price?",
    options: ["Rs. 380", "Rs. 400", "Rs. 420", "Rs. 450"],
    correctOption: 1,
    explanation: "Cost price = 500 / 1.25 = 400.",
  },

  {
    section: "Logical Reasoning",
    question: "Find the next term: 5, 11, 23, 47, ?",
    options: ["88", "91", "95", "99"],
    correctOption: 2,
    explanation: "Each term is previous x 2 + 1, so the next term is 95.",
  },
  {
    section: "Logical Reasoning",
    question: "Choose the odd one out.",
    options: ["Square", "Rectangle", "Triangle", "Cube"],
    correctOption: 3,
    explanation: "Cube is a 3D shape while the others are 2D shapes.",
  },
  {
    section: "Logical Reasoning",
    question: "Find the missing term: AZ, BY, CX, DW, ?",
    options: ["EV", "EU", "FV", "GW"],
    correctOption: 0,
    explanation: "The first letter moves forward and the second moves backward, so EV fits.",
  },
  {
    section: "Logical Reasoning",
    question: "If CAT is coded as 24, then BAT is coded as:",
    options: ["21", "22", "23", "24"],
    correctOption: 2,
    explanation: "B + A + T = 2 + 1 + 20 = 23.",
  },
  {
    section: "Logical Reasoning",
    question: "A is taller than B, B is taller than C. Who is shortest?",
    options: ["A", "B", "C", "Cannot say"],
    correctOption: 2,
    explanation: "From A > B > C, C is shortest.",
  },
  {
    section: "Logical Reasoning",
    question: "If all pens are pencils and some pencils are markers, which conclusion is definitely true?",
    options: [
      "All markers are pens",
      "Some markers are pens",
      "All pens are pencils",
      "No pencil is a marker",
    ],
    correctOption: 2,
    explanation: "The only guaranteed conclusion from the statement is that all pens are pencils.",
  },
  {
    section: "Logical Reasoning",
    question: "Choose the next letter group: AB, DE, GH, ?",
    options: ["IJ", "JK", "KL", "LM"],
    correctOption: 1,
    explanation: "Each pair jumps by 3 letters: AB, DE, GH, JK.",
  },
  {
    section: "Logical Reasoning",
    question: "In a row of five students, P sits left of Q and Q sits left of R. Who is in the middle among them?",
    options: ["P", "Q", "R", "Cannot say"],
    correctOption: 1,
    explanation: "The order is P, Q, R so Q is in the middle.",
  },
  {
    section: "Logical Reasoning",
    question: "Find the next number: 3, 9, 27, 81, ?",
    options: ["162", "216", "243", "324"],
    correctOption: 2,
    explanation: "Each term is multiplied by 3, so 81 x 3 = 243.",
  },
  {
    section: "Logical Reasoning",
    question: "If FRIEND is coded as HUMJQG, then CODE is coded as:",
    options: ["ERGH", "FPEF", "DQGF", "CPDF"],
    correctOption: 1,
    explanation: "Each letter moves one step forward: C-D, O-P, D-E, E-F.",
  },
  {
    section: "Logical Reasoning",
    question: "Which number does not belong? 4, 9, 16, 25, 27, 36",
    options: ["9", "16", "25", "27"],
    correctOption: 3,
    explanation: "All except 27 are perfect squares.",
  },
  {
    section: "Logical Reasoning",
    question: "If Monday is coded as 1, Tuesday as 2, what is Friday coded as?",
    options: ["4", "5", "6", "7"],
    correctOption: 1,
    explanation: "Friday is the fifth weekday in this coding pattern.",
  },
  {
    section: "Logical Reasoning",
    question: "A statement says: Some doctors are writers. Which conclusion is valid?",
    options: [
      "All doctors are writers",
      "Some writers are doctors",
      "No writer is a doctor",
      "All writers are doctors",
    ],
    correctOption: 1,
    explanation: "If some doctors are writers, then some writers are doctors.",
  },
  {
    section: "Logical Reasoning",
    question: "What comes next in the pattern: 1, 4, 9, 16, 25, ?",
    options: ["30", "34", "36", "49"],
    correctOption: 2,
    explanation: "These are square numbers, so the next is 6^2 = 36.",
  },
  {
    section: "Logical Reasoning",
    question: "Pointing to a girl, Raj says, 'She is the daughter of my mother's only daughter.' Who is the girl to Raj?",
    options: ["Sister", "Daughter", "Niece", "Cousin"],
    correctOption: 1,
    explanation: "Raj's mother's only daughter is Raj's sister if Raj is male, but in standard reasoning this chain points to Raj's daughter.",
  },
  {
    section: "Logical Reasoning",
    question: "Choose the pair that is similar to Bird : Nest.",
    options: ["Lion : Den", "Cow : Grass", "Fish : Water", "Dog : Bark"],
    correctOption: 0,
    explanation: "Bird lives in a nest just as a lion lives in a den.",
  },
  {
    section: "Logical Reasoning",
    question: "Which letter is 5th to the right of H in the English alphabet?",
    options: ["K", "L", "M", "N"],
    correctOption: 2,
    explanation: "Counting five letters to the right of H gives M.",
  },
  {
    section: "Logical Reasoning",
    question: "If all books are papers and all papers are wood, then all books are:",
    options: ["Trees", "Wood", "Pages", "Pencils"],
    correctOption: 1,
    explanation: "By transitive relation, all books are wood.",
  },
  {
    section: "Logical Reasoning",
    question: "Find the odd one out: January, March, May, June",
    options: ["January", "March", "May", "June"],
    correctOption: 3,
    explanation: "June has 30 days while the others have 31 days.",
  },
  {
    section: "Logical Reasoning",
    question: "Find the missing term: B, E, H, K, ?",
    options: ["M", "N", "O", "P"],
    correctOption: 1,
    explanation: "Each letter moves ahead by 3 positions: B, E, H, K, N.",
  },
  {
    section: "Logical Reasoning",
    question: "A clock shows 3:15. What is the angle between the hour and minute hands approximately?",
    options: ["0°", "7.5°", "15°", "22.5°"],
    correctOption: 1,
    explanation: "At 3:15 the hour hand has moved 7.5° beyond 3 while the minute hand is at 90°.",
  },
  {
    section: "Logical Reasoning",
    question: "If 1 = A, 2 = B and so on, what does 3-15-4-5 mean?",
    options: ["COME", "CODE", "COLD", "COVE"],
    correctOption: 1,
    explanation: "3 = C, 15 = O, 4 = D, 5 = E.",
  },
  {
    section: "Logical Reasoning",
    question: "A father is twice as old as his son. If the son's age is 14, father's age is:",
    options: ["24", "26", "28", "30"],
    correctOption: 2,
    explanation: "Twice of 14 is 28.",
  },
  {
    section: "Logical Reasoning",
    question: "Find the next pair: 2A, 4C, 6E, 8G, ?",
    options: ["10I", "12I", "10J", "12K"],
    correctOption: 0,
    explanation: "Numbers increase by 2 and letters skip one each time, so 10I.",
  },
  {
    section: "Logical Reasoning",
    question: "If South-East becomes North, North-East becomes West, then South becomes:",
    options: ["East", "North-East", "South-West", "North-West"],
    correctOption: 3,
    explanation: "This is a 135-degree rotation mapping, so South becomes North-West.",
  },

  {
    section: "Verbal Ability",
    question: "Choose the correct sentence.",
    options: [
      "He do not like coffee.",
      "He does not likes coffee.",
      "He does not like coffee.",
      "He not like coffee.",
    ],
    correctOption: 2,
    explanation: "With 'does not', the main verb remains in base form.",
  },
  {
    section: "Verbal Ability",
    question: "Choose the synonym of 'rapid'.",
    options: ["Slow", "Quick", "Heavy", "Clear"],
    correctOption: 1,
    explanation: "Rapid means quick or fast.",
  },
  {
    section: "Verbal Ability",
    question: "Fill in the blank: She is interested ____ data science.",
    options: ["on", "at", "in", "for"],
    correctOption: 2,
    explanation: "The correct phrase is 'interested in'.",
  },
  {
    section: "Verbal Ability",
    question: "Choose the antonym of 'expand'.",
    options: ["Increase", "Enlarge", "Contract", "Multiply"],
    correctOption: 2,
    explanation: "Contract is opposite in meaning to expand.",
  },
  {
    section: "Verbal Ability",
    question: "Identify the correct spelling.",
    options: ["Accomodation", "Accommodation", "Acommodation", "Accommadation"],
    correctOption: 1,
    explanation: "The correct spelling is Accommodation.",
  },
  {
    section: "Verbal Ability",
    question: "Fill in the blank: He has lived here ____ 2019.",
    options: ["for", "since", "from", "in"],
    correctOption: 1,
    explanation: "'Since' is used with a point in time.",
  },
  {
    section: "Verbal Ability",
    question: "Choose the correct passive form: 'They completed the project.'",
    options: [
      "The project completed by them.",
      "The project was completed by them.",
      "The project is completed by them.",
      "The project had completed by them.",
    ],
    correctOption: 1,
    explanation: "The simple past passive form is 'was completed'.",
  },
  {
    section: "Verbal Ability",
    question: "Select the word closest in meaning to 'brief'.",
    options: ["Long", "Short", "Complex", "Strong"],
    correctOption: 1,
    explanation: "Brief means short or concise.",
  },
  {
    section: "Verbal Ability",
    question: "Choose the correct preposition: He is fond ____ music.",
    options: ["of", "for", "with", "to"],
    correctOption: 0,
    explanation: "The standard usage is 'fond of'.",
  },
  {
    section: "Verbal Ability",
    question: "Select the correct sentence.",
    options: [
      "Each of the players have a jersey.",
      "Each of the players has a jersey.",
      "Each of the players are having a jersey.",
      "Each of the players have had a jersey.",
    ],
    correctOption: 1,
    explanation: "'Each' is singular, so 'has' is correct.",
  },
  {
    section: "Verbal Ability",
    question: "Choose the one-word substitute for 'a person who writes poems'.",
    options: ["Author", "Writer", "Poet", "Editor"],
    correctOption: 2,
    explanation: "A person who writes poems is called a poet.",
  },
  {
    section: "Verbal Ability",
    question: "Fill in the blank: She prefers tea ____ coffee.",
    options: ["than", "from", "to", "over"],
    correctOption: 2,
    explanation: "The standard expression is 'prefer tea to coffee'.",
  },
  {
    section: "Verbal Ability",
    question: "Choose the synonym of 'abundant'.",
    options: ["Scarce", "Plentiful", "Weak", "Empty"],
    correctOption: 1,
    explanation: "Abundant means plentiful or available in large quantity.",
  },
  {
    section: "Verbal Ability",
    question: "Identify the error: 'Neither of the answers are correct.'",
    options: ["Neither", "answers", "are", "correct"],
    correctOption: 2,
    explanation: "'Neither' is singular, so the verb should be 'is'.",
  },
  {
    section: "Verbal Ability",
    question: "Choose the correct indirect speech: He said, 'I am ready.'",
    options: [
      "He said that he was ready.",
      "He said that I am ready.",
      "He said he is ready.",
      "He says that he was ready.",
    ],
    correctOption: 0,
    explanation: "Direct speech in present becomes past in indirect speech here: was ready.",
  },
  {
    section: "Verbal Ability",
    question: "Select the antonym of 'optimistic'.",
    options: ["Hopeful", "Positive", "Pessimistic", "Joyful"],
    correctOption: 2,
    explanation: "Pessimistic is opposite in meaning to optimistic.",
  },
  {
    section: "Verbal Ability",
    question: "Choose the correct article: He is ____ honest man.",
    options: ["a", "an", "the", "no article"],
    correctOption: 1,
    explanation: "'Honest' starts with a vowel sound, so 'an' is correct.",
  },
  {
    section: "Verbal Ability",
    question: "What is the meaning of 'meticulous'?",
    options: ["Careless", "Very careful", "Very angry", "Very tired"],
    correctOption: 1,
    explanation: "Meticulous means very careful and precise.",
  },
  {
    section: "Verbal Ability",
    question: "Choose the correct connector: He worked hard, ____ he did not succeed.",
    options: ["because", "but", "so", "therefore"],
    correctOption: 1,
    explanation: "The sentence shows contrast, so 'but' is correct.",
  },
  {
    section: "Verbal Ability",
    question: "Pick the correctly punctuated sentence.",
    options: [
      "Lets eat, grandma.",
      "Let's eat grandma.",
      "Let's eat, grandma.",
      "Lets eat grandma.",
    ],
    correctOption: 2,
    explanation: "The comma is necessary to address grandma rather than imply eating her.",
  },
  {
    section: "Verbal Ability",
    question: "Choose the correct tense: By next year, she ____ here for five years.",
    options: ["works", "will work", "will have worked", "has worked"],
    correctOption: 2,
    explanation: "Future perfect is used for an action completed by a future time.",
  },
  {
    section: "Verbal Ability",
    question: "Which word is closest in meaning to 'obtain'?",
    options: ["Lose", "Acquire", "Delay", "Forget"],
    correctOption: 1,
    explanation: "Obtain means to get or acquire.",
  },
  {
    section: "Verbal Ability",
    question: "Fill in the blank: The results were divided ____ two groups.",
    options: ["between", "among", "into", "across"],
    correctOption: 2,
    explanation: "The phrase 'divided into' is correct here.",
  },
  {
    section: "Verbal Ability",
    question: "Choose the sentence with correct subject-verb agreement.",
    options: [
      "The list of items are on the desk.",
      "The list of items is on the desk.",
      "The list of items were on the desk.",
      "The list of items have been on the desk.",
    ],
    correctOption: 1,
    explanation: "The subject is 'list', which is singular, so 'is' is correct.",
  },
  {
    section: "Verbal Ability",
    question: "Find the odd word out.",
    options: ["Book", "Magazine", "Journal", "Table"],
    correctOption: 3,
    explanation: "Table is furniture while the others are reading materials.",
  },

  {
    section: "Data Interpretation",
    question: "If revenue rises from 150 to 195, what is the percentage increase?",
    options: ["20%", "25%", "30%", "35%"],
    correctOption: 2,
    explanation: "Increase is 45. Percentage increase = (45 / 150) x 100 = 30%.",
  },
  {
    section: "Data Interpretation",
    question: "In a class of 200 students, 120 are boys. What percentage are girls?",
    options: ["30%", "35%", "40%", "45%"],
    correctOption: 2,
    explanation: "Girls = 80. Percentage = 80/200 x 100 = 40%.",
  },
  {
    section: "Data Interpretation",
    question: "Sales in two months are 75 and 90 units. What is the ratio of first month to second month?",
    options: ["5:6", "6:5", "15:16", "3:4"],
    correctOption: 0,
    explanation: "75:90 simplifies to 5:6.",
  },
  {
    section: "Data Interpretation",
    question: "A company's profit rises from Rs. 80,000 to Rs. 1,00,000. What is the increase?",
    options: ["Rs. 15,000", "Rs. 20,000", "Rs. 22,000", "Rs. 25,000"],
    correctOption: 1,
    explanation: "Increase = 1,00,000 - 80,000 = 20,000.",
  },
  {
    section: "Data Interpretation",
    question: "A pie chart shows marketing = 20% of total spend. If total spend is Rs. 5,00,000, how much goes to marketing?",
    options: ["Rs. 75,000", "Rs. 90,000", "Rs. 1,00,000", "Rs. 1,20,000"],
    correctOption: 2,
    explanation: "20% of 5,00,000 = 1,00,000.",
  },
  {
    section: "Data Interpretation",
    question: "The bar graph values are 40, 60, 80, and 100. What is the average?",
    options: ["60", "65", "70", "75"],
    correctOption: 2,
    explanation: "Average = (40 + 60 + 80 + 100) / 4 = 70.",
  },
  {
    section: "Data Interpretation",
    question: "Population figures are 12,000 and 15,600 in two years. What is the percentage increase?",
    options: ["20%", "25%", "30%", "35%"],
    correctOption: 2,
    explanation: "Increase = 3,600. Percentage increase = 3,600 / 12,000 x 100 = 30%.",
  },
  {
    section: "Data Interpretation",
    question: "If a company sells 500, 600, and 700 units in three quarters, what is the total?",
    options: ["1,700", "1,800", "1,900", "2,000"],
    correctOption: 1,
    explanation: "Total sales = 500 + 600 + 700 = 1,800.",
  },
  {
    section: "Data Interpretation",
    question: "A student scores 72, 80, 76, and 92 in four subjects. What is the average score?",
    options: ["78", "79", "80", "81"],
    correctOption: 2,
    explanation: "Average = (72 + 80 + 76 + 92) / 4 = 320 / 4 = 80.",
  },
  {
    section: "Data Interpretation",
    question: "If expenses are 30%, 25%, 20%, and 25% for four heads, which head has the highest share?",
    options: ["First", "Second", "Third", "Fourth"],
    correctOption: 0,
    explanation: "30% is the highest among the four values.",
  },
  {
    section: "Data Interpretation",
    question: "Production in January and February is 240 and 300 units. What is the ratio?",
    options: ["3:4", "4:5", "5:6", "6:7"],
    correctOption: 1,
    explanation: "240:300 simplifies to 4:5.",
  },
  {
    section: "Data Interpretation",
    question: "Out of 800 applicants, 560 qualified the first round. What percentage qualified?",
    options: ["60%", "65%", "70%", "75%"],
    correctOption: 2,
    explanation: "560 / 800 x 100 = 70%.",
  },
  {
    section: "Data Interpretation",
    question: "Monthly revenue in lakhs is 20, 24, 28, and 32. By how much did revenue increase from first to last month?",
    options: ["8", "10", "12", "14"],
    correctOption: 2,
    explanation: "Increase = 32 - 20 = 12 lakhs.",
  },
  {
    section: "Data Interpretation",
    question: "If 45% of employees are women in a company of 1,200 employees, how many women are there?",
    options: ["500", "520", "540", "560"],
    correctOption: 2,
    explanation: "45% of 1,200 = 540.",
  },
  {
    section: "Data Interpretation",
    question: "The profits in two years are 48 and 60 lakhs. What is the percentage increase?",
    options: ["20%", "25%", "30%", "35%"],
    correctOption: 1,
    explanation: "Increase = 12. Percentage increase = 12/48 x 100 = 25%.",
  },
  {
    section: "Data Interpretation",
    question: "A table shows values 18, 24, 30, and 36. What is the median?",
    options: ["24", "27", "30", "32"],
    correctOption: 1,
    explanation: "Median of four values is average of middle two = (24 + 30) / 2 = 27.",
  },
  {
    section: "Data Interpretation",
    question: "An exam result shows 320 pass and 80 fail out of 400 students. What is the pass to fail ratio?",
    options: ["2:1", "3:1", "4:1", "5:1"],
    correctOption: 2,
    explanation: "320:80 simplifies to 4:1.",
  },
  {
    section: "Data Interpretation",
    question: "If expenditure falls from 2,40,000 to 2,16,000, what is the percentage decrease?",
    options: ["8%", "10%", "12%", "15%"],
    correctOption: 1,
    explanation: "Decrease = 24,000. Percentage decrease = 24,000 / 2,40,000 x 100 = 10%.",
  },
  {
    section: "Data Interpretation",
    question: "The ratio of online to offline sales is 7:5. If total sales are 480, what are offline sales?",
    options: ["180", "200", "220", "240"],
    correctOption: 1,
    explanation: "Total parts = 12. One part = 40. Offline sales = 5 x 40 = 200.",
  },
  {
    section: "Data Interpretation",
    question: "A pie chart divides budget into 10%, 15%, 25%, and 50%. Which two parts together make 40%?",
    options: ["10% and 15%", "10% and 25%", "15% and 25%", "25% and 50%"],
    correctOption: 2,
    explanation: "15% + 25% = 40%.",
  },
  {
    section: "Data Interpretation",
    question: "Values in a chart are 12, 18, 24, 30, and 36. What is the highest value?",
    options: ["24", "30", "32", "36"],
    correctOption: 3,
    explanation: "36 is the maximum among the listed values.",
  },
  {
    section: "Data Interpretation",
    question: "If sales in one quarter are 1,250 units and in the next quarter 1,500 units, what is the increase in units?",
    options: ["200", "220", "250", "300"],
    correctOption: 2,
    explanation: "Increase = 1,500 - 1,250 = 250 units.",
  },
  {
    section: "Data Interpretation",
    question: "A company earns 18%, 22%, 24%, and 36% revenue from four products. Which product has the second highest share?",
    options: ["18%", "22%", "24%", "36%"],
    correctOption: 2,
    explanation: "36% is highest and 24% is second highest.",
  },
  {
    section: "Data Interpretation",
    question: "If average monthly users over 5 months is 4,000, what is the total number of users over 5 months?",
    options: ["18,000", "19,000", "20,000", "21,000"],
    correctOption: 2,
    explanation: "Total = average x count = 4,000 x 5 = 20,000.",
  },
  {
    section: "Data Interpretation",
    question: "A data table shows marks of 65, 70, 80, and 85. What is the range?",
    options: ["15", "18", "20", "22"],
    correctOption: 2,
    explanation: "Range = highest - lowest = 85 - 65 = 20.",
  },
];
