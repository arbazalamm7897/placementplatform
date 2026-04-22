export const dsaProblems = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    description:
      "Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to target. You may assume exactly one valid answer exists.",
    examples: [
      {
        input: "nums = [2, 7, 11, 15], target = 9",
        output: "[0, 1]",
      },
      {
        input: "nums = [3, 2, 4], target = 6",
        output: "[1, 2]",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "Exactly one valid answer exists",
    ],
    functionName: "twoSum",
    javascriptTemplate: `function twoSum(nums, target) {\n  // write your solution here\n}\n`,
    pythonTemplate: `def two_sum(nums, target):\n    # write your solution here\n    pass\n`,
    cppTemplate: `vector<int> twoSum(vector<int>& nums, int target) {\n    // write your solution here\n}\n`,
    javaTemplate: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // write your solution here\n    }\n}\n`,
    testCases: [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { input: [[3, 2, 4], 6], expected: [1, 2] },
      { input: [[3, 3], 6], expected: [0, 1] },
    ],
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    description:
      "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    examples: [
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false" },
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only",
    ],
    functionName: "isValid",
    javascriptTemplate: `function isValid(s) {\n  // write your solution here\n}\n`,
    pythonTemplate: `def is_valid(s):\n    # write your solution here\n    pass\n`,
    cppTemplate: `bool isValid(string s) {\n    // write your solution here\n}\n`,
    javaTemplate: `class Solution {\n    public boolean isValid(String s) {\n        // write your solution here\n    }\n}\n`,
    testCases: [
      { input: ["()[]{}"], expected: true },
      { input: ["(]"], expected: false },
      { input: ["({[]})"], expected: true },
    ],
  },
  {
    id: "contains-duplicate",
    title: "Contains Duplicate",
    difficulty: "Easy",
    description:
      "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
    examples: [
      { input: "nums = [1,2,3,1]", output: "true" },
      { input: "nums = [1,2,3,4]", output: "false" },
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
    ],
    functionName: "containsDuplicate",
    javascriptTemplate: `function containsDuplicate(nums) {\n  // write your solution here\n}\n`,
    pythonTemplate: `def contains_duplicate(nums):\n    # write your solution here\n    pass\n`,
    cppTemplate: `bool containsDuplicate(vector<int>& nums) {\n    // write your solution here\n}\n`,
    javaTemplate: `class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        // write your solution here\n    }\n}\n`,
    testCases: [
      { input: [[1, 2, 3, 1]], expected: true },
      { input: [[1, 2, 3, 4]], expected: false },
      { input: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]], expected: true },
    ],
  },
  {
    id: "best-time-to-buy-and-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    description:
      "You are given an array prices where prices[i] is the price of a stock on the ith day. Return the maximum profit you can achieve from one transaction.",
    examples: [
      { input: "prices = [7,1,5,3,6,4]", output: "5" },
      { input: "prices = [7,6,4,3,1]", output: "0" },
    ],
    constraints: [
      "1 <= prices.length <= 10^5",
      "0 <= prices[i] <= 10^4",
    ],
    functionName: "maxProfit",
    javascriptTemplate: `function maxProfit(prices) {\n  // write your solution here\n}\n`,
    pythonTemplate: `def max_profit(prices):\n    # write your solution here\n    pass\n`,
    cppTemplate: `int maxProfit(vector<int>& prices) {\n    // write your solution here\n}\n`,
    javaTemplate: `class Solution {\n    public int maxProfit(int[] prices) {\n        // write your solution here\n    }\n}\n`,
    testCases: [
      { input: [[7, 1, 5, 3, 6, 4]], expected: 5 },
      { input: [[7, 6, 4, 3, 1]], expected: 0 },
      { input: [[2, 4, 1]], expected: 2 },
    ],
  },
  {
    id: "valid-anagram",
    title: "Valid Anagram",
    difficulty: "Easy",
    description:
      "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: "true" },
      { input: 's = "rat", t = "car"', output: "false" },
    ],
    constraints: [
      "1 <= s.length, t.length <= 5 * 10^4",
      "s and t consist of lowercase English letters",
    ],
    functionName: "isAnagram",
    javascriptTemplate: `function isAnagram(s, t) {\n  // write your solution here\n}\n`,
    pythonTemplate: `def is_anagram(s, t):\n    # write your solution here\n    pass\n`,
    cppTemplate: `bool isAnagram(string s, string t) {\n    // write your solution here\n}\n`,
    javaTemplate: `class Solution {\n    public boolean isAnagram(String s, String t) {\n        // write your solution here\n    }\n}\n`,
    testCases: [
      { input: ["anagram", "nagaram"], expected: true },
      { input: ["rat", "car"], expected: false },
      { input: ["listen", "silent"], expected: true },
    ],
  },
  {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Easy",
    description:
      "Given an integer array nums, find the contiguous subarray with the largest sum and return its sum.",
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6" },
      { input: "nums = [1]", output: "1" },
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
    ],
    functionName: "maxSubArray",
    javascriptTemplate: `function maxSubArray(nums) {\n  // write your solution here\n}\n`,
    pythonTemplate: `def max_sub_array(nums):\n    # write your solution here\n    pass\n`,
    cppTemplate: `int maxSubArray(vector<int>& nums) {\n    // write your solution here\n}\n`,
    javaTemplate: `class Solution {\n    public int maxSubArray(int[] nums) {\n        // write your solution here\n    }\n}\n`,
    testCases: [
      { input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 },
      { input: [[1]], expected: 1 },
      { input: [[5, 4, -1, 7, 8]], expected: 23 },
    ],
  },
  {
    id: "longest-substring-without-repeating",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    description:
      "Given a string s, find the length of the longest substring without repeating characters.",
    examples: [
      { input: 's = "abcabcbb"', output: "3" },
      { input: 's = "bbbbb"', output: "1" },
    ],
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols, and spaces",
    ],
    functionName: "lengthOfLongestSubstring",
    javascriptTemplate: `function lengthOfLongestSubstring(s) {\n  // write your solution here\n}\n`,
    pythonTemplate: `def length_of_longest_substring(s):\n    # write your solution here\n    pass\n`,
    cppTemplate: `int lengthOfLongestSubstring(string s) {\n    // write your solution here\n}\n`,
    javaTemplate: `class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // write your solution here\n    }\n}\n`,
    testCases: [
      { input: ["abcabcbb"], expected: 3 },
      { input: ["bbbbb"], expected: 1 },
      { input: ["pwwkew"], expected: 3 },
    ],
  },
  {
    id: "product-of-array-except-self",
    title: "Product of Array Except Self",
    difficulty: "Medium",
    description:
      "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements except nums[i]. Solve it without division.",
    examples: [
      { input: "nums = [1, 2, 3, 4]", output: "[24, 12, 8, 6]" },
      { input: "nums = [-1, 1, 0, -3, 3]", output: "[0, 0, 9, 0, 0]" },
    ],
    constraints: [
      "2 <= nums.length <= 10^5",
      "Do not use division",
    ],
    functionName: "productExceptSelf",
    javascriptTemplate: `function productExceptSelf(nums) {\n  // write your solution here\n}\n`,
    pythonTemplate: `def product_except_self(nums):\n    # write your solution here\n    pass\n`,
    cppTemplate: `vector<int> productExceptSelf(vector<int>& nums) {\n    // write your solution here\n}\n`,
    javaTemplate: `class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        // write your solution here\n    }\n}\n`,
    testCases: [
      { input: [[1, 2, 3, 4]], expected: [24, 12, 8, 6] },
      { input: [[-1, 1, 0, -3, 3]], expected: [0, 0, 9, 0, 0] },
    ],
  },
  {
    id: "binary-search",
    title: "Binary Search",
    difficulty: "Medium",
    description:
      "Given a sorted array of integers nums and an integer target, return the index of target if it exists, otherwise return -1.",
    examples: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" },
      { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1" },
    ],
    constraints: [
      "1 <= nums.length <= 10^4",
      "nums is sorted in ascending order",
    ],
    functionName: "search",
    javascriptTemplate: `function search(nums, target) {\n  // write your solution here\n}\n`,
    pythonTemplate: `def search(nums, target):\n    # write your solution here\n    pass\n`,
    cppTemplate: `int search(vector<int>& nums, int target) {\n    // write your solution here\n}\n`,
    javaTemplate: `class Solution {\n    public int search(int[] nums, int target) {\n        // write your solution here\n    }\n}\n`,
    testCases: [
      { input: [[-1, 0, 3, 5, 9, 12], 9], expected: 4 },
      { input: [[-1, 0, 3, 5, 9, 12], 2], expected: -1 },
      { input: [[5], 5], expected: 0 },
    ],
  },
  {
    id: "container-with-most-water",
    title: "Container With Most Water",
    difficulty: "Medium",
    description:
      "You are given an integer array height. Find two lines that together with the x-axis form a container such that the container contains the most water.",
    examples: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" },
      { input: "height = [1,1]", output: "1" },
    ],
    constraints: [
      "2 <= height.length <= 10^5",
      "0 <= height[i] <= 10^4",
    ],
    functionName: "maxArea",
    javascriptTemplate: `function maxArea(height) {\n  // write your solution here\n}\n`,
    pythonTemplate: `def max_area(height):\n    # write your solution here\n    pass\n`,
    cppTemplate: `int maxArea(vector<int>& height) {\n    // write your solution here\n}\n`,
    javaTemplate: `class Solution {\n    public int maxArea(int[] height) {\n        // write your solution here\n    }\n}\n`,
    testCases: [
      { input: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expected: 49 },
      { input: [[1, 1]], expected: 1 },
      { input: [[4, 3, 2, 1, 4]], expected: 16 },
    ],
  },
  {
    id: "top-k-frequent-elements",
    title: "Top K Frequent Elements",
    difficulty: "Medium",
    description:
      "Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.",
    examples: [
      { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]" },
      { input: "nums = [1], k = 1", output: "[1]" },
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
      "k is in the range [1, number of unique elements]",
    ],
    functionName: "topKFrequent",
    javascriptTemplate: `function topKFrequent(nums, k) {\n  // write your solution here\n}\n`,
    pythonTemplate: `def top_k_frequent(nums, k):\n    # write your solution here\n    pass\n`,
    cppTemplate: `vector<int> topKFrequent(vector<int>& nums, int k) {\n    // write your solution here\n}\n`,
    javaTemplate: `class Solution {\n    public int[] topKFrequent(int[] nums, int k) {\n        // write your solution here\n    }\n}\n`,
    testCases: [
      { input: [[1, 1, 1, 2, 2, 3], 2], expected: [1, 2] },
      { input: [[1], 1], expected: [1] },
      { input: [[4, 4, 4, 6, 6, 7], 1], expected: [4] },
    ],
  },
  {
    id: "three-sum",
    title: "3Sum",
    difficulty: "Medium",
    description:
      "Given an integer array nums, return all unique triplets [nums[i], nums[j], nums[k]] such that they add up to zero.",
    examples: [
      { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" },
      { input: "nums = [0,1,1]", output: "[]" },
    ],
    constraints: [
      "3 <= nums.length <= 3000",
      "-10^5 <= nums[i] <= 10^5",
    ],
    functionName: "threeSum",
    javascriptTemplate: `function threeSum(nums) {\n  // write your solution here\n}\n`,
    pythonTemplate: `def three_sum(nums):\n    # write your solution here\n    pass\n`,
    cppTemplate: `vector<vector<int>> threeSum(vector<int>& nums) {\n    // write your solution here\n}\n`,
    javaTemplate: `class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        // write your solution here\n    }\n}\n`,
    testCases: [
      { input: [[-1, 0, 1, 2, -1, -4]], expected: [[-1, -1, 2], [-1, 0, 1]] },
      { input: [[0, 1, 1]], expected: [] },
      { input: [[0, 0, 0]], expected: [[0, 0, 0]] },
    ],
  },
  {
    id: "merge-k-sorted-lists",
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    description:
      "You are given an array of k sorted integer arrays. Merge them into one sorted array and return it.",
    examples: [
      {
        input: "lists = [[1,4,5],[1,3,4],[2,6]]",
        output: "[1,1,2,3,4,4,5,6]",
      },
    ],
    constraints: [
      "0 <= k <= 10^4",
      "Lists are individually sorted",
    ],
    functionName: "mergeKSortedLists",
    javascriptTemplate: `function mergeKSortedLists(lists) {\n  // write your solution here\n}\n`,
    pythonTemplate: `def merge_k_sorted_lists(lists):\n    # write your solution here\n    pass\n`,
    cppTemplate: `vector<int> mergeKSortedLists(vector<vector<int>>& lists) {\n    // write your solution here\n}\n`,
    javaTemplate: `class Solution {\n    public List<Integer> mergeKSortedLists(List<List<Integer>> lists) {\n        // write your solution here\n    }\n}\n`,
    testCases: [
      {
        input: [[[1, 4, 5], [1, 3, 4], [2, 6]]],
        expected: [1, 1, 2, 3, 4, 4, 5, 6],
      },
      {
        input: [[[]]],
        expected: [],
      },
    ],
  },
  {
    id: "trapping-rain-water",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    description:
      "Given n non-negative integers representing an elevation map, compute how much water it can trap after raining.",
    examples: [
      {
        input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        output: "6",
      },
    ],
    constraints: [
      "1 <= height.length <= 2 * 10^4",
      "0 <= height[i] <= 10^5",
    ],
    functionName: "trap",
    javascriptTemplate: `function trap(height) {\n  // write your solution here\n}\n`,
    pythonTemplate: `def trap(height):\n    # write your solution here\n    pass\n`,
    cppTemplate: `int trap(vector<int>& height) {\n    // write your solution here\n}\n`,
    javaTemplate: `class Solution {\n    public int trap(int[] height) {\n        // write your solution here\n    }\n}\n`,
    testCases: [
      { input: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], expected: 6 },
      { input: [[4, 2, 0, 3, 2, 5]], expected: 9 },
    ],
  },
  {
    id: "first-missing-positive",
    title: "First Missing Positive",
    difficulty: "Hard",
    description:
      "Given an unsorted integer array nums, return the smallest missing positive integer.",
    examples: [
      { input: "nums = [1,2,0]", output: "3" },
      { input: "nums = [3,4,-1,1]", output: "2" },
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-2^31 <= nums[i] <= 2^31 - 1",
    ],
    functionName: "firstMissingPositive",
    javascriptTemplate: `function firstMissingPositive(nums) {\n  // write your solution here\n}\n`,
    pythonTemplate: `def first_missing_positive(nums):\n    # write your solution here\n    pass\n`,
    cppTemplate: `int firstMissingPositive(vector<int>& nums) {\n    // write your solution here\n}\n`,
    javaTemplate: `class Solution {\n    public int firstMissingPositive(int[] nums) {\n        // write your solution here\n    }\n}\n`,
    testCases: [
      { input: [[1, 2, 0]], expected: 3 },
      { input: [[3, 4, -1, 1]], expected: 2 },
      { input: [[7, 8, 9, 11, 12]], expected: 1 },
    ],
  },
  {
    id: "largest-rectangle-in-histogram",
    title: "Largest Rectangle in Histogram",
    difficulty: "Hard",
    description:
      "Given an array of integers heights representing the histogram's bar height, return the area of the largest rectangle in the histogram.",
    examples: [
      { input: "heights = [2,1,5,6,2,3]", output: "10" },
      { input: "heights = [2,4]", output: "4" },
    ],
    constraints: [
      "1 <= heights.length <= 10^5",
      "0 <= heights[i] <= 10^4",
    ],
    functionName: "largestRectangleArea",
    javascriptTemplate: `function largestRectangleArea(heights) {\n  // write your solution here\n}\n`,
    pythonTemplate: `def largest_rectangle_area(heights):\n    # write your solution here\n    pass\n`,
    cppTemplate: `int largestRectangleArea(vector<int>& heights) {\n    // write your solution here\n}\n`,
    javaTemplate: `class Solution {\n    public int largestRectangleArea(int[] heights) {\n        // write your solution here\n    }\n}\n`,
    testCases: [
      { input: [[2, 1, 5, 6, 2, 3]], expected: 10 },
      { input: [[2, 4]], expected: 4 },
      { input: [[2, 1, 2]], expected: 3 },
    ],
  },
];

