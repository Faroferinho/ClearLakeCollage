import './App.css';
import { useState, useEffect } from 'react';

export default function(){
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState({nome: "", telefone: "", email: "", endereco: ""});
  const [edition, setEdition] = useState(null);
  
  useEffect(() => {
    fetch("http://localhost:8081/projeto/api/v1/aluno")
    .then((res) => res.json()).then((data) => setStudents(data));
  }, []);

  const handleSubmit = async () => {
    const newStudent = student;
    const method = edition ? "PUT" : "POST";
    const url = "http://localhost:8081/projeto/api/v1/aluno";

    const response = await fetch(url, {
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
  }

  return (
    <div>
      <div class="form">
        <h1>Inserção Alunos</h1>
        <div>
          <input type='text' placeholder='nome' value={student.nome} onChange={(e) => setStudent({...student, nome: e.target.value})}/><br/>
          <input type='text' placeholder='telefone' value={student.telefone} onChange={(e) => setStudent({...student, telefone: e.target.value})}/><br/>
          <input type='text' placeholder='email' value={student.email} onChange={(e) => setStudent({...student, email: e.target.value})}/><br/>
          <input type='text' placeholder='endereço' value={student.endereco} onChange={(e) => setStudent({...student, endereco: e.target.value})}/><br/>
        </div>
        <button>
          {edition ? "Atualizar" : "Adicionar"}
        </button>
      </div>

      <div class="table">
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
                
              </td>
            </tr>
          ))}
        </tbody>
      </div>
    </div>

    
  );
}
