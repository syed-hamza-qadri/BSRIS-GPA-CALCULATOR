import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const GPACalculator = () => {
  const semester1Courses = [
    { name: 'Applied Calculus and Analytical Geometry', code: 'GSC 110', creditHours: '3', grade: '', required: true },
    { name: 'Applied Physics Lab', code: 'GSL 113', creditHours: '1', grade: '', required: true },
    { name: 'Computing Fundamentals', code: 'CSC 110', creditHours: '2', grade: '', required: true },
    { name: 'Computing Fundamentals Lab', code: 'CSL 110', creditHours: '1', grade: '', required: true },
    { name: 'Functional English', code: 'ENG 101', creditHours: '3', grade: '', required: true },
    { name: 'Islamic Studies', code: 'ISL 101', creditHours: '2', grade: '', required: true },
    { name: 'Tajweed', code: 'ISL 107', creditHours: '0', grade: '', required: false },
    { name: 'Applied Physics', code: 'GSC 114', creditHours: '2', grade: '', required: true },
    { name: 'Engineering Drawing and CAD', code: 'EEL 121', creditHours: '1', grade: '', required: true }
  ];

  const semester2Courses = [
    { name: 'Circuit Analysis', code: 'GSC 115', creditHours: '3', grade: '', required: true },
    { name: 'Circuit Analysis Lab', code: 'GSL 115', creditHours: '1', grade: '', required: true },
    { name: 'Computer Programming', code: 'CSC 113', creditHours: '3', grade: '', required: true },
    { name: 'Computer Programming Lab', code: 'CSL 113', creditHours: '1', grade: '', required: true },
    { name: 'Engineering Ethics', code: 'HSS 424', creditHours: '2', grade: '', required: true },
    { name: 'Engineering Mechanics', code: 'MSC 231', creditHours: '3', grade: '', required: true },
    { name: 'Entrepreneurship', code: 'HSS 423', creditHours: '2', grade: '', required: true },
    { name: 'Linear Algebra & Differential Equations', code: 'GSC 123', creditHours: '3', grade: '', required: true },
    { name: 'Understanding Quran-I', code: 'ISL 108', creditHours: '0', grade: '', required: false }
  ];

  const [selectedSemester, setSelectedSemester] = useState('');
  const [courses, setCourses] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const gradeScale = {
    'A': 4.00,
    'A-': 3.67,
    'B+': 3.33,
    'B': 3.00,
    'B-': 2.67,
    'C+': 2.33,
    'C': 2.00,
    'C-': 1.67,
    'D+': 1.33,
    'D': 1.00,
    'F': 0.00
  };

  const handleSemesterChange = (value) => {
    setSelectedSemester(value);
    setCourses(value === '1' ? semester1Courses : semester2Courses);
    setShowResults(false);
  };

  const handleCourseUpdate = (index, value) => {
    const newCourses = [...courses];
    newCourses[index] = { ...newCourses[index], grade: value };
    setCourses(newCourses);
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      if (course.creditHours && course.grade) {
        const credits = parseFloat(course.creditHours);
        totalPoints += credits * gradeScale[course.grade];
        totalCredits += credits;
      }
    });

    return totalCredits === 0 ? 0 : (totalPoints / totalCredits).toFixed(2);
  };

  const handleCalculate = () => {
    const isValid = courses.every(course => !course.required || course.grade);
    if (isValid) {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setSelectedSemester('');
    setCourses([]);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">BS RIS GPA CALCULATOR</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Label>Select Semester</Label>
            <Select value={selectedSemester} onValueChange={handleSemesterChange}>
              <SelectTrigger>
                <SelectValue placeholder="Choose semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Semester 1</SelectItem>
                <SelectItem value="2">Semester 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedSemester && !showResults && (
            <div className="space-y-6">
              {courses.map((course, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <div className="col-span-2">
                      <div className="font-medium">
                        {course.name}
                        {!course.required && <span className="text-gray-500 text-sm ml-2">(Optional)</span>}
                      </div>
                      <div className="text-sm text-gray-600">{course.code}</div>
                    </div>
                    <div className="text-sm text-gray-600">
                      Credits: {course.creditHours}
                    </div>
                    <div>
                      <Select
                        value={course.grade}
                        onValueChange={(value) => handleCourseUpdate(index, value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={course.required ? "Select grade" : "Optional grade"} />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(gradeScale).map((grade) => (
                            <SelectItem key={grade} value={grade}>
                              {grade}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
              <Button 
                onClick={handleCalculate}
                className="w-full"
                disabled={!courses.every(course => !course.required || course.grade)}
              >
                Calculate GPA
              </Button>
            </div>
          )}

          {showResults && (
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold">Your GPA for Semester {selectedSemester}</h3>
                <div className="text-4xl font-bold text-blue-600">
                  {calculateGPA()}
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold">Course Breakdown:</h4>
                {courses.filter(course => course.grade).map((course, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{course.name}</span>
                        <span className="text-sm text-gray-600 ml-2">({course.code})</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {course.creditHours} credits - Grade: {course.grade}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                onClick={handleReset}
                className="w-full"
                variant="outline"
              >
                Calculate Another GPA
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GPACalculator;