export const sqlProblems = [
  {
    id: "top-earners",
    title: "Top Earners",
    difficulty: "Easy",
    description:
      "Write a query to return the name and salary of employees earning more than 60,000.",
    schema: {
      table: "employees",
      columns: ["id", "name", "department", "salary"],
      rows: [
        { id: 1, name: "Arjun", department: "Engineering", salary: 72000 },
        { id: 2, name: "Nisha", department: "Design", salary: 58000 },
        { id: 3, name: "Karan", department: "Engineering", salary: 64000 },
        { id: 4, name: "Meera", department: "HR", salary: 52000 },
      ],
    },
    expectedQuery:
      "select name, salary from employees where salary > 60000",
    starterQuery:
      "SELECT name, salary\nFROM employees\nWHERE salary > 60000;",
    expectedResult: [
      { name: "Arjun", salary: 72000 },
      { name: "Karan", salary: 64000 },
    ],
  },
  {
    id: "design-team-list",
    title: "Design Team List",
    difficulty: "Easy",
    description:
      "Write a query to return the name and department of employees who belong to the Design department.",
    schema: {
      table: "employees",
      columns: ["id", "name", "department", "salary"],
      rows: [
        { id: 1, name: "Arjun", department: "Engineering", salary: 72000 },
        { id: 2, name: "Nisha", department: "Design", salary: 58000 },
        { id: 3, name: "Ritu", department: "Design", salary: 61000 },
        { id: 4, name: "Meera", department: "HR", salary: 52000 },
      ],
    },
    expectedQuery:
      "select name, department from employees where department = 'Design'",
    starterQuery:
      "SELECT name, department\nFROM employees\nWHERE department = 'Design';",
    expectedResult: [
      { name: "Nisha", department: "Design" },
      { name: "Ritu", department: "Design" },
    ],
  },
  {
    id: "high-scoring-students",
    title: "High Scoring Students",
    difficulty: "Easy",
    description:
      "Write a query to return the student name and score for students who scored more than 85.",
    schema: {
      table: "students",
      columns: ["id", "name", "score", "city"],
      rows: [
        { id: 1, name: "Asha", score: 91, city: "Delhi" },
        { id: 2, name: "Rohan", score: 84, city: "Mumbai" },
        { id: 3, name: "Ishita", score: 88, city: "Pune" },
        { id: 4, name: "Kabir", score: 79, city: "Delhi" },
      ],
    },
    expectedQuery:
      "select name, score from students where score > 85",
    starterQuery:
      "SELECT name, score\nFROM students\nWHERE score > 85;",
    expectedResult: [
      { name: "Asha", score: 91 },
      { name: "Ishita", score: 88 },
    ],
  },
  {
    id: "department-count",
    title: "Department Employee Count",
    difficulty: "Medium",
    description:
      "Write a query to return each department and the number of employees in that department.",
    schema: {
      table: "employees",
      columns: ["id", "name", "department", "salary"],
      rows: [
        { id: 1, name: "Arjun", department: "Engineering", salary: 72000 },
        { id: 2, name: "Nisha", department: "Design", salary: 58000 },
        { id: 3, name: "Karan", department: "Engineering", salary: 64000 },
        { id: 4, name: "Meera", department: "HR", salary: 52000 },
        { id: 5, name: "Ritu", department: "Design", salary: 61000 },
      ],
    },
    expectedQuery:
      "select department, count(*) as count from employees group by department",
    starterQuery:
      "SELECT department, COUNT(*) AS count\nFROM employees\nGROUP BY department;",
    expectedResult: [
      { department: "Engineering", count: 2 },
      { department: "Design", count: 2 },
      { department: "HR", count: 1 },
    ],
  },
  {
    id: "city-wise-student-count",
    title: "City Wise Student Count",
    difficulty: "Medium",
    description:
      "Write a query to return each city and the number of students from that city.",
    schema: {
      table: "students",
      columns: ["id", "name", "score", "city"],
      rows: [
        { id: 1, name: "Asha", score: 91, city: "Delhi" },
        { id: 2, name: "Rohan", score: 84, city: "Mumbai" },
        { id: 3, name: "Ishita", score: 88, city: "Pune" },
        { id: 4, name: "Kabir", score: 79, city: "Delhi" },
        { id: 5, name: "Naman", score: 95, city: "Mumbai" },
      ],
    },
    expectedQuery:
      "select city, count(*) as count from students group by city",
    starterQuery:
      "SELECT city, COUNT(*) AS count\nFROM students\nGROUP BY city;",
    expectedResult: [
      { city: "Delhi", count: 2 },
      { city: "Mumbai", count: 2 },
      { city: "Pune", count: 1 },
    ],
  },
  {
    id: "delivered-orders-count",
    title: "Delivered Orders Count",
    difficulty: "Medium",
    description:
      "Write a query to return each status and the number of orders with that status from the orders table.",
    schema: {
      table: "orders",
      columns: ["id", "customer", "status", "amount"],
      rows: [
        { id: 1, customer: "Aman", status: "Delivered", amount: 1500 },
        { id: 2, customer: "Sara", status: "Pending", amount: 900 },
        { id: 3, customer: "Ira", status: "Delivered", amount: 1100 },
        { id: 4, customer: "Neil", status: "Cancelled", amount: 700 },
        { id: 5, customer: "Tina", status: "Pending", amount: 1200 },
      ],
    },
    expectedQuery:
      "select status, count(*) as count from orders group by status",
    starterQuery:
      "SELECT status, COUNT(*) AS count\nFROM orders\nGROUP BY status;",
    expectedResult: [
      { status: "Delivered", count: 2 },
      { status: "Pending", count: 2 },
      { status: "Cancelled", count: 1 },
    ],
  },
  {
    id: "second-highest-salary",
    title: "Second Highest Salary",
    difficulty: "Hard",
    description:
      "Write a query to return the second highest salary from the employees table.",
    schema: {
      table: "employees",
      columns: ["id", "name", "department", "salary"],
      rows: [
        { id: 1, name: "Arjun", department: "Engineering", salary: 72000 },
        { id: 2, name: "Nisha", department: "Design", salary: 58000 },
        { id: 3, name: "Karan", department: "Engineering", salary: 64000 },
        { id: 4, name: "Meera", department: "HR", salary: 52000 },
        { id: 5, name: "Ritu", department: "Design", salary: 61000 },
      ],
    },
    expectedQuery:
      "select max(salary) as second_highest_salary from employees where salary < (select max(salary) from employees)",
    starterQuery:
      "SELECT MAX(salary) AS second_highest_salary\nFROM employees\nWHERE salary < (\n  SELECT MAX(salary)\n  FROM employees\n);",
    expectedResult: [{ second_highest_salary: 64000 }],
  },
  {
    id: "second-highest-order-amount",
    title: "Second Highest Order Amount",
    difficulty: "Hard",
    description:
      "Write a query to return the second highest order amount from the orders table.",
    schema: {
      table: "orders",
      columns: ["id", "customer", "status", "amount"],
      rows: [
        { id: 1, customer: "Aman", status: "Delivered", amount: 1500 },
        { id: 2, customer: "Sara", status: "Pending", amount: 900 },
        { id: 3, customer: "Ira", status: "Delivered", amount: 1100 },
        { id: 4, customer: "Neil", status: "Cancelled", amount: 700 },
        { id: 5, customer: "Tina", status: "Pending", amount: 1200 },
      ],
    },
    expectedQuery:
      "select max(amount) as second_highest_amount from orders where amount < (select max(amount) from orders)",
    starterQuery:
      "SELECT MAX(amount) AS second_highest_amount\nFROM orders\nWHERE amount < (\n  SELECT MAX(amount)\n  FROM orders\n);",
    expectedResult: [{ second_highest_amount: 1200 }],
  },
  {
    id: "second-highest-student-score",
    title: "Second Highest Student Score",
    difficulty: "Hard",
    description:
      "Write a query to return the second highest score from the students table.",
    schema: {
      table: "students",
      columns: ["id", "name", "score", "city"],
      rows: [
        { id: 1, name: "Asha", score: 91, city: "Delhi" },
        { id: 2, name: "Rohan", score: 84, city: "Mumbai" },
        { id: 3, name: "Ishita", score: 88, city: "Pune" },
        { id: 4, name: "Kabir", score: 79, city: "Delhi" },
        { id: 5, name: "Naman", score: 95, city: "Mumbai" },
      ],
    },
    expectedQuery:
      "select max(score) as second_highest_score from students where score < (select max(score) from students)",
    starterQuery:
      "SELECT MAX(score) AS second_highest_score\nFROM students\nWHERE score < (\n  SELECT MAX(score)\n  FROM students\n);",
    expectedResult: [{ second_highest_score: 91 }],
  },
];
