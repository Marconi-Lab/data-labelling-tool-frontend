// let attributes = [
//   {
//     id: 1,
//     name: "What is the quality of the picture?",
//     values: [
//       { text: "Good", value: "good" },
//       { text: "Moderate", value: "moderate" },
//       { text: "Bad", value: "Moderate" },
//     ],
//   },
//   {
//     id: 2,
//     name: "Is the quality of the picture good enough to make a diagnosis?",
//     values: [
//       { text: "Yes", value: "yes" },
//       { text: "No", value: "no" },
//     ],
//   },
//   {
//     id: 3,
//     name: "Is SCJ fully visible?",
//     values: [
//       { text: "Fully Visible", value: "fully visible" },
//       { text: "Only Partially Visible", value: "partially visible" },
//       { text: "Not Visible", value: "not visible" },
//     ],
//   },
//   {
//     id: 4,
//     name: "What is the VIA assessment?",
//     values: [
//       { text: "VIA negative", value: "VIA negative" },
//       { text: "VIA positive", value: "VIA positive" },
//       {
//         text: "Suspected cancerous lesions",
//         value: "suspected cancerous lesions",
//       },
//       { text: "Other lesions", value: "other lesions" },
//       {
//         text: "Not possible to determine",
//         value: "not possible to determine",
//       },{
//         text: "I don't know",
//         value: "I don't know"
//       }
//     ],
//   },
//   {
//     id: 5,
//     name: "What is the size of lesion (propotion of cervix area involved)?",
//     type: "radio",
//     values: [
//       { text: "1 quadrant (25%)", value: "1 quadrant (25%)" },
//       { text: "2 quadrants (25%-50%)", value: "2 quadrants(25%-50%)" },
//       { text: "3 quadrants (50%-75%)", value: "3 quadrants (50%-75%)" },
//       { text: "4 quadrants (75%-100%)", value: "4 quadrants (75%-100%)" },
//     ],
//   },
// ];

// let data = {
//   option1: { question: "What is the quality of the picture?", answer: null },
//   option2: {
//     question: "Is the quality of the picture good enough to make a diagnosis?",
//     answer: null,
//   },
//   option3: { question: "Is SCJ fully visible?", answer: null },
//   option4: { question: "What is the VIA assessment?", answer: null },
//   option5: {
//     question: "What is the size of lesion (propotion of cervix area involved)?",
//     answer: null,
//   },
// };

let attributes = [
  {
    id: 1,
    name: "Is the quality of the picture good enough to make a diagnosis?",
    values: [
      { text: "Yes", value: "yes" },
      { text: "No", value: "no" },
    ],
  },

  {
    id: 2,
    name: "What is the VIA assessment?",
    values: [
      { text: "VIA negative", value: "VIA negative" },
      { text: "VIA positive", value: "VIA positive" },
      {
        text: "Suspected cancerous lesions",
        value: "suspected cancerous lesions",
      },
      { text: "Other lesions", value: "other lesions" },
      {
        text: "Not possible to determine",
        value: "not possible to determine",
      },
      {
        text: "I don't know",
        value: "I don't know",
      },
    ],
  },
  {
    id: 3,
    name: "What is the lesion location? (Optional)",
    values: [],
  },
  {
    id: 4,
    name: "What is the size of lesion (propotion of cervix area involved)?",
    type: "radio",
    values: [
      { text: "1 quadrant (25%)", value: "1 quadrant (25%)" },
      { text: "2 quadrants (25%-50%)", value: "2 quadrants(25%-50%)" },
      { text: "3 quadrants (50%-75%)", value: "3 quadrants (50%-75%)" },
      { text: "4 quadrants (75%-100%)", value: "4 quadrants (75%-100%)" },
      { text: "None", value: "None" },
    ],
  },
];

let data = {
  option1: {
    question: "Is the quality of the picture good enough to make a diagnosis?",
    answer: null,
  },
  option2: { question: "What is the VIA assessment?", answer: null },
  option3: {
    question: "What is the lesion location? (optional)",
    answer: "",
  },

  option4: {
    question: "What is the size of lesion (propotion of cervix area involved)?",
    answer: "",
  },
};

export default {
  attributes,
  data,
};
