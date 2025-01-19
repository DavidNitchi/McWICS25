import React from 'react';
import { Page, Text, View, Document, StyleSheet, pdf } from '@react-pdf/renderer';
import { extraCurricular } from '@/db/schema';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#FFFFFF',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 32,
    textTransform: 'uppercase',
    marginBottom: 8,
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  headerLast: {
    color: 'grey',
  },
  headerFirst: {
    color: 'black',
  },
  contact: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 12,
    fontSize: 10,
    color: '#333',
  },
  contactItem: {
    marginHorizontal: 5,
  },
  section: {
    marginBottom: 12,
  },
  sectionInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  sectionTitleWrap: {
    marginBottom: 3,
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 3,
    fontWeight: 'bold',
    borderBottom: '1px solid black',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 10,
  },
  text: {
    color: '#333',
    justifyContent: 'flex-start',
  },
  highlight: {
    color: 'red',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 10,
    color: 'grey',
    justifyContent: 'flex-end',
  },
  list: {
    marginLeft: 10,
    color: 'blue',  
    fontSize: 10,
  }
});

// const MyDocument = () => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerFirst}>[First]</Text> 
//         <Text style={styles.headerLast}>[Last]</Text>
//       </View>
//       <View style={styles.contact}>
//         <Text style={styles.contactItem}>[Email: test@gmail.com]</Text>
//       </View>

//       {/* Experience */}
//       <View style={styles.sectionTitleWrap}>
//         <Text style={styles.sectionTitle}>Work Experience</Text>
//       </View>
//       <View style={styles.section}>
//         <View style={styles.sectionInfo}>
//           <View style={styles.content}>
//             <Text style={styles.highlight}>[Position, Company - ]</Text>
//             <Text style={styles.text}>[location]</Text>
//           </View>
//           <Text style={styles.date}>[date]</Text>
//         </View>
//         <View style={styles.list}>
//           <Text style={styles.text}>• [wow experience]</Text>
//           <Text style={styles.text}>• [i also did that] </Text>
//         </View>
//       </View>

//       {/* Projects */}
//       <View style={styles.sectionTitleWrap}>
//         <Text style={styles.sectionTitle}>Projects</Text>
//       </View>
//       <View style={styles.section}>
//         <View style={styles.sectionInfo}>
//           <View style={styles.content}>
//             <Text style={styles.highlight}>[Project name - ]</Text>
//             <Text style={styles.text}>[details]</Text>
//           </View>
//           <Text style={styles.date}>[date]</Text>
//         </View>
//         <View style={styles.list}>
//           <Text style={styles.text}> [description]</Text>
//           <Text style={styles.text}>• [detail]</Text>
//           <Text style={styles.text}>• [more details] </Text>
//         </View>
//       </View>

//       {/* Education */}
//       <View style={styles.sectionTitleWrap}>
//         <Text style={styles.sectionTitle}>Education</Text>
//       </View>
//       <View style={styles.section}>
//         <View style={styles.sectionInfo}>
//           <View style={styles.content}>
//             <Text style={styles.highlight}>[School name, ]</Text>
//             <Text style={styles.text}>[degree]</Text>
//           </View>
//           <Text style={styles.date}>[date]</Text>
//         </View>     
//       </View>

//       {/* Extracurriculars */}
//       <View style={styles.sectionTitleWrap}>
//         <Text style={styles.sectionTitle}>Extracurriculars</Text>
//       </View>
//       <View style={styles.section}>
//         <View style={styles.sectionInfo}>
//           <View style={styles.content}>
//             <Text style={styles.highlight}>[Name - ]</Text>
//             <Text style={styles.text}>[details]</Text>
//           </View>
//           <Text style={styles.date}>[date]</Text>
//         </View>
//         <View style={styles.list}>
//           <Text style={styles.text}> [description]</Text>
//           <Text style={styles.text}>• [detail]</Text>
//           <Text style={styles.text}>• [more details] </Text>
//         </View>
//       </View>

