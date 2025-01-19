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


// const exampleData = {
//   name: 'John Doe',
//   email: 'john.doe@example.com',
//   skills: [
//     { name: 'React' },
//     { name: 'Node.js' },
//     { name: 'JavaScript' },
//   ],
//   experience: [
//     {
//       title: 'Software Engineer',
//       company: 'Example Inc.',
//       startDate: '2019',
//       endDate: 'Present',
//       description: 'Developed web applications using React and Node.js',
//       skills: ['React', 'Node.js', 'JavaScript'],
//     },
//     {
//       title: 'Software Engineer 2',
//       company: 'Example Inc.',
//       startDate: '2019',
//       endDate: 'Present',
//       description: 'Developed web applications using React and Node.js',
//       skills: ['React', 'Node.js', 'JavaScript'],
//     },
//   ],
//   projects: [
//     {
//       title: 'Example Project',
//       startDate: '2020',
//       endDate: '2021',
//       descriptions: 'Developed web applications using React and Node.js',
//       skills: ['React', 'Node.js', 'JavaScript'],
//     },
//     {
//       title: 'Example Project 2',
//       startDate: '2020',
//       endDate: '2021',
//       descriptions: 'Developed web applications using React and Node.js',
//       skills: ['React', 'Node.js', 'JavaScript'],
//     },
//   ],
//   education: [
//     {
//       school: 'Example University',
//       degree: 'B.S.',
//       major: 'Computer Science',
//       startDate: '2015',
//       endDate: '2019',
//       skills: [],
//     }
//   ],
//   extraCurricular: [
//     {
//       title: 'Example Club',
//       description: 'President',
//     },
//   ]
// };

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
  // const handleDownload = async () => {
  //   const doc = <MyDocument data={basic} />;
  //   const asPdf = pdf();
  //   asPdf.updateContainer(doc);
  //   const blob = await asPdf.toBlob();
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = 'cv.pdf';
  //   a.click();
  // };

  const trimmedData = {
    users: [
      {
        name: "John Doe",
        email: "john.doe@example.com",
        password: "securepassword",
        skills: ["JavaScript", "React"],
      },
    ],
    education: [
      {
        id: "edu1",
        school: "McGill University",
        degree_type: "Bachelors",
        major: "Computer Science",
        start_date: { year: 2020, month: 9, day: 1 },
        end_date: { year: 2024, month: 6, day: 30 },
        user_id: "john.doe@example.com",
      },
    ],
    workExperience: [
      {
        id: "work1",
        title: "Software Engineer Intern",
        company: "Tech Corp",
        description: "Worked on developing features.",
        skills_used: ["Java", "Spring Boot"],
        start_date: { year: 2023, month: 5, day: 15 },
        end_date: { year: 2023, month: 6, day: 15 },
        current_job: true,
        user_id: "john.doe@example.com",
      },
      {
        id: "work2",
        title: "Computer Engineer Intern",
        company: "Tech Corp",
        description: "Worked on developing features.",
        skills_used: ["Java", "Spring Boot"],
        start_date: { year: 2023, month: 5, day: 15 },
        end_date: null,
        current_job: true,
        user_id: "john.doe@example.com",
      },
    ],
    project: [
      {
        id: "project1",
        title: "Project 1",
        start_date: { year: 2023, month: 5, day: 15 },
        end_date: { year: 2023, month: 6, day: 15 },
        descriptions: "Developed a web application.",
        skills: ["React", "Node.js"],
        user_id: "john.doe@example.com",
      },
    ],
    extraCurricular: [
      {
        id: "extra1",
        title: "Club 1",
        description: "President",
        user_id: "john.doe@example.com",
      },
    ],
  };
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const formatDateToMonthYear = (dateObj: { year: any; month: any; }) => {
    if (!dateObj) return '';
    const { year, month } = dateObj;
    return `${monthNames[month - 1]}, ${year}`; // Month is 1-indexed
  };
  const formatData = (data: { users: any[]; education: any[]; workExperience: any[]; project: any[]; extraCurricular: any[] }) => {
    return {
      users: data.users.map((user) => ({
        ...user,
        skills: user.skills || [],
      })),
      education: data.education.map((edu) => ({
        ...edu,
        start_date: formatDateToMonthYear(edu.start_date),
        end_date: formatDateToMonthYear(edu.end_date),
        user_id: edu.user_id || '',
      })),
      workExperience: data.workExperience.map((work) => ({
        ...work,
        start_date: formatDateToMonthYear(work.start_date),
        end_date: work.end_date ? formatDateToMonthYear(work.end_date) : work.current_job ? 'Present' : '',
        skills_used: work.skills_used || [],
        user_id: work.user_id || '',
        current_job: work.current_job ?? false,
      })),
      project: data.project.map((project) => ({
        ...project,
        start_date: formatDateToMonthYear(project.start_date),
        end_date: formatDateToMonthYear(project.end_date),
        skills: project.skills || [],
        user_id: project.user_id || '',
      })),
      extraCurricular: data.extraCurricular.map((extra) => ({
        ...extra,
        user_id: extra.user_id || '',
      })),
    };
  };

  const formattedData = formatData(trimmedData);
  const data: Data = {
    name: formattedData.users[0].name,
    email: formattedData.users[0].email,
    skills: formattedData.users[0].skills.map((skill: string) => ({ name: skill })),
    experience: formattedData.workExperience.map((work: {
      title: string;
      company: string;
      start_date: string;
      end_date: string;
      description: string;
      skills_used: string[];
    }) => ({
      title: work.title,
      company: work.company,
      startDate: work.start_date,
      endDate: work.end_date,
      description: work.description,
      skills: work.skills_used,
    })),
    projects: formattedData.project.map((proj: {
      title: string;
      start_date: string;
      end_date: string;
      descriptions: string;
      skills: string[];
    }) => ({
      title: proj.title,
      startDate: proj.start_date,
      endDate: proj.end_date,
      descriptions: proj.descriptions,
      skills: proj.skills,
    })),
    education: formattedData.education.map((edu: {
      school: string;
      degree_type: string;
      major: string;
      start_date: string;
      end_date: string;
    }) => ({
      school: edu.school,
      degree: edu.degree_type,
      major: edu.major,
      startDate: edu.start_date,
      endDate: edu.end_date,
      skills: [],
    })),
    extraCurricular: formattedData.extraCurricular.map((extra: {
      title: string;
      description: string;
    }) => ({
      title: extra.title,
      description: extra.description,
    })),
  };

  const handleDownload = async () => {
    if (!data) return;
    const doc = <MyDocument data={data} />;
    const asPdf = pdf();
    asPdf.updateContainer(doc);
    const blob = await asPdf.toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bcv.pdf';
    a.click();
  };

  return (
    <div>
      <button onClick={handleDownload}>Download CV</button>
    </div>
  );
};

export default Component;

