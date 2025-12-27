
import React from 'react';
import { Plus, UserPlus, Trash2 } from 'lucide-react';
import { StudentProfile } from '../types';

interface StudentFormProps {
  students: StudentProfile[];
  onAdd: (student: StudentProfile) => void;
  onRemove: (id: string) => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ students, onAdd, onRemove }) => {
  const [newStudent, setNewStudent] = React.useState<Partial<StudentProfile>>({
    label: '',
    strengths: '',
    struggles: '',
    interests: ''
  });

  const handleAdd = () => {
    if (newStudent.label) {
      onAdd({
        id: Math.random().toString(36).substr(2, 9),
        label: newStudent.label,
        strengths: newStudent.strengths || '',
        struggles: newStudent.struggles || '',
        interests: newStudent.interests || ''
      });
      setNewStudent({ label: '', strengths: '', struggles: '', interests: '' });
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <UserPlus className="w-4 h-4 text-indigo-500" />
          Classroom Profiles
        </h3>
        <span className="text-xs font-medium text-slate-400">{students.length} Students Added</span>
      </div>
      
      <div className="p-5 space-y-4">
        {/* Profile List */}
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {students.map(student => (
            <div key={student.id} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-lg shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-900">{student.label}</p>
                <p className="text-xs text-slate-500 truncate w-48">Interests: {student.interests}</p>
              </div>
              <button 
                onClick={() => onRemove(student.id)}
                className="text-slate-300 hover:text-red-500 p-1 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {students.length === 0 && (
            <div className="text-center py-8 text-slate-400 border-2 border-dashed border-slate-100 rounded-lg">
              <p className="text-sm">No students added yet.</p>
            </div>
          )}
        </div>

        {/* Add New Student */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Label (e.g. Student A)"
            className="col-span-2 text-sm border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            value={newStudent.label}
            onChange={e => setNewStudent({...newStudent, label: e.target.value})}
          />
          <input
            type="text"
            placeholder="Strengths"
            className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            value={newStudent.strengths}
            onChange={e => setNewStudent({...newStudent, strengths: e.target.value})}
          />
          <input
            type="text"
            placeholder="Interests"
            className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            value={newStudent.interests}
            onChange={e => setNewStudent({...newStudent, interests: e.target.value})}
          />
          <textarea
            placeholder="Struggles / Gaps"
            className="col-span-2 text-sm border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none h-20"
            value={newStudent.struggles}
            onChange={e => setNewStudent({...newStudent, struggles: e.target.value})}
          />
          <button 
            onClick={handleAdd}
            className="col-span-2 flex items-center justify-center gap-2 bg-indigo-600 text-white rounded-lg px-4 py-2 text-sm font-semibold hover:bg-indigo-700 transition"
          >
            <Plus className="w-4 h-4" /> Add Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;
