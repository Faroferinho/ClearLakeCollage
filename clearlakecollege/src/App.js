import './App.css';
import { useState, useEffect } from 'react';

const API_URL = "http://localhost:8081/projeto/api/v1/aluno";

export default function StudentsCRUD(){
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState({nome: "", telefone: "", email: "", endereco: ""});
  const [edition, setEdition] = useState(null);
  
  useEffect(() => {
    fetch(API_URL)
    .then((res)  => res.json())
    .then((data) => setStudents(data));
  }, []);

  const handleSubmit = async () => {
    const newStudent = student;
    const method = edition ? "PUT" : "POST";

    const response = await fetch(API_URL, {
      method,
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newStudent),
    });

    if(response.ok){
      setStudents(
        edition ? students.map(b => (b.id === edition ? newStudent : b)) : [...students, newStudent]
      );
      setEdition(null);
    }
  };

  const handleEdit = (stu) => {
    setStudent(stu);
    setEdition(stu.id);
  };

  const handleDelete = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, { method : "DELETE" });
    if(response.ok){
      setStudents(students.filter(b => b.id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Cadastro</h1>
        <sub>Insira o nome de Novos Alunos</sub>
        <div class="form" className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <input type='text' placeholder='nome' value={student.nome} onChange={(e) => setStudent({...student, nome: e.target.value})}/><br/>
          <input type='text' placeholder='telefone' value={student.telefone} onChange={(e) => setStudent({...student, telefone: e.target.value})}/><br/>
          <input type='text' placeholder='email' value={student.email} onChange={(e) => setStudent({...student, email: e.target.value})}/><br/>
          <input type='text' placeholder='endereço' value={student.endereco} onChange={(e) => setStudent({...student, endereco: e.target.value})}/><br/>
          <button onClick={handleSubmit}>
            {edition ? "Atualizar" : "Adicionar"}
          </button>
        </div>
      </div>

      <div class="table">
        <h1>Lista de Alunos</h1>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>E-mail</th>
            <th>Endereço</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {students.map((stu, index) => (
            <tr key={index}>
              <td>{stu.nome}</td>
              <td>{stu.telefone}</td>
              <td>{stu.email}</td>
              <td>{stu.endereco}</td>
              <td>
                <button onClick={() => handleEdit(stu)}>🖋️</button>
                <button onClick={() => handleDelete(stu.id)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </div>
    </div>

    
  );
}
