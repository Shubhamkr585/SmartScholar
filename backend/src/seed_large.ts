import mongoose from 'mongoose';
import Scholarship from './models/Scholarship';
import dotenv from 'dotenv';

dotenv.config();

const scholarships = [
    {
        "title": "Sensodyne IDA Shining Star Scholarship 2025-26",
        "provider": "Haleon India & IDA",
        "description": "Exclusive scholarship for 1st-year BDS (Bachelor of Dental Surgery) students in government colleges to support meritorious students from underprivileged backgrounds.",
        "amount": { "value": 200000, "formatted": "₹ 50,000 / year (for 4 years)" },
        "deadline": "2026-01-20T23:59:59.000Z",
        "applyLink": "https://www.buddy4study.com/page/sensodyne-ida-shining-star-scholarship-programme",
        "criteria": {
            "minPercentage": 60,
            "maxFamilyIncome": 800000,
            "educationLevel": ["Undergraduate"],
            "allowedCourses": ["BDS"],
            "allowedCategories": ["All"],
            "allowedGender": "All"
        },
        "location": { "country": "India", "state": "All" },
        "isActive": true,
        "isScraped": true
    },
    {
        "title": "Schindler Igniting Minds Scholarship 2025-26",
        "provider": "Schindler India Pvt Ltd",
        "description": "Financial aid for meritorious students pursuing full-time Diploma or B.Tech/B.E. courses in Engineering.",
        "amount": { "value": 50000, "formatted": "₹ 50,000 one-time" },
        "deadline": "2026-01-17T23:59:59.000Z",
        "applyLink": "https://www.vidyasaarathi.co.in/Vidyasaarathi/scholarship",
        "criteria": {
            "minPercentage": 75,
            "maxFamilyIncome": 300000,
            "educationLevel": ["Diploma", "Undergraduate"],
            "allowedCourses": ["B.Tech", "BE", "Diploma in Engineering"],
            "allowedCategories": ["All"],
            "allowedGender": "All"
        },
        "location": { "country": "India", "state": "All" },
        "isActive": true,
        "isScraped": true
    },
    {
        "title": "Kind Circle Scholarship for Meritorious Students 2025-26",
        "provider": "Kind Circle Foundation",
        "description": "A merit-cum-means scholarship for students from Class 1 to Post-Graduation facing financial difficulties.",
        "amount": { "value": 12000, "formatted": "₹ 6,000 to ₹ 12,000 (Variable)" },
        "deadline": "2026-03-25T23:59:59.000Z",
        "applyLink": "https://www.buddy4study.com/page/kind-circle-scholarship",
        "criteria": {
            "minPercentage": 75,
            "maxFamilyIncome": 600000,
            "educationLevel": ["Class 9", "Class 10", "Class 11", "Class 12", "Undergraduate", "Postgraduate"],
            "allowedCourses": ["All"],
            "allowedCategories": ["All"],
            "allowedGender": "All"
        },
        "location": { "country": "India", "state": "All" },
        "isActive": true,
        "isScraped": true
    },
    {
        "title": "CBSE Single Girl Child Scholarship 2025-26",
        "provider": "Central Board of Secondary Education (CBSE)",
        "description": "Scholarship for the only girl child of their parents who has scored 60% or more in Class 10 and is continuing education in Class 11/12 in CBSE schools.",
        "amount": { "value": 6000, "formatted": "₹ 500 / month" },
        "deadline": "2026-02-08T23:59:59.000Z",
        "applyLink": "https://cbse.gov.in/scholarship",
        "criteria": {
            "minPercentage": 60,
            "maxFamilyIncome": 99999999,
            "educationLevel": ["Class 11", "Class 12"],
            "allowedCourses": ["All"],
            "allowedCategories": ["All"],
            "allowedGender": "Female"
        },
        "location": { "country": "India", "state": "All" },
        "isActive": true,
        "isScraped": true
    },
    {
        "title": "Goa State Research & Higher Ed Scholarship 2025-26",
        "provider": "Government of Goa",
        "description": "State-level scholarship for students of Goa pursuing higher education, managed via the new CM Scholarship Portal.",
        "amount": { "value": 25000, "formatted": "₹ 25,000 / year" },
        "deadline": "2026-02-28T23:59:59.000Z",
        "applyLink": "https://cmscholarship.goa.gov.in/",
        "criteria": {
            "minPercentage": 50,
            "maxFamilyIncome": 500000,
            "educationLevel": ["Undergraduate", "Postgraduate"],
            "allowedCourses": ["All"],
            "allowedCategories": ["All"],
            "allowedGender": "All"
        },
        "location": { "country": "India", "state": "Goa" },
        "isActive": true,
        "isScraped": true
    },
    {
        "title": "ThinkSwiss Research Scholarship 2026",
        "provider": "Swissnex India",
        "description": "Fully funded research opportunity for Indian students (Masters/Undergrad) to spend 3 months at a Swiss University.",
        "amount": { "value": 150000, "formatted": "Monthly Stipend (CHF 1,600)" },
        "deadline": "2026-01-31T23:59:59.000Z",
        "applyLink": "https://swissnex.org/india/thinkswiss",
        "criteria": {
            "minPercentage": 0,
            "maxFamilyIncome": 99999999,
            "educationLevel": ["Undergraduate", "Postgraduate"],
            "allowedCourses": ["Engineering", "Science", "Research"],
            "allowedCategories": ["All"],
            "allowedGender": "All"
        },
        "location": { "country": "Switzerland", "state": "All" },
        "isActive": true,
        "isScraped": true
    },
    {
        "title": "B Pharma Scholarship for Daughters 2025-26",
        "provider": "MSD Pharmaceuticals",
        "description": "A CSR initiative supporting girl students pursuing B.Pharma to encourage women in healthcare and STEM.",
        "amount": { "value": 40000, "formatted": "₹ 40,000 / year" },
        "deadline": "2026-01-19T23:59:59.000Z",
        "applyLink": "https://sfsp.smilefoundationindia.org/",
        "criteria": {
            "minPercentage": 60,
            "maxFamilyIncome": 600000,
            "educationLevel": ["Undergraduate"],
            "allowedCourses": ["B.Pharma"],
            "allowedCategories": ["All"],
            "allowedGender": "Female"
        },
        "location": { "country": "India", "state": "All" },
        "isActive": true,
        "isScraped": true
    },
    {
        "title": "Hemlata Sohan Chordiya Scholarship 2025-26",
        "provider": "GIC Housing Finance",
        "description": "Financial support for students from weaker economic sections ensuring they can continue their schooling.",
        "amount": { "value": 15000, "formatted": "₹ 15,000 / year" },
        "deadline": "2026-01-30T23:59:59.000Z",
        "applyLink": "https://sfsp.smilefoundationindia.org/",
        "criteria": {
            "minPercentage": 50,
            "maxFamilyIncome": 300000,
            "educationLevel": ["Class 9", "Class 10", "Class 11", "Class 12"],
            "allowedCourses": ["All"],
            "allowedCategories": ["All"],
            "allowedGender": "All"
        },
        "location": { "country": "India", "state": "All" },
        "isActive": true,
        "isScraped": true
    },
    {
        "title": "BioWISE Women in STEM Entrepreneurship Grant",
        "provider": "BIRAC & IndiaBioscience",
        "description": "Grant for women researchers and entrepreneurs in the Biotechnology and Life Sciences sectors.",
        "amount": { "value": 500000, "formatted": "₹ 5,00,000 Grant" },
        "deadline": "2026-01-23T23:59:59.000Z",
        "applyLink": "https://indiabioscience.org/grants",
        "criteria": {
            "minPercentage": 0,
            "maxFamilyIncome": 99999999,
            "educationLevel": ["Postgraduate", "PhD"],
            "allowedCourses": ["Biotech", "Life Sciences"],
            "allowedCategories": ["All"],
            "allowedGender": "Female"
        },
        "location": { "country": "India", "state": "All" },
        "isActive": true,
        "isScraped": true
    },
    {
        "title": "Central Sector Scheme of Scholarship (CSSS) 2026",
        "provider": "Department of Higher Education",
        "description": "For college and university students who are in the top 20th percentile of their Class 12 board results.",
        "amount": { "value": 20000, "formatted": "₹ 10,000 - ₹ 20,000 / year" },
        "deadline": "2026-02-15T23:59:59.000Z",
        "applyLink": "https://scholarships.gov.in/",
        "criteria": {
            "minPercentage": 80,
            "maxFamilyIncome": 450000,
            "educationLevel": ["Undergraduate", "Postgraduate"],
            "allowedCourses": ["All"],
            "allowedCategories": ["All"],
            "allowedGender": "All"
        },
        "location": { "country": "India", "state": "All" },
        "isActive": true,
        "isScraped": true
    },
    {
        "title": "Sitaram Jindal Foundation Scholarship",
        "provider": "Sitaram Jindal Foundation",
        "description": "A year-round rolling scholarship for students from Class 11 to Post Graduation, covering ITI and Diploma courses as well.",
        "amount": { "value": 30000, "formatted": "₹ 500 - ₹ 2500 / month" },
        "deadline": "2026-12-31T23:59:59.000Z",
        "applyLink": "https://www.sitaramjindalfoundation.org/scholarships.php",
        "criteria": {
            "minPercentage": 60,
            "maxFamilyIncome": 400000,
            "educationLevel": ["Class 11", "Class 12", "Undergraduate", "Diploma", "ITI"],
            "allowedCourses": ["All"],
            "allowedCategories": ["All"],
            "allowedGender": "All"
        },
        "location": { "country": "India", "state": "All" },
        "isActive": true,
        "isScraped": true
    },
    {
        "title": "K.C. Mahindra All India Talent Scholarship",
        "provider": "K.C. Mahindra Education Trust",
        "description": "For students who have passed Class 10 or 12 and have secured admission in government or recognized polytechnics for Diploma courses.",
        "amount": { "value": 10000, "formatted": "₹ 10,000 / year" },
        "deadline": "2026-03-31T23:59:59.000Z",
        "applyLink": "https://www.kcmet.org/",
        "criteria": {
            "minPercentage": 60,
            "maxFamilyIncome": 99999999,
            "educationLevel": ["Diploma"],
            "allowedCourses": ["Diploma in Engineering", "Polytechnic"],
            "allowedCategories": ["All"],
            "allowedGender": "All"
        },
        "location": { "country": "India", "state": "All" },
        "isActive": true,
        "isScraped": true
    },
    {
        "title": "J N Tata Endowment Loan Scholarship 2026-27",
        "provider": "Tata Trusts",
        "description": "Prestigious loan scholarship for higher studies abroad. Applications typically open in January/February.",
        "amount": { "value": 1000000, "formatted": "₹ 1,00,000 - ₹ 10,00,000 (Loan)" },
        "deadline": "2026-03-15T23:59:59.000Z",
        "applyLink": "https://www.jntataendowment.org/",
        "criteria": {
            "minPercentage": 60,
            "maxFamilyIncome": 99999999,
            "educationLevel": ["Postgraduate", "PhD"],
            "allowedCourses": ["All"],
            "allowedCategories": ["All"],
            "allowedGender": "All"
        },
        "location": { "country": "International", "state": "All" },
        "isActive": true,
        "isScraped": true
    },
    {
        "title": "Keep India Smiling Foundational Scholarship 2026",
        "provider": "Colgate-Palmolive (India) Ltd",
        "description": "One-time financial aid for students from economically weaker sections pursuing Class 11, Diploma, or Graduation.",
        "amount": { "value": 30000, "formatted": "₹ 30,000 / year" },
        "deadline": "2026-03-31T23:59:59.000Z",
        "applyLink": "https://www.buddy4study.com/page/colgate-keep-india-smiling-scholarship-program",
        "criteria": {
            "minPercentage": 75,
            "maxFamilyIncome": 500000,
            "educationLevel": ["Class 11", "Undergraduate", "Diploma"],
            "allowedCourses": ["BDS", "Engineering", "General"],
            "allowedCategories": ["All"],
            "allowedGender": "All"
        },
        "location": { "country": "India", "state": "All" },
        "isActive": true,
        "isScraped": true
    },
    {
        "title": "G.P. Birla Scholarship 2025-26",
        "provider": "G.P. Birla Educational Foundation",
        "description": "For meritorious students of West Bengal who have passed Class 12 and are pursuing Science/Commerce/Arts streams.",
        "amount": { "value": 50000, "formatted": "₹ 50,000 / year" },
        "deadline": "2026-01-31T23:59:59.000Z",
        "applyLink": "http://gpbirlaedufoundation.com/",
        "criteria": {
            "minPercentage": 80,
            "maxFamilyIncome": 300000,
            "educationLevel": ["Undergraduate"],
            "allowedCourses": ["Science", "Commerce", "Arts", "Engineering", "Medical"],
            "allowedCategories": ["All"],
            "allowedGender": "All"
        },
        "location": { "country": "India", "state": "West Bengal" },
        "isActive": true,
        "isScraped": true
    },
    {
        "title": "Raman Kant Munjal Scholarship 2025",
        "provider": "Raman Kant Munjal Foundation",
        "description": "Scholarship for students pursuing finance-related courses (BBA, BMS, B.Com, MBA).",
        "amount": { "value": 40000, "formatted": "₹ 40,000 to ₹ 5,00,000" },
        "deadline": "2026-06-15T23:59:59.000Z",
        "applyLink": "https://www.rkmfoundation.org/",
        "criteria": {
            "minPercentage": 65,
            "maxFamilyIncome": 600000,
            "educationLevel": ["Undergraduate", "Postgraduate"],
            "allowedCourses": ["BBA", "B.Com", "MBA", "Finance"],
            "allowedCategories": ["All"],
            "allowedGender": "All"
        },
        "location": { "country": "India", "state": "All" },
        "isActive": true,
        "isScraped": true
    },
    {
        "title": "Indian Oil Academic Scholarship 2025-26",
        "provider": "Indian Oil Corporation Ltd (IOCL)",
        "description": "For students pursuing Engineering (B.Tech), MBBS, and MBA courses. 2000 scholarships distributed annually.",
        "amount": { "value": 48000, "formatted": "₹ 2,000 / month" },
        "deadline": "2026-05-30T23:59:59.000Z",
        "applyLink": "https://iocl.com/",
        "criteria": {
            "minPercentage": 65,
            "maxFamilyIncome": 100000,
            "educationLevel": ["Undergraduate", "Postgraduate"],
            "allowedCourses": ["Engineering", "MBBS", "MBA"],
            "allowedCategories": ["All"],
            "allowedGender": "All"
        },
        "location": { "country": "India", "state": "All" },
        "isActive": true,
        "isScraped": true
    },
    {
        "title": "Pragati Scholarship for Girls (AICTE) 2026",
        "provider": "AICTE",
        "description": "Government scheme for girl students admitted to first-year or second-year (lateral entry) of technical degree/diploma programs.",
        "amount": { "value": 50000, "formatted": "₹ 50,000 / year" },
        "deadline": "2026-02-28T23:59:59.000Z",
        "applyLink": "https://scholarships.gov.in/",
        "criteria": {
            "minPercentage": 0,
            "maxFamilyIncome": 800000,
            "educationLevel": ["Undergraduate", "Diploma"],
            "allowedCourses": ["Engineering", "Technology", "Management", "Pharmacy"],
            "allowedCategories": ["All"],
            "allowedGender": "Female"
        },
        "location": { "country": "India", "state": "All" },
        "isActive": true,
        "isScraped": true
    },
    {
        "title": "Saksham Scholarship Scheme (AICTE) 2026",
        "provider": "AICTE",
        "description": "For specially-abled students (disability of not less than 40%) pursuing technical education.",
        "amount": { "value": 50000, "formatted": "₹ 50,000 / year" },
        "deadline": "2026-02-28T23:59:59.000Z",
        "applyLink": "https://scholarships.gov.in/",
        "criteria": {
            "minPercentage": 0,
            "maxFamilyIncome": 800000,
            "educationLevel": ["Undergraduate", "Diploma"],
            "allowedCourses": ["Engineering", "Technology", "Management", "Pharmacy"],
            "allowedCategories": ["All"],
            "allowedGender": "All"
        },
        "location": { "country": "India", "state": "All" },
        "isActive": true,
        "isScraped": true
    },
    {
        "title": "Doha Sanad Masters Scholarship 2026",
        "provider": "Doha Institute for Graduate Studies",
        "description": "Fully funded scholarship for international students to pursue a Master's degree in Qatar.",
        "amount": { "value": 1200000, "formatted": "Full Tuition + Stipend" },
        "deadline": "2026-01-15T23:59:59.000Z",
        "applyLink": "https://www.dohainstitute.edu.qa/",
        "criteria": {
            "minPercentage": 60,
            "maxFamilyIncome": 99999999,
            "educationLevel": ["Postgraduate"],
            "allowedCourses": ["Social Sciences", "Humanities", "Public Administration"],
            "allowedCategories": ["All"],
            "allowedGender": "All"
        },
        "location": { "country": "Qatar", "state": "All" },
        "isActive": true,
        "isScraped": true
    },
    {
        "title": "NSDL Shiksha Sahyog Scholarship 2025-26",
        "provider": "NSDL",
        "description": "CSR initiative to support students from economically weaker sections for Class 11, 12 and Graduation.",
        "amount": { "value": 10000, "formatted": "₹ 10,000 / year" },
        "deadline": "2026-02-15T23:59:59.000Z",
        "applyLink": "https://www.vidyasaarathi.co.in/",
        "criteria": {
            "minPercentage": 60,
            "maxFamilyIncome": 300000,
            "educationLevel": ["Class 11", "Class 12", "Undergraduate"],
            "allowedCourses": ["All"],
            "allowedCategories": ["All"],
            "allowedGender": "All"
        },
        "location": { "country": "India", "state": "All" },
        "isActive": true,
        "isScraped": true
    },
    {
        "title": "Post Matric Scholarship for Minorities (NSP) 2026",
        "provider": "Ministry of Minority Affairs",
        "description": "For students belonging to minority communities (Muslim, Christian, Sikh, Buddhist, Jain, Parsi) from Class 11 to Ph.D.",
        "amount": { "value": 10000, "formatted": "₹ 3,000 - ₹ 10,000 / year" },
        "deadline": "2026-02-28T23:59:59.000Z",
        "applyLink": "https://scholarships.gov.in/",
        "criteria": {
            "minPercentage": 50,
            "maxFamilyIncome": 200000,
            "educationLevel": ["Class 11", "Class 12", "Undergraduate", "Postgraduate"],
            "allowedCourses": ["All"],
            "allowedCategories": ["Minority", "OBC", "General"],
            "allowedGender": "All"
        },
        "location": { "country": "India", "state": "All" },
        "isActive": true,
        "isScraped": true
    },
    {
        "title": "Inspire Scholarship (SHE) 2026",
        "provider": "DST, Govt of India",
        "description": "For top 1% rankers in Class 12 board exams pursuing Basic and Natural Sciences at B.Sc./Integrated M.Sc. level.",
        "amount": { "value": 80000, "formatted": "₹ 80,000 / year" },
        "deadline": "2026-01-31T23:59:59.000Z",
        "applyLink": "https://online-inspire.gov.in/",
        "criteria": {
            "minPercentage": 90,
            "maxFamilyIncome": 99999999,
            "educationLevel": ["Undergraduate"],
            "allowedCourses": ["Physics", "Chemistry", "Mathematics", "Biology", "Statistics"],
            "allowedCategories": ["All"],
            "allowedGender": "All"
        },
        "location": { "country": "India", "state": "All" },
        "isActive": true,
        "isScraped": true
    },
    {
        "title": "Tata Capital Pankh Scholarship 2026",
        "provider": "Tata Capital",
        "description": "For students pursuing Class 11, 12, or Undergraduate general/professional courses.",
        "amount": { "value": 12000, "formatted": "Up to ₹ 50,000" },
        "deadline": "2026-02-10T23:59:59.000Z",
        "applyLink": "https://www.buddy4study.com/page/tata-capital-pankh-scholarship-program",
        "criteria": {
            "minPercentage": 60,
            "maxFamilyIncome": 250000,
            "educationLevel": ["Class 11", "Class 12", "Undergraduate"],
            "allowedCourses": ["All"],
            "allowedCategories": ["All"],
            "allowedGender": "All"
        },
        "location": { "country": "India", "state": "All" },
        "isActive": true,
        "isScraped": true
    },
    {
        "title": "HDFC Badhte Kadam Scholarship 2026",
        "provider": "HDFC Bank",
        "description": "Financial aid for high performing students from disadvantaged backgrounds to help them continue education.",
        "amount": { "value": 30000, "formatted": "Up to ₹ 1,00,000" },
        "deadline": "2026-02-20T23:59:59.000Z",
        "applyLink": "https://www.buddy4study.com/",
        "criteria": {
            "minPercentage": 60,
            "maxFamilyIncome": 600000,
            "educationLevel": ["Class 11", "Class 12", "Undergraduate"],
            "allowedCourses": ["All"],
            "allowedCategories": ["All"],
            "allowedGender": "All"
        },
        "location": { "country": "India", "state": "All" },
        "isActive": true,
        "isScraped": true
    },
    {
        "title": "Kotak Kanya Scholarship 2026",
        "provider": "Kotak Education Foundation",
        "description": "For meritorious girl students from low-income families to pursue professional graduation courses.",
        "amount": { "value": 150000, "formatted": "₹ 1,50,000 / year" },
        "deadline": "2026-09-30T23:59:59.000Z",
        "applyLink": "https://kotakeducation.org/kotak-kanya-scholarship/",
        "criteria": {
            "minPercentage": 75,
            "maxFamilyIncome": 320000,
            "educationLevel": ["Undergraduate"],
            "allowedCourses": ["Engineering", "MBBS", "Architecture", "Design", "LLB"],
            "allowedCategories": ["All"],
            "allowedGender": "Female"
        },
        "location": { "country": "India", "state": "All" },
        "isActive": true,
        "isScraped": true
    },
    {
        "title": "LIC Golden Jubilee Scholarship 2026",
        "provider": "Life Insurance Corporation of India",
        "description": "Scholarships for students belonging to economically weaker sections for pursuing higher education.",
        "amount": { "value": 20000, "formatted": "₹ 20,000 - ₹ 40,000 / year" },
        "deadline": "2026-01-15T23:59:59.000Z",
        "applyLink": "https://licindia.in/",
        "criteria": {
            "minPercentage": 60,
            "maxFamilyIncome": 250000,
            "educationLevel": ["Undergraduate", "Diploma"],
            "allowedCourses": ["Medicine", "Engineering", "Graduation", "Diploma", "ITI"],
            "allowedCategories": ["All"],
            "allowedGender": "All"
        },
        "location": { "country": "India", "state": "All" },
        "isActive": true,
        "isScraped": true
    },
    {
        "title": "OakNorth STEM Scholarship 2026",
        "provider": "OakNorth",
        "description": "For female students from Haryana, Uttarakhand, and Bihar pursuing graduation in STEM subjects.",
        "amount": { "value": 30000, "formatted": "₹ 30,000 / year" },
        "deadline": "2026-02-15T23:59:59.000Z",
        "applyLink": "https://www.buddy4study.com/",
        "criteria": {
            "minPercentage": 60,
            "maxFamilyIncome": 350000,
            "educationLevel": ["Undergraduate"],
            "allowedCourses": ["Science", "Technology", "Engineering", "Maths"],
            "allowedCategories": ["All"],
            "allowedGender": "Female"
        },
        "location": { "country": "India", "state": "Haryana" },
        "isActive": true,
        "isScraped": true
    },
    {
        "title": "JN Tata Endowment Loan Scholarship",
        "provider": "Tata Trusts",
        "description": "Loan scholarship for higher education overseas.",
        "amount": { "value": 100000, "formatted": "₹ 1,00,000 to ₹ 10,00,000" },
        "deadline": "2026-03-21T23:59:59.000Z",
        "applyLink": "https://www.jntataendowment.org/",
        "criteria": {
            "minPercentage": 60,
            "maxFamilyIncome": 99999999,
            "educationLevel": ["Postgraduate"],
            "allowedCourses": ["All"],
            "allowedCategories": ["All"],
            "allowedGender": "All"
        },
        "location": { "country": "International", "state": "All" },
        "isActive": true,
        "isScraped": true
    },
    {
        "title": "Narotam Sekhsaria Scholarship 2026",
        "provider": "Narotam Sekhsaria Foundation",
        "description": "Interest-free loan scholarships to Indian students with a consistently good academic record for post-graduation.",
        "amount": { "value": 2000000, "formatted": "Up to ₹ 20 Lakhs" },
        "deadline": "2026-03-15T23:59:59.000Z",
        "applyLink": "https://pg.nsfoundation.co.in/",
        "criteria": {
            "minPercentage": 60,
            "maxFamilyIncome": 99999999,
            "educationLevel": ["Postgraduate"],
            "allowedCourses": ["Management", "Engineering", "Law", "Medicine"],
            "allowedCategories": ["All"],
            "allowedGender": "All"
        },
        "location": { "country": "India", "state": "All" },
        "isActive": true,
        "isScraped": true
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/scholar_track');
        console.log('MongoDB Connected for Final Robust Seed');

        console.log('Clearing ALL existing data...');
        await Scholarship.deleteMany({});
        console.log('Database Cleared.');

        console.log(`Seeding ${scholarships.length} scholarships...`);
        for (const s of scholarships) {
            // Ensure types match Schema Enum by casting if necessary, though 'All' | 'Female' are valid
            const newS = {
                ...s,
                criteria: {
                    ...s.criteria,
                    allowedGender: s.criteria.allowedGender as 'Male' | 'Female' | 'All'
                },
                deadline: new Date(s.deadline), // Ensure Date object
                isActive: true,
                isScraped: true,
                lastScrapedAt: new Date()
            };
            await Scholarship.create(newS);
        }

        console.log(`Successfully populated DB with ${scholarships.length} scholarships.`);
        process.exit(0);
    } catch (err) {
        console.error("Seed Error:", err);
        process.exit(1);
    }
}

seedDB();
