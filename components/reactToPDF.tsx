import React from 'react';
import { Page, Text, View, Document, StyleSheet, pdf } from '@react-pdf/renderer';

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
    color: 'black',
  },
  contact: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 12,
    fontSize: 10,
    color: 'grey',
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
    fontSize: 10,
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


const basic = {
  name: 'John Doe',
  email: 'john.dow@example.com',
  skills: [],
  // experience: [],
  experience: [
    {
      title: 'Software Engineer',
      company: '',
      startDate: '',
      endDate: 'Present',
      description: 'Developed web applications using React and Node.js',
      skills: [],
    },
    {
      title: 'Software Engineer 2',
      company: 'Example Inc.',
      startDate: '2019',
      endDate: 'Present',
      description: 'Developed web applications using React and Node.js',
      skills: ['React', 'Node.js', 'JavaScript'],
    },
  ],
  projects: [],
  education: [],
  extraCurricular: [],
}


const exampleData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  skills: [
    { name: 'React' },
    { name: 'Node.js' },
    { name: 'JavaScript' },
  ],
  experience: [
    {
      title: 'Software Engineer',
      company: 'Example Inc.',
      startDate: '2019',
      endDate: 'Present',
      description: 'Developed web applications using React and Node.js',
      skills: ['React', 'Node.js', 'JavaScript'],
    },
    {
      title: 'Software Engineer 2',
      company: 'Example Inc.',
      startDate: '2019',
      endDate: 'Present',
      description: 'Developed web applications using React and Node.js',
      skills: ['React', 'Node.js', 'JavaScript'],
    },
  ],
  projects: [
    {
      title: 'Example Project',
      startDate: '2020',
      endDate: '2021',
      descriptions: 'Developed web applications using React and Node.js',
      skills: ['React', 'Node.js', 'JavaScript'],
    },
    {
      title: 'Example Project 2',
      startDate: '2020',
      endDate: '2021',
      descriptions: 'Developed web applications using React and Node.js',
      skills: ['React', 'Node.js', 'JavaScript'],
    },
  ],
  education: [
    {
      school: 'Example University',
      degree: 'B.S.',
      major: 'Computer Science',
      startDate: '2015',
      endDate: '2019',
      skills: [],
    }
  ],
  extraCurricular: [
    {
      title: 'Example Club',
      description: 'President',
    },
  ]
};

interface Experience {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  skills: string[];
}

interface Project {
  title: string;
  startDate: string;
  endDate: string;
  descriptions: string;
  skills: string[];
}

interface Education {
  school: string;
  degree: string;
  major: string;
  startDate: string;
  endDate: string;
  skills: string[];
}

interface Extracurricular {
  title: string;
  description: string;
}

interface Data {
  name: string;
  email: string;
  skills: { name: string }[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  extraCurricular: Extracurricular[];
}

const MyDocument = ({ data }: { data: Data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerLast}>{data.name}</Text>
      </View>
      <View style={styles.contact}>
        <Text style={styles.contactItem}>Email: {data.email}</Text>
      </View>

      {/* Experience */}
      {data.experience.length > 0 && (
        <>
          <View style={styles.sectionTitleWrap}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
          </View>
          {data.experience.map((exp, index) => (
            <View key={index} style={styles.section}>
              <View style={styles.sectionInfo}>
                <View style={styles.content}>
                  <Text style={styles.highlight}>{`${exp.title}`}</Text>
                  {exp.company && <Text style={styles.text}>{`, ${exp.company}`}</Text>}
                </View>
                {exp.startDate && exp.endDate && <Text style={styles.date}>{`${exp.startDate} - ${exp.endDate}`}</Text>}
              </View>
              <View style={styles.list}>
                <Text style={styles.text}>
                  • {exp.description}
                </Text>
                {/* comma separated skills */}
                {exp.skills && exp.skills.length > 0 && (
                  <Text style={styles.text}>
                    • Skills: {exp.skills.join(', ')}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <>
          <View style={styles.sectionTitleWrap}>
            <Text style={styles.sectionTitle}>Projects</Text>
          </View>
          {data.projects.map((project, index) => (
            <View key={index} style={styles.section}>
              <View style={styles.sectionInfo}>
                <View style={styles.content}>
                  <Text style={styles.highlight}>{`${project.title}`}</Text>
                </View>
                {project.startDate && project.endDate && <Text style={styles.date}>{`${project.startDate} - ${project.endDate}`}</Text>}
              </View>
              <View style={styles.list}>
                <Text style={styles.text}>
                  • {project.descriptions}
                </Text>
                {/* comma separated skills */}
                {project.skills && project.skills.length > 0 && (
                  <Text style={styles.text}>
                    • Skills: {project.skills.join(', ')}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <>
          <View style={styles.sectionTitleWrap}>
            <Text style={styles.sectionTitle}>Skills</Text>
          </View>
          <View style={styles.section}>
            {/* comma separated list of skills from the user */}
            <View style={styles.list}>
              <Text style={styles.text}>
                •
                {data.skills.map((skill, index) => (
                  <Text key={index}> {skill.name}{index !== data.skills.length - 1 ? ',' : ''}</Text>
                ))}
              </Text>
            </View>
          </View>
        </>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <>
          <View style={styles.sectionTitleWrap}>
            <Text style={styles.sectionTitle}>Education</Text>
          </View>
          {data.education.map((edu, index) => (
            <View key={index} style={styles.section}>
              <View style={styles.sectionInfo}>
                <View style={styles.content}>
                  <Text style={styles.highlight}>{`${edu.school}`}</Text>
                  <Text style={styles.text}>{`, ${edu.degree} in ${edu.major}`}</Text>
                </View>
                {edu.startDate && edu.endDate && <Text style={styles.date}>{`${edu.startDate} - ${edu.endDate}`}</Text>}
              </View>
            </View>
          ))}
        </>
      )}

      {/* Extracurriculars */}
      {data.extraCurricular.length > 0 && (
        <>
          <View style={styles.sectionTitleWrap}>
            <Text style={styles.sectionTitle}>Extracurriculars</Text>
          </View>
          {data.extraCurricular.map((extra, index) => (
            <View key={index} style={styles.section}>
              <View style={styles.sectionInfo}>
                <View style={styles.content}>
                  <Text style={styles.highlight}>{`${extra.title}`}</Text>
                </View>
              </View>
              <View style={styles.list}>
                <Text style={styles.text}>
                  • {extra.description}
                </Text>
              </View>
            </View>
          ))}
        </>
      )}


    </Page>
  </Document>
);

// export default Component;
const Component = () => {
  const handleDownload = async () => {
    const doc = <MyDocument data={basic} />;
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

