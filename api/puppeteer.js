'use server'
const PuppeteerHTMLPDF = require('puppeteer-html-pdf')

const htmlPDF = new PuppeteerHTMLPDF
const options = {
  format: "A4",
  path: `${process.cwd()}/public/sample.pdf`,
};
htmlPDF.setOptions(options)

const content =  
  `
  <div id="resumeContent">
  <h1>John Doe</h1>
  <p><strong>Software Developer</strong></p>
  <p>Email: john.doe@example.com | Phone: (123) 456-7890</p>

  <h2>Work Experience</h2>
  <p><strong>Software Engineer at XYZ Corp</strong></p>
  <p>Jan 2020 - Present</p>
  <p>Worked on developing cloud-native applications using Node.js and React.</p>

  <h2>Education</h2>
  <p><strong>Bachelor's in Computer Science</strong></p>
  <p>University of ABC, Graduated: 2019</p>
</div>
  `

export async function render(){
  try{
    await htmlPDF.create(content);
    console.log("PDF created successfully")
    return `${process.env.NEXT_PUBLIC_DOMAIN}/sample.pdf`
  }catch(error){
    console.log("PuppeteerHTMLPDF error", error);
  }
}