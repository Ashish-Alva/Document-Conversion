window.defaultQaData = [
    // {
    //     keywords: ["what this app do", "app purpose", "what does this app do"],
    //     answer: "This is a browser chatbot widget. It can now learn new answers at runtime."
    // },
    // {
    //     keywords: ["how it works", "working", "how does it work", "how to use", "how does this app work","how to convert the file"],
    //     answer: "Upload file -> click convert -> choose format -> press OK -> download from converted section."
    // },
    
    // {
    //     keywords: ["good morning", "morning"],
    //     answer: "Good morning! How can I help you?"
    // },
    // {
    //     keywords: ["good afternoon", "afternoon"],
    //     answer: "Good afternoon! How can I help you?"
    // },
    // {
    //     keywords: ["good evening", "evening"],
    //     answer: "Good evening! How can I help you?"
    // },
    // {
    //     keywords: ["how are you", "How are you doing", "whats up", "how is it going", "how are you doing today"],
    //     answer: "I am doing great. How can I help you?"
    // },
    // {
    //     keywords: ["your name", "name", "who are you", "what is your name", "who you are", "what are you"],
    //     answer: "I am your assistant chatbot."
    // },
    // {
    //     keywords: ["what you do", "what can you do", "what is your purpose", "what do you do"],
    //     answer: "I answer questions and can learn new Q&A pairs."
    // },
    // {
    //     keywords: ["what is doc conversor", "about project", "project explanation"],
    //     answer: "The Doc Conversor project is designed to convert documents from one format to another, such as PDF to Word, Word to PDF, or text to structured formats."
    // },
    // {
    //     keywords: ["features", "what can it do", "functions"],
    //     answer: "This project supports multiple file format conversions, fast processing, user-friendly interface, and ensures document integrity."
    // },
    // {
    //     keywords: ["supported formats", "file types", "formats"],
    //     answer: "It supports formats like PDF, DOCX, TXT, and sometimes images depending on implementation."
    // },
    // {
    //     keywords: ["how it works", "working", "process", "how does this app work?"],
    //     answer: "The system takes an input file, processes it using conversion logic, and outputs the file in the desired format."
    // },
    // {
    //     keywords: ["technology used", "tech stack", "tools used"],
    //     answer: "Technologies include Python or JavaScript, file handling libraries, and possibly inbuilt library for document conversion."
    // },
    // {
    //     keywords: ["advantages", "benefits"],
    //     answer: "It saves time, reduces manual effort, ensures accuracy, and provides quick document format conversion."
    // },
    // {
    //     keywords: ["limitations", "disadvantages"],
    //     answer: "Some complex formatting may not be preserved perfectly, and large files may take longer to process."
    // },
    // {
    //     keywords: ["use case", "applications"],
    //     answer: "It is useful in offices, educational institutions, and businesses where document format conversion is frequently needed."
    // },
    // {
    //     keywords: ["future scope", "future improvements"],
    //     answer: "Future improvements may include AI-based formatting correction, support for more file types, and cloud integration."
    // },
    // {
    //     keywords: ["who developed", "team", "developers"],
    //     answer: "This project was developed as part of an academic or practical implementation by a team of students or developers."
    // },
    // {
    //     keywords: ["how to use", "usage", "steps"],
    //     answer: "Upload your document, select the desired output format, click convert, and download the converted file."
    // },
    // {
    //     keywords: ["is it free", "cost", "pricing"],
    //     answer: "This project is typically free if developed for academic purposes, but real-world tools may have pricing plans."
    // },
    // {
    //     keywords: ["accuracy", "is it accurate"],
    //     answer: "The converter is generally accurate, but minor formatting changes may occur depending on file complexity."
    // },
    // {
    //     keywords: ["bye", "goodbye"],
    //     answer: "Goodbye! Feel free to come back if you need more help."
    // },
    // {
    //     keywords: ["thank you", "thanks"],
    //     answer: "You're welcome! If you have more questions, just ask."
    // },
 
    // GREETINGS

    {
        keywords: ["hi", "hello", "hey"],
        answer: "Hello! I’m your Doc Converter Assistant. How can i help you?"
    },
    {
        keywords: ["how are you", "how are you doing"],
        answer: "I’m doing great!  Ready to help you convert files."
    },
 
    //  ABOUT
    {
        keywords: ["who are you", "your name"],
        answer: "I’m your assistant  for document conversion. I can guide you and even learn new answers!"
    },
    {
        keywords: ["what can you do", "help me"],
        answer: "I can help you convert files, guide you step-by-step, troubleshoot errors, and learn new things!"
    },
 
    //  APP PURPOSE
    {
        keywords: ["what this app do", "purpose"],
        answer: "This app converts files between formats like PDF, DOCX, JPG, PNG, and TXT."
    },
 
    //  HOW TO USE
    {
        keywords: ["how to use", "steps", "guide"],
        answer: " Steps:\n1. Upload file\n2. Click Convert\n3. Choose format\n4. Download from Converted section"
    },
    {
        keywords: ["where to upload", "upload file"],
        answer: "Click the Upload button at the top and select your file."
    },
    {
        keywords: ["where is converted file", "converted files location"],
        answer: "Go to the 'Converted Files' tab to see and download your converted files."
    },
 
    //  CONVERSION TYPES
    {
        keywords: ["pdf to word", "pdf to docx"],
        answer: "Upload PDF → Click Convert → Select DOCX → Download."
    },
    {
        keywords: ["word to pdf", "docx to pdf"],
        answer: "Upload DOCX → Click Convert → Select PDF → Download."
    },
    {
        keywords: ["jpg to png", "image conversion"],
        answer: "Upload JPG/PNG → Click Convert → Choose format → Download."
    },
    {
        keywords: ["image to pdf"],
        answer: "Upload an image → Convert → Choose PDF format."
    },
    {
        keywords: ["txt to pdf"],
        answer: "Upload TXT → Convert → Select PDF."
    },
 
    //  FILE SUPPORT
    {
        keywords: ["supported formats", "file types"],
        answer: "Supported formats include PDF, DOCX, TXT, JPG, and PNG."
    },
    {
        keywords: ["file size limit", "max size"],
        answer: "File size depends on server limits. Try smaller files if upload fails."
    },
 
    //  ERRORS
    {
        keywords: ["upload failed", "cannot upload"],
        answer: "Check file format and size. Ensure your internet connection is stable."
    },
    {
        keywords: ["conversion failed"],
        answer: "Conversion may fail due to unsupported format or corrupted file. Try another file."
    },
    {
        keywords: ["unsupported format"],
        answer: "This format is not supported. Try PDF, DOCX, TXT, JPG, or PNG."
    },
    {
        keywords: ["server error", "500 error"],
        answer: "There might be a backend issue. Try again later or restart the server."
    },
 
    //  LOGIN / AUTH
    {
        keywords: ["login problem", "cannot login"],
        answer: "Ensure correct credentials. If issue persists, try logging out and logging in again."
    },
    {
        keywords: ["token expired", "session expired"],
        answer: "Your session expired. Please login again."
    },
 
    //  DOWNLOAD
    {
        keywords: ["download not working"],
        answer: "Go to Converted Files and click Download again."
    },
    {
        keywords: ["where to download"],
        answer: "Download your files from the Converted Files tab."
    },
 
    //  FILE MANAGEMENT
    {
        keywords: ["delete file"],
        answer: "Click the Delete button next to the file."
    },
    {
        keywords: ["How to rename file"],
        answer: "Click Rename and enter a new name."
    },
 
    //  PERFORMANCE
    {
        keywords: ["slow conversion"],
        answer: "Large files or complex formats may take longer. Please wait."
    },
 
    //  PROJECT DETAILS
    {
        keywords: ["project explanation", "doc conversor"],
        answer: "Doc Converter is a full-stack application that converts files using React, Node.js, and Python scripts."
    },
    {
        keywords: ["tech stack"],
        answer: "Frontend: React\nBackend: Node.js\nConversion: Python scripts"
    },
 
    //  BENEFITS
    {
        keywords: ["benefits"],
        answer: "It saves time, reduces manual effort, and provides quick format conversion."
    },
 
    //  LIMITATIONS
    {
        keywords: ["limitations"],
        answer: "Some formatting like tables or fonts may slightly change after conversion."
    },
 
    //  FUTURE
    {
        keywords: ["future scope"],
        answer: "Future upgrades include AI-based formatting correction and more file formats."
    },
 
    //  LEARNING FEATURE
    {
        keywords: ["how to teach", "learn command"],
        answer: "Use: /learn question | answer\nExample: /learn what is node | Node is runtime"
    },
 
    //  END
    {
        keywords: ["thanks", "thank you"],
        answer: "You're welcome! "
    },
    {
        keywords: ["bye", "goodbye"],
        answer: "Goodbye! See you again."
    }
];