//     </Page>
//   </Document>
// );
const exampleData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  experience: [
    {
      position: 'Software Engineer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      date: 'Jan 2020 - Present',
      details: ['Developed scalable web applications', 'Led a team of 5 developers'],
    },
    {
      position: 'Intern',
      company: 'Startup Inc',
      location: 'New York, NY',
      date: 'Jun 2019 - Dec 2019',
      details: ['Assisted in frontend development', 'Wrote unit tests'],
    },
  ],
  projects: [
    {
      name: 'Awesome Project',
      details: 'A project showcasing dynamic PDF generation',
      date: '2022',
      descriptions: ['Used React and React-PDF', 'Implemented dynamic data rendering'],
    },
  ],
  education: [
    {
      school: 'University of Example',
      degree: 'B.Sc. in Computer Science',
      date: '2015 - 2019',
    },
  ],
  extraCurricular: [
    {
      name: 'coding',
      date: '2024',
      description: 'hackathon',
    }
  ]
};

interface Experience {
  position: string;
  company: string;
  location: string;
  date: string;
  details: string[];
}

interface Project {
  name: string;
  details: string;
  date: string;
  descriptions: string[];
}

interface Education {
  school: string;
  degree: string;
  date: string;
}

interface Extracurriculars {
  name: string;
  date: string;
  description: string;
}

interface Data {
  firstName: string;
  lastName: string;
  email: string;
  experience: Experience[];
  projects: Project[];
  education: Education[];
}

const MyDocument = ({ data }: { data: Data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerFirst}>{data.firstName}</Text>
        <Text style={styles.headerLast}>{data.lastName}</Text>
      </View>
      <View style={styles.contact}>
        <Text style={styles.contactItem}>Email: {data.email}</Text>
      </View>

      {/* Experience */}
      <View style={styles.sectionTitleWrap}>
        <Text style={styles.sectionTitle}>Work Experience</Text>
      </View>
      {data.experience.map((exp, index) => (
        <View key={index} style={styles.section}>
          <View style={styles.sectionInfo}>
            <View style={styles.content}>
              <Text style={styles.highlight}>{`${exp.position}, ${exp.company} - `}</Text>
              <Text style={styles.text}>{exp.location}</Text>
            </View>
            <Text style={styles.date}>{exp.date}</Text>
          </View>
          <View style={styles.list}>
            {exp.details.map((detail, i) => (
              <Text key={i} style={styles.text}>• {detail}</Text>
            ))}
          </View>
        </View>
      ))}

      {/* Projects */}
      <View style={styles.sectionTitleWrap}>
        <Text style={styles.sectionTitle}>Projects</Text>
      </View>
      {data.projects.map((project, index) => (
        <View key={index} style={styles.section}>
          <View style={styles.sectionInfo}>
            <View style={styles.content}>
              <Text style={styles.highlight}>{`${project.name} - `}</Text>
              <Text style={styles.text}>{project.details}</Text>
            </View>
            <Text style={styles.date}>{project.date}</Text>
          </View>
          <View style={styles.list}>
            {project.descriptions.map((desc, i) => (
              <Text key={i} style={styles.text}>• {desc}</Text>
            ))}
          </View>
        </View>
      ))}

    {/* TODO */}

      
    </Page>
  </Document>
);


// const Component = () => {
//   const handleDownload = async () => {
//     const doc = <MyDocument />;
//     const asPdf = pdf();
//     asPdf.updateContainer(doc);
//     const blob = await asPdf.toBlob();
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'example.pdf';
//     a.click();
//   };

//   return (
//     <div>
//       <button onClick={handleDownload}>Download CV</button>
//     </div>
//   );
// };

// export default Component;
const Component = () => {
  const handleDownload = async () => {
    const doc = <MyDocument data={exampleData} />;
    const asPdf = pdf();
    asPdf.updateContainer(doc);
    const blob = await asPdf.toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'example.pdf';
    a.click();
  };

  return (
    <div>
      <button onClick={handleDownload}>Download CV</button>
    </div>
  );
};

export default Component;


