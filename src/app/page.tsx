'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { generatePDF } from '@/lib'
import { useRef, useState } from 'react'

const sampleData = {
  personalInfo: {
    name: 'John Doe',
    title: 'Senior Software Engineer',
    avatar: '/avatar.jpg',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    about: 'Passionate software engineer with 5+ years of experience in building scalable web applications. Focused on creating efficient, maintainable, and user-friendly solutions using modern technologies.'
  },
  skills: [
    'React.js',
    'TypeScript',
    'Node.js',
    'Next.js',
    'GraphQL',
    'Tailwind CSS',
    'CSS',
    'HTML',
    'AWS',
    'Docker',
    'CI/CD'
  ],
  softSkills: [
    'Team Leadership',
    'Problem Solving',
    'Communication',
    'Agile Methodology',
    'Project Management'
  ],
  languages: [
    { name: 'English', level: 'Native' },
    { name: 'Spanish', level: 'Professional' },
    { name: 'French', level: 'Intermediate' }
  ],
  experience: [
    {
      role: 'Senior Software Engineer',
      company: 'Tech Solutions Inc.',
      period: '2020 - Present',
      description: 'Led a team of 5 developers in building a cloud-based SaaS platform. Implemented microservices architecture and reduced system latency by 40%.'
    },
    {
      role: 'Software Engineer',
      company: 'Digital Innovations Ltd.',
      period: '2018 - 2020',
      description: 'Developed and maintained multiple client-facing web applications using React and Node.js.'
    }
  ],
  education: [
    {
      degree: 'Master of Science in Computer Science',
      institution: 'Stanford University',
      period: '2016 - 2018',
      description: 'Focus on Distributed Systems and Machine Learning'
    },
    {
      degree: 'Bachelor of Science in Software Engineeringg',
      institution: 'MIT',
      period: '2012 - 2016',
      description: 'Graduated with Honors, GPA 3.8/4.0'
    },
    {
      degree: 'Bachelor of Science in Software Engineeringgg',
      institution: 'MIT',
      period: '2012 - 2016',
      description: 'Graduated with Honors, GPA 3.8/4.0'
    },
    {
      degree: 'Bachelor of Science in Software Engineeringggg',
      institution: 'MIT',
      period: '2012 - 2016',
      description: 'Graduated with Honors, GPA 3.8/4.0'
    },
    {
      degree: 'Bachelor of Science in Software Engineeringa',
      institution: 'MIT',
      period: '2012 - 2016',
      description: 'Graduated with Honors, GPA 3.8/4.0'
    }
  ]
}

export default function Home() {
  const resumeRef = useRef<HTMLDivElement>(null)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const handleGeneratePDF = async () => {
    if (!resumeRef.current) return

    try {
      await generatePDF({
        element: resumeRef.current,
        isImageLoaded,
        filename: 'resume.pdf'
      })
    } catch (error) {
      console.error('Failed to generate PDF:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="min-w-[210mm] mx-auto" ref={resumeRef}>
        <div className="flex bg-white shadow-lg" style={{
          width: '210mm',
          minHeight: '297mm',
          margin: '0 auto',
          padding: '0',
        }}>
          {/* Left Sidebar */}
          <div className="w-1/3 bg-[#1B2F3D] text-white p-6 space-y-6" style={{
            minHeight: '297mm'
          }}>
            <div className="flex flex-col items-center text-center">
              <Avatar className="w-48 h-48 rounded-full border-4 border-[#29ABE2] mb-4">
                <AvatarImage
                  src={sampleData.personalInfo.avatar}
                  className="rounded-full"
                  onLoad={() => setIsImageLoaded(true)}
                  onError={() => setIsImageLoaded(false)}
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>

            {/* Contact Section */}
            <div className="space-y-6">
              <h3 className="text-[#29ABE2] text-xl font-semibold border-b-2 border-[#29ABE2] pb-2">CONTACT</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-[#29ABE2]">📱</span>
                  <span>{sampleData.personalInfo.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#29ABE2]">✉️</span>
                  <span>{sampleData.personalInfo.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#29ABE2]">📍</span>
                  <span>{sampleData.personalInfo.location}</span>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="space-y-4">
              <h3 className="text-[#29ABE2] text-xl font-semibold border-b-2 border-[#29ABE2] pb-2">SKILLS</h3>
              <ul className="space-y-2">
                {sampleData.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2">
                    <span className="text-[#29ABE2]">•</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            {/* Languages Section */}
            <div className="space-y-4">
              <h3 className="text-[#29ABE2] text-xl font-semibold border-b-2 border-[#29ABE2] pb-2">LANGUAGES</h3>
              <div className="space-y-3">
                {sampleData.languages.map((language) => (
                  <div key={language.name} className="space-y-1">
                    <div className="flex justify-between">
                      <span>{language.name}</span>
                      <span>{language.level}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <div
                        className="bg-[#29ABE2] h-1.5 rounded-full"
                        style={{
                          width: language.level === 'Native' ? '100%' :
                                 language.level === 'Professional' ? '80%' : '60%'
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hobbies Section */}
            <div className="space-y-4">
              <h3 className="text-[#29ABE2] text-xl font-semibold border-b-2 border-[#29ABE2] pb-2">HOBBIES</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-[#29ABE2]">•</span>
                  Reading
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#29ABE2]">•</span>
                  Music
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#29ABE2]">•</span>
                  Travel
                </li>
              </ul>
            </div>
          </div>

          {/* Right Content */}
          <div className="w-2/3 p-8 space-y-8" style={{
            minHeight: '297mm'
          }}>
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-[#1B2F3D]">{sampleData.personalInfo.name}</h1>
              <h2 className="text-2xl text-[#29ABE2]">{sampleData.personalInfo.title}</h2>
              <p className="text-gray-600 mt-4">{sampleData.personalInfo.about}</p>
            </div>

            {/* Work Experience */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-[#1B2F3D] border-b-2 border-[#29ABE2] pb-2">
                WORK EXPERIENCE
              </h3>
              <div className="space-y-6">
                {sampleData.experience.map((exp) => (
                  <div key={exp.company} className="relative pl-6 border-l-2 border-[#29ABE2]">
                    <div className="absolute w-3 h-3 bg-[#29ABE2] rounded-full -left-[7px] top-2"></div>
                    <h4 className="text-xl font-semibold text-[#1B2F3D]">{exp.role}</h4>
                    <div className="flex justify-between text-[#29ABE2]">
                      <span>{exp.company}</span>
                      <span>{exp.period}</span>
                    </div>
                    <p className="mt-2 text-gray-600">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-[#1B2F3D] border-b-2 border-[#29ABE2] pb-2">
                EDUCATION
              </h3>
              <div className="space-y-6">
                {sampleData.education.map((edu) => (
                  <div key={edu.degree} className="relative pl-6 border-l-2 border-[#29ABE2]">
                    <div className="absolute w-3 h-3 bg-[#29ABE2] rounded-full -left-[7px] top-2"></div>
                    <h4 className="text-xl font-semibold text-[#1B2F3D]">{edu.degree}</h4>
                    <div className="flex justify-between text-[#29ABE2]">
                      <span>{edu.institution}</span>
                      <span>{edu.period}</span>
                    </div>
                    <p className="mt-2 text-gray-600">{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Generation Button */}
      <button
        onClick={handleGeneratePDF}
        className="mt-8 px-6 py-3 bg-[#29ABE2] text-white rounded-lg hover:bg-[#1B2F3D] transition-colors mx-auto block"
      >
        Download PDF Resume
      </button>
    </div>
  )
